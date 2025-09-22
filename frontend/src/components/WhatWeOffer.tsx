import { Rocket, GitFork, Users, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

type Feature = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  accent?: boolean
}

const features: Feature[] = [
  {
    icon: GitFork,
    title: 'Open Source Contributions',
    description:
      'Contribute to impactful open‑source projects and collaborate with developers worldwide.'
  },
  {
    icon: Rocket,
    title: 'Hackathons & Events',
    description:
      'Participate in exciting hackathons, workshops, and meetups to sharpen your skills.',
    accent: true
  },
  {
    icon: Users,
    title: 'Developer Networking',
    description:
      'Connect with like‑minded developers and expand your professional network.'
  },
  {
    icon: BookOpen,
    title: 'Learn & Grow',
    description:
      'Access resources, mentorship, and opportunities to grow as a developer.'
  }
]

export default function WhatWeOffer() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">What We Offer?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={feature.title}
              className={
                feature.accent
                  ? 'group relative overflow-hidden bg-card border-border transition-all duration-300 hover:shadow-2xl hover:border-accent/50 hover:bg-accent/5 active:scale-[0.98]'
                  : 'group bg-card border-border transition-all duration-300 hover:shadow-xl hover:border-accent/40 hover:bg-accent/5 active:scale-[0.98]'
              }
            >
              {feature.accent && (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_0%,_rgba(168,85,247,0.25),_rgba(0,0,0,0)_60%)]" />
              )}
              <CardHeader className="relative">
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="mt-4 text-2xl text-card-foreground transition-colors duration-300 group-hover:text-accent">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-6">
                  <div className="inline-flex items-center gap-2 text-accent font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span>Learn more</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


