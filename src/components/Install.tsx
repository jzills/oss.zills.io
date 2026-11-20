import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { registries } from '@/data/projects'
import type { Install as InstallCommand } from '@/data/projects'

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const copy = () => {
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(false), 1600)
      },
      () => {},
    )
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy install command for ${label}`}
      className="shrink-0 rounded border border-border px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

// A tool's install command with a copy button. Tools on several registries get a
// tab per registry; the first is selected, and is what the prerendered HTML shows.
export function Install({ name, installs }: { name: string; installs: InstallCommand[] }) {
  const [at, setAt] = useState(0)
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const current = installs[at]

  const onKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (at + step + installs.length) % installs.length
    setAt(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="min-w-0">
      {installs.length > 1 ? (
        <div role="tablist" aria-label={`${name} registries`} onKeyDown={onKey} className="mb-2 flex flex-wrap gap-1">
          {installs.map((i, n) => (
            <button
              key={i.registry}
              ref={(el) => {
                tabs.current[n] = el
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${n}`}
              aria-selected={n === at}
              aria-controls={`${id}-panel`}
              tabIndex={n === at ? 0 : -1}
              onClick={() => setAt(n)}
              className={`rounded px-2 py-0.5 font-mono text-[11px] transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                n === at ? 'bg-accent/15 text-accent' : 'text-muted hover:text-fg'
              }`}
            >
              {registries[i.registry]}
            </button>
          ))}
        </div>
      ) : (
        <a href={current.url} target="_blank" rel="noopener noreferrer" className="mb-2 inline-block font-mono text-[11px] text-muted transition-colors hover:text-fg">
          {registries[current.registry]} <span aria-hidden="true">↗</span>
        </a>
      )}
      <div
        id={`${id}-panel`}
        role={installs.length > 1 ? 'tabpanel' : undefined}
        aria-labelledby={installs.length > 1 ? `${id}-tab-${at}` : undefined}
        className="flex items-start gap-3 rounded border border-border bg-bg/60 py-2 pr-2 pl-3"
      >
        <pre className="min-w-0 flex-1 overflow-x-auto py-0.5 font-mono text-[12px] leading-relaxed text-fg">
          <code>{current.command}</code>
        </pre>
        <CopyButton text={current.command} label={name} />
      </div>
    </div>
  )
}
