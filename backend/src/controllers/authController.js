import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import SibApiV3Sdk from 'sib-api-v3-sdk'
import nodemailer from 'nodemailer'

// In-memory store for OTPs. For production, prefer a DB or cache like Redis.
const emailToOtpRecord = new Map()

const OTP_TTL_MS = 5 * 60 * 1000 // 5 minutes

const isValidInstitutionEmail = (email) => {
    // Only allow 12 digits followed by @centurionuniv.edu.in or @cutm.ac.in
    const regex = /^\d{12}@(?:centurionuniv\.edu\.in|cutm\.ac\.in)$/
    return regex.test(email)
}

const brevoClient = () => {
    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) throw new Error('BREVO_API_KEY is not set')
    const defaultClient = SibApiV3Sdk.ApiClient.instance
    const apiKeyAuth = defaultClient.authentications['api-key']
    apiKeyAuth.apiKey = apiKey
    return new SibApiV3Sdk.TransactionalEmailsApi()
}

const smtpTransport = () => {
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    if (!host || !user || !pass) return null
    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    })
}

async function sendOtpEmail(toEmail, subject, htmlContent) {
    // Prefer SMTP if configured; else use Brevo SDK
    const smtp = smtpTransport()
    const senderRaw = process.env.MAIL_FROM || process.env.BREVO_SENDER_EMAIL || 'no-reply@yourdomain.com'
    if (smtp) {
        await smtp.sendMail({
            from: senderRaw,
            to: toEmail,
            subject,
            html: htmlContent,
        })
        return
    }
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'no-reply@yourdomain.com'
    const senderName = process.env.BREVO_SENDER_NAME || 'CUTM Events'
    const api = brevoClient()
    await api.sendTransacEmail({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: toEmail }],
        subject,
        htmlContent,
    })
}

export const requestOtp = async (req, res) => {
    try {
        const { email } = req.body || {}
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: 'Valid email is required' })
        }
        if (!isValidInstitutionEmail(email)) {
            return res.status(400).json({ message: 'Email must be 12 digits @centurionuniv.edu.in or @cutm.ac.in' })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        const record = { otp, expiresAt: Date.now() + OTP_TTL_MS, attempts: 0 }
        emailToOtpRecord.set(email, record)

        const htmlContent = `<p>Your One-Time Password (OTP) is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`
        const subject = 'Your OTP for Events Login'
        await sendOtpEmail(email, subject, htmlContent)

        return res.json({ message: 'OTP sent' })
    } catch (err) {
        // Try to surface Brevo response for debugging
        const isProd = process.env.NODE_ENV === 'production'
        let detail = ''
        try {
            // Some Brevo errors include response text/body
            // @ts-ignore
            if (err?.response?.text) detail = err.response.text
            // @ts-ignore
            else if (err?.response?.body) detail = JSON.stringify(err.response.body)
        } catch {}
        console.error('requestOtp error:', err, detail)
        return res.status(500).json({ message: 'Failed to send OTP', ...(isProd ? {} : { detail }) })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body || {}
        if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required' })
        if (!isValidInstitutionEmail(email)) {
            return res.status(400).json({ message: 'Email must be 12 digits @centurionuniv.edu.in or @cutm.ac.in' })
        }
        const record = emailToOtpRecord.get(email)
        if (!record) return res.status(400).json({ message: 'No OTP requested for this email' })
        if (Date.now() > record.expiresAt) {
            emailToOtpRecord.delete(email)
            return res.status(400).json({ message: 'OTP expired. Please request a new one.' })
        }
        if (record.attempts >= 5) {
            emailToOtpRecord.delete(email)
            return res.status(429).json({ message: 'Too many attempts. Please request a new OTP.' })
        }
        record.attempts += 1
        if (String(otp) !== record.otp) {
            return res.status(401).json({ message: 'Invalid OTP' })
        }
        emailToOtpRecord.delete(email)
        const token = jwt.sign({ role: 'user', email }, process.env.JWT_SECRET, { expiresIn: '2h' })
        return res.json({ token })
    } catch (err) {
        console.error('verifyOtp error:', err)
        return res.status(500).json({ message: 'Failed to verify OTP' })
    }
}

export const adminLogin = async (req, res) => {
	const { username, password } = req.body
	if (!username || !password) return res.status(400).json({ message: 'Username and password required' })

	const adminUsername = process.env.ADMIN_USERNAME
	const adminPassword = process.env.ADMIN_PASSWORD
	const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH
	if (!adminUsername || (!adminPassword && !adminPasswordHash)) return res.status(500).json({ message: 'Admin credentials not set' })

	const usernameMatch = username === adminUsername

	let passwordMatch = false
	if (adminPasswordHash) {
		// Compare against provided hash
		passwordMatch = await bcrypt.compare(password, adminPasswordHash)
	} else if (adminPassword) {
		// Compare plaintext from env
		passwordMatch = password === adminPassword
	}

	if (!usernameMatch || !passwordMatch) {
		return res.status(401).json({ message: 'Invalid credentials' })
	}

	const token = jwt.sign({ role: 'admin', username }, process.env.JWT_SECRET, { expiresIn: '2h' })
	return res.json({ token })
}


