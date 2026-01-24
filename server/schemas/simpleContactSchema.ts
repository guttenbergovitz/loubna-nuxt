import { z } from 'zod'

export const simpleContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  message: z.string().min(10).max(5000),
  locale: z.enum(['en', 'nb'])
})

export type SimpleContactData = z.infer<typeof simpleContactSchema>
