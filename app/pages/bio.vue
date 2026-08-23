<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/bio',
    nb: '/bio-nb'
  }
})

usePageSeo('bio')

const highlightsQuery = useContentByLocale('highlights')
const educationQuery = useContentByLocale('education')

const { data: highlights } = await useAsyncData('bio-highlights', () => highlightsQuery.fetchAll())
const { data: education } = await useAsyncData('bio-education', () => educationQuery.fetchAll())
</script>

<template>
  <main class="bio">
    <PageHero
      variant="plain"
      :headline="$t('bio.title')"
      :tagline="$t('bio.tagline')"
    />

    <!-- Highlights Section -->
    <section class="bio__highlights" aria-label="Professional Highlights">
      <div class="o-container">
        <h2 class="bio__highlights-title">{{ $t('bio.highlightsTitle') }}</h2>
        <p class="bio__section-intro">{{ $t('bio.highlightsIntro') }}</p>
        <BioTimeline :events="highlights as any" />
      </div>
    </section>

    <!-- Education Section -->
    <section class="bio__education" aria-label="Education">
      <div class="o-container">
        <h2 class="bio__education-title">{{ $t('bio.educationTitle') }}</h2>
        <p class="bio__section-intro">{{ $t('bio.educationIntro') }}</p>
        <BioTimeline :events="education as any" />
      </div>
    </section>

    <!-- Partners Gallery -->
    <PartnersGallery />

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>
