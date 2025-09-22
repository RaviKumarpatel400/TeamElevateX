import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, MessageCircle, Calendar, Lightbulb, FileText, Star } from 'lucide-react'
import ConsultationForm from './ConsultationForm'
import AIProjectGenerator from './AIProjectGenerator'
import LiveChat from './LiveChat'
import CaseStudies from './CaseStudies'
import ScheduleCall from './ScheduleCall'

type Section = 'overview' | 'form' | 'ai-generator' | 'chat' | 'case-studies' | 'schedule'

export default function GetStarted() {
  const [activeSection, setActiveSection] = useState<Section>('overview')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const options = [
    {
      id: 'form' as Section,
      icon: FileText,
      title: 'Project Consultation',
      description: 'Fill out a detailed form to help us understand your project requirements',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 hover:bg-blue-500/20'
    },
    {
      id: 'ai-generator' as Section,
      icon: Lightbulb,
      title: 'AI Project Ideas',
      description: 'Get instant project suggestions powered by our AI assistant',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10 hover:bg-purple-500/20'
    },
    {
      id: 'chat' as Section,
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat instantly with our team for quick questions and guidance',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 hover:bg-green-500/20'
    },
    {
      id: 'case-studies' as Section,
      icon: Star,
      title: 'View Case Studies',
      description: 'Explore our past projects and success stories',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10 hover:bg-orange-500/20'
    },
    {
      id: 'schedule' as Section,
      icon: Calendar,
      title: 'Schedule Call',
      description: 'Book a free 30-minute consultation with our experts',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10 hover:bg-teal-500/20'
    }
  ]

  const handleBack = () => {
    setActiveSection('overview')
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'form':
        return <ConsultationForm onBack={handleBack} />
      case 'ai-generator':
        return <AIProjectGenerator onBack={handleBack} />
      case 'chat':
        return <LiveChat onBack={handleBack} />
      case 'case-studies':
        return <CaseStudies onBack={handleBack} />
      case 'schedule':
        return <ScheduleCall onBack={handleBack} />
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {options.map((option, index) => {
              const IconComponent = option.icon
              return (
                <Card 
                  key={option.id}
                  className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl border-2 hover:border-accent transform-gpu ${option.bgColor}`}
                  onClick={() => setActiveSection(option.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 mx-auto rounded-full ${option.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 ${option.color}`} />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {option.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                      {option.description}
                    </CardDescription>
                    <div className="flex items-center justify-center text-accent group-hover:text-accent-foreground font-medium">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )
    }
  }

  return (
    <section id="get-started" className="py-20 bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto px-6">
        <div 
          ref={sectionRef}
          className="reveal max-w-6xl mx-auto"
        >
          {activeSection === 'overview' && (
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Let's Build Something
                <span className="text-accent block md:inline"> Amazing Together</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Choose how you'd like to start your journey with TeamElevateX. 
                We've designed multiple pathways to make it as easy as possible for you to get started.
              </p>
            </div>
          )}
          
          <div className="min-h-[600px]">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </section>
  )
}