<template>
  <footer class="footer">
    <div class="footer__container">
      <p class="footer__tagline">{{ $t('footer.tagline') }}</p>

      <div class="footer__contact">
        <a :href="`mailto:${$t('footer.email')}`" class="footer__contact-link">
          {{ $t('footer.email') }}
        </a>
        <a :href="`tel:${$t('footer.phone')}`" class="footer__contact-link">
          {{ $t('footer.phone') }}
        </a>
      </div>

      <nav class="footer__social" aria-label="Social media links">
        <a
          href="https://facebook.com/loubnaphoto"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__social-link"
          :aria-label="$t('footer.social.facebook')"
        >
          {{ $t('footer.social.facebook') }}
        </a>
        <a
          href="https://youtube.com/@loubnaphoto"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__social-link"
          :aria-label="$t('footer.social.youtube')"
        >
          {{ $t('footer.social.youtube') }}
        </a>
        <a
          href="https://instagram.com/loubnaphoto"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__social-link"
          :aria-label="$t('footer.social.instagram')"
        >
          {{ $t('footer.social.instagram') }}
        </a>
        <a
          href="https://x.com/loubnaphoto"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__social-link"
          :aria-label="$t('footer.social.x')"
        >
          {{ $t('footer.social.x') }}
        </a>
        <a
          href="https://linkedin.com/company/loubnaphoto"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__social-link"
          :aria-label="$t('footer.social.linkedin')"
        >
          {{ $t('footer.social.linkedin') }}
        </a>
      </nav>
    </div>
  </footer>
</template>