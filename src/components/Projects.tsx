import type { Ref } from 'react'
import { Install } from '@/components/Install'
import type { Project } from '@/data/projects'

const linkClass = 'font-mono text-[11px] text-muted transition-colors hover:text-fg'

// Stretched-link pattern, as on j.zills.io's project cards: the card's destination
// (its docs, or GitHub when it has none) spreads its ::after over the whole card, so
// the card is one link without nesting anchors. It must stay unpositioned so inset-0
// resolves against the card; everything else interactive is raised above it.
const stretchClass = 'after:absolute after:inset-0 after:z-10'
const raisedClass = 'relative z-20'

function Links({ project, card = false, lit = false }: { project: Project; card?: boolean; lit?: boolean }) {
  const destination = project.docsUrl ?? project.githubUrl
  const cls = (href: string) => {
    if (!card) return linkClass
    if (href !== destination) return `${linkClass} ${raisedClass}`
    // The destination lights up while the card is hovered, or centred on a phone.
    return `font-mono text-[11px] transition-colors group-hover:text-fg ${lit ? 'text-fg' : 'text-muted'} ${stretchClass}`
  }
  return (
    <div className="flex gap-4">
      {project.docsUrl && (
        <a href={project.docsUrl} target="_blank" rel="noopener noreferrer" className={cls(project.docsUrl)}>
          Docs <span aria-hidden="true">↗</span>
        </a>
      )}
      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={cls(project.githubUrl)}>
        GitHub <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.06em] text-muted uppercase">
      {[project.language, ...project.tags].join(' · ')}
    </p>
  )
}

// A flagship tool: a card with room for its description and registry switch. It lifts
// and lights up on hover; on phones, where cards stack, the one in the middle of the
// screen (`active`) takes that look instead, since touch has no hover (as on j.zills.io).
export function ProjectCard({ project, active = false, ref }: { project: Project; active?: boolean; ref?: Ref<HTMLElement> }) {
  return (
    <article
      ref={ref}
      className={`rise group relative flex flex-col gap-4 rounded-md border bg-surface p-5 transition-[translate,scale,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:ring-1 hover:ring-accent/15 sm:p-6 ${
        active ? 'scale-[1.03] border-accent/40 ring-1 ring-accent/15 motion-reduce:scale-100' : 'border-border'
      }`}
    >
      <div>
        <h3 className="text-xl font-bold tracking-[-0.02em] text-fg">{project.name}</h3>
        <div className="mt-1.5">
          <Meta project={project} />
        </div>
      </div>
      <p className="flex-1 text-[15px] leading-relaxed text-zinc-300">{project.description}</p>
      <Install name={project.name} installs={project.installs} />
      <Links project={project} card lit={active} />
    </article>
  )
}

// Everything else: a compact row, name and description at left, install at right.
export function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="rise grid grid-cols-[minmax(0,1fr)] gap-3 border-t border-border py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:gap-10">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-base font-semibold text-fg">{project.name}</h3>
          <Meta project={project} />
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{project.description}</p>
        <div className="mt-2.5">
          <Links project={project} />
        </div>
      </div>
      <Install name={project.name} installs={project.installs} />
    </li>
  )
}
