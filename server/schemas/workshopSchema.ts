import { z } from 'zod'

export const workshopSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  workshopFor: z.enum(['yourself', 'child', 'institution']).optional(),
  skills: z.enum(['engineering', 'darkroom', 'largeFormat']).optional(),
  photographyStyle: z.enum(['landscape', 'architecture', 'nature', 'impressions', 'other']).optional(),
  preferredDate: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  locale: z.enum(['en', 'nb'])
})

export type WorkshopData = z.infer<typeof workshopSchema>
