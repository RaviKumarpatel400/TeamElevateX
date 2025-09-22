import { useState } from 'react'
import { CheckCircle, Users, Lightbulb, Target, ArrowRight, Mail, Github, Linkedin, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { apiRequest } from '@/lib/api'

const benefits = [
  {
    icon: Users,
    title: 'Community Access',
    description: 'Join a vibrant community of developers, designers, and tech enthusiasts from around the world.'
  },
  {
    icon: Lightbulb,
    title: 'Learning Opportunities',
    description: 'Access to exclusive workshops, mentorship programs, and skill development resources.'
  },
  {
    icon: Target,
    title: 'Career Growth',
    description: 'Connect with industry professionals, discover job opportunities, and advance your career.'
  }
]


const JoinUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    experience: '',
    interests: '',
    message: ''
  })

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  const [memberFormData, setMemberFormData] = useState({
    name: '',
    email: '',
    github: '',
    linkedin: '',
    experience: '',
    skills: '',
    interests: '',
    motivation: '',
    availability: ''
  })

  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    github: '',
    linkedin: '',
    experience: '',
    leadershipExperience: '',
    technicalSkills: '',
    mentoringExperience: '',
    projectIdeas: '',
    timeCommitment: '',
    motivation: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleMemberInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMemberFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLeadInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLeadFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Application submitted:', formData)
    // Handle form submission here
    setFormData({
      name: '',
      email: '',
      role: '',
      experience: '',
      interests: '',
      message: ''
    })
  }

  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await apiRequest('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ type: 'member', ...memberFormData }),
    })
    setMemberFormData({
      name: '',
      email: '',
      github: '',
      linkedin: '',
      experience: '',
      skills: '',
      interests: '',
      motivation: '',
      availability: ''
    })
    alert('Thanks! We will get back soon.')
    setIsMemberModalOpen(false)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await apiRequest('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ type: 'lead', ...leadFormData }),
    })
    setLeadFormData({
      name: '',
      email: '',
      github: '',
      linkedin: '',
      experience: '',
      leadershipExperience: '',
      technicalSkills: '',
      mentoringExperience: '',
      projectIdeas: '',
      timeCommitment: '',
      motivation: ''
    })
    alert('Thanks! We will get back soon.')
    setIsLeadModalOpen(false)
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join Our <span className="text-accent">Community</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Become part of a thriving tech community where innovation meets collaboration. 
            Connect, learn, and grow with like-minded professionals.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card key={benefit.title} className="text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Options */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Choose Your Path
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Join as Member Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-purple-500/30 backdrop-blur-lg hover:border-purple-400/60">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">
                    Join as a Member
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Become a Member of TeamElevateX to access exclusive opportunities, 
                    participate in projects, and grow with a vibrant community of developers.
                  </p>
                </div>
                <Button 
                  onClick={() => setIsMemberModalOpen(true)}
                  className="w-full bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Apply as Member
                </Button>
              </CardContent>
            </Card>

            {/* Apply as Lead/Co-Lead Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-purple-500/30 backdrop-blur-lg hover:border-purple-400/60">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">
                    Apply as Lead/Co-Lead
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Take the next step and apply as a Lead/Co-Lead. As a Lead, you'll mentor members, 
                    lead projects, and contribute significantly to our community's success.
                  </p>
                </div>
                <Button 
                  onClick={() => setIsLeadModalOpen(true)}
                  className="w-full bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Apply as Lead/Co-Lead
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Join Section (replaces the old Apply and Get in Touch) */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-0 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl">How to Join</CardTitle>
              <CardDescription>Follow these simple steps to become an active member.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ol className="list-decimal ml-6 space-y-3 text-muted-foreground">
                <li>Explore and attend our Upcoming items on the <strong>Events</strong> page.</li>
                <li>Participate in <strong>Hackathons</strong> and <strong>Workshops</strong> to collaborate and learn.</li>
                <li>Contribute to community initiatives and showcase your work.</li>
                <li>Grow your impact — apply for leadership opportunities when ready.</li>
              </ol>
              <div className="mt-6">
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="/events">Browse Events</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Member Application Modal */}
        <Dialog open={isMemberModalOpen} onOpenChange={setIsMemberModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">Apply as Member</DialogTitle>
              <DialogDescription>
                Join TeamElevateX as a community member. Fill out the form below to get started.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleMemberSubmit} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="member-name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="member-name"
                    name="name"
                    type="text"
                    value={memberFormData.name}
                    onChange={handleMemberInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="member-email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="member-email"
                    name="email"
                    type="email"
                    value={memberFormData.email}
                    onChange={handleMemberInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="member-github" className="block text-sm font-medium text-foreground mb-2">
                    GitHub Profile
                  </label>
                  <Input
                    id="member-github"
                    name="github"
                    type="url"
                    value={memberFormData.github}
                    onChange={handleMemberInputChange}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label htmlFor="member-linkedin" className="block text-sm font-medium text-foreground mb-2">
                    LinkedIn Profile
                  </label>
                  <Input
                    id="member-linkedin"
                    name="linkedin"
                    type="url"
                    value={memberFormData.linkedin}
                    onChange={handleMemberInputChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="member-experience" className="block text-sm font-medium text-foreground mb-2">
                  Years of Experience *
                </label>
                <Input
                  id="member-experience"
                  name="experience"
                  type="text"
                  value={memberFormData.experience}
                  onChange={handleMemberInputChange}
                  required
                  placeholder="e.g., 2-3 years"
                />
              </div>

              <div>
                <label htmlFor="member-skills" className="block text-sm font-medium text-foreground mb-2">
                  Technical Skills *
                </label>
                <Input
                  id="member-skills"
                  name="skills"
                  type="text"
                  value={memberFormData.skills}
                  onChange={handleMemberInputChange}
                  required
                  placeholder="e.g., React, Node.js, Python, etc."
                />
              </div>

              <div>
                <label htmlFor="member-interests" className="block text-sm font-medium text-foreground mb-2">
                  Areas of Interest *
                </label>
                <Input
                  id="member-interests"
                  name="interests"
                  type="text"
                  value={memberFormData.interests}
                  onChange={handleMemberInputChange}
                  required
                  placeholder="e.g., Web Development, AI/ML, Mobile Apps"
                />
              </div>

              <div>
                <label htmlFor="member-availability" className="block text-sm font-medium text-foreground mb-2">
                  Availability (hours per week) *
                </label>
                <Input
                  id="member-availability"
                  name="availability"
                  type="text"
                  value={memberFormData.availability}
                  onChange={handleMemberInputChange}
                  required
                  placeholder="e.g., 5-10 hours per week"
                />
              </div>

              <div>
                <label htmlFor="member-motivation" className="block text-sm font-medium text-foreground mb-2">
                  Why do you want to join TeamElevateX? *
                </label>
                <Textarea
                  id="member-motivation"
                  name="motivation"
                  value={memberFormData.motivation}
                  onChange={handleMemberInputChange}
                  required
                  className="min-h-[120px]"
                  placeholder="Tell us about your goals and what you hope to achieve..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsMemberModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Submit Application
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Lead Application Modal */}
        <Dialog open={isLeadModalOpen} onOpenChange={setIsLeadModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">Apply as Lead/Co-Lead</DialogTitle>
              <DialogDescription>
                Take on a leadership role in TeamElevateX. Lead projects, mentor members, and shape our community.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleLeadSubmit} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="lead-name"
                    name="name"
                    type="text"
                    value={leadFormData.name}
                    onChange={handleLeadInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="lead-email"
                    name="email"
                    type="email"
                    value={leadFormData.email}
                    onChange={handleLeadInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-github" className="block text-sm font-medium text-foreground mb-2">
                    GitHub Profile *
                  </label>
                  <Input
                    id="lead-github"
                    name="github"
                    type="url"
                    value={leadFormData.github}
                    onChange={handleLeadInputChange}
                    required
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label htmlFor="lead-linkedin" className="block text-sm font-medium text-foreground mb-2">
                    LinkedIn Profile *
                  </label>
                  <Input
                    id="lead-linkedin"
                    name="linkedin"
                    type="url"
                    value={leadFormData.linkedin}
                    onChange={handleLeadInputChange}
                    required
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-experience" className="block text-sm font-medium text-foreground mb-2">
                  Years of Professional Experience *
                </label>
                <Input
                  id="lead-experience"
                  name="experience"
                  type="text"
                  value={leadFormData.experience}
                  onChange={handleLeadInputChange}
                  required
                  placeholder="e.g., 5+ years"
                />
              </div>

              <div>
                <label htmlFor="lead-leadership" className="block text-sm font-medium text-foreground mb-2">
                  Leadership Experience *
                </label>
                <Textarea
                  id="lead-leadership"
                  name="leadershipExperience"
                  value={leadFormData.leadershipExperience}
                  onChange={handleLeadInputChange}
                  required
                  className="min-h-[100px]"
                  placeholder="Describe your leadership experience, team management, or project leadership..."
                />
              </div>

              <div>
                <label htmlFor="lead-technical" className="block text-sm font-medium text-foreground mb-2">
                  Technical Expertise *
                </label>
                <Textarea
                  id="lead-technical"
                  name="technicalSkills"
                  value={leadFormData.technicalSkills}
                  onChange={handleLeadInputChange}
                  required
                  className="min-h-[100px]"
                  placeholder="List your technical skills, technologies you're expert in, and areas of specialization..."
                />
              </div>

              <div>
                <label htmlFor="lead-mentoring" className="block text-sm font-medium text-foreground mb-2">
                  Mentoring Experience *
                </label>
                <Textarea
                  id="lead-mentoring"
                  name="mentoringExperience"
                  value={leadFormData.mentoringExperience}
                  onChange={handleLeadInputChange}
                  required
                  className="min-h-[100px]"
                  placeholder="Describe your experience mentoring others, teaching, or helping developers grow..."
                />
              </div>

              <div>
                <label htmlFor="lead-projects" className="block text-sm font-medium text-foreground mb-2">
                  Project Ideas *
                </label>
                <Textarea
                  id="lead-projects"
                  name="projectIdeas"
                  value={leadFormData.projectIdeas}
                  onChange={handleLeadInputChange}
                  required
                  className="min-h-[100px]"
                  placeholder="What projects or initiatives would you like to lead? Describe your vision..."
                />
              </div>

              <div>
                <label htmlFor="lead-time" className="block text-sm font-medium text-foreground mb-2">
                  Time Commitment *
                </label>
                <Input
                  id="lead-time"
                  name="timeCommitment"
                  type="text"
                  value={leadFormData.timeCommitment}
                  onChange={handleLeadInputChange}
                  required
                  placeholder="e.g., 10-15 hours per week"
                />
              </div>

              <div>
                <label htmlFor="lead-motivation" className="block text-sm font-medium text-foreground mb-2">
                  Why do you want to be a Lead/Co-Lead? *
                </label>
                <Textarea
                  id="lead-motivation"
                  name="motivation"
                  value={leadFormData.motivation}
                  onChange={handleLeadInputChange}
                  required
                  className="min-h-[120px]"
                  placeholder="Explain your motivation for taking on a leadership role and how you'll contribute to the community..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsLeadModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Submit Application
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default JoinUsPage
