<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/stavanger',
    nb: '/stavanger'
  }
})

usePageSeo('stavanger')

const localePath = useLocalePath()

const galleryImages = [
  { src: '/images/bio/follow_the_sun_exhibition.jpg', alt: 'Follow the Sun exhibition at Cafe Sting, Stavanger' },
  { src: '/images/bio/foto_loft_tou.jpg', alt: 'Foto Loft at Alt for barn festival, Tou' },
  { src: '/images/bio/dks_lab_camera_obscura.webp', alt: 'Camera obscura workshop at DKS Lab, Stavanger' },
  { src: '/images/bio/varatun_gard_workshop.jpg', alt: 'Photo workshop at Varatun Gård, Sandnes' },
  { src: '/images/bio/garborgsenteret_camera_obscura.webp', alt: 'Giant camera at Garborgsenteret, Bryne' }
]
</script>

<template>
  <main class="stavanger">
    <PageHero
      variant="plain"
      :headline="$t('stavanger.title')"
      :tagline="$t('stavanger.tagline')"
    />

    <section class="stavanger__letter">
      <div class="o-container o-container--3xl">
        <h2 class="stavanger__heading stavanger__letter-heading">{{ $t('stavanger.letter.heading') }}</h2>
        <p class="stavanger__letter-subline">{{ $t('stavanger.letter.subline') }}</p>
        <div class="stavanger__letter-body">
          <p v-for="(paragraph, index) in $tm('stavanger.letter.paragraphs')" :key="index">
            {{ $rt(paragraph) }}
          </p>
          <p class="stavanger__signature">{{ $t('stavanger.letter.signature') }}</p>
        </div>
      </div>
    </section>

    <section class="stavanger__gallery">
      <div class="o-container o-container--5xl">
        <h2 class="stavanger__heading">{{ $t('stavanger.gallery.heading') }}</h2>
        <ul class="stavanger__gallery-grid">
          <li
            v-for="(caption, index) in $tm('stavanger.gallery.items')"
            :key="index"
            class="stavanger__gallery-item"
          >
            <figure>
              <NuxtImg
                :src="galleryImages[index]?.src"
                :alt="galleryImages[index]?.alt"
                class="stavanger__gallery-image"
                loading="lazy"
              />
              <figcaption class="stavanger__gallery-caption">{{ $rt(caption) }}</figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </section>

    <section class="stavanger__collaborators">
      <div class="o-container o-container--3xl">
        <h2 class="stavanger__heading">{{ $t('stavanger.collaborators.heading') }}</h2>
        <ul class="stavanger__collaborators-list">
          <li
            v-for="(item, index) in $tm('stavanger.collaborators.items')"
            :key="index"
            class="stavanger__collaborators-item"
          >
            {{ $rt(item) }}
          </li>
        </ul>
        <div class="stavanger__actions">
          <NuxtLink :to="localePath('workshop')" class="stavanger__action">
            {{ $t('stavanger.ctaWorkshop') }}
          </NuxtLink>
          <NuxtLink :to="localePath('contact')" class="stavanger__action">
            {{ $t('stavanger.ctaContact') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <PartnersGallery />
  </main>
</template>

<style scoped>
.stavanger__letter {
  padding: var(--space-fluid-2xl) 0 var(--space-fluid-xl);
}

.stavanger__heading {
  font-family: var(--font-family-heading);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-style: italic;
  font-weight: var(--font-weight-normal);
  text-align: center;
  margin-bottom: var(--space-lg);
}

.stavanger__letter-heading {
  font-size: clamp(2rem, 5vw, 3.25rem);
  margin-top: calc(-1 * var(--space-lg));
  margin-bottom: var(--space-xs);
  transform: rotate(-3deg);
}

.stavanger__letter-subline {
  max-width: none;
  margin-bottom: var(--space-xl);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-sm);
  font-style: italic;
  text-align: center;
  opacity: 0.7;
}

.stavanger__letter-body {
  max-width: 40rem;
  margin-inline: auto;
  font-size: var(--font-size-md);
  line-height: 1.8;
}

.stavanger__letter-body p {
  max-width: none;
  text-wrap: pretty;
  hyphens: auto;
}

.stavanger__letter-body > p:first-of-type::first-letter {
  float: left;
  margin: 0.08em 0.12em 0 0;
  font-family: var(--font-family-heading);
  font-size: 3.6em;
  line-height: 0.85;
  font-style: italic;
}

.stavanger__signature {
  font-family: var(--font-family-heading);
  font-style: italic;
  text-align: right;
  margin-top: var(--space-lg);
}

.stavanger__gallery {
  padding: var(--space-fluid-xl) 0;
}

.stavanger__gallery-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  columns: 2 260px;
  column-gap: var(--space-lg);
}

.stavanger__gallery-item {
  break-inside: avoid;
  margin-bottom: var(--space-lg);
}

.stavanger__gallery-item figure {
  margin: 0;
}

.stavanger__gallery-image {
  display: block;
  width: 100%;
  height: auto;
}

.stavanger__gallery-caption {
  margin-top: var(--space-xs);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xs);
  font-style: italic;
  opacity: 0.6;
}

.stavanger__collaborators {
  padding: var(--space-fluid-xl) 0;
}

.stavanger__collaborators-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-sm) var(--space-md);
}

.stavanger__collaborators-item {
  padding: var(--space-xs) var(--space-md);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 999px;
  font-size: var(--font-size-sm);
}

.stavanger__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.stavanger__action {
  text-decoration: underline;
}
</style>
