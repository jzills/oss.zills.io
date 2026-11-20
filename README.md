# oss.zills.io

A catalogue of Joshua Zillwood's open-source libraries and tools, part of the [zills.io](https://zills.io/) family.

- Vite, React 19, TypeScript and Tailwind v4; one page, prerendered at build time.
- Projects live in `src/data/projects.ts`; add one there and it appears in its group.
- `npm run dev`, `npm test`, `npm run lint`, `npm run build`.
- Deploys to GitHub Pages on push to `main` (`.github/workflows/deploy.yml`), served at `oss.zills.io` (`public/CNAME`).

Design: `docs/superpowers/specs/2026-11-19-oss-design.md`.
