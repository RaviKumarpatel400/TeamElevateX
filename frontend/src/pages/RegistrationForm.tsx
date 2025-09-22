import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { apiRequest } from '../lib/api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'

type Item = {
  _id: string
  title: string
  type: 'event' | 'hackathon' | 'workshop'
}

type Participant = { name: string; email: string; phone?: string }

export default function RegistrationForm() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const itemId = params.get('itemId') || ''

  const [item, setItem] = useState<Item | null>(null)
  const [teamName, setTeamName] = useState('')
  const [participants, setParticipants] = useState<Participant[]>([{ name: '', email: '', phone: '' }])
  const [notes, setNotes] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      if (!itemId) return
      const data = await apiRequest<Item>(`/api/items/${itemId}`)
      setItem(data)
    }
    load()
  }, [itemId])

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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await apiRequest('/api/registrations', {
        method: 'POST',
        body: JSON.stringify({ itemId, teamName, participants, notes }),
      })
      navigate('/events')
    } catch (err: any) {
      setError(err.message || 'Failed to register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Register</h1>
      {item && (
        <p className="text-muted-foreground mb-6">
          You are registering for: <strong>{item.title}</strong> ({item.type})
        </p>
      )}
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block text-sm mb-1">Team Name (optional)</label>
          <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="For hackathons, add a team name" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm">Participants (1 to 5)</label>
            <Button type="button" variant="secondary" onClick={addParticipant} disabled={participants.length >= 5}>
              Add Participant
            </Button>
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
                  <Button type="button" variant="destructive" onClick={() => removeParticipant(idx)} disabled={participants.length <= 1}>
                    Remove
                  </Button>
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

        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Registration'}
        </Button>
      </form>
    </div>
  )
}


