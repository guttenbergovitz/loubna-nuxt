<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/workshop',
    nb: '/workshop-nb'
  }
})

const localePath = useLocalePath()
</script>

<template>
  <main class="workshop">
    <PageHero
      variant="plain"
      :headline="$t('workshop.title')"
      :tagline="$t('workshop.tagline')"
    />

    <!-- Intro Section -->
    <section class="workshop__intro">
      <div class="o-container o-container--3xl">
        <p class="workshop__intro-question">{{ $t('workshop.intro.question') }}</p>
        <p class="workshop__intro-alternative">{{ $t('workshop.intro.alternative') }}</p>
      </div>
    </section>

    <!-- Video Section -->
    <section class="workshop__video" aria-label="Workshop video">
      <div class="o-container o-container--4xl">
        <p class="workshop__video-intro">{{ $t('workshop.video.intro') }}</p>
        <YouTubeVideo
          class="workshop__video-player"
          :video-id="$t('workshop.video.youtubeId')"
          :title="$t('workshop.title')"
        />
      </div>
    </section>

    <!-- What's On Section -->
    <section class="workshop__whats-on">
      <div class="o-container o-container--3xl">
        <h2 class="workshop__whats-on-heading">{{ $t('workshop.whatsOn.heading') }}</h2>
        <p class="workshop__whats-on-activity">{{ $t('workshop.whatsOn.activity') }}</p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="workshop__cta">
      <div class="o-container o-container--4xl">
        <h2 class="workshop__cta-heading">{{ $t('workshop.consultation.heading') }}</h2>
        <p class="workshop__cta-subtext">{{ $t('workshop.consultation.subtext') }}</p>
        <NuxtLink
          :to="localePath('contact')"
          class="workshop__cta-button"
        >
          {{ $t('workshop.consultation.button') }}
        </NuxtLink>
      </div>
    </section>

    <!-- Partners Gallery -->
    <PartnersGallery />

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>
