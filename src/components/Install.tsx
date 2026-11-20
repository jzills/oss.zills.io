import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Check, Copy } from 'lucide-react'
import { useCopyToClipboard } from '@/lib/useCopyToClipboard'
import { registries } from '@/data/projects'
import type { Install as InstallCommand } from '@/data/projects'

// The copy glyph pops into a check mark and a "Copied!" bubble rises above the
// button, as on j.zills.io's Contact section (CSS here rather than framer-motion).
// Where the clipboard is unavailable, the command is selected for copying by hand.
function CopyButton({ text, label, onFail }: { text: string; label: string; onFail: () => void }) {
  const { copied, copy } = useCopyToClipboard(text, onFail)
  const swap = 'col-start-1 row-start-1 inline-flex transition-[opacity,scale,rotate] duration-200 ease-[cubic-bezier(.3,1.6,.5,1)]'
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy install command for ${label}`}
      title="Copy install command"
      className={`relative grid h-8 w-8 shrink-0 place-items-center rounded border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
        copied ? 'border-accent/60 bg-accent/5 text-accent' : 'border-border bg-surface text-muted hover:border-accent/40 hover:text-fg'
      }`}
    >
      <span className={`${swap} ${copied ? 'scale-30 opacity-0' : 'scale-100 opacity-100'}`}>
        <Copy size={14} aria-hidden="true" />
      </span>
      <span className={`${swap} ${copied ? 'scale-100 rotate-0 opacity-100' : 'scale-30 -rotate-45 opacity-0'}`}>
        <Check size={14} aria-hidden="true" />
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded bg-accent px-2 py-1 font-mono text-xs whitespace-nowrap text-bg transition-[opacity,translate] duration-200 ${
          copied ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'
        }`}
      >
        Copied!
      </span>
      <span className="sr-only" aria-live="polite">{copied ? 'Copied' : ''}</span>
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
  const code = useRef<HTMLElement>(null)
  const selectCommand = () => {
    if (code.current) window.getSelection()?.selectAllChildren(code.current)
  }

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
        className="flex items-center gap-3 rounded border border-border bg-bg/60 py-1.5 pr-1.5 pl-3"
      >
        <pre className="min-w-0 flex-1 overflow-x-auto py-0.5 font-mono text-[12px] leading-relaxed text-fg">
          <code ref={code}>{current.command}</code>
        </pre>
        <CopyButton text={current.command} label={name} onFail={selectCommand} />
      </div>
    </div>
  )
}
