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
    <PageHero
      variant="plain"
      :headline="$t('contact.title')"
      :tagline="$t('contact.intro')"
    />

    <section class="contact__form-section" aria-label="Contact form">
      <div class="o-container o-container--3xl">
        <SimpleContactForm />
      </div>
    </section>
  </main>
</template>