# Dokument Wymagań

## Wprowadzenie

Implementacja funkcjonalności wysyłki e-maili za pomocą modułu Nodemailer dla dwóch formularzy kontaktowych w aplikacji Nuxt.js. System ma obsługiwać bezpieczną wysyłkę e-maili, resetowanie formularzy po wysłaniu oraz przekierowanie na dedykowane strony podziękowania w odpowiednim języku (en/nb).

## Słownik

- **System_Email**: Moduł odpowiedzialny za wysyłkę e-maili poprzez Nodemailer
- **Formularz_Kontaktowy**: Komponent ContactForm.vue używany na stronie book-a-call
- **Formularz_Prosty**: Komponent SimpleContactForm.vue używany na stronie contact
- **Strona_Podziekowania**: Dedykowana strona wyświetlana po pomyślnym wysłaniu formularza
- **Email_Potwierdzenia**: E-mail wysyłany do osoby wypełniającej formularz
- **Email_Powiadomienia**: E-mail wysyłany do właściciela strony z danymi formularza
- **Locale**: Kod języka (en lub nb) określający wersję językową

## Wymagania

### Wymaganie 1: Konfiguracja modułu Nodemailer

**User Story:** Jako deweloper, chcę skonfigurować moduł Nodemailer w aplikacji Nuxt.js, aby móc wysyłać e-maile z formularzy kontaktowych.

#### Kryteria Akceptacji

1. THE System_Email SHALL być skonfigurowany jako moduł Nuxt z wykorzystaniem nuxt-nodemailer
2. THE System_Email SHALL przechowywać dane uwierzytelniające SMTP w zmiennych środowiskowych
3. THE System_Email SHALL obsługiwać konfigurację hosta SMTP, portu, użytkownika i hasła
4. WHEN zmienne środowiskowe nie są ustawione, THEN THE System_Email SHALL zgłosić błąd podczas uruchamiania aplikacji

### Wymaganie 2: API endpoint dla formularza kontaktowego (ContactForm)

**User Story:** Jako użytkownik, chcę wysłać formularz kontaktowy z book-a-call, aby umówić się na konsultację fotograficzną.

#### Kryteria Akceptacji

1. WHEN użytkownik wysyła Formularz_Kontaktowy, THEN THE System_Email SHALL utworzyć endpoint API `/api/contact/book-call`
2. WHEN dane formularza są poprawne, THEN THE System_Email SHALL wysłać Email_Potwierdzenia do nadawcy
3. WHEN dane formularza są poprawne, THEN THE System_Email SHALL wysłać Email_Powiadomienia do właściciela strony
4. WHEN wysyłka e-maili się powiedzie, THEN THE System_Email SHALL zwrócić status sukcesu z URL strony podziękowania
5. IF wysyłka e-maila się nie powiedzie, THEN THE System_Email SHALL zwrócić odpowiedni komunikat błędu
6. THE System_Email SHALL walidować wszystkie wymagane pola (name, email, phone) przed wysyłką

### Wymaganie 3: API endpoint dla prostego formularza kontaktowego (SimpleContactForm)

**User Story:** Jako użytkownik, chcę wysłać prosty formularz kontaktowy, aby skontaktować się z fotografem.

#### Kryteria Akceptacji

1. WHEN użytkownik wysyła Formularz_Prosty, THEN THE System_Email SHALL utworzyć endpoint API `/api/contact/simple`
2. WHEN dane formularza są poprawne, THEN THE System_Email SHALL wysłać Email_Potwierdzenia do nadawcy
3. WHEN dane formularza są poprawne, THEN THE System_Email SHALL wysłać Email_Powiadomienia do właściciela strony
4. WHEN wysyłka e-maili się powiedzie, THEN THE System_Email SHALL zwrócić status sukcesu z URL strony podziękowania
5. IF wysyłka e-maila się nie powiedzie, THEN THE System_Email SHALL zwrócić odpowiedni komunikat błędu
6. THE System_Email SHALL walidować wszystkie wymagane pola (name, email, message) przed wysyłką

### Wymaganie 4: Strony podziękowania

**User Story:** Jako użytkownik, chcę zobaczyć stronę podziękowania po wysłaniu formularza, aby mieć pewność że moja wiadomość została wysłana.

#### Kryteria Akceptacji

1. THE System_Email SHALL utworzyć dedykowaną stronę podziękowania dla Formularz_Kontaktowy pod ścieżką `/thank-you/book-call` (en) i `/takk/bestill-samtale` (nb)
2. THE System_Email SHALL utworzyć dedykowaną stronę podziękowania dla Formularz_Prosty pod ścieżką `/thank-you/contact` (en) i `/takk/kontakt` (nb)
3. WHEN użytkownik jest przekierowany na Strona_Podziekowania, THEN THE System_Email SHALL wyświetlić treść w odpowiednim Locale
4. THE Strona_Podziekowania SHALL zawierać komunikat podziękowania i informację o dalszych krokach
5. THE Strona_Podziekowania SHALL zawierać link powrotny do strony głównej

### Wymaganie 5: Obsługa formularzy po stronie klienta

**User Story:** Jako użytkownik, chcę aby formularz został zresetowany i zostać przekierowany na stronę podziękowania po pomyślnym wysłaniu.

#### Kryteria Akceptacji

1. WHEN formularz jest wysyłany, THEN THE Formularz_Kontaktowy SHALL wyświetlić stan ładowania
2. WHEN wysyłka się powiedzie, THEN THE Formularz_Kontaktowy SHALL przekierować użytkownika na odpowiednią Strona_Podziekowania
3. IF wysyłka się nie powiedzie, THEN THE Formularz_Kontaktowy SHALL wyświetlić komunikat błędu
4. WHEN formularz jest wysyłany, THEN THE Formularz_Prosty SHALL wyświetlić stan ładowania
5. WHEN wysyłka się powiedzie, THEN THE Formularz_Prosty SHALL przekierować użytkownika na odpowiednią Strona_Podziekowania
6. IF wysyłka się nie powiedzie, THEN THE Formularz_Prosty SHALL wyświetlić komunikat błędu

### Wymaganie 6: Szablony e-maili

**User Story:** Jako właściciel strony, chcę otrzymywać profesjonalnie sformatowane e-maile z danymi formularzy.

#### Kryteria Akceptacji

1. THE Email_Potwierdzenia SHALL zawierać spersonalizowane podziękowanie dla nadawcy
2. THE Email_Potwierdzenia SHALL być wysłany w języku odpowiadającym Locale użytkownika
3. THE Email_Powiadomienia SHALL zawierać wszystkie dane przesłane w formularzu
4. THE Email_Powiadomienia SHALL zawierać informację o źródle formularza (book-call lub contact)
5. THE System_Email SHALL używać szablonów HTML dla e-maili z fallbackiem do plain text

### Wymaganie 7: Bezpieczeństwo

**User Story:** Jako właściciel strony, chcę aby system wysyłki e-maili był bezpieczny i chroniony przed nadużyciami.

#### Kryteria Akceptacji

1. THE System_Email SHALL walidować format adresu e-mail przed wysyłką
2. THE System_Email SHALL sanityzować wszystkie dane wejściowe przed użyciem w e-mailach
3. THE System_Email SHALL używać bezpiecznego połączenia SMTP (TLS/SSL)
4. IF dane formularza zawierają potencjalnie niebezpieczne treści, THEN THE System_Email SHALL je zneutralizować
