import { describe, expect, it } from 'vitest'
import { GROUPS, projects, projectsIn, registries } from './projects'

describe('projects', () => {
  it('has unique names, each linking to its repo under jzills', () => {
    expect(new Set(projects.map((p) => p.name)).size).toBe(projects.length)
    for (const p of projects) expect(p.githubUrl).toBe(`https://github.com/jzills/${p.repo}`)
  })

  it('features the four flagship tools, in order', () => {
    expect(projectsIn('flagship').map((p) => p.name)).toEqual(['hmac-manager', 'kx', 'action-cache', 'snoop'])
  })

  it('gives every flagship tool its docs site', () => {
    for (const p of projectsIn('flagship')) expect(p.docsUrl).toMatch(/^https:\/\/jzills\.github\.io\/[a-z-]+\/$/)
  })

  it('puts every project in a known group, and every group has projects', () => {
    for (const p of projects) expect(GROUPS.map((g) => g.id)).toContain(p.group)
    for (const g of GROUPS) expect(projectsIn(g.id).length).toBeGreaterThan(0)
  })

  it('gives every project at least one install command, each from a known registry', () => {
    for (const p of projects) {
      expect(p.installs.length).toBeGreaterThan(0)
      for (const i of p.installs) {
        expect(Object.keys(registries)).toContain(i.registry)
        expect(i.command.trim()).not.toBe('')
        expect(i.url).toMatch(/^https:\/\//)
      }
    }
  })

  it('never lists the site repos or the profile and tap repos', () => {
    const repos = projects.map((p) => p.repo)
    for (const r of ['zills.io', 'lab.zills.io', 'jzills.github.io', 'jzills', 'homebrew-tap']) expect(repos).not.toContain(r)
  })
})
