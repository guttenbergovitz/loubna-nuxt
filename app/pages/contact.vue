<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/contact',
    nb: '/kontakt'
  }
})

usePageSeo('contact')

const singletonsQuery = useContentByLocale('singletons')
const { data: contact } = await useAsyncData('contact-singleton', () => singletonsQuery.fetchByName('contact'))

const { data: secondaryGallery } = await useAsyncData('contact-gallery', () =>
  queryCollection('galleryImages').where('group', '=', 'secondary').order('sort', 'ASC').all())
</script>

<template>
  <main class="contact">
    <PageHero
      variant="plain"
      :headline="contact?.title ?? ''"
      :tagline="contact?.tagline ?? ''"
    />

    <!-- Intro Section -->
    <section class="contact__intro">
      <div class="o-container o-container--3xl">
        <h2 class="contact__intro-heading">{{ contact?.sections?.intro?.heading ?? '' }}</h2>
        <p class="contact__intro-subtext">{{ contact?.sections?.intro?.subtext ?? '' }}</p>
      </div>
    </section>

    <!-- Form Section -->
    <section class="contact__form-section" aria-label="Contact form">
      <div class="o-container o-container--4xl">
        <SimpleContactForm />
      </div>
    </section>

    <!-- Gallery -->
    <section class="contact__gallery" aria-label="Photography gallery">
      <div class="o-container o-container--full">
        <PhotoGallery :images="secondaryGallery ?? []" :columns="3" />
      </div>
    </section>

    <!-- Partners Gallery -->
    <PartnersGallery />

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>