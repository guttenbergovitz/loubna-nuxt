<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/book-a-call',
    nb: '/bestill-en-samtale'
  }
})

usePageSeo('bookACall')

const singletonsQuery = useContentByLocale('singletons')
const { data: bookCall } = await useAsyncData('book-call-singleton', () => singletonsQuery.fetchByName('book-a-call'))

const { data: secondaryGallery } = await useAsyncData('book-call-gallery', () =>
  queryCollection('galleryImages').where('group', '=', 'secondary').order('sort', 'ASC').all())
</script>

<template>
  <main class="book-call">
    <PageHero
      variant="plain"
      :headline="bookCall?.title ?? $t('bookCall.title')"
      :tagline="bookCall?.tagline ?? $t('bookCall.intro')"
    />

    <!-- Process Intro Section -->
    <section class="book-call__intro">
      <div class="o-container o-container--3xl">
        <h2 class="book-call__intro-heading">{{ bookCall?.sections?.process?.heading ?? $t('bookCall.process.heading') }}</h2>
        <p class="book-call__intro-subtext">{{ bookCall?.sections?.process?.subtext ?? $t('bookCall.process.subtext') }}</p>
      </div>
    </section>

    <!-- Form Section -->
    <section class="book-call__form-section" aria-label="Book a call form">
      <div class="o-container o-container--4xl">
        <ContactForm />
      </div>
    </section>

    <!-- Gallery -->
    <section class="book-call__gallery" aria-label="Photography gallery">
      <div class="o-container o-container--full">
        <PhotoGallery :images="secondaryGallery ?? []" :columns="3" />
      </div>
    </section>

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>
