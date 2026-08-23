<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/workshop',
    nb: '/workshop-nb'
  }
})

usePageSeo('workshop')

const singletonsQuery = useContentByLocale('singletons')
const { data: workshop } = await useAsyncData('workshop-singleton', () => singletonsQuery.fetchByName('workshop'))

</script>

<template>
  <main class="workshop">
    <PageHero
      variant="plain"
      :headline="workshop?.title ?? ''"
      :tagline="workshop?.tagline ?? ''"
    />

    <!-- Intro Section -->
    <section class="workshop__intro">
      <div class="o-container o-container--3xl">
        <p class="workshop__intro-question">{{ workshop?.sections?.intro?.question ?? '' }}</p>
        <p class="workshop__intro-alternative">{{ workshop?.sections?.intro?.alternative ?? '' }}</p>
      </div>
    </section>

    <!-- Video Section -->
    <section class="workshop__video" aria-label="Workshop video">
      <div class="o-container o-container--4xl">
        <p class="workshop__video-intro">{{ workshop?.sections?.video?.intro ?? '' }}</p>
        <YouTubeVideo
          class="workshop__video-player"
          :video-id="workshop?.sections?.video?.youtubeId ?? ''"
          :title="workshop?.title ?? ''"
        />
      </div>
    </section>

    <!-- What's On Section -->
    <section class="workshop__whats-on">
      <div class="o-container o-container--3xl">
        <h2 class="workshop__whats-on-heading">{{ workshop?.sections?.whatsOn?.heading ?? '' }}</h2>
        <ul class="workshop__whats-on-list">
          <li
            v-for="(activity, index) in (workshop?.sections?.whatsOn?.activities ?? [])"
            :key="index"
            class="workshop__whats-on-activity"
          >
            {{ typeof activity === 'string' ? activity : $rt(activity) }}
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
