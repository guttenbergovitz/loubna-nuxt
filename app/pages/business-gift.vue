<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/business-gift',
    nb: '/firmagaver'
  }
})

usePageSeo('businessGift')

const singletonsQuery = useContentByLocale('singletons')
const { data: businessGift } = await useAsyncData('business-gift-singleton', () => singletonsQuery.fetchByName('business-gift'))

const localePath = useLocalePath()
</script>

<template>
  <main class="business-gift">
    <PageHero
      variant="plain"
      :headline="businessGift?.title ?? ''"
      :tagline="businessGift?.tagline ?? ''"
    />

    <!-- Intro Section -->
    <section class="business-gift__intro">
      <div class="o-container o-container--3xl">
        <h2 class="business-gift__intro-heading">{{ businessGift?.sections?.intro?.heading ?? '' }}</h2>
        <p class="business-gift__intro-text">{{ businessGift?.sections?.intro?.text ?? '' }}</p>
      </div>
    </section>

    <!-- Video Section -->
    <section class="business-gift__video" aria-label="Business gift video">
      <div class="o-container o-container--4xl">
        <p class="business-gift__video-intro">{{ businessGift?.sections?.video?.intro ?? '' }}</p>
        <div class="business-gift__video-wrapper">
          <YouTubeVideo
            class="business-gift__video-player business-gift__video-player--portrait"
            :video-id="businessGift?.sections?.video?.youtubeId ?? ''"
            :title="businessGift?.title ?? ''"
            aspect-ratio="portrait"
          />
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="business-gift__benefits">
      <div class="o-container o-container--3xl">
        <h2 class="business-gift__benefits-heading">{{ businessGift?.sections?.benefits?.heading ?? '' }}</h2>
        <ul class="business-gift__benefits-list">
          <li v-for="(item, index) in (businessGift?.sections?.benefits?.items ?? [])" :key="index" class="business-gift__benefit-item">
            <Icon name="mdi:check-circle-outline" class="business-gift__benefit-icon" />
            <span>{{ typeof item === 'string' ? item : $rt(item) }}</span>
          </li>
        </ul>
      </div>
    </section>


    <!-- CTA Section -->
    <section class="business-gift__cta">
      <div class="o-container o-container--5xl">
        <div class="business-gift__cta-content">
          <div class="business-gift__cta-image">
            <NuxtImg
              :src="businessGift?.sections?.video?.thumbnail ?? ''"
              alt="Business gift"
              class="business-gift__cta-photo"
              fit="cover"
            />
          </div>

          <div class="business-gift__cta-text">
            <h2 class="business-gift__cta-heading">{{ businessGift?.sections?.cta?.heading ?? '' }}</h2>
            <p class="business-gift__cta-subtext">{{ businessGift?.sections?.cta?.subtext ?? '' }}</p>
            <p class="business-gift__cta-promise">{{ businessGift?.sections?.cta?.promise ?? '' }}</p>
            <p class="business-gift__cta-guarantee">{{ businessGift?.sections?.cta?.guarantee ?? '' }}</p>
            <NuxtLink
              :to="localePath('book-a-call')"
              class="business-gift__cta-button"
            >
              {{ businessGift?.sections?.cta?.button ?? '' }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Gallery -->
    <PartnersGallery />

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>
