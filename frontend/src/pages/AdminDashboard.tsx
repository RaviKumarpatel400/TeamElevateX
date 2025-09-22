import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest, clearAuthToken } from '../lib/api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

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

type Registration = {
  _id: string
  itemId: Item
  itemType: Item['type']
  teamName?: string
  participants: { name: string; email: string; phone?: string }[]
  createdAt: string
}

type Application = {
  _id: string
  type: 'member' | 'lead'
  name: string
  email: string
  github?: string
  linkedin?: string
  experience?: string
  skills?: string
  interests?: string
  availability?: string
  leadershipExperience?: string
  technicalSkills?: string
  mentoringExperience?: string
  projectIdeas?: string
  timeCommitment?: string
  motivation?: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [items, setItems] = useState<Item[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'applications' | 'registrations' | 'add-event'>('add-event')
  const [form, setForm] = useState<Omit<Item, '_id'>>({
    type: 'event',
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: '',
    isPublished: true,
  })

  const fetchItems = async () => {
    setLoading(true)
    try {
      const data = await apiRequest<Item[]>('/api/items')
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  const fetchRegistrations = async () => {
    const regs = await apiRequest<Registration[]>('/api/registrations')
    setRegistrations(regs)
  }

  const fetchApplications = async () => {
    const apps = await apiRequest<Application[]>('/api/applications')
    setApplications(apps)
  }

  useEffect(() => {
    fetchItems()
    fetchRegistrations()
    fetchApplications()
  }, [])

  const addItem = async () => {
    await apiRequest<Item>('/api/items', { method: 'POST', body: JSON.stringify(form) })
    setForm({ ...form, title: '', description: '', date: '', location: '', imageUrl: '' })
    fetchItems()
    fetchRegistrations()
  }

  const removeItem = async (id: string) => {
    await apiRequest(`/api/items/${id}`, { method: 'DELETE' })
    fetchItems()
  }

  const logout = () => {
    clearAuthToken()
    navigate('/')
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <Button variant="secondary" onClick={logout}>Logout</Button>
      </div>

      {/* Top navbar tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <Button
          variant={activeTab === 'applications' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('applications')}
        >
          Application request
        </Button>
        <Button
          variant={activeTab === 'registrations' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('registrations')}
        >
          Event registration
        </Button>
        <Button
          variant={activeTab === 'add-event' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('add-event')}
        >
          Add Event
        </Button>
      </div>

      {activeTab === 'add-event' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded p-4">
            <h2 className="font-medium mb-4">Add New</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Type</label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as Item['type'] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm mb-1">Title</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm mb-1">Date</label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm mb-1">Location</label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm mb-1">Image URL (optional)</label>
                <Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
              </div>
              <Button onClick={addItem}>Add</Button>
            </div>
          </div>

          <div className="border rounded p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">All Items</h2>
              {loading && <span className="text-sm">Loading...</span>}
            </div>
            <div className="space-y-3 max-h-[480px] overflow-auto pr-2">
              {items.map((it) => (
                <div key={it._id} className="border rounded p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {it.type} • {new Date(it.date).toLocaleDateString()} • {it.location}
                    </div>
                  </div>
                  <Button variant="destructive" onClick={() => removeItem(it._id)}>Delete</Button>
                </div>
              ))}
              {items.length === 0 && !loading && <div className="text-sm text-muted-foreground">No items yet.</div>}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="border rounded p-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Applications</h2>
          </div>
          <div className="space-y-3 max-h-[480px] overflow-auto pr-2">
            {applications.map((a) => (
              <div key={a._id} className="border rounded p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{a.name} • {a.type}</div>
                  <div className="text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm text-muted-foreground">{a.email}</div>
                {a.motivation && <div className="text-sm mt-2">{a.motivation}</div>}
                <div className="flex gap-2 mt-3">
                  <Button variant={a.status === 'accepted' ? 'default' : 'secondary'} onClick={async () => {
                    await apiRequest(`/api/applications/${a._id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'accepted' }) })
                    fetchApplications()
                  }}>Accept</Button>
                  <Button variant={a.status === 'rejected' ? 'destructive' : 'outline'} onClick={async () => {
                    await apiRequest(`/api/applications/${a._id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'rejected' }) })
                    fetchApplications()
                  }}>Reject</Button>
                </div>
              </div>
            ))}
            {applications.length === 0 && <div className="text-sm text-muted-foreground">No applications yet.</div>}
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="border rounded p-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Registrations</h2>
            <Button onClick={async () => {
              const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/registrations/export`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('admin_token') || ''}` },
              })
              const blob = await res.blob()
              const url = window.URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'registrations.csv'
              document.body.appendChild(a)
              a.click()
              a.remove()
              window.URL.revokeObjectURL(url)
            }}>Download CSV</Button>
          </div>
          <div className="space-y-3 max-h-[480px] overflow-auto pr-2">
            {registrations.map((r) => (
              <div key={r._id} className="border rounded p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{r.itemId?.title} ({r.itemType})</div>
                  <div className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</div>
                </div>
                {r.teamName && <div className="text-sm mt-1">Team: {r.teamName}</div>}
                <div className="mt-2 text-sm">
                  Participants:
                  <ul className="list-disc ml-5">
                    {r.participants.map((p, i) => (
                      <li key={i}>{p.name} • {p.email}{p.phone ? ` • ${p.phone}` : ''}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            {registrations.length === 0 && <div className="text-sm text-muted-foreground">No registrations yet.</div>}
          </div>
        </div>
      )}

      
    </div>
  )
}


