# Nuxt Content + Studio Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate editable content (bio highlights/education, quotes, partners, and about/workshop/business-gift page copy) from `i18n/locales/*.json` into Nuxt Content v3 collections so it can be edited via Nuxt Studio, keeping design copy, forms, SEO, and navigation in `@nuxtjs/i18n`.

**Architecture:** Hybrid approach. Schema-structured, editor-facing data lives in Nuxt Content v3 **data collections** under `content/`. Each document carries a `locale` field (`en`|`nb`); pages query the collection filtered by the active locale with an English fallback. Home page, SEO metadata, form labels/validation, nav/footer, and thank-you copy stay in i18n. Studio edits git-tracked files; media already sits in the committed root `public/` directory (Nuxt 4 serves static assets from root `public/`, **not** `app/public/` — only `app/public/images/logo-main.png` + `gallery/README.md` live there).

**Tech Stack:** Nuxt 4.2.2, @nuxt/content v3 (3.15.2), @nuxtjs/i18n v10 (prefix strategy, en/nb), Zod (already in project), PrimeVue, FormKit.

**Correction vs. earlier discussion:** Nuxt Content v3 has **no `singleton: true` option**. Single-document ("singleton") pages are implemented as a *data* collection with one file per page per locale, queried with `.first()`.

**Scope decision (locked):**
- → Content: `bio.highlights`, `bio.education`, `quotes`, `partners` (data collections), plus `about`, `workshop`, `business-gift` page copy (singleton data collection, including `workshop.whatsOn.activities` array and video ids).
- → Stays in i18n: `home.*` (line-by-line design copy), `bio.title/tagline/highlightsTitle/highlightsIntro/educationTitle/educationIntro`, `about.name` (nav label), all form strings (`form.*`, `workshop.form.*`, `bookCall.form.*`, `contact.form.*`), `seo.*`, `footer.*`, `partners.heading`, `thankYou.*`, `bookCall.*`, `contact.intro*`.

---

## Files

**New files to create:**
- `content.config.ts` — collections schema (highlights, education, quotes, partners, singletons)
- `scripts/migrate-i18n-to-content.mjs` — one-time generator that reads `i18n/locales/{en,nb}.json` and writes all content files (single source of truth, avoids 90+ hand-written YAML files)
- `content/highlights/{en,nb}/NN-slug.yml` (13 × 2, generated)
- `content/education/{en,nb}/NN-slug.yml` (3 × 2, generated)
- `content/quotes/{en,nb}/NN-slug.yml` (30 × 2, generated)
- `content/partners/NN-slug.yml` (6, generated)
- `content/singletons/{en,nb}/{about,workshop,business-gift}.yml` (6, generated)
- `app/composables/useContentByLocale.ts` — shared locale-aware query helper

**Files to modify:**
- `nuxt.config.ts` — add `@nuxt/content` to modules
- `app/pages/bio.vue` — fetch highlights/education from content
- `app/components/BioTimeline.vue` — import `TimelineEvent` type from content schema (template unchanged)
- `app/components/PhotoQuote.vue` — fetch quotes from content
- `app/components/PartnersGallery.vue` — fetch partners from content
- `app/pages/about.vue` — replace `$t('about.*')` with content fields
- `app/pages/workshop.vue` — same, incl. activities list + youtubeId
- `app/pages/business-gift.vue` — same, incl. youtubeId + thumbnail
- `app/pages/contact.vue` — unchanged (stays in i18n by design)
- `i18n/locales/en.json` / `nb.json` — remove migrated keys only

---

## Phase 1 — @nuxt/content + bio collections

### Task 1: Install and enable @nuxt/content

**Files:**
- Modify: `nuxt.config.ts`
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install**

```bash
npm install @nuxt/content@^3.15.2
```

Expected: `node_modules/@nuxt/content/package.json` present, `@nuxt/content` added to `dependencies`.

- [ ] **Step 2: Register module**

In `nuxt.config.ts`, add `'@nuxt/content'` to the `modules` array (place before `'@nuxtjs/i18n'`):

```ts
modules: [
  '@nuxt/eslint',
  '@nuxt/fonts',
  '@nuxt/hints',
  '@nuxt/icon',
  '@nuxt/image',
  '@nuxt/scripts',
  '@nuxt/content',
  '@nuxt/test-utils',
  '@nuxtjs/i18n',
  // ...rest unchanged
],
```

- [ ] **Step 3: Verify dev server + sitemap compatibility**

```bash
npm run dev
```

Open `http://localhost:3000/bio` — page still renders from i18n (no content files yet). Confirm no module-level errors and that `/sitemap.xml` still works (`sitemap.strictNuxtContentPaths: true` behaves correctly once `@nuxt/content` is present; it will only pick up `page`-type collections, and we use `data`-type, so no path conflicts).

- [ ] **Step 4: Commit**

```bash
git add nuxt.config.ts package.json package-lock.json
git commit -m "feat: install and enable @nuxt/content"
```

### Task 2: Define content.config.ts with data collections

**Files:**
- Create: `content.config.ts`

- [ ] **Step 1: Write the config**

Create `content.config.ts` at repo root:

```ts
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    highlights: defineCollection({
      type: 'data',
      source: 'highlights/**.yml',
      schema: z.object({
        locale: z.enum(['en', 'nb']),
        sort: z.number().int().positive(),
        date: z.string(),
        title: z.string(),
        role: z.string().optional(),
        organization: z.string().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional()
      })
    }),
    education: defineCollection({
      type: 'data',
      source: 'education/**.yml',
      schema: z.object({
        locale: z.enum(['en', 'nb']),
        sort: z.number().int().positive(),
        date: z.string(),
        title: z.string(),
        field: z.string().optional(),
        location: z.string().optional(),
        degree: z.string().optional()
      })
    }),
    quotes: defineCollection({
      type: 'data',
      source: 'quotes/**.yml',
      schema: z.object({
        locale: z.enum(['en', 'nb']),
        sort: z.number().int().positive(),
        text: z.string(),
        author: z.string()
      })
    }),
    partners: defineCollection({
      type: 'data',
      source: 'partners/**.yml',
      schema: z.object({
        sort: z.number().int().positive(),
        name: z.string(),
        image: z.string(),
        alt: z.string()
      })
    }),
    singletons: defineCollection({
      type: 'data',
      source: 'singletons/**.yml',
      schema: z.object({
        locale: z.enum(['en', 'nb']),
        page: z.enum(['about', 'workshop', 'business-gift']),
        title: z.string(),
        tagline: z.string().optional(),
        sections: z.record(z.string(), z.any()).default({})
      })
    })
  }
})
```

> `sections` is a free-form record so each singleton page keeps its own nested structure (`intro`, `video`, `benefits`, `bio`, `challenge`, `bioLink`, `whatsOn`, etc.) without over-constraining the schema. Studio renders a JSON form for it. Fields shared across pages (`title`, `tagline`) are hoisted.

- [ ] **Step 2: Verify types resolve**

```bash
npm run dev
```

Expected: no schema errors in terminal; `Collections` type generated under `.nuxt/content` (visible as `queryCollection('highlights')` resolving in editor).

- [ ] **Step 3: Commit**

```bash
git add content.config.ts
git commit -m "feat: define content data collections for highlights/education/quotes/partners/singletons"
```

### Task 3: Migration script (generates all content YAML from i18n)

**Files:**
- Create: `scripts/migrate-i18n-to-content.mjs`

- [ ] **Step 1: Write the script**

```js
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import en from '../i18n/locales/en.json' with { type: 'json' }
import nb from '../i18n/locales/nb.json' with { type: 'json' }

const root = fileURLToPath(new URL('..', import.meta.url))
const contentDir = join(root, 'content')

const slugify = (s, i) =>
  `${String(i + 1).padStart(2, '0')}-${s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item'}`

const yaml = (obj) =>
  Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}: "${typeof v === 'string' ? v.replace(/"/g, '\\"') : v}"`)
    .join('\n') + '\n'

const write = (file, data) => {
  const path = join(contentDir, file)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, yaml(data))
}

for (const [locale, t] of [['en', en], ['nb', nb]]) {
  // highlights
  t.bio.highlights.forEach((item, i) => {
    write(`highlights/${locale}/${slugify(item.title, i)}.yml`, {
      locale, sort: i + 1, ...item
    })
  })
  // education
  t.bio.education.forEach((item, i) => {
    write(`education/${locale}/${slugify(item.title, i)}.yml`, {
      locale, sort: i + 1, ...item
    })
  })
  // quotes
  t.quotes.forEach((item, i) => {
    write(`quotes/${locale}/${slugify(item.author + '-' + i, i)}.yml`, {
      locale, sort: i + 1, ...item
    })
  })
}

// partners (single-locale, pulled from en)
const partnerFiles = [
  ['kulturtanken', 'Kulturtanken', '/images/partners/partner-kultur.png'],
  ['rogaland', 'Rogaland Kunstsenter', '/images/partners/partner-rogaland.png'],
  ['jaermuseet', 'Jærmuseet', '/images/partners/partner-jm.png'],
  ['dks', 'DKS', '/images/partners/partner-dks.png'],
  ['tou-scene', 'Tou Scene', '/images/partners/partner-tou.png'],
  ['oyepa', 'Øyepa', '/images/partners/partner--oyepa.jpg']
]
partnerFiles.forEach(([slug, name, image], i) => {
  write(`partners/${String(i + 1).padStart(2, '0')}-${slug}.yml`, {
    sort: i + 1, name, image, alt: `${name} logo`
  })
})

// singletons
const singletonMaps = {
  about: (t) => ({
    title: t.about.title,
    tagline: t.about.greeting,
    sections: {
      intro1: t.about.intro1,
      intro2: t.about.intro2,
      bio: t.about.bio,
      challenge: t.about.challenge,
      bioLink: t.about.bioLink
    }
  }),
  workshop: (t) => ({
    title: t.workshop.title,
    tagline: t.workshop.tagline,
    sections: {
      intro: t.workshop.intro,
      video: { intro: t.workshop.video.intro, youtubeId: t.workshop.video.youtubeId },
      whatsOn: { heading: t.workshop.whatsOn.heading, activities: t.workshop.whatsOn.activities }
    }
  }),
  'business-gift': (t) => ({
    title: t.businessGift.title,
    tagline: t.businessGift.tagline,
    sections: {
      intro: t.businessGift.intro,
      video: { youtubeId: t.businessGift.video.youtubeId, thumbnail: t.businessGift.video.thumbnail },
      benefits: { heading: t.businessGift.benefits.heading, items: [t.businessGift.benefits.item1, t.businessGift.benefits.item2, t.businessGift.benefits.item3] },
      cta: t.businessGift.cta
    }
  })
}

for (const [page, mapFn] of Object.entries(singletonMaps)) {
  for (const [locale, t] of [['en', en], ['nb', nb]]) {
    write(`singletons/${locale}/${page}.yml`, {
      locale, page, ...mapFn(t)
    })
  }
}

console.log('Migration complete. Verify content/ structure, then review generated YAML.')
```

- [ ] **Step 2: Run the script**

```bash
node scripts/migrate-i18n-to-content.mjs
```

Expected: prints `Migration complete.` and generates 94 files:
- `content/highlights/en/` + `nb/` — 13 files each
- `content/education/en/` + `nb/` — 3 files each
- `content/quotes/en/` + `nb/` — 30 files each
- `content/partners/` — 6 files
- `content/singletons/en/` + `nb/` — 3 files each

- [ ] **Step 3: Spot-check generated files**

Run — expect all pass (no `undefined`, valid mapping):

```bash
ls content/highlights/en | wc -l        # 13
ls content/highlights/nb | wc -l        # 13
ls content/education/en | wc -l         # 3
ls content/quotes/en | wc -l            # 30
ls content/singletons/en | wc -l        # 3
head -20 content/highlights/en/*.yml | head -30  # visually inspect
head -20 content/singletons/en/about.yml
```

- [ ] **Step 4: Commit generated content**

```bash
git add content scripts
git commit -m "feat: generate content collection files from i18n data"
```

### Task 4: Shared locale-aware query composable

**Files:**
- Create: `app/composables/useContentByLocale.ts`

- [ ] **Step 1: Write the composable**

```ts
import type { Collections } from '@nuxt/content'

export const useContentByLocale = <T extends keyof Collections>(collection: T) => {
  const { locale } = useI18n()

  const fetchAll = async () => {
    const loc = locale.value as string
    const items = await queryCollection(collection)
      .where('locale', '=', loc)
      .order('sort', 'ASC')
      .all()
    if (items.length > 0) return items
    // fallback to default locale
    return queryCollection(collection)
      .where('locale', '=', 'en')
      .order('sort', 'ASC')
      .all()
  }

  const fetchByName = async (name: string) => {
    const loc = locale.value as string
    let item = await queryCollection(collection)
      .where('locale', '=', loc)
      .where('page', '=', name)
      .first()
    if (!item) {
      item = await queryCollection(collection)
        .where('locale', '=', 'en')
        .where('page', '=', name)
        .first()
    }
    return item
  }

  return { fetchAll, fetchByName }
}
```

> Because content is split per-`locale` field rather than per collection, `queryCollection` returns a union type across `en`/`nb` docs; `where('locale', ...)` + `.order('sort', 'ASC')` uses the documented SQL operator API. The singleton schema exposes `page`, so `fetchByName` filters on it.

- [ ] **Step 2: Verify no type errors**

```bash
npm run dev
```

Check terminal for TS errors. The `.where('locale', ...)` / `.where('page', ...)` operators must match the schema fields defined in Task 2 (they do: `locale`, `page`).

- [ ] **Step 3: Commit**

```bash
git add app/composables/useContentByLocale.ts
git commit -m "feat: add locale-aware content query composable"
```

### Task 5: Refactor bio.vue to read highlights/education from content

**Files:**
- Modify: `app/pages/bio.vue`

- [ ] **Step 1: Replace the script section**

Replace lines 11–62 (the two `computed` loops) with content queries. Keep `usePageSeo('bio')` and `defineI18nRoute` untouched:

```vue
<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/bio',
    nb: '/bio-nb'
  }
})

usePageSeo('bio')

const { t } = useI18n()

const highlightsQuery = useContentByLocale('highlights')
const educationQuery = useContentByLocale('education')

const { data: highlights } = await useAsyncData('bio-highlights', () => highlightsQuery.fetchAll())
const { data: education } = await useAsyncData('bio-education', () => educationQuery.fetchAll())
</script>
```

> `useAsyncData` runs in SSR on first paint and hydrates on client. `queryCollection` is server-compatible. The current page keeps `:events="highlights"` / `:events="education"` — content docs already expose `date/title/role?/organization?/location?/description?/image?` and `field?/degree?` matching `TimelineEvent`.

- [ ] **Step 2: Update template `:events` binding types**

`BioTimeline.vue` declares a local `TimelineEvent` interface. Content docs contain extra fields (`id`, `stem`, `extension`, `meta`, `sort`, `locale`). Passing them via `:events` still renders but `v-for="(event, index) in events"` and every `event.*` access remains valid. To keep typing clean, cast in `bio.vue` template:

```vue
<BioTimeline :events="highlights as any" />
<BioTimeline :events="education as any" />
```

> No template markup changes otherwise — Design/copy titles and intros stay in i18n.

- [ ] **Step 3: Verify**

Open `http://localhost:3000/bio` and `/bio-nb`. Expected: timeline renders `13` highlights and `3` education entries, matching previous output; switch locales and content follows locale. Check devtools console for "bio." prefix warnings — they must be **gone** (no more missing i18n keys).

- [ ] **Step 4: Remove migrated keys from i18n files**

In `i18n/locales/en.json` and `nb.json`, delete `bio.highlights` and `bio.education` arrays (keep `bio.title`, `bio.tagline`, `bio.highlightsTitle`, `bio.highlightsIntro`, `bio.educationTitle`, `bio.educationIntro`, `bio.name`).

- [ ] **Step 5: Verify no other consumer**

```bash
grep -rn "bio.highlights\|bio.education" app --include="*.vue" --include="*.ts"
```

Expected: no results. (Run right before commit; `usePageSeo` does not touch these.)

- [ ] **Step 6: Commit**

```bash
git add app/pages/bio.vue i18n/locales
git commit -m "refactor: render bio timeline from @nuxt/content collections"
```

### Task 6: Type TimelineEvent from content schema (optional hardening)

**Files:**
- Modify: `app/components/BioTimeline.vue`

- [ ] **Step 1: Replace the local interface with a shared type**

```ts
interface TimelineEvent {
  date: string
  title: string
  role?: string
  organization?: string
  location?: string
  description?: string
  field?: string
  degree?: string
  image?: string
}
```

is already sufficient — content docs are structurally assignable. If full type-safety is desired, define the same `z.object` in `content.config.ts` and import `type CustomHighlights<{ locale: 'en' | 'nb' }>`:

```ts
import type { Highlights } from '@nuxt/content'
type TimelineEvent = Highlights[number] & { image?: string }
```

Use the local interface (line 2–12) and remove the `as any` casts from Task 5 Step 2 instead. Either approach is acceptable; the plan's default is **keep the local interface + `as any` casts** to minimize diff.

- [ ] **Step 2: Commit (only if changed)**

```bash
git commit -m "refactor: align timeline event typing with content schema"
```

---

## Phase 2 — Quotes + Partners

### Task 7: Refactor PhotoQuote.vue to read from content

**Files:**
- Modify: `app/components/PhotoQuote.vue`
- Modify: `i18n/locales/{en,nb}.json`

- [ ] **Step 1: Rewrite the script section**

```vue
<script setup lang="ts">
const quotesQuery = useContentByLocale('quotes')

const { data: quotes } = await useAsyncData('quotes', () => quotesQuery.fetchAll())

const randomIndex = ref(0)

onMounted(() => {
  if (quotes.value?.length) {
    randomIndex.value = Math.floor(Math.random() * quotes.value.length)
  }
})

const quote = computed(() => quotes.value?.[randomIndex.value]?.text ?? '')
const author = computed(() => quotes.value?.[randomIndex.value]?.author ?? '')
</script>
```

Template unchanged (still uses `{{ quote }}` and `{{ author }}`).

- [ ] **Step 2: Verify**

Open any page with `<PhotoQuote />` (`/`, `/about`, `/bio`, `/workshop`, `/business-gift`, `/contact`). Expected: a random quote by author renders on mount (no hydration mismatch — `randomIndex` only set in `onMounted`). Refresh a few times to see different quotes.

- [ ] **Step 3: Remove migrated key**

Delete `quotes` from `i18n/locales/en.json` and `nb.json` (the 30-item array).

- [ ] **Step 4: Verify no other consumer**

```bash
grep -rn "quotes\." app --include="*.vue" --include="*.ts"
```

Expected: no results.

- [ ] **Step 5: Commit**

```bash
git add app/components/PhotoQuote.vue i18n/locales
git commit -m "refactor: render photography quotes from content collection"
```

### Task 8: Refactor PartnersGallery.vue to read from content

**Files:**
- Modify: `app/components/PartnersGallery.vue`
- Modify: `i18n/locales/{en,nb}.json`

- [ ] **Step 1: Replace the hardcoded `partners` array**

Remove lines 4–35 (the array) and fetch from content instead:

```vue
<script setup lang="ts">
const { t } = useI18n()

const partnersQuery = useContentByLocale('partners')
const { data: partners } = await useAsyncData('partners', () => partnersQuery.fetchAll())
const partnerList = computed(() => partners.value ?? [])
```

> Note: `partners` has **no `locale` field** (single-locale data). `fetchAll()` filters `where('locale','=',locale)` against a schema without that field — this would return nothing. **Fix:** because partners are not localized, bypass the composable and query directly:

```vue
<script setup lang="ts">
const { t } = useI18n()
const { data: partners } = await useAsyncData('partners', () =>
  queryCollection('partners').order('sort', 'ASC').all()
)
</script>
```

Update template `v-for` to use `partner.alt` (schema field) — the existing markup already does `:alt="partner.alt"`, so only the source of the array changes:

```vue
<div v-for="partner in partners" :key="partner.name" class="partners-gallery__item" :data-index="index">
```

- [ ] **Step 2: Verify**

Open `/` (home) — the 6 partner logos render in the same order (Kulturtanken, Rogaland Kunstsenter, Jærmuseet, DKS, Tou Scene, Øyepa).

- [ ] **Step 3: Commit**

```bash
git add app/components/PartnersGallery.vue
git commit -m "refactor: render partners from content collection"
```

> `partners.heading` in i18n is **kept** (it is localized UI copy, not editable partner data).

---

## Phase 3 — Singleton pages (about, workshop, business-gift)

### Task 9: Refactor about.vue

> `about.name` (nav label), `about.bio.collaborations` interpolation block (uses `<i18n-t>` slots), and the flag SVG markup are **kept in the template/i18n**. Hoisted `title`+`tagline` and the `sections` body come from the singleton doc.

**Files:**
- Modify: `app/pages/about.vue`
- Modify: `i18n/locales/{en,nb}.json`

- [ ] **Step 1: Fetch singleton in the script section**

Add below the existing `usePageSeo('about')` / `defineI18nRoute` block:

```ts
const singletonsQuery = useContentByLocale('singletons')
const { data: about } = await useAsyncData('about-singleton', () => singletonsQuery.fetchByName('about'))
```

- [ ] **Step 2: Replace template copy bindings**

For each of the following, replace the left `$t(...)` with the right content accessor; keep `v-if` guards so missing optional content falls back gracefully (`about?.sections?.X`.
  - `PageHero :headline="$t('about.title')"` → `:headline="about?.title ?? $t('about.title')"`
  - `PageHero :tagline="$t('about.greeting')"` → `:tagline="about?.tagline ?? $t('about.greeting')"`
  - `about.intro1.prefix` → `about?.sections?.intro1?.prefix ?? $t('about.intro1.prefix')`
  - `about.intro1.name` → `about?.sections?.intro1?.name ?? $t('about.intro1.name')`
  - `about.intro2` → `about?.sections?.intro2 ?? $t('about.intro2')`
  - `about.bio.featured` → `about?.sections?.bio?.featured ?? $t('about.bio.featured')`
  - `about.bio.freelance` → `about?.sections?.bio?.freelance ?? $t('about.bio.freelance')`
  - `about.bio.workshops` → `about?.sections?.bio?.workshops ?? $t('about.bio.workshops')`
  - `about.bio.coordination` → `about?.sections?.bio?.coordination ?? $t('about.bio.coordination')`
  - `about.challenge.heading` → `about?.sections?.challenge?.heading ?? $t('about.challenge.heading')`
  - `about.challenge.text` → `about?.sections?.challenge?.text ?? $t('about.challenge.text')`
  - `about.challenge.footnote` → `about?.sections?.challenge?.footnote ?? $t('about.challenge.footnote')`
  - `about.bioLink.heading` → `about?.sections?.bioLink?.heading ?? $t('about.bioLink.heading')`
  - `about.bioLink.text` → `about?.sections?.bioLink?.text ?? $t('about.bioLink.text')`
  - `about.bioLink.button` → `about?.sections?.bioLink?.button ?? $t('about.bioLink.button')`

> **Keep** the `<i18n-t keypath="about.bio.collaborations" …>` block and the `NuxtImg` portrait `src` unchanged. `about.name` stays in i18n (nav label).

- [ ] **Step 3: Remove migrated keys from i18n**

Delete from both locale files: `about.title`, `about.greeting`, `about.intro1`, `about.intro2`, `about.bio.featured`, `about.bio.freelance`, `about.bio.workshops`, `about.bio.coordination`, `about.challenge`, `about.bioLink`. **Keep** `about.name` and `about.bio.collaborations`.

- [ ] **Step 4: Verify**

Open `/about` and `/om`. Expected: identical rendering to before — hero, name intro, paragraphs, challenge, bio-link CTA all show content; locale switch swaps text. Console has no `about.` key warnings.

- [ ] **Step 5: Commit**

```bash
git add app/pages/about.vue i18n/locales
git commit -m "refactor: render about page from content singleton"
```

### Task 10: Refactor workshop.vue

> `workshop.name` (nav), `workshop.form.*`, `workshop.whatsOn.activities` move to the singleton `sections.whatsOn.activities`; `WorkshopForm` component untouched.

**Files:**
- Modify: `app/pages/workshop.vue`
- Modify: `i18n/locales/{en,nb}.json`

- [ ] **Step 1: Fetch singleton**

```ts
const singletonsQuery = useContentByLocale('singletons')
const { data: workshop } = await useAsyncData('workshop-singleton', () => singletonsQuery.fetchByName('workshop'))
```

- [ ] **Step 2: Replace template bindings**

  - `PageHero :headline="$t('workshop.title')"` → `:headline="workshop?.title ?? $t('workshop.title')"`
  - `PageHero :tagline="$t('workshop.tagline')"` → `:tagline="workshop?.tagline ?? $t('workshop.tagline')"`
  - `workshop.intro.question` → `workshop?.sections?.intro?.question ?? $t('workshop.intro.question')`
  - `workshop.intro.alternative` → `workshop?.sections?.intro?.alternative ?? $t('workshop.intro.alternative')`
  - `workshop.video.intro` → `workshop?.sections?.video?.intro ?? $t('workshop.video.intro')`
  - `:video-id="$t('workshop.video.youtubeId')"` → `:video-id="workshop?.sections?.video?.youtubeId ?? $t('workshop.video.youtubeId')"`
  - What's On list → iterate the content `activities`:

```vue
<ul class="workshop__whats-on-list">
  <li v-for="(activity, index) in (workshop?.sections?.whatsOn?.activities ?? $tm('workshop.whatsOn.activities'))" :key="index" class="workshop__whats-on-activity">
    {{ typeof activity === 'string' ? activity : $rt(activity) }}
  </li>
</ul>
```

- [ ] **Step 3: Remove migrated keys from i18n**

Delete from both locale files: `workshop.title`, `workshop.tagline`, `workshop.intro`, `workshop.video`, `workshop.whatsOn`. **Keep** `workshop.name`, `workshop.form.*`.

- [ ] **Step 4: Verify**

Open `/workshop` and `/workshop-nb`. Video still plays (same `youtubeId`); What's On lists 3 activities; form section unchanged.

- [ ] **Step 5: Commit**

```bash
git add app/pages/workshop.vue i18n/locales
git commit -m "refactor: render workshop page from content singleton"
```

### Task 11: Refactor business-gift.vue

**Files:**
- Modify: `app/pages/business-gift.vue`
- Modify: `i18n/locales/{en,nb}.json`

- [ ] **Step 1: Fetch singleton**

```ts
const singletonsQuery = useContentByLocale('singletons')
const { data: businessGift } = await useAsyncData('business-gift-singleton', () => singletonsQuery.fetchByName('business-gift'))
```

- [ ] **Step 2: Replace template bindings**

  - `PageHero :headline="$t('businessGift.title')"` → `:headline="businessGift?.title ?? $t('businessGift.title')"`
  - `PageHero :tagline="$t('businessGift.tagline')"` → `:tagline="businessGift?.tagline ?? $t('businessGift.tagline')"`
  - `businessGift.intro.heading` → `businessGift?.sections?.intro?.heading ?? $t('businessGift.intro.heading')`
  - `businessGift.intro.text` → `businessGift?.sections?.intro?.text ?? $t('businessGift.intro.text')`
  - `businessGift.video.intro` → `businessGift?.sections?.video?.intro ?? $t('businessGift.video.intro')`
  - `:video-id="$t('businessGift.video.youtubeId')"` → `:video-id="businessGift?.sections?.video?.youtubeId ?? $t('businessGift.video.youtubeId')"`
  - `NuxtImg :src="$t('businessGift.video.thumbnail')"` → `:src="businessGift?.sections?.video?.thumbnail ?? $t('businessGift.video.thumbnail')"`
  - Benefits list → render from `sections.benefits.items`:

```vue
<ul class="business-gift__benefits-list">
  <li v-for="item in (businessGift?.sections?.benefits?.items ?? [])" :key="item" class="business-gift__benefit-item">
    <Icon name="mdi:check-circle-outline" class="business-gift__benefit-icon" />
    <span>{{ item }}</span>
  </li>
</ul>
```

  - `businessGift.cta.heading/subtext/promise/guarantee/button` → `businessGift?.sections?.cta?.X ?? $t('businessGift.cta.X')` for each of the five.

- [ ] **Step 3: Remove migrated keys from i18n**

Delete from both locale files: `businessGift.title`, `businessGift.tagline`, `businessGift.intro`, `businessGift.video`, `businessGift.benefits`, `businessGift.cta`. **Keep** `businessGift.name` (nav).

- [ ] **Step 4: Verify**

Open `/business-gift` and `/firmagaver`. Video, thumbnail, benefits, CTA button (`localePath('book-a-call')`) all render.

- [ ] **Step 5: Commit**

```bash
git add app/pages/business-gift.vue i18n/locales
git commit -m "refactor: render business gift page from content singleton"
```

---

## Phase 4 — Studio wiring + final verification

### Task 12: Final checks

- [ ] **Step 1: Full build + generate**

```bash
npm run build
npm run generate
```

Expected: build passes; static generate succeeds; no missing-content runtime errors. `sitemap` still emits `/about`, `/bio`, `/workshop`, `/business-gift` (routes come from Vue pages + `defineI18nRoute`, not content `path`s, because we use `data` collections — `strictNuxtContentPaths` stays satisfied).

- [ ] **Step 2: Grep for leftover migrated keys**

```bash
grep -rn '"$t(\|t(`' app/pages app/components --include="*.vue" | grep -E "highlights|education|quotes|about\.(title|greeting|intro|bio\.(featured|freelance|workshops|coordination)|challenge|bioLink)|workshop\.(title|tagline|intro|video|whatsOn)|businessGift\.(title|tagline|intro|video|benefits|cta)" 
```

Expected: no matches.

- [ ] **Step 3: Confirm locale files only contain retained keys**

```bash
python3 -c "
import json
for f in ['i18n/locales/en.json','i18n/locales/nb.json']:
    d=json.load(open(f))
    print(f, sorted(d.keys()))
"
```

Expected keys: `seo, home, about (name+collaborations only), workshop (name+form), bookCall, contact, partners.heading, footer, thankYou, form` (+ `bio` with title/tagline/section titles only, + `businessGift.name`, `quotes` removed, bio arrays removed).

- [ ] **Step 4: Verify Studio sees collections**

In Studio (or Nuxt DevTools → Content): confirm collections `highlights`, `education`, `quotes`, `partners`, `singletons` appear with records, and editing any YAML file hot-reloads the page.

- [ ] **Step 5: Commit remaining doc**

```bash
git add docs/superpowers/plans
git commit -m "docs: add Nuxt Content & Studio migration plan"
```

---

## Self-review notes

- **Spec coverage:** Phase 1 covers install/config/bio; Phase 2 covers quotes+partners; Phase 3 covers the three singleton pages. Media is already committed under root `public/` (Nuxt 4's public directory), so no image import task is needed. Home contract/`form.*`/SEO/nav retention is encoded in the scope decisions and the locale-key keep/delete lists per task.
- **Placeholder scan:** every code step carries full code; the only deliberately manual/unfilled items are the `about` collaborations `<i18n-t>` block (kept in i18n by design).
- **Type consistency:** `useContentByLocale` exports `fetchAll`/`fetchByName`; `fetchByName` reads the `page` field — singletons schema defines `page` exactly for that. `partners` (no locale) deliberately bypasses the composable (Task 8). `TimelineEvent` local interface matches content doc fields.