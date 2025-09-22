import { Brain, Cpu, Zap, Target, Lightbulb, Rocket } from 'lucide-react'

const aiFeatures = [
  {
    icon: Brain,
    title: 'AI-Powered Solutions',
    description: 'Intelligent automation and machine learning integration',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Cpu,
    title: 'Smart Analytics',
    description: 'Real-time data processing and predictive insights',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with cutting-edge technology',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Target,
    title: 'Precision Focus',
    description: 'Targeted solutions for specific business needs',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Hub',
    description: 'Creative problem-solving and breakthrough ideas',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Rocket,
    title: 'Future Ready',
    description: 'Scalable architecture for tomorrow\'s challenges',
    gradient: 'from-red-500 to-pink-500'
  }
]

export default function Innovation() {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/10 to-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Innovation in <span className="text-accent">AI Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Harnessing the power of artificial intelligence to create intelligent, 
            adaptive solutions that transform how businesses operate and grow.
          </p>
        </div>

        {/* Moving AI Features Row */}
        <div className="relative">
          {/* First Row - Moving Right */}
          <div className="flex animate-scroll-right mb-8">
            {[...aiFeatures, ...aiFeatures].map((feature, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 mx-4 group"
              >
                <div className="w-80 h-48 bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - Moving Left */}
          <div className="flex animate-scroll-left">
            {[...aiFeatures.reverse(), ...aiFeatures].map((feature, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 mx-4 group"
              >
                <div className="w-80 h-48 bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Innovate with AI?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's explore how artificial intelligence can revolutionize your business processes and unlock new possibilities.
            </p>
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Explore AI Solutions
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
