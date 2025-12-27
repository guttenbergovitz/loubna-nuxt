<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/contact',
    nb: '/kontakt'
  }
})
</script>

<template>
  <main class="contact">
    <header class="contact__header">
      <div class="o-container o-container--3xl">
        <h1 class="contact__title">{{ $t('contact.title') }}</h1>
        <p class="contact__intro">{{ $t('contact.intro') }}</p>
      </div>
    </header>

    <section class="contact__form-section" aria-label="Contact form">
      <div class="o-container o-container--3xl">
        <SimpleContactForm />
      </div>
    </section>
  </main>
</template>