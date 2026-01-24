/**
 * Confirmation Email Templates
 *
 * Provides HTML and plain text email templates for confirmation emails
 * sent to users after form submission. Supports both English (en) and
 * Norwegian (nb) locales with personalized greetings.
 *
 * @module server/templates/confirmationEmail
 * @validates Requirements 6.1 - Spersonalizowane podziękowanie dla nadawcy
 * @validates Requirements 6.2 - Email w języku odpowiadającym locale użytkownika
 */

export type Locale = 'en' | 'nb'
export type FormType = 'book-call' | 'contact'

export interface ConfirmationEmailData {
  recipientName: string
  locale: Locale
  formType: FormType
}

interface EmailContent {
  subject: string
  greeting: string
  thankYouMessage: string
  nextSteps: string
  closing: string
  signature: string
}

/**
 * Localized content for confirmation emails
 */
const translations: Record<Locale, Record<FormType, EmailContent>> = {
  en: {
    'book-call': {
      subject: 'Thank you for your consultation request',
      greeting: 'Dear',
      thankYouMessage: 'Thank you for requesting a consultation with us. We have received your inquiry and are excited to connect with you.',
      nextSteps: 'We will review your request and contact you within 48 hours to schedule your free consultation. In the meantime, feel free to browse our portfolio for inspiration.',
      closing: 'We look forward to speaking with you soon!',
      signature: 'Best regards,\nThe Photography Team'
    },
    'contact': {
      subject: 'Thank you for your message',
      greeting: 'Dear',
      thankYouMessage: 'Thank you for reaching out to us. We have received your message and appreciate you taking the time to contact us.',
      nextSteps: 'We will review your message and get back to you as soon as possible. We typically respond within 24-48 hours.',
      closing: 'Thank you for your patience!',
      signature: 'Best regards,\nThe Photography Team'
    }
  },
  nb: {
    'book-call': {
      subject: 'Takk for din konsultasjonsforespørsel',
      greeting: 'Kjære',
      thankYouMessage: 'Takk for at du har bedt om en konsultasjon med oss. Vi har mottatt din henvendelse og gleder oss til å ta kontakt med deg.',
      nextSteps: 'Vi vil gjennomgå forespørselen din og kontakte deg innen 48 timer for å avtale din gratis konsultasjon. I mellomtiden kan du gjerne se gjennom porteføljen vår for inspirasjon.',
      closing: 'Vi ser frem til å snakke med deg snart!',
      signature: 'Med vennlig hilsen,\nFotografteamet'
    },
    'contact': {
      subject: 'Takk for din melding',
      greeting: 'Kjære',
      thankYouMessage: 'Takk for at du tok kontakt med oss. Vi har mottatt meldingen din og setter pris på at du tok deg tid til å kontakte oss.',
      nextSteps: 'Vi vil gjennomgå meldingen din og svare deg så snart som mulig. Vi svarer vanligvis innen 24-48 timer.',
      closing: 'Takk for din tålmodighet!',
      signature: 'Med vennlig hilsen,\nFotografteamet'
    }
  }
}

/**
 * Generates the HTML version of the confirmation email.
 *
 * @param data - The confirmation email data including recipient name, locale, and form type
 * @returns The HTML email content
 *
 * @example
 * ```typescript
 * const html = generateConfirmationHtml({
 *   recipientName: 'John',
 *   locale: 'en',
 *   formType: 'book-call'
 * })
 * ```
 */
export function generateConfirmationHtml(data: ConfirmationEmailData): string {
  const { recipientName, locale, formType } = data
  const content = translations[locale][formType]

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;
    }
    .header h1 {
      color: #2c3e50;
      font-size: 24px;
      margin: 0;
    }
    .greeting {
      font-size: 18px;
      color: #2c3e50;
      margin-bottom: 20px;
    }
    .content {
      margin-bottom: 20px;
    }
    .content p {
      margin: 0 0 15px 0;
    }
    .next-steps {
      background-color: #f8f9fa;
      border-left: 4px solid #3498db;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 0 4px 4px 0;
    }
    .closing {
      margin-top: 30px;
      font-style: italic;
      color: #555555;
    }
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      white-space: pre-line;
      color: #666666;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${content.subject}</h1>
    </div>
    
    <div class="greeting">
      ${content.greeting} ${recipientName},
    </div>
    
    <div class="content">
      <p>${content.thankYouMessage}</p>
    </div>
    
    <div class="next-steps">
      <p>${content.nextSteps}</p>
    </div>
    
    <div class="closing">
      <p>${content.closing}</p>
    </div>
    
    <div class="signature">
      ${content.signature}
    </div>
    
    <div class="footer">
      <p>${locale === 'en' ? 'This is an automated message. Please do not reply directly to this email.' : 'Dette er en automatisk melding. Vennligst ikke svar direkte på denne e-posten.'}</p>
    </div>
  </div>
</body>
</html>`
}

/**
 * Generates the plain text version of the confirmation email.
 *
 * @param data - The confirmation email data including recipient name, locale, and form type
 * @returns The plain text email content
 *
 * @example
 * ```typescript
 * const text = generateConfirmationText({
 *   recipientName: 'John',
 *   locale: 'en',
 *   formType: 'book-call'
 * })
 * ```
 */
export function generateConfirmationText(data: ConfirmationEmailData): string {
  const { recipientName, locale, formType } = data
  const content = translations[locale][formType]

  const separator = '─'.repeat(50)
  const footerNote = locale === 'en'
    ? 'This is an automated message. Please do not reply directly to this email.'
    : 'Dette er en automatisk melding. Vennligst ikke svar direkte på denne e-posten.'

  return `${content.subject}
${separator}

${content.greeting} ${recipientName},

${content.thankYouMessage}

${content.nextSteps}

${content.closing}

${content.signature}

${separator}
${footerNote}`
}

/**
 * Gets the email subject for the confirmation email.
 *
 * @param locale - The locale for the email (en or nb)
 * @param formType - The type of form (book-call or contact)
 * @returns The localized email subject
 *
 * @example
 * ```typescript
 * const subject = getConfirmationSubject('en', 'book-call')
 * // Returns: 'Thank you for your consultation request'
 * ```
 */
export function getConfirmationSubject(locale: Locale, formType: FormType): string {
  return translations[locale][formType].subject
}

/**
 * Generates both HTML and plain text versions of the confirmation email.
 *
 * This is a convenience function that returns both versions at once,
 * useful when sending emails that require both formats.
 *
 * @param data - The confirmation email data
 * @returns An object containing subject, html, and text versions
 *
 * @example
 * ```typescript
 * const email = generateConfirmationEmail({
 *   recipientName: 'John',
 *   locale: 'en',
 *   formType: 'book-call'
 * })
 * // Returns: { subject: '...', html: '...', text: '...' }
 * ```
 */
export function generateConfirmationEmail(data: ConfirmationEmailData): {
  subject: string
  html: string
  text: string
} {
  return {
    subject: getConfirmationSubject(data.locale, data.formType),
    html: generateConfirmationHtml(data),
    text: generateConfirmationText(data)
  }
}
