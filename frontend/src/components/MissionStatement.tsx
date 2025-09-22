export default function MissionStatement() {
  return (
    <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              TeamElevateX Mission Statement
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We empower builders to learn, collaborate, and ship impactful products.
              Our mission is to elevate developers at every stage by fostering an
              inclusive community, providing world‑class resources, and championing
              open‑source innovation.
            </p>
          </div>
          <div>
            <div className="rounded-2xl border border-border p-6 bg-card shadow-sm">
              <ul className="space-y-3 text-card-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>Accessibility to knowledge and mentorship for everyone.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>Community‑driven projects that create real‑world value.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>Ethical, sustainable tech that benefits the broader ecosystem.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


