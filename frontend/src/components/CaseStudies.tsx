import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ExternalLink, Play, Star, TrendingUp, Users, Zap, Award } from 'lucide-react'

interface CaseStudiesProps {
  onBack: () => void
}

interface CaseStudy {
  id: string
  title: string
  client: string
  category: string
  description: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  timeline: string
  teamSize: string
  image: string
  testimonial: {
    quote: string
    author: string
    position: string
  }
  metrics: {
    label: string
    value: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export default function CaseStudies({ onBack }: CaseStudiesProps) {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'E-commerce Platform Revolution',
      client: 'FashionForward Inc.',
      category: 'E-commerce',
      description: 'Complete digital transformation of a traditional retail business into a modern e-commerce powerhouse.',
      challenge: 'Client needed to rapidly transition from brick-and-mortar retail to online sales during market disruption, requiring a scalable platform that could handle high traffic and complex inventory management.',
      solution: 'Built a custom e-commerce platform with advanced inventory management, AI-powered recommendations, and seamless mobile experience. Integrated with existing POS systems and implemented automated marketing workflows.',
      results: [
        '300% increase in online sales within 6 months',
        '150% improvement in customer retention',
        '45% reduction in cart abandonment',
        '99.9% uptime during peak shopping seasons'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Redis'],
      timeline: '4 months',
      teamSize: '5 developers',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      testimonial: {
        quote: 'TeamElevateX transformed our business completely. Their platform not only saved us during the pandemic but positioned us for future growth.',
        author: 'Sarah Johnson',
        position: 'CEO, FashionForward Inc.'
      },
      metrics: [
        { label: 'Sales Growth', value: '+300%', icon: TrendingUp },
        { label: 'Users', value: '50K+', icon: Users },
        { label: 'Performance', value: '99.9%', icon: Zap }
      ]
    },
    {
      id: '2',
      title: 'HealthTech Mobile Revolution',
      client: 'MediConnect',
      category: 'Healthcare',
      description: 'Cross-platform mobile app connecting patients with healthcare providers through telemedicine.',
      challenge: 'Healthcare provider needed HIPAA-compliant mobile solution for virtual consultations, patient records management, and prescription handling during telehealth boom.',
      solution: 'Developed secure, HIPAA-compliant mobile app with video consultations, encrypted messaging, digital prescriptions, and integration with Electronic Health Records (EHR) systems.',
      results: [
        '100,000+ active users within first year',
        '95% patient satisfaction rating',
        '60% reduction in no-show appointments',
        'HIPAA compliance certification achieved'
      ],
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS', 'Socket.io'],
      timeline: '6 months',
      teamSize: '7 developers',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      testimonial: {
        quote: 'The app has revolutionized how we deliver healthcare. Patients love the convenience and we\'ve seen incredible engagement.',
        author: 'Dr. Michael Chen',
        position: 'Chief Medical Officer, MediConnect'
      },
      metrics: [
        { label: 'Active Users', value: '100K+', icon: Users },
        { label: 'Satisfaction', value: '95%', icon: Star },
        { label: 'Compliance', value: 'HIPAA', icon: Award }
      ]
    },
    {
      id: '3',
      title: 'FinTech Payment Revolution',
      client: 'PaySecure',
      category: 'FinTech',
      description: 'Next-generation payment processing platform with advanced fraud detection and multi-currency support.',
      challenge: 'Financial services company needed secure, scalable payment infrastructure that could handle international transactions while maintaining PCI compliance and preventing fraud.',
      solution: 'Built enterprise-grade payment platform with machine learning fraud detection, real-time transaction processing, multi-currency support, and comprehensive API for third-party integrations.',
      results: [
        '$10M+ in transactions processed monthly',
        '99.99% fraud detection accuracy',
        '0.01% payment failure rate',
        'PCI DSS Level 1 compliance achieved'
      ],
      technologies: ['React', 'Go', 'PostgreSQL', 'Redis', 'Kubernetes', 'TensorFlow'],
      timeline: '8 months',
      teamSize: '10 developers',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      testimonial: {
        quote: 'TeamElevateX built us a payment platform that not only meets today\'s needs but scales for the future. Their expertise in security is unmatched.',
        author: 'Jennifer Williams',
        position: 'CTO, PaySecure'
      },
      metrics: [
        { label: 'Monthly Volume', value: '$10M+', icon: TrendingUp },
        { label: 'Accuracy', value: '99.99%', icon: Award },
        { label: 'Uptime', value: '99.9%', icon: Zap }
      ]
    }
  ]

  if (selectedCase) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedCase(null)}
            className="text-accent hover:text-accent-foreground mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Button>
          <h2 className="text-3xl font-bold text-foreground">Case Study Details</h2>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
            <img 
              src={selectedCase.image} 
              alt={selectedCase.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <Badge className="mb-3 bg-accent text-accent-foreground">
                {selectedCase.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {selectedCase.title}
              </h1>
              <p className="text-xl opacity-90">{selectedCase.client}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedCase.metrics.map((metric, index) => {
              const IconComponent = metric.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <IconComponent className="w-8 h-8 text-accent mx-auto mb-3" />
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Details */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedCase.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Timeline:</span>
                      <div className="text-muted-foreground">{selectedCase.timeline}</div>
                    </div>
                    <div>
                      <span className="font-medium">Team Size:</span>
                      <div className="text-muted-foreground">{selectedCase.teamSize}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>The Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedCase.challenge}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedCase.solution}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Results & Technologies */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Results Achieved</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedCase.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-4 h-4 text-accent mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Testimonial</CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground leading-relaxed italic mb-4">
                    "{selectedCase.testimonial.quote}"
                  </blockquote>
                  <div className="font-medium text-foreground">
                    {selectedCase.testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedCase.testimonial.position}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Start Your Success Story?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let's discuss how we can help transform your business with custom development solutions 
                tailored to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start Your Project
                </Button>
                <Button size="lg" variant="outline">
                  View More Case Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-accent hover:text-accent-foreground mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Options
        </Button>
        <h2 className="text-3xl font-bold text-foreground">Success Stories</h2>
      </div>

      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Real Projects, Real Results
        </h3>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Explore how we've helped businesses transform their digital presence and achieve 
          remarkable growth through innovative development solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((study, index) => (
          <Card 
            key={study.id}
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-accent overflow-hidden"
            onClick={() => setSelectedCase(study)}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={study.image} 
                alt={study.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-accent text-accent-foreground">
                  {study.category}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">
                {study.title}
              </CardTitle>
              <CardDescription className="font-medium">
                {study.client}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                {study.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {study.timeline}
                </span>
                <div className="flex items-center text-accent group-hover:text-accent-foreground font-medium">
                  View Case Study
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-6">
          Want to see more examples of our work?
        </p>
        <Button variant="outline" size="lg">
          <ExternalLink className="w-4 h-4 mr-2" />
          Visit Our Full Portfolio
        </Button>
      </div>
    </div>
  )
}