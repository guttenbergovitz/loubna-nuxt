# Plan Implementacji: Nodemailer Contact Forms

## Przegląd

Implementacja systemu wysyłki e-maili dla dwóch formularzy kontaktowych w aplikacji Nuxt.js z wykorzystaniem modułu nuxt-nodemailer.

## Zadania

- [x] 1. Konfiguracja modułu Nodemailer
  - [x] 1.1 Zainstaluj pakiet `nuxt-nodemailer` i dodaj do nuxt.config.ts
    - Dodaj moduł do tablicy modules
    - Skonfiguruj opcje nodemailer z użyciem zmiennych środowiskowych
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [x] 1.2 Utwórz plik `.env.example` z wymaganymi zmiennymi SMTP
    - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_SECURE, OWNER_EMAIL
    - _Requirements: 1.2_

- [x] 2. Implementacja schematów walidacji serwerowej
  - [x] 2.1 Utwórz `server/schemas/bookCallSchema.ts` z walidacją Zod
    - Zdefiniuj schemat dla wszystkich pól formularza book-call
    - Dodaj walidację email, minimalnych długości
    - _Requirements: 2.6, 7.1_
  
  - [x] 2.2 Utwórz `server/schemas/simpleContactSchema.ts` z walidacją Zod
    - Zdefiniuj schemat dla pól name, email, message, locale
    - _Requirements: 3.6, 7.1_
  
  - [ ]* 2.3 Napisz test właściwości dla walidacji formularzy
    - **Property 1: Walidacja danych formularza**
    - **Validates: Requirements 2.6, 3.6, 7.1**

- [x] 3. Implementacja serwisu email i szablonów
  - [x] 3.1 Utwórz `server/utils/sanitize.ts` z funkcją sanityzacji HTML
    - Implementuj escape dla znaków HTML/JavaScript
    - _Requirements: 7.2_
  
  - [ ]* 3.2 Napisz test właściwości dla sanityzacji
    - **Property 6: Sanityzacja danych wejściowych**
    - **Validates: Requirements 7.2**
  
  - [x] 3.3 Utwórz `server/templates/confirmationEmail.ts` z szablonami potwierdzenia
    - Implementuj szablony HTML i plain text dla obu języków (en, nb)
    - Dodaj personalizację z imieniem nadawcy
    - _Requirements: 6.1, 6.2_
  
  - [x] 3.4 Utwórz `server/templates/notificationEmail.ts` z szablonami powiadomienia
    - Implementuj szablony z wszystkimi danymi formularza
    - Dodaj identyfikator źródła formularza
    - _Requirements: 6.3, 6.4, 6.5_
  
  - [ ]* 3.5 Napisz test właściwości dla szablonów email
    - **Property 4: Lokalizacja Email_Potwierdzenia**
    - **Property 5: Kompletność Email_Powiadomienia**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4**

- [x] 4. Checkpoint - Sprawdź czy wszystkie testy przechodzą
  - Upewnij się że wszystkie testy przechodzą, zapytaj użytkownika jeśli pojawią się pytania.

- [x] 5. Implementacja API endpoints
  - [x] 5.1 Utwórz `server/api/contact/book-call.post.ts`
    - Waliduj dane wejściowe używając bookCallSchema
    - Sanityzuj dane przed użyciem
    - Wyślij email potwierdzenia i powiadomienia
    - Zwróć success z redirectUrl
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 5.2 Utwórz `server/api/contact/simple.post.ts`
    - Waliduj dane wejściowe używając simpleContactSchema
    - Sanityzuj dane przed użyciem
    - Wyślij email potwierdzenia i powiadomienia
    - Zwróć success z redirectUrl
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [ ]* 5.3 Napisz testy jednostkowe dla API endpoints
    - Testuj poprawne odpowiedzi dla sukcesu
    - Testuj odpowiedzi błędów walidacji
    - _Requirements: 2.4, 2.5, 3.4, 3.5_

- [ ] 6. Implementacja stron podziękowania
  - [x] 6.1 Utwórz `app/pages/thank-you/book-call.vue`
    - Skonfiguruj ścieżki i18n: `/thank-you/book-call` (en), `/takk/bestill-samtale` (nb)
    - Wyświetl komunikat podziękowania i dalsze kroki
    - Dodaj link powrotny do strony głównej
    - _Requirements: 4.1, 4.4, 4.5_
  
  - [x] 6.2 Utwórz `app/pages/thank-you/contact.vue`
    - Skonfiguruj ścieżki i18n: `/thank-you/contact` (en), `/takk/kontakt` (nb)
    - Wyświetl komunikat podziękowania i dalsze kroki
    - Dodaj link powrotny do strony głównej
    - _Requirements: 4.2, 4.4, 4.5_
  
  - [ ] 6.3 Dodaj tłumaczenia dla stron podziękowania do `i18n/locales/en.json` i `i18n/locales/nb.json`
    - Dodaj sekcję thankYou z bookCall i contact
    - _Requirements: 4.3_

- [ ] 7. Aktualizacja komponentów formularzy
  - [ ] 7.1 Zaktualizuj `app/components/ContactForm.vue`
    - Dodaj stan ładowania (isLoading) i błędu (error)
    - Zaimplementuj wywołanie API `/api/contact/book-call`
    - Przekieruj na stronę podziękowania po sukcesie
    - Wyświetl komunikat błędu przy niepowodzeniu
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ] 7.2 Zaktualizuj `app/components/SimpleContactForm.vue`
    - Dodaj stan ładowania (isLoading) i błędu (error)
    - Zaimplementuj wywołanie API `/api/contact/simple`
    - Przekieruj na stronę podziękowania po sukcesie
    - Wyświetl komunikat błędu przy niepowodzeniu
    - _Requirements: 5.4, 5.5, 5.6_
  
  - [ ] 7.3 Dodaj tłumaczenia dla komunikatów błędów do plików locale
    - Dodaj klucze dla błędów wysyłki formularza
    - _Requirements: 5.3, 5.6_

- [ ] 8. Checkpoint końcowy - Sprawdź czy wszystkie testy przechodzą
  - Upewnij się że wszystkie testy przechodzą, zapytaj użytkownika jeśli pojawią się pytania.

## Uwagi

- Zadania oznaczone `*` są opcjonalne i mogą być pominięte dla szybszego MVP
- Każde zadanie odwołuje się do konkretnych wymagań dla śledzenia
- Checkpointy zapewniają inkrementalną walidację
- Testy właściwości walidują uniwersalne właściwości poprawności
- Testy jednostkowe walidują konkretne przykłady i edge cases
