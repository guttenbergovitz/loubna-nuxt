<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/book-a-call',
    nb: '/bestill-en-samtale'
  }
})

const secondaryGalleryImages = [
  { src: '/images/gallery/home-small-gallery/hsg1.jpg', alt: 'Photography by Loubna Photo' },
  { src: '/images/gallery/home-small-gallery/hsg2.png', alt: 'Photography by Loubna Photo' },
  { src: '/images/gallery/home-small-gallery/hsg3.png', alt: 'Photography by Loubna Photo' }
]
</script>

<template>
  <main class="book-call">
    <PageHero
      variant="plain"
      :headline="$t('bookCall.title')"
      :tagline="$t('bookCall.intro')"
    />

    <!-- Process Intro Section -->
    <section class="book-call__intro">
      <div class="o-container o-container--3xl">
        <h2 class="book-call__intro-heading">{{ $t('bookCall.process.heading') }}</h2>
        <p class="book-call__intro-subtext">{{ $t('bookCall.process.subtext') }}</p>
      </div>
    </section>

    <!-- Form Section -->
    <section class="book-call__form-section" aria-label="Book a call form">
      <div class="o-container o-container--3xl">
        <ContactForm />
      </div>
    </section>

    <!-- Gallery -->
    <section class="book-call__gallery" aria-label="Photography gallery">
      <div class="o-container o-container--full">
        <PhotoGallery :images="secondaryGalleryImages" :columns="3" />
      </div>
    </section>

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>
