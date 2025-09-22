import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { apiRequest, setUserToken } from '@/lib/api'

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoginSuccess?: () => void
}

export default function LoginModal({ open, onOpenChange, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const validEmail = (value: string) => {
    return /^\d{12}@(?:centurionuniv\.edu\.in|cutm\.ac\.in)$/.test(value)
  }

  const requestOtp = async () => {
    try {
      setError(null)
      if (!validEmail(email)) {
        setError('Use 12 digits @centurionuniv.edu.in or @cutm.ac.in')
        return
      }
      setLoading(true)
      await apiRequest('/api/auth/request-otp', { method: 'POST', body: JSON.stringify({ email }) })
      setOtpSent(true)
    } catch (e: any) {
      setError(e.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    try {
      setError(null)
      if (!otp || otp.length < 4) {
        setError('Enter the 6-digit OTP')
        return
      }
      setLoading(true)
      const res = await apiRequest<{ token: string }>('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, otp }) })
      setUserToken(res.token)
      onOpenChange(false)
      onLoginSuccess?.()
    } catch (e: any) {
      setError(e.message || 'Failed to verify OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setOtp('')
    setOtpSent(false)
    setError(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login to continue</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Institution Email</label>
            <Input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="230101120161@centurionuniv.edu.in" 
              disabled={otpSent}
            />
            <p className="text-xs text-muted-foreground mt-1">Allowed: 12 digits @centurionuniv.edu.in or @cutm.ac.in</p>
          </div>
          {otpSent && (
            <div>
              <label className="block text-sm mb-1">OTP</label>
              <Input 
                inputMode="numeric" 
                maxLength={6} 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder="Enter 6-digit OTP" 
              />
            </div>
          )}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-2">
            {!otpSent ? (
              <Button onClick={requestOtp} disabled={loading}>
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
            ) : (
              <Button onClick={verifyOtp} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
