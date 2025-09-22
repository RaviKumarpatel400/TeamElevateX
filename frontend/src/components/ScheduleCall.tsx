import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, CheckCircle, Video } from 'lucide-react'

interface ScheduleCallProps {
  onBack: () => void
}

interface TimeSlot {
  id: string
  date: string
  time: string
  available: boolean
  timezone: string
}

export default function ScheduleCall({ onBack }: ScheduleCallProps) {
  const [step, setStep] = useState<'form' | 'calendar' | 'confirmation'>('form')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    callType: 'video',
    timezone: ''
  })
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)

  // Mock available time slots (in real app, this would come from a calendar API)
  const timeSlots: TimeSlot[] = [
    { id: '1', date: '2024-01-22', time: '09:00 AM', available: true, timezone: 'EST' },
    { id: '2', date: '2024-01-22', time: '11:00 AM', available: true, timezone: 'EST' },
    { id: '3', date: '2024-01-22', time: '02:00 PM', available: false, timezone: 'EST' },
    { id: '4', date: '2024-01-22', time: '04:00 PM', available: true, timezone: 'EST' },
    { id: '5', date: '2024-01-23', time: '09:00 AM', available: true, timezone: 'EST' },
    { id: '6', date: '2024-01-23', time: '10:30 AM', available: true, timezone: 'EST' },
    { id: '7', date: '2024-01-23', time: '01:00 PM', available: true, timezone: 'EST' },
    { id: '8', date: '2024-01-23', time: '03:30 PM', available: false, timezone: 'EST' },
    { id: '9', date: '2024-01-24', time: '09:00 AM', available: true, timezone: 'EST' },
    { id: '10', date: '2024-01-24', time: '11:00 AM', available: true, timezone: 'EST' },
  ]

  const projectTypes = [
    'Web Application',
    'Mobile App Development',
    'E-commerce Platform',
    'Custom Software',
    'API Development',
    'UI/UX Design',
    'Consulting/Code Review',
    'Not Sure Yet'
  ]

  const timezones = [
    'EST (Eastern Standard Time)',
    'CST (Central Standard Time)',
    'MST (Mountain Standard Time)',
    'PST (Pacific Standard Time)',
    'GMT (Greenwich Mean Time)',
    'CET (Central European Time)'
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const groupSlotsByDate = () => {
    const grouped = timeSlots.reduce((acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = []
      }
      acc[slot.date].push(slot)
      return acc
    }, {} as Record<string, TimeSlot[]>)
    return grouped
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('calendar')
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    if (!slot.available) return
    setSelectedSlot(slot)
  }

  const handleBooking = () => {
    // In real app, this would make an API call to book the appointment
    setStep('confirmation')
  }

  const renderForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <User className="w-6 h-6 mr-3 text-accent" />
          Schedule Your Free Consultation
        </CardTitle>
        <CardDescription>
          Let's discuss your project and how we can help bring your vision to life.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email" className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="projectType">Project Type</Label>
              <Select value={formData.projectType} onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Your Timezone</Label>
              <Select value={formData.timezone} onValueChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="callType">Call Type</Label>
            <Select value={formData.callType} onValueChange={(value) => setFormData(prev => ({ ...prev, callType: value }))}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Call (Recommended)</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Tell us about your project (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of what you'd like to discuss..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="mt-2"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Continue to Calendar
            <Calendar className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )

  const renderCalendar = () => {
    const groupedSlots = groupSlotsByDate()

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Calendar className="w-6 h-6 mr-3 text-accent" />
              Choose Your Time Slot
            </CardTitle>
            <CardDescription>
              Select an available time for your 30-minute consultation call.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {Object.entries(groupedSlots).map(([date, slots]) => (
                <div key={date}>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    {formatDate(date)}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {slots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={selectedSlot?.id === slot.id ? 'default' : 'outline'}
                        className={`justify-center ${
                          !slot.available 
                            ? 'opacity-50 cursor-not-allowed' 
                            : selectedSlot?.id === slot.id
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                        onClick={() => handleSlotSelect(slot)}
                        disabled={!slot.available}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedSlot && (
              <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <h4 className="font-semibold text-foreground mb-2">Selected Appointment:</h4>
                <p className="text-muted-foreground">
                  {formatDate(selectedSlot.date)} at {selectedSlot.time} ({selectedSlot.timezone})
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Duration: 30 minutes • Type: {formData.callType === 'video' ? 'Video' : 'Phone'} call
                </p>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setStep('form')}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Form
              </Button>
              <Button
                onClick={handleBooking}
                disabled={!selectedSlot}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Book Appointment
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderConfirmation = () => (
    <Card className="text-center">
      <CardContent className="py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Appointment Confirmed!
        </h3>
        
        {selectedSlot && (
          <div className="bg-muted/50 rounded-lg p-6 mb-6 max-w-md mx-auto">
            <h4 className="font-semibold text-foreground mb-3">Your Consultation Details:</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(selectedSlot.date)}
              </div>
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2" />
                {selectedSlot.time} ({selectedSlot.timezone})
              </div>
              <div className="flex items-center justify-center">
                <Video className="w-4 h-4 mr-2" />
                {formData.callType === 'video' ? 'Video Call' : 'Phone Call'}
              </div>
            </div>
          </div>
        )}
        
        <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto">
          We've sent a calendar invitation to <strong>{formData.email}</strong> with all the details. 
          Our team will reach out 15 minutes before the call to confirm everything is ready.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => {
              setStep('form')
              setSelectedSlot(null)
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                projectType: '',
                description: '',
                callType: 'video',
                timezone: ''
              })
            }}
            variant="outline"
          >
            Schedule Another Call
          </Button>
          <Button 
            onClick={onBack}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Explore Other Options
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-accent hover:text-accent-foreground mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Options
        </Button>
        <h2 className="text-3xl font-bold text-foreground">Schedule Free Consultation</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center space-x-4 mb-8">
          {['form', 'calendar', 'confirmation'].map((s, index) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s 
                  ? 'bg-accent text-accent-foreground' 
                  : index < ['form', 'calendar', 'confirmation'].indexOf(step)
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {index < ['form', 'calendar', 'confirmation'].indexOf(step) ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < 2 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  index < ['form', 'calendar', 'confirmation'].indexOf(step)
                    ? 'bg-green-500'
                    : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {step === 'form' && renderForm()}
      {step === 'calendar' && renderCalendar()}
      {step === 'confirmation' && renderConfirmation()}
    </div>
  )
}