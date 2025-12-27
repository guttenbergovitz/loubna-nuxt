import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  lookingFor: z.string().optional(),
  photographyStyle: z.string().optional()
})

export type ContactFormData = z.infer<typeof contactFormSchema>
