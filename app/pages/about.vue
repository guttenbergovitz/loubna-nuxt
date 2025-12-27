<script setup lang="ts">
import RichText from '~/components/RichText.vue';

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
    <header class="about__header">
      <h1 class="about__title">{{ $t('about.title') }}</h1>
      <p class="about__greeting">{{ $t('about.greeting') }}</p>
    </header>

    <!-- Bio Section -->
    <section class="about__bio" aria-label="Biography">
      <RichText class="about__bio-intro" :content="$t('about.bio.intro')" />

      <RichText
        v-if="$t('about.bio.freelance')"
        class="about__bio-freelance"
        :content="$t('about.bio.freelance')"
      />

      <RichText class="about__bio-workshops" :content="$t('about.bio.workshops')" />

      <RichText
        v-if="$t('about.bio.collaborations')"
        class="about__bio-collaborations"
        :content="$t('about.bio.collaborations')"
      />

      <RichText class="about__bio-coordination" :content="$t('about.bio.coordination')" />
    </section>

    <!-- Challenge Section -->
    <section class="about__challenge">
      <h2 class="about__challenge-heading">{{ $t('about.challenge.heading') }}</h2>
      <p class="about__challenge-text">{{ $t('about.challenge.text') }}</p>
      <p class="about__challenge-footnote">{{ $t('about.challenge.footnote') }}</p>
    </section>
  </main>
</template>