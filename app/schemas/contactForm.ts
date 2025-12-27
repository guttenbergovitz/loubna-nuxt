import { z } from 'zod'

export interface ContactFormValidationMessages {
  nameMin: string
  emailInvalid: string
  phoneMin: string
  required: string
}

export const createContactFormSchema = (messages: ContactFormValidationMessages) => z.object({
  name: z.string().min(2, messages.nameMin),
  email: z.string().email(messages.emailInvalid),
  phone: z.string().min(8, messages.phoneMin),
  lookingFor: z.string().optional(),
  photographyStyle: z.string().optional()
})

export type ContactFormData = z.infer<ReturnType<typeof createContactFormSchema>>
