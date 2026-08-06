# faizanans.github.io

Personal site — React + TypeScript + Vite, deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
```

## Editing content

All copy lives in [`src/data/profile.ts`](src/data/profile.ts) — roles, projects,
skills, stats, and the rotating hero headlines. Components read from it, so
adding a job or a project means editing that one file, not the markup.

Adding a section also means adding it to `navSections`; the sticky nav and its
scroll-spy are generated from that array, and each section element needs a
matching `id`.

## Deploying

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes `dist/`.

This requires **Settings → Pages → Build and deployment → Source: GitHub Actions**
(rather than "Deploy from a branch"). It's a one-time switch.

## Assets

Static files live in `public/` and are served from the site root:

- `public/documents/Faizan-Ansari-Resume.pdf`
- `public/projects/quickmsg/video/demo.mp4` + `poster.jpg`

The demo video is ~51 MB. It's loaded with `preload="none"` behind a poster
image, so visitors only download it if they press play.
