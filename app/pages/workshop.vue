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
        <ul class="workshop__whats-on-list">
          <li
            v-for="(activity, index) in $tm('workshop.whatsOn.activities')"
            :key="index"
            class="workshop__whats-on-activity"
          >
            {{ $rt(activity) }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Form Section -->
    <section id="workshop-form" class="workshop__form-section">
      <div class="o-container o-container--4xl">
        <h2 class="workshop__form-heading">{{ $t('workshop.form.heading') }}</h2>
        <p class="workshop__form-subtext">{{ $t('workshop.form.subtext') }}</p>
        <WorkshopForm />
      </div>
    </section>

    <!-- Partners Gallery -->
    <PartnersGallery />

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>
