<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/book-a-call',
    nb: '/bestill-en-samtale'
  }
})
</script>

<template>
  <main class="book-call">
    <PageHero
      variant="plain"
      :headline="$t('bookCall.title')"
      :tagline="$t('bookCall.intro')"
    />

    <section class="book-call__form-section" aria-label="Book a call form">
      <div class="o-container o-container--3xl">
        <ContactForm />
      </div>
    </section>

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>
