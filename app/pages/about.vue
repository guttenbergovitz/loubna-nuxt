<script setup lang="ts">
import RichText from '~/components/RichText.vue';

const localePath = useLocalePath()

defineI18nRoute({
  paths: {
    en: '/about',
    nb: '/om'
  }
})
</script>

<template>
  <main class="about">
    <!-- Header Section -->
    <PageHero
      variant="plain"
      :headline="$t('about.title')"
      :tagline="$t('about.greeting')"
    />

    <!-- Introduction 1 -->
    <section class="about__intro1">
      <div class="o-container o-container--3xl">
        <p class="about__intro1-prefix">{{ $t('about.intro1.prefix') }}</p>
        <h2 class="about__intro1-name">{{ $t('about.intro1.name') }}</h2>
      </div>
    </section>

    <!-- Introduction 2 -->
    <section class="about__intro2">
      <div class="o-container o-container--3xl">
        <p class="about__intro2-text">{{ $t('about.intro2') }}</p>
      </div>
    </section>

    <!-- Featured Photo Section -->
    <section class="about__featured">
      <div class="o-container o-container--5xl">
        <div class="about__featured-content">
          <div class="about__featured-image">
            <NuxtImg
              src="/images/deco/about/about_loubna.jpg"
              alt="Loubna Aleksandra Kubiak"
              class="about__featured-photo"
              fit="cover"
            />
          </div>

          <div class="about__featured-text">
            <p>{{ $t('about.bio.featured') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Collaborations Stripe -->
    <section class="about__collaborations-stripe">
      <div class="o-container o-container--3xl">
        <div class="about__collaborations-content">
          <svg class="about__collaborations-flag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160">
            <rect width="220" height="160" fill="#ef2b2d"/>
            <rect width="40" height="160" x="60" fill="#fff"/>
            <rect width="220" height="40" y="60" fill="#fff"/>
            <rect width="25" height="160" x="67.5" fill="#002868"/>
            <rect width="220" height="25" y="67.5" fill="#002868"/>
          </svg>
          <i18n-t keypath="about.bio.collaborations" tag="p" class="about__collaborations-text">
            <template #kulturtanken><strong>Kulturtanken</strong></template>
            <template #rogaland><strong>Rogaland {{ $i18n.locale === 'nb' ? 'Kunstsenter' : 'Art Center' }}</strong></template>
            <template #jaermuseet><strong>Jærmuseet</strong></template>
            <template #sandnes><strong>Sandnes</strong></template>
            <template #stavanger><strong>Stavanger</strong></template>
          </i18n-t>
        </div>
      </div>
    </section>

    <!-- Three Columns Section -->
    <section class="about__columns">
      <div class="o-container o-container--5xl">
        <div class="about__columns-grid">
          <div class="about__column">
            <div class="about__column-icon">
              <Icon name="mdi:briefcase-outline" />
            </div>
            <p>{{ $t('about.bio.freelance') }}</p>
          </div>
          <div class="about__column">
            <div class="about__column-icon">
              <Icon name="mdi:school-outline" />
            </div>
            <p>{{ $t('about.bio.workshops') }}</p>
          </div>
          <div class="about__column">
            <div class="about__column-icon">
              <Icon name="mdi:account-group-outline" />
            </div>
            <p>{{ $t('about.bio.coordination') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bio Link Section -->
    <section class="about__bio-link">
      <div class="o-container o-container--3xl">
        <h2 class="about__bio-link-heading">{{ $t('about.bioLink.heading') }}</h2>
        <p class="about__bio-link-text">{{ $t('about.bioLink.text') }}</p>
        <NuxtLink :to="localePath('/bio')" class="about__bio-link-button">
          {{ $t('about.bioLink.button') }}
        </NuxtLink>
      </div>
    </section>

    <!-- Challenge Section -->
    <section class="about__challenge">
      <div class="o-container o-container--3xl">
        <h2 class="about__challenge-heading">{{ $t('about.challenge.heading') }}</h2>
        <p class="about__challenge-text">{{ $t('about.challenge.text') }}</p>
        <p class="about__challenge-footnote">{{ $t('about.challenge.footnote') }}</p>
      </div>
    </section>

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>