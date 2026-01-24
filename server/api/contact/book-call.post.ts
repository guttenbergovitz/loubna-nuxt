/**
 * API Endpoint: Book a Call Form Submission
 *
 * Handles POST requests from the ContactForm component for booking consultations.
 * Validates input data, sanitizes it, and sends confirmation and notification emails.
 *
 * @module server/api/contact/book-call.post
 * @validates Requirements 2.1 - Endpoint API `/api/contact/book-call`
 * @validates Requirements 2.2 - Wysyłka Email_Potwierdzenia do nadawcy
 * @validates Requirements 2.3 - Wysyłka Email_Powiadomienia do właściciela strony
 * @validates Requirements 2.4 - Zwrócenie statusu sukcesu z URL strony podziękowania
 * @validates Requirements 2.5 - Zwrócenie odpowiedniego komunikatu błędu przy niepowodzeniu
 */

import { bookCallSchema, type BookCallData } from '../../schemas/bookCallSchema'
import { sanitizeObject } from '../../utils/sanitize'
import { generateConfirmationEmail } from '../../templates/confirmationEmail'
import { generateNotificationEmail } from '../../templates/notificationEmail'

interface ContactResponse {
  success: boolean
  redirectUrl?: string
  error?: string
}

export default defineEventHandler(async (event): Promise<ContactResponse> => {
  // Get the nodemailer transporter
  const { sendMail } = useNodeMailer()

  // Get owner email from environment
  const ownerEmail = process.env.OWNER_EMAIL
  if (!ownerEmail) {
    console.error('OWNER_EMAIL environment variable is not set')
    return {
      success: false,
      error: 'configuration_error'
    }
  }

  // Read and validate request body
  let body: unknown
  try {
    body = await readBody(event)
  } catch {
    return {
      success: false,
      error: 'invalid_request'
    }
  }

  // Validate input data using Zod schema
  const validationResult = bookCallSchema.safeParse(body)
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0]
    const field = firstError?.path[0]?.toString()

    // Check for email validation error
    if (field === 'email') {
      return {
        success: false,
        error: 'invalid_email'
      }
    }

    return {
      success: false,
      error: 'validation_error'
    }
  }

  // Sanitize validated data
  const validatedData: BookCallData = validationResult.data
  const sanitizedData = sanitizeObject(validatedData)

  // Prepare form data for notification email (excluding locale)
  const formData: Record<string, string | undefined> = {
    name: sanitizedData.name,
    email: sanitizedData.email,
    phone: sanitizedData.phone,
    lookingFor: sanitizedData.lookingFor,
    photographyStyle: sanitizedData.photographyStyle,
    additionalNotes: sanitizedData.additionalNotes
  }

  // Generate email content
  const confirmationEmail = generateConfirmationEmail({
    recipientName: sanitizedData.name,
    locale: sanitizedData.locale,
    formType: 'book-call'
  })

  const notificationEmail = generateNotificationEmail({
    formType: 'book-call',
    locale: sanitizedData.locale,
    submittedAt: new Date(),
    formData
  })

  // Send emails
  try {
    // Send confirmation email to the user
    await sendMail({
      to: sanitizedData.email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
      text: confirmationEmail.text
    })

    // Send notification email to the owner
    await sendMail({
      to: ownerEmail,
      subject: notificationEmail.subject,
      html: notificationEmail.html,
      text: notificationEmail.text
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    return {
      success: false,
      error: 'email_send_failed'
    }
  }

  // Build redirect URL with locale prefix
  const localePrefix = sanitizedData.locale === 'nb' ? '/nb' : '/en'
  const redirectUrl = `${localePrefix}/thank-you/book-call`

  return {
    success: true,
    redirectUrl
  }
})
