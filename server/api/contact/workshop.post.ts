import { workshopSchema, type WorkshopData } from '../../schemas/workshopSchema'
import { sanitizeObject } from '../../utils/sanitize'
import { generateConfirmationEmail } from '../../templates/confirmationEmail'
import { generateNotificationEmail } from '../../templates/notificationEmail'

interface ContactResponse {
  success: boolean
  redirectUrl?: string
  error?: string
}

export default defineEventHandler(async (event): Promise<ContactResponse> => {
  const { sendMail } = useNodeMailer()
  const ownerEmail = process.env.OWNER_EMAIL
  if (!ownerEmail) {
    console.error('OWNER_EMAIL environment variable is not set')
    return { success: false, error: 'configuration_error' }
  }

  let body: unknown
  try {
    body = await readBody(event)
  } catch {
    return { success: false, error: 'invalid_request' }
  }

  const validationResult = workshopSchema.safeParse(body)
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0]
    const field = firstError?.path[0]?.toString()
    if (field === 'email') {
      return { success: false, error: 'invalid_email' }
    }
    return { success: false, error: 'validation_error' }
  }

  const validatedData: WorkshopData = validationResult.data
  const sanitizedData = sanitizeObject(validatedData)

  const formData: Record<string, string | undefined> = {
    name: sanitizedData.name,
    email: sanitizedData.email,
    workshopFor: sanitizedData.workshopFor,
    skills: sanitizedData.skills,
    photographyStyle: sanitizedData.photographyStyle,
    preferredDate: sanitizedData.preferredDate,
    message: sanitizedData.message
  }

  const confirmationEmail = generateConfirmationEmail({
    recipientName: sanitizedData.name,
    locale: sanitizedData.locale,
    formType: 'workshop'
  })

  const notificationEmail = generateNotificationEmail({
    formType: 'workshop',
    locale: sanitizedData.locale,
    submittedAt: new Date(),
    formData
  })

  try {
    await sendMail({
      to: sanitizedData.email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
      text: confirmationEmail.text
    })
    await sendMail({
      to: ownerEmail,
      subject: notificationEmail.subject,
      html: notificationEmail.html,
      text: notificationEmail.text
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: 'email_send_failed' }
  }

  const localePrefix = sanitizedData.locale === 'nb' ? '/nb' : '/en'
  const redirectUrl = `${localePrefix}/thank-you/workshop`

  return { success: true, redirectUrl }
})
