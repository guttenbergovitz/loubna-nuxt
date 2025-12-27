<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/workshop',
    nb: '/workshop-nb'
  }
})
</script>

<template>
  <main class="workshop">
    <!-- Header Section -->
    <header class="workshop__header">
      <h1 class="workshop__title">{{ $t('workshop.title') }}</h1>
    </header>

    <!-- Intro Section -->
    <section class="workshop__intro">
      <p class="workshop__intro-question">{{ $t('workshop.intro.question') }}</p>
      <p class="workshop__intro-alternative">{{ $t('workshop.intro.alternative') }}</p>
    </section>

    <!-- Video Section -->
    <section class="workshop__video" aria-label="Workshop video">
      <p class="workshop__video-intro">{{ $t('workshop.video.intro') }}</p>
      <YouTubeVideo
        class="workshop__video-player"
        :video-id="$t('workshop.video.youtubeId')"
        :title="$t('workshop.title')"
      />
    </section>

    <!-- What's On Section -->
    <section class="workshop__whats-on">
      <h2 class="workshop__whats-on-heading">{{ $t('workshop.whatsOn.heading') }}</h2>
      <p class="workshop__whats-on-activity">{{ $t('workshop.whatsOn.activity') }}</p>
    </section>
  </main>
</template>
