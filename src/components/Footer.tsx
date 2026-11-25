// Every zills site's footer: the z.//s mark (its dot in the site's colour) beside a link elsewhere in the family
// (here, back to the hub).
export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-6 font-mono text-[11px] text-muted">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-5 sm:px-7">
        <div className="flex items-center gap-2.5">
          {/* Clicking the mark goes to the hub too; the text link beside it is the one keyboards and screen readers get. */}
          <a href="https://zills.io/" tabIndex={-1} aria-hidden="true" className="font-sans text-sm font-extrabold tracking-[-0.03em] text-fg transition-opacity hover:opacity-80">z<span aria-hidden="true" className="mx-[0.05em] inline-block h-[0.17em] w-[0.17em] rounded-full bg-accent" /><span className="mr-[0.08em] font-bold tracking-[-0.12em] opacity-55">//</span>s</a>
          <span aria-hidden="true" className="h-3.5 w-px bg-border" />
          <a href="https://zills.io/" className="transition-colors hover:text-fg">
            zills.io <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
