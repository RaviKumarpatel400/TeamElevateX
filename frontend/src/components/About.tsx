import { useEffect, useRef } from 'react'
import { CheckCircle, Target, Users, Lightbulb } from 'lucide-react'

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null)

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

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We focus on delivering solutions that align with your business goals and drive real results.'
    },
    {
      icon: Users,
      title: 'Collaborative Approach', 
      description: 'We work closely with our clients, ensuring transparent communication throughout the project.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We leverage cutting-edge technologies and best practices to create future-proof solutions.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assured',
      description: 'Every project undergoes rigorous testing and code review to ensure the highest quality standards.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-accent">TeamElevateX</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are a passionate team of developers, designers, and strategists dedicated to 
            transforming your digital vision into reality through innovative web and mobile solutions.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Text Content */}
          <div className="reveal">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Elevating Businesses Through Technology
            </h3>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Founded on the principle that great technology should be accessible to businesses of all sizes, 
                TeamElevateX has been at the forefront of digital innovation, helping companies transform 
                their operations and reach new heights.
              </p>
              <p className="text-lg leading-relaxed">
                Our multidisciplinary team brings together years of experience in web development, 
                mobile app creation, and digital strategy. We don't just build applications – 
                we craft digital experiences that engage users and drive business growth.
              </p>
              <p className="text-lg leading-relaxed">
                From startups to established enterprises, we've partnered with diverse organizations 
                to deliver scalable, robust, and user-friendly solutions that stand the test of time.
              </p>
            </div>
          </div>

          {/* Right Column - Stats/Highlights */}
          <div className="reveal">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center group">
                  <div className="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                  <div className="text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                  <div className="text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">3+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-muted-foreground">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="reveal">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
