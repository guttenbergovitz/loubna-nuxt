<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/business-gift',
    nb: '/firmagaver'
  }
})

const localePath = useLocalePath()
</script>

<template>
  <main class="business-gift">
    <PageHero
      variant="plain"
      :headline="$t('businessGift.title')"
      :tagline="$t('businessGift.tagline')"
    />

    <!-- Intro Section -->
    <section class="business-gift__intro">
      <div class="o-container o-container--3xl">
        <h2 class="business-gift__intro-heading">{{ $t('businessGift.intro.heading') }}</h2>
        <p class="business-gift__intro-text">{{ $t('businessGift.intro.text') }}</p>
      </div>
    </section>

    <!-- Video Section -->
    <section class="business-gift__video" aria-label="Business gift video">
      <div class="o-container o-container--4xl">
        <p class="business-gift__video-intro">{{ $t('businessGift.video.intro') }}</p>
        <div class="business-gift__video-wrapper">
          <YouTubeVideo
            class="business-gift__video-player business-gift__video-player--portrait"
            :video-id="$t('businessGift.video.youtubeId')"
            :title="$t('businessGift.title')"
            aspect-ratio="portrait"
          />
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="business-gift__benefits">
      <div class="o-container o-container--3xl">
        <h2 class="business-gift__benefits-heading">{{ $t('businessGift.benefits.heading') }}</h2>
        <ul class="business-gift__benefits-list">
          <li class="business-gift__benefit-item">
            <Icon name="mdi:check-circle-outline" class="business-gift__benefit-icon" />
            <span>{{ $t('businessGift.benefits.item1') }}</span>
          </li>
          <li class="business-gift__benefit-item">
            <Icon name="mdi:check-circle-outline" class="business-gift__benefit-icon" />
            <span>{{ $t('businessGift.benefits.item2') }}</span>
          </li>
          <li class="business-gift__benefit-item">
            <Icon name="mdi:check-circle-outline" class="business-gift__benefit-icon" />
            <span>{{ $t('businessGift.benefits.item3') }}</span>
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
              :src="$t('businessGift.video.thumbnail')"
              alt="Business gift"
              class="business-gift__cta-photo"
              fit="cover"
            />
          </div>

          <div class="business-gift__cta-text">
            <h2 class="business-gift__cta-heading">{{ $t('businessGift.cta.heading') }}</h2>
            <p class="business-gift__cta-subtext">{{ $t('businessGift.cta.subtext') }}</p>
            <p class="business-gift__cta-promise">{{ $t('businessGift.cta.promise') }}</p>
            <p class="business-gift__cta-guarantee">{{ $t('businessGift.cta.guarantee') }}</p>
            <NuxtLink
              :to="localePath('book-a-call')"
              class="business-gift__cta-button"
            >
              {{ $t('businessGift.cta.button') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>
