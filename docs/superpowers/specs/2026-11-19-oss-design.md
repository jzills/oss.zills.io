# oss.zills.io: design

## Intent

A catalogue of Joshua Zillwood's open-source work, so j.zills.io can stay career-focused and link out here for the rest. It's the OSS panel's destination on zills.io. Visitors are clients and peers judging whether the tools are solid, and developers who want to install one. Success: someone sees what each tool does at a glance and can copy its install command in one tap.

## Approaches

- **A. Catalogue only (chosen):** one page; each project links to its GitHub repo and its existing docs site (served at j.zills.io/<repo>/). Quick, fits the family.
- **B. Catalogue plus docs home:** move each docs site under oss.zills.io/<project>/. More cohesive, but every docs repo's Pages setup changes and old links need redirects. Kept as a later option.

## Goals

- One prerendered page, in the family look: dark zinc, Inter and JetBrains Mono, OSS accent cyan `#22d3ee`, the faint texture, the shared footer ("Z/LLS | zills.io ↗", "© <build year> Joshua Zillwood").
- Hero: a giant **OSS.** wordmark with a cyan dot (no header, like the Lab's home), the line "Open-source libraries and tools for .NET, Go, Kubernetes and AI agents.", a mono count line, and a GitHub link.
- **Flagship** cards for hmac-manager, kx, action-cache and snoop: what it does, a registry switcher (NuGet, npm, Docker, Helm, PyPI, Krew, Homebrew) showing that registry's install command with a copy button, and Docs ↗ / GitHub ↗ links.
- Compact rows for the rest, grouped: **Libraries** (Serilog SignalR sink, SwaggerUIAuthorization), **API clients** (Freesound, BBC Sound Effects, xeno-canto, Internet Archive), **Tooling** (claude-marketplace). Each with its install command and a GitHub link.

## Non-goals and anti-goals

- No per-project pages (docs sites exist), no search, no star counts (the highest is 7; showing them undersells the work), no live GitHub API calls.
- Not listed: the website repos, the GitHub profile repo, homebrew-tap (it appears as the Homebrew install commands instead).
- No gimmicks; motion is one entrance and hover states. Everything readable without JavaScript.

## Claude's calls

- Project data is hand-written in `src/data/projects.ts` (descriptions tightened from j.zills.io's).
- The install switcher prerenders the first registry; copying uses the Clipboard API and confirms in place.
- Hover follows the family rule (`public/pointer-init.js`, `data-pointer=mouse`).
- Afterwards: zills.io's OSS panel and an "All open source →" link on j.zills.io's Projects section point here.
