/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// Vitest blanks CSS imports, so read the stylesheet from disk.
const css = readFileSync(new URL('./index.css', import.meta.url), 'utf8')

describe('styles', () => {
  // Tailwind v4 leaves buttons with the default arrow cursor; tabs and copy buttons should show the hand.
  it('gives enabled buttons the pointer cursor', () => {
    expect(css).toMatch(/button:not\(:disabled\)[^{]*\{[^}]*cursor:\s*pointer/)
  })
})
