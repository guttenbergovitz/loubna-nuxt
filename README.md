# Loubna Photo

Modern, elegant photography portfolio website built with **Nuxt 4** (Vue 3, TypeScript). Features a vintage-inspired design, professional bio timeline, workshop offerings, an integrated booking system, and **Nuxt Studio** for content editing.

**URL:** https://loubnaphoto.no

## Tech Stack

- **Nuxt 4** · Vue 3 · TypeScript · Vite
- **@nuxt/content** v3 — schema-typed content collections (bio, quotes, galleries, home sections, singletons)
- **@nuxtjs/i18n** — en/nb with `prefix` strategy
- **nuxt-studio** — content editing UI (GitHub OAuth, publishes to git)
- **PrimeVue** (unstyled) · **FormKit** (forms + zod) · **@nuxt/image** · **@nuxt/icon**
- **nuxt-nodemailer** — contact form email (SMTP)

## Setup

```bash
npm install

# local env (SMTP + Studio auth)
cp .env.example .env
```

Start the dev server:

```bash
npm run dev
```

Open the content editor in dev with the Nuxt Studio button (bottom-left) or `CMD + .`.

## Scripts

| Command            | What it does                           |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Dev server (HMR)                       |
| `npm run build`    | Production SSR build (node output)     |
| `npm run generate` | Static-site generation (legacy)        |
| `npm run preview`  | Preview production build locally       |

## Content Model

Editor-facing content lives in `content/` (organized in collections defined in `content.config.ts`); i18n JSON in `i18n/locales/` keeps UI strings, forms, SEO metadata, and static typographic copy.

- **`highlights` / `education`** — bio timeline entries (per-locale)
- **`quotes`** — rotating photo quotes (per-locale)
- **`partners`** — partners gallery (shared)
- **`galleryImages`** — home + secondary gallery items (grouped `home` / `secondary`)
- **`homeOptions` / `homeFeatures`** — home-page option & feature cards (per-locale)
- **`singletons`** — page singletons: about, workshop, business-gift, contact, book-a-call (per-locale)

## Deployment (Vercel — SSR)

The site deploys as an SSR app (server required for the Studio editor and `/__nuxt_studio/*` auth routes). Vercel auto-detects Nuxt — connect the repository and it will run `npm run build`.

1. **Connect the repo** on Vercel; leave build settings at defaults.
2. **Create a GitHub OAuth App** (GitHub → Settings → Developer settings → OAuth Apps):
   - Homepage URL: `https://loubnaphoto.no`
   - Authorization callback URL: `https://loubnaphoto.no/__nuxt_studio/auth/github`
3. **Set production env vars** on Vercel (Project → Settings → Environment Variables):
   - `STUDIO_GITHUB_CLIENT_ID` and `STUDIO_GITHUB_CLIENT_SECRET` (required for editor login)
   - Recommended: `STUDIO_GITHUB_MODERATORS` — comma-separated GitHub emails allowed to edit (`loubna@example.com`)
   - SMTP vars (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`) + `OWNER_EMAIL` for the contact forms
4. **Deploy.** Log in to the editor at **https://loubnaphoto.no/_studio** — edits are pushed to git (repo: `guttenbergovitz/loubna-nuxt`, branch `main`).

> Studio media uploads are stored in the local `public/` dir and committed with the content.

## Notes

- `experimental.sharedPrerenderData: false` — avoids cross-locale payload collisions during prerender (the i18n `prefix` strategy reuses the same `useAsyncData` keys for `/en` and `/nb` routes). Required for correct `npm run generate` output.
- `studio.repository` is pinned to `github` / `guttenbergovitz` / `loubna-nuxt` / branch `main`.