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