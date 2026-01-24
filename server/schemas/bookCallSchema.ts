import { z } from 'zod'

export const bookCallSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(8).max(20),
  lookingFor: z.enum(['businessGift', 'fineArtPrint', 'customPhotography']).optional(),
  photographyStyle: z.enum(['landscape', 'architecture', 'nature', 'impressions', 'other']).optional(),
  additionalNotes: z.string().max(2000).optional(),
  locale: z.enum(['en', 'nb'])
})

export type BookCallData = z.infer<typeof bookCallSchema>
