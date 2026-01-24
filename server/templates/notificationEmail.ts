/**
 * Notification Email Templates
 *
 * Provides HTML and plain text email templates for notification emails
 * sent to the site owner when a form is submitted. Includes all form data
 * and identifies the source form (book-call or contact).
 *
 * @module server/templates/notificationEmail
 * @validates Requirements 6.3 - Email zawiera wszystkie dane przesłane w formularzu
 * @validates Requirements 6.4 - Email zawiera informację o źródle formularza
 * @validates Requirements 6.5 - Szablony HTML z fallbackiem do plain text
 */

export type Locale = 'en' | 'nb'
export type FormType = 'book-call' | 'contact'

export interface NotificationEmailData {
  formType: FormType
  locale: Locale
  submittedAt: Date
  formData: Record<string, string | undefined>
}

interface NotificationContent {
  subject: string
  newSubmission: string
  formSource: string
  submittedAt: string
  formDataTitle: string
  fieldLabels: Record<string, string>
}

/**
 * Localized content for notification emails
 */
const translations: Record<Locale, Record<FormType, NotificationContent>> = {
  en: {
    'book-call': {
      subject: 'New Consultation Request',
      newSubmission: 'New Form Submission',
      formSource: 'Source: Book a Call Form',
      submittedAt: 'Submitted at',
      formDataTitle: 'Form Data',
      fieldLabels: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        lookingFor: 'Looking For',
        photographyStyle: 'Photography Style',
        additionalNotes: 'Additional Notes'
      }
    },
    'contact': {
      subject: 'New Contact Message',
      newSubmission: 'New Form Submission',
      formSource: 'Source: Contact Form',
      submittedAt: 'Submitted at',
      formDataTitle: 'Form Data',
      fieldLabels: {
        name: 'Name',
        email: 'Email',
        message: 'Message'
      }
    }
  },
  nb: {
    'book-call': {
      subject: 'Ny konsultasjonsforespørsel',
      newSubmission: 'Ny skjemainnsending',
      formSource: 'Kilde: Bestill samtale-skjema',
      submittedAt: 'Sendt inn',
      formDataTitle: 'Skjemadata',
      fieldLabels: {
        name: 'Navn',
        email: 'E-post',
        phone: 'Telefon',
        lookingFor: 'Ser etter',
        photographyStyle: 'Fotografistil',
        additionalNotes: 'Tilleggsnotater'
      }
    },
    'contact': {
      subject: 'Ny kontaktmelding',
      newSubmission: 'Ny skjemainnsending',
      formSource: 'Kilde: Kontaktskjema',
      submittedAt: 'Sendt inn',
      formDataTitle: 'Skjemadata',
      fieldLabels: {
        name: 'Navn',
        email: 'E-post',
        message: 'Melding'
      }
    }
  }
}

/**
 * Formats a date for display in the email.
 *
 * @param date - The date to format
 * @param locale - The locale for formatting
 * @returns Formatted date string
 */
function formatDate(date: Date, locale: Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }
  const localeCode = locale === 'nb' ? 'nb-NO' : 'en-US'
  return date.toLocaleString(localeCode, options)
}

/**
 * Gets the display label for a form field.
 *
 * @param fieldKey - The field key from form data
 * @param content - The notification content with field labels
 * @returns The localized field label or the original key
 */
function getFieldLabel(fieldKey: string, content: NotificationContent): string {
  return content.fieldLabels[fieldKey] || fieldKey
}

/**
 * Generates the HTML version of the notification email.
 *
 * @param data - The notification email data including form type, locale, timestamp, and form data
 * @returns The HTML email content
 *
 * @example
 * ```typescript
 * const html = generateNotificationHtml({
 *   formType: 'book-call',
 *   locale: 'en',
 *   submittedAt: new Date(),
 *   formData: { name: 'John', email: 'john@example.com', phone: '+1234567890' }
 * })
 * ```
 */
export function generateNotificationHtml(data: NotificationEmailData): string {
  const { formType, locale, submittedAt, formData } = data
  const content = translations[locale][formType]
  const formattedDate = formatDate(submittedAt, locale)

  // Build form data rows
  const formDataRows = Object.entries(formData)
    .filter(([key, value]) => value !== undefined && value !== '' && key !== 'locale')
    .map(([key, value]) => {
      const label = getFieldLabel(key, content)
      const displayValue = value || '-'
      return `
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #555555; width: 30%; vertical-align: top;">${label}</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0; color: #333333; white-space: pre-wrap;">${displayValue}</td>
        </tr>`
    })
    .join('')

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
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #2c3e50;
      color: #ffffff;
      padding: 25px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .meta-info {
      background-color: #f8f9fa;
      padding: 15px 30px;
      border-bottom: 1px solid #e0e0e0;
    }
    .meta-info p {
      margin: 5px 0;
      font-size: 14px;
      color: #666666;
    }
    .form-source {
      display: inline-block;
      background-color: #3498db;
      color: #ffffff;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 500;
    }
    .content {
      padding: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
      margin: 0 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #3498db;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    .data-table tr:last-child td {
      border-bottom: none;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 15px 30px;
      text-align: center;
      font-size: 12px;
      color: #999999;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${content.newSubmission}</h1>
    </div>
    
    <div class="meta-info">
      <p><span class="form-source">${content.formSource}</span></p>
      <p><strong>${content.submittedAt}:</strong> ${formattedDate}</p>
    </div>
    
    <div class="content">
      <h2 class="section-title">${content.formDataTitle}</h2>
      <table class="data-table">
        ${formDataRows}
      </table>
    </div>
    
    <div class="footer">
      <p>${locale === 'en' ? 'This notification was automatically generated by the website contact system.' : 'Denne varslingen ble automatisk generert av nettstedets kontaktsystem.'}</p>
    </div>
  </div>
</body>
</html>`
}

/**
 * Generates the plain text version of the notification email.
 *
 * @param data - The notification email data including form type, locale, timestamp, and form data
 * @returns The plain text email content
 *
 * @example
 * ```typescript
 * const text = generateNotificationText({
 *   formType: 'book-call',
 *   locale: 'en',
 *   submittedAt: new Date(),
 *   formData: { name: 'John', email: 'john@example.com', phone: '+1234567890' }
 * })
 * ```
 */
export function generateNotificationText(data: NotificationEmailData): string {
  const { formType, locale, submittedAt, formData } = data
  const content = translations[locale][formType]
  const formattedDate = formatDate(submittedAt, locale)

  const separator = '═'.repeat(50)
  const thinSeparator = '─'.repeat(50)

  // Build form data lines
  const formDataLines = Object.entries(formData)
    .filter(([key, value]) => value !== undefined && value !== '' && key !== 'locale')
    .map(([key, value]) => {
      const label = getFieldLabel(key, content)
      const displayValue = value || '-'
      return `${label}: ${displayValue}`
    })
    .join('\n')

  const footerNote = locale === 'en'
    ? 'This notification was automatically generated by the website contact system.'
    : 'Denne varslingen ble automatisk generert av nettstedets kontaktsystem.'

  return `${separator}
${content.newSubmission}
${separator}

${content.formSource}
${content.submittedAt}: ${formattedDate}

${thinSeparator}
${content.formDataTitle}
${thinSeparator}

${formDataLines}

${thinSeparator}
${footerNote}`
}

/**
 * Gets the email subject for the notification email.
 *
 * @param locale - The locale for the email (en or nb)
 * @param formType - The type of form (book-call or contact)
 * @returns The localized email subject
 *
 * @example
 * ```typescript
 * const subject = getNotificationSubject('en', 'book-call')
 * // Returns: 'New Consultation Request'
 * ```
 */
export function getNotificationSubject(locale: Locale, formType: FormType): string {
  return translations[locale][formType].subject
}

/**
 * Generates both HTML and plain text versions of the notification email.
 *
 * This is a convenience function that returns both versions at once,
 * useful when sending emails that require both formats.
 *
 * @param data - The notification email data
 * @returns An object containing subject, html, and text versions
 *
 * @example
 * ```typescript
 * const email = generateNotificationEmail({
 *   formType: 'book-call',
 *   locale: 'en',
 *   submittedAt: new Date(),
 *   formData: { name: 'John', email: 'john@example.com', phone: '+1234567890' }
 * })
 * // Returns: { subject: '...', html: '...', text: '...' }
 * ```
 */
export function generateNotificationEmail(data: NotificationEmailData): {
  subject: string
  html: string
  text: string
} {
  return {
    subject: getNotificationSubject(data.locale, data.formType),
    html: generateNotificationHtml(data),
    text: generateNotificationText(data)
  }
}
