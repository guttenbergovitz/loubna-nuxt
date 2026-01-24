/**
 * HTML Sanitization Utility
 *
 * Provides functions to escape HTML special characters to prevent XSS attacks
 * in email content and other user-generated content.
 *
 * @module server/utils/sanitize
 * @validates Requirements 7.2 - Sanityzacja danych wejściowych
 */

/**
 * Map of HTML special characters to their escaped equivalents
 */
const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
}

/**
 * Regular expression to match HTML special characters
 */
const HTML_ESCAPE_REGEX = /[&<>"']/g

/**
 * Escapes HTML special characters in a string to prevent XSS attacks.
 *
 * Converts the following characters:
 * - `<` → `&lt;`
 * - `>` → `&gt;`
 * - `&` → `&amp;`
 * - `"` → `&quot;`
 * - `'` → `&#x27;`
 *
 * @param input - The string to sanitize
 * @returns The sanitized string with HTML special characters escaped
 *
 * @example
 * ```typescript
 * sanitizeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 *
 * sanitizeHtml("Hello <b>World</b>")
 * // Returns: 'Hello &lt;b&gt;World&lt;/b&gt;'
 * ```
 */
export function sanitizeHtml(input: string): string {
  if (!input) {
    return input
  }

  return input.replace(HTML_ESCAPE_REGEX, (char) => HTML_ESCAPE_MAP[char] || char)
}

/**
 * Sanitizes all string values in an object recursively.
 *
 * This is useful for sanitizing form data objects before using them in emails.
 *
 * @param obj - The object containing string values to sanitize
 * @returns A new object with all string values sanitized
 *
 * @example
 * ```typescript
 * sanitizeObject({
 *   name: '<script>alert("xss")</script>',
 *   email: 'user@example.com',
 *   nested: { message: '<b>Hello</b>' }
 * })
 * // Returns: {
 * //   name: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
 * //   email: 'user@example.com',
 * //   nested: { message: '&lt;b&gt;Hello&lt;/b&gt;' }
 * // }
 * ```
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = sanitizeHtml(value)
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = sanitizeObject(value as Record<string, unknown>)
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === 'string'
          ? sanitizeHtml(item)
          : item !== null && typeof item === 'object'
            ? sanitizeObject(item as Record<string, unknown>)
            : item
      )
    } else {
      result[key] = value
    }
  }

  return result as T
}
