import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest, setAuthToken, getAuthToken } from '../lib/api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import reactLogo from '../assets/react.svg'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (getAuthToken()) {
      navigate('/admin/dashboard')
    }
  }, [navigate])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const resp = await apiRequest<{ token: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      setAuthToken(resp.token)
      navigate('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)]">
      <div className="relative">
        {/* background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-2 md:py-16">
          {/* Left: branding and story */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <img src={reactLogo} alt="logo" className="h-8 w-8" />
              <span className="text-xl font-semibold">TeamElevateX Admin</span>
              <Badge variant="secondary">Secure</Badge>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Control center for Events, Hackathons and Workshops
            </h1>
            <p className="text-muted-foreground mb-6">
              Plan, publish and track everything in one place. Manage incoming applications, approve participants,
              and keep your community updated with stunning events.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border p-4 bg-background/60">
                <div className="font-medium mb-1">One-click publishing</div>
                <div className="text-muted-foreground">Create events and go live instantly.</div>
              </div>
              <div className="rounded-lg border p-4 bg-background/60">
                <div className="font-medium mb-1">Smart registrations</div>
                <div className="text-muted-foreground">Teams up to 5, CSV exports.</div>
              </div>
              <div className="rounded-lg border p-4 bg-background/60">
                <div className="font-medium mb-1">Applications</div>
                <div className="text-muted-foreground">Review and accept in seconds.</div>
              </div>
              <div className="rounded-lg border p-4 bg-background/60">
                <div className="font-medium mb-1">Secure access</div>
                <div className="text-muted-foreground">JWT protected admin area.</div>
              </div>
            </div>
          </div>

          {/* Right: login card */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>Sign in to access the admin dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Username</label>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter admin username" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Password</label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter password" />
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Use the credentials set in your backend .env</p>
                </form>
                <div className="mt-6 flex items-center justify-center gap-6 opacity-80">
                  <img src={reactLogo} className="h-6"/>
                  <img src={reactLogo} className="h-6"/>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


