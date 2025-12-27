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
    <header class="book-call__header">
      <div class="o-container o-container--3xl">
        <h1 class="book-call__title">{{ $t('bookCall.title') }}</h1>
        <p class="book-call__intro">{{ $t('bookCall.intro') }}</p>
      </div>
    </header>

    <section class="book-call__form-section" aria-label="Book a call form">
      <div class="o-container o-container--3xl">
        <ContactForm />
      </div>
    </section>
  </main>
</template>
