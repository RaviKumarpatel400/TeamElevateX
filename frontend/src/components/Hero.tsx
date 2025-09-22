import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

// Option 1: Sliding Grid Lines
const SlidingGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted-foreground/20" />
      
      {/* Animated sliding grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'slideGrid 15s linear infinite'
        }}
      />
      
      {/* Secondary offset grid */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          animation: 'slideGridReverse 20s linear infinite'
        }}
      />
    </div>
  )
}

// Option 2: Pulsing Grid
const PulsingGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted-foreground/20" />
      
      {/* Main pulsing grid */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.6) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.6) 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px',
          animation: 'pulseGrid 4s ease-in-out infinite'
        }}
      />
      
      {/* Smaller accent grid */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(147, 51, 234, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(147, 51, 234, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          animation: 'pulseGridSub 3s ease-in-out infinite reverse'
        }}
      />
    </div>
  )
}

// Option 3: Diagonal Moving Grid
const DiagonalGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted-foreground/20" />
      
      {/* Diagonal moving grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'moveDiagonal 12s linear infinite'
        }}
      />
      
      {/* Counter diagonal grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(-135deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px',
          animation: 'moveDiagonalReverse 8s linear infinite'
        }}
      />
    </div>
  )
}

// Option 4: Zoom Grid Animation
const ZoomGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted-foreground/20" />
      
      {/* Zooming grid effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          animation: 'zoomGrid 8s ease-in-out infinite'
        }}
      />
      
      {/* Secondary zoom grid */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(168, 85, 247, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 85, 247, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: 'center center',
          animation: 'zoomGridReverse 6s ease-in-out infinite'
        }}
      />
    </div>
  )
}

// Option 5: Glitch Grid Effect
const GlitchGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted-foreground/20" />
      
      {/* Main glitch grid */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'glitchGrid 0.3s infinite linear'
        }}
      />
      
      {/* Glitch overlay */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 0, 100, 0.4) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(255, 0, 100, 0.4) 2px, transparent 2px)
          `,
          backgroundSize: '30px 30px',
          animation: 'glitchGridOffset 0.2s infinite linear reverse'
        }}
      />
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

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

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Choose one of these grid backgrounds */}
      <SlidingGridBackground />
      {/* <PulsingGridBackground /> */}
      {/* <DiagonalGridBackground /> */}
      {/* <ZoomGridBackground /> */}
      {/* <GlitchGridBackground /> */}
      
      {/* Content */}
      <div 
        ref={heroRef}
        className="container mx-auto px-6 text-center z-10 reveal"
      >
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-text-glow bg-size-200">
              TeamElevateX
            </span>
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl md:text-4xl font-bold text-accent mb-8 animate-fade-in-dark">
            Professional Web & Mobile Development
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up-dark">
            We create stunning, high-performance web applications and mobile apps that elevate your business. 
            From concept to deployment, we deliver innovative solutions tailored to your needs.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-dark">
            <Button 
              size="lg" 
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Start Your Project
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105"
            >
              View Our Work
            </Button>
          </div>
          
          {/* Tech badges */}
          <div className="mt-16 animate-slide-up-dark">
            <p className="text-sm text-muted-foreground mb-4">Trusted Technologies</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['React', 'React Native', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'].map((tech) => (
                <span 
                  key={tech} 
                  className="px-4 py-2 bg-muted/60 border border-border rounded-full text-sm font-medium text-muted-foreground hover:bg-cyan-500 hover:text-black transition-colors duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group">
        <div className="w-6 h-10 border-2 border-cyan-400/60 rounded-full flex justify-center group-hover:border-cyan-300 transition-colors">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse group-hover:bg-blue-400 transition-colors"></div>
        </div>
      </div>
    </section>
  )
}
