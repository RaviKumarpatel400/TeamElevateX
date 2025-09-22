import { useEffect } from 'react'
import { Code, Smartphone, Settings, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Services() {
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

    const reveals = document.querySelectorAll('.reveal')
    reveals.forEach((reveal) => observer.observe(reveal))

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: Code,
      title: 'Custom Web Development',
      description: 'Full-stack web applications built with modern frameworks and technologies.',
      features: [
        'React & Next.js Applications',
        'Node.js & Express Backend',
        'Database Design & Integration',
        'API Development & Integration',
        'Performance Optimization',
        'SEO & Analytics Implementation'
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: [
        'React Native Development',
        'iOS Native Development',
        'Android Native Development',
        'App Store Optimization',
        'Push Notifications',
        'Offline Data Synchronization'
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Settings,
      title: 'Project Support & Guidance',
      description: 'Consulting services to help optimize your existing projects and workflows.',
      features: [
        'Code Review & Auditing',
        'Architecture Planning',
        'Technology Stack Consultation',
        'Performance Analysis',
        'Security Assessment',
        'Team Training & Mentoring'
      ],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Seamless integration with your existing team and development processes.',
      features: [
        'Agile Development Process',
        'Regular Progress Updates',
        'Code Documentation',
        'Version Control Management',
        'CI/CD Pipeline Setup',
        'Post-Launch Support'
      ],
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-accent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive development services designed to bring your digital vision to life 
            with cutting-edge technology and expert craftsmanship.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] reveal bg-card border-border overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Header with 3D hover effect */}
              <CardHeader className="relative overflow-hidden">
                <div className="flex items-center space-x-4 relative z-10">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
                
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </CardHeader>

              <CardContent className="relative">
                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors duration-300 group-hover:translate-x-1"
                      style={{ transitionDelay: `${featureIndex * 50}ms` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm text-muted-foreground font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action area */}
                <div className="mt-6 pt-4 border-t border-border">
                  <button className="text-accent hover:text-accent/80 font-semibold text-sm flex items-center space-x-2 transition-colors duration-300 group-hover:translate-x-2">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 reveal">
          <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your vision to life with our expertise and passion for innovation.
            </p>
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}