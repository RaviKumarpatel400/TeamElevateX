import { useEffect, useState } from 'react'
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { apiRequest, getUserToken, setUserToken } from '@/lib/api'

type Item = {
  _id: string
  type: 'event' | 'hackathon' | 'workshop'
  title: string
  description: string
  date: string
  location: string
  imageUrl?: string
  isPublished: boolean
}

const eventTypes = ['All', 'event', 'hackathon', 'workshop']

type Participant = { name: string; email: string; phone?: string }

const EventsPage = () => {
  const [items, setItems] = useState<Item[]>([])
  const [activeType, setActiveType] = useState<string>('All')
  const [open, setOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [teamName, setTeamName] = useState('')
  const [participants, setParticipants] = useState<Participant[]>([{ name: '', email: '', phone: '' }])
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      const data = await apiRequest<Item[]>('/api/items')
      setItems(data)
    }
    fetchItems()
  }, [])

  const openRegister = (id: string) => {
    setSelectedId(id)
    setTeamName('')
    setParticipants([{ name: '', email: '', phone: '' }])
    setNotes('')
    setError(null)
    // gate with user login
    const token = getUserToken()
    if (!token) {
      setLoginOpen(true)
      return
    }
    setOpen(true)
  }

  const validEmail = (value: string) => {
    return /^\d{12}@(?:centurionuniv\.edu\.in|cutm\.ac\.in)$/.test(value)
  }

  const requestOtp = async () => {
    try {
      setLoginError(null)
      if (!validEmail(email)) {
        setLoginError('Use 12 digits @centurionuniv.edu.in or @cutm.ac.in')
        return
      }
      setLoginLoading(true)
      await apiRequest('/api/auth/request-otp', { method: 'POST', body: JSON.stringify({ email }) })
      setOtpSent(true)
    } catch (e: any) {
      setLoginError(e.message || 'Failed to send OTP')
    } finally {
      setLoginLoading(false)
    }
  }

  const verifyOtp = async () => {
    try {
      setLoginError(null)
      if (!otp || otp.length < 4) {
        setLoginError('Enter the 6-digit OTP')
        return
      }
      setLoginLoading(true)
      const res = await apiRequest<{ token: string }>('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, otp }) })
      setUserToken(res.token)
      setLoginOpen(false)
      setOpen(true)
    } catch (e: any) {
      setLoginError(e.message || 'Failed to verify OTP')
    } finally {
      setLoginLoading(false)
    }
  }

  const addParticipant = () => {
    if (participants.length >= 5) return
    setParticipants([...participants, { name: '', email: '', phone: '' }])
  }

  const removeParticipant = (idx: number) => {
    if (participants.length <= 1) return
    setParticipants(participants.filter((_, i) => i !== idx))
  }

  const updateParticipant = (idx: number, key: keyof Participant, value: string) => {
    const next = [...participants]
    next[idx] = { ...next[idx], [key]: value }
    setParticipants(next)
  }

  const submitRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedId) return
    setSubmitting(true)
    setError(null)
    try {
      await apiRequest('/api/registrations', {
        method: 'POST',
        body: JSON.stringify({ itemId: selectedId, teamName, participants, notes }),
      })
      setOpen(false)
    } catch (err: any) {
      setError(err.message || 'Failed to register')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Upcoming <span className="text-accent">Events</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our community events, workshops, and conferences to learn, network, 
            and stay ahead in the ever-evolving world of technology.
          </p>
        </div>

        {/* Event Type Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {eventTypes.map((type) => (
            <Button
              key={type}
              onClick={() => setActiveType(type)}
              variant={type === activeType ? 'default' : 'outline'}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                type === activeType 
                  ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items
            .filter((e) => (activeType === 'All' ? true : e.type === activeType))
            .map((event) => (
            <Card
              key={event._id}
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                event.isPublished ? 'ring-2 ring-accent/20' : ''
              }`}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  {event.imageUrl ? (
                    <div className="aspect-video bg-muted">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement
                          t.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-accent/60" />
                    </div>
                  )}
                  {event.isPublished && (
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Event Type */}
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>

                  {/* Title */}
                  <CardTitle className="text-xl group-hover:text-accent transition-colors duration-300">
                    {event.title}
                  </CardTitle>

                  {/* Description */}
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </CardDescription>

                  {/* Event Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button onClick={() => openRegister(event._id)} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4 group-hover:translate-y-[-2px] transition-all duration-300">
                    <span>Register Now</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitRegistration} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Team Name (optional)</label>
                <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="For hackathons, add a team name" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm">Participants (1 to 5)</label>
                  <Button type="button" variant="secondary" onClick={addParticipant} disabled={participants.length >= 5}>Add</Button>
                </div>
                <div className="space-y-3">
                  {participants.map((p, idx) => (
                    <div key={idx} className="grid md:grid-cols-3 gap-3 items-end">
                      <div>
                        <label className="block text-xs mb-1">Full Name</label>
                        <Input value={p.name} onChange={(e) => updateParticipant(idx, 'name', e.target.value)} required />
                      </div>
                      <div>
                        <label className="block text-xs mb-1">Email</label>
                        <Input type="email" value={p.email} onChange={(e) => updateParticipant(idx, 'email', e.target.value)} required />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-xs mb-1">Phone (optional)</label>
                          <Input value={p.phone || ''} onChange={(e) => updateParticipant(idx, 'phone', e.target.value)} />
                        </div>
                        <Button type="button" variant="destructive" onClick={() => removeParticipant(idx)} disabled={participants.length <= 1}>Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Notes (optional)</label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any extra info" />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Registration'}</Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Login Dialog */}
        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login to continue</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Institution Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="230101120161@centurionuniv.edu.in" />
                <p className="text-xs text-muted-foreground mt-1">Allowed: 12 digits @centurionuniv.edu.in or @cutm.ac.in</p>
              </div>
              {otpSent && (
                <div>
                  <label className="block text-sm mb-1">OTP</label>
                  <Input inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" />
                </div>
              )}
              {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
              <div className="flex gap-2">
                {!otpSent ? (
                  <Button onClick={requestOtp} disabled={loginLoading}>Send OTP</Button>
                ) : (
                  <Button onClick={verifyOtp} disabled={loginLoading}>Verify OTP</Button>
                )}
                <Button variant="secondary" onClick={() => setLoginOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Host Your Own Event
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have an idea for an event? Partner with us to create meaningful experiences 
              for the tech community.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsPage
