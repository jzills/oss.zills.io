import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import App from './App'
import { GROUPS, projects, projectsIn, registries } from '@/data/projects'

const html = renderToString(<App />)
const text = html.replace(/<[^>]+>/g, '')
// React escapes text, so compare commands as they appear in the markup.
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

describe('the OSS page', () => {
  it('leads with the OSS. wordmark and what the work is', () => {
    expect(html).toMatch(/<h1[^>]*>OSS<span[^>]*>\.<\/span><\/h1>/)
    expect(text).toContain('Open-source libraries and tools for .NET, Go, Kubernetes and AI agents.')
    expect(text).toContain(`${projects.length} projects`)
    expect(html).toContain('href="https://github.com/jzills"')
  })

  it('has no header: the hero carries the mark', () => {
    expect(html).not.toContain('<header')
  })

  it('heads each group in order', () => {
    const at = GROUPS.map((g) => text.indexOf(g.label))
    expect(at.every((i) => i >= 0)).toBe(true)
    expect([...at].sort((a, b) => a - b)).toEqual(at)
  })

  it('links every project to its repo', () => {
    for (const p of projects) expect(html).toContain(`href="${p.githubUrl}"`)
  })

  it('links every flagship tool to its docs', () => {
    for (const p of projectsIn('flagship')) expect(html).toContain(`href="${p.docsUrl}"`)
  })

  it("prerenders every project's first install command", () => {
    for (const p of projects) expect(html).toContain(escape(p.installs[0].command.split('\n')[0]))
  })

  it('offers a registry switch where a tool ships to several', () => {
    const hmac = projects.find((p) => p.name === 'hmac-manager')!
    for (const i of hmac.installs) expect(text).toContain(registries[i.registry])
    expect(html).toContain('role="tablist"')
  })

  it('has a copy button for each install command', () => {
    expect(html.match(/aria-label="Copy install command for [^"]+"/g)).toHaveLength(projects.length)
  })

  it('ends with the family footer', () => {
    expect(html).toContain('href="https://zills.io/"')
    expect(text).toMatch(/© \d{4} Joshua Zillwood/)
  })

  it('never hides content in the prerendered HTML', () => {
    expect(html).not.toMatch(/opacity:\s*0/)
  })

  it('pops a "Copied!" bubble from each copy button, announced politely rather than read twice', () => {
    expect(html.match(/<span[^>]*aria-hidden="true"[^>]*>Copied!<\/span>/g)).toHaveLength(projects.length)
    expect(html.match(/<span class="sr-only" aria-live="polite"><\/span>/g)).toHaveLength(projects.length)
  })

  it('lets every card and row rise in as it scrolls into view', () => {
    expect(html.match(/class="[^"]*\brise\b/g)).toHaveLength(projects.length)
  })

  it('links the footer Z/LLS mark to zills.io', () => {
    expect(html).toMatch(/<a[^>]*href="https:\/\/zills\.io\/"[^>]*>Z<span[^>]*>\/<\/span>LLS<\/a>/)
  })
})
