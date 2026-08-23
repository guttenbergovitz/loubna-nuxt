import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import en from '../i18n/locales/en.json' with { type: 'json' }
import nb from '../i18n/locales/nb.json' with { type: 'json' }

const root = fileURLToPath(new URL('..', import.meta.url))
const contentDir = join(root, 'content')

const slugify = (s, i) =>
  `${String(i + 1).padStart(2, '0')}-${s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item'}`

const yamlString = (v) => `"${String(v).replace(/"/g, '\\"')}"`

const dump = (obj, indent = 0) =>
  Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => {
      const pad = ' '.repeat(indent)
      if (Array.isArray(v)) {
        if (v.length === 0) return `${pad}${k}: []`
        return `${pad}${k}:\n${v.map((item) => `${pad}  - ${yamlString(item)}`).join('\n')}`
      }
      if (typeof v === 'object') {
        return `${pad}${k}:\n${dump(v, indent + 2)}`
      }
      return `${pad}${k}: ${yamlString(v)}`
    })
    .join('\n') + '\n'

const yaml = (obj) => dump(obj)

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
      video: { intro: t.businessGift.video.intro, youtubeId: t.businessGift.video.youtubeId, thumbnail: t.businessGift.video.thumbnail },
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