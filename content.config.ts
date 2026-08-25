import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    highlights: defineCollection({
      type: 'data',
      source: 'highlights/**/*.yml',
      schema: z.object({
        locale: z.enum(['en', 'nb']),
        sort: z.string().regex(/^[0-9]{2,}$/),
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
      source: 'education/**/*.yml',
      schema: z.object({
        locale: z.enum(['en', 'nb']),
        sort: z.string().regex(/^[0-9]{2,}$/),
        date: z.string(),
        title: z.string(),
        field: z.string().optional(),
        location: z.string().optional(),
        degree: z.string().optional()
      })
    }),
    quotes: defineCollection({
      type: 'data',
      source: 'quotes/**/*.yml',
      schema: z.object({
        locale: z.enum(['en', 'nb']),
        sort: z.string().regex(/^[0-9]{2,}$/),
        text: z.string(),
        author: z.string()
      })
    }),
    partners: defineCollection({
      type: 'data',
      source: 'partners/**/*.yml',
      schema: z.object({
        sort: z.string().regex(/^[0-9]{2,}$/),
        name: z.string(),
        image: z.string(),
        alt: z.string()
      })
    }),
    galleryImages: defineCollection({
      type: 'data',
      source: 'gallery/**/*.yml',
      schema: z.object({
        sort: z.string().regex(/^[0-9]{2,}$/),
        group: z.enum(['home', 'secondary']),
        src: z.string(),
        alt: z.string()
      })
    }),
    homeOptions: defineCollection({
      type: 'data',
      source: 'home-options/**/*.yml',
      schema: z.object({
        locale: z.enum(['en', 'nb']),
        sort: z.string().regex(/^[0-9]{2,}$/),
        icon: z.string(),
        title: z.string(),
        description: z.string()
      })
    }),
    homeFeatures: defineCollection({
      type: 'data',
      source: 'home-features/**/*.yml',
      schema: z.object({
        locale: z.enum(['en', 'nb']),
        sort: z.string().regex(/^[0-9]{2,}$/),
        image: z.string(),
        alt: z.string(),
        title: z.string(),
        description: z.string()
      })
    }),
    singletons: defineCollection({
      type: 'data',
      source: 'singletons/**/*.yml',
      schema: z.object({
        locale: z.enum(['en', 'nb']),
        page: z.enum(['about', 'workshop', 'business-gift', 'contact', 'book-a-call']),
        title: z.string(),
        tagline: z.string().optional(),
        sections: z.record(z.string(), z.any()).default({})
      })
    })
  }
})