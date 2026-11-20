import { Footer } from '@/components/Footer'
import { ProjectCard, ProjectRow } from '@/components/Projects'
import { GROUPS, projects, projectsIn } from '@/data/projects'

function GroupHeading({ id, label, count }: { id: string; label: string; count: number }) {
  return (
    <h2 id={id} className="mb-5 flex items-baseline gap-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
      <span className="text-accent">{label}</span>
      <span>{String(count).padStart(2, '0')}</span>
    </h2>
  )
}

export default function App() {
  const flagship = projectsIn('flagship')
  return (
    <div className="texture relative min-h-dvh">
      <main className="relative mx-auto max-w-[1100px] px-5 sm:px-7">
        {/* No header: like the Lab's home, the hero carries the mark. */}
        <section className="panel-in pt-24 pb-16 sm:pt-32 sm:pb-20">
          <h1 className="text-[5.5rem] leading-[0.9] font-extrabold tracking-[-0.045em] text-fg sm:text-[9rem]">
            OSS<span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
            Open-source libraries and tools for .NET, Go, Kubernetes and AI agents.
          </p>
          <div className="mt-6 space-y-1.5 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
            <p className="flex items-center gap-3">
              <span>{projects.length} projects</span>
              <span aria-hidden="true">·</span>
              <a href="https://github.com/jzills" target="_blank" rel="noopener noreferrer" className="text-accent transition-colors hover:text-fg">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </p>
            <p>NuGet · npm · PyPI · Docker · Helm · Homebrew</p>
          </div>
        </section>

        <section aria-labelledby="flagship" className="pb-16">
          <GroupHeading id="flagship" label={GROUPS[0].label} count={flagship.length} />
          <div className="grid gap-4 md:grid-cols-2">
            {flagship.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </section>

        {GROUPS.slice(1).map((g) => {
          const items = projectsIn(g.id)
          return (
            <section key={g.id} aria-labelledby={g.id} className="pb-14">
              <GroupHeading id={g.id} label={g.label} count={items.length} />
              <ul>
                {items.map((p) => (
                  <ProjectRow key={p.name} project={p} />
                ))}
              </ul>
            </section>
          )
        })}
      </main>
      <Footer />
    </div>
  )
}
