<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/contact',
    nb: '/kontakt'
  }
})

usePageSeo('contact')

const secondaryGalleryImages = [
  { src: '/images/gallery/home-small-gallery/hsg1.jpg', alt: 'Gallery detail - fine art photograph portfolio' },
  { src: '/images/gallery/home-small-gallery/hsg2.png', alt: 'Gallery detail - artisanal photography collection' },
  { src: '/images/gallery/home-small-gallery/hsg3.png', alt: 'Gallery detail - handcrafted print samples' }
]
</script>

<template>
  <main class="contact">
    <PageHero
      variant="plain"
      :headline="$t('contact.title')"
      :tagline="$t('contact.intro')"
    />

    <!-- Intro Section -->
    <section class="contact__intro">
      <div class="o-container o-container--3xl">
        <h2 class="contact__intro-heading">{{ $t('contact.introExtended.heading') }}</h2>
        <p class="contact__intro-subtext">{{ $t('contact.introExtended.subtext') }}</p>
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
        <PhotoGallery :images="secondaryGalleryImages" :columns="3" />
      </div>
    </section>

    <!-- Partners Gallery -->
    <PartnersGallery />

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>