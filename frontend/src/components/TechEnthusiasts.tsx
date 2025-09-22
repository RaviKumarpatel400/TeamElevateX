import { Cpu, Sparkles, Globe2, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const traits = [
  {
    icon: Sparkles,
    title: 'Curious & Creative',
    description: 'We explore new ideas, prototype fast, and celebrate learning.'
  },
  {
    icon: Cpu,
    title: 'Pragmatic Builders',
    description: 'We ship reliable software with focus on clarity and DX.'
  },
  {
    icon: Globe2,
    title: 'Global by Default',
    description: 'Remote‑first culture with members contributing from everywhere.'
  },
  {
    icon: ShieldCheck,
    title: 'Kind & Responsible',
    description: 'We mentor, uplift, and practice responsible tech.'
  }
]

export default function TechEnthusiasts() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Tech Enthusiasts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
            A community of doers who love building, sharing knowledge, and
            pushing boundaries together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {traits.map((t) => (
            <Card key={t.title} className="group bg-card border-border transition-all duration-300 hover:shadow-xl hover:border-accent/40 hover:bg-accent/5 active:scale-[0.98]">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <t.icon className="w-6 h-6" />
                </div>
                <CardTitle className="mt-3 text-xl text-card-foreground transition-colors duration-300 group-hover:text-accent">{t.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{t.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


