import jwt from 'jsonwebtoken'

export const requireAdmin = (req, res, next) => {
	const authHeader = req.headers.authorization || ''
	const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null
	if (!token) return res.status(401).json({ message: 'Missing token' })
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		if (decoded.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
		req.user = decoded
		return next()
	} catch (err) {
		return res.status(401).json({ message: 'Invalid token' })
	}
}


