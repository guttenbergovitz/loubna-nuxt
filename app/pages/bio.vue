<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/bio',
    nb: '/bio-nb'
  }
})
</script>

<template>
  <main class="bio">
    <!-- Header Section -->
    <header class="bio__header">
      <h1 class="bio__title">{{ $t('bio.title') }}</h1>
    </header>

    <!-- Highlights Section -->
    <section class="bio__highlights" aria-label="Professional Highlights">
      <h2 class="bio__highlights-title">{{ $t('bio.highlightsTitle') }}</h2>
      <ul class="bio__timeline">
        <li
          v-for="(highlight, index) in $tm('bio.highlights')"
          :key="index"
          class="bio__timeline-item"
        >
          <article class="bio__event">
            <time class="bio__event-date" :datetime="highlight.date">
              {{ highlight.date }}
            </time>
            <h3 class="bio__event-title">{{ highlight.title }}</h3>
            <p v-if="highlight.role" class="bio__event-role">{{ highlight.role }}</p>
            <p v-if="highlight.organization" class="bio__event-organization">{{ highlight.organization }}</p>
            <p v-if="highlight.location" class="bio__event-location">{{ highlight.location }}</p>
            <p class="bio__event-description">{{ highlight.description }}</p>
          </article>
        </li>
      </ul>
    </section>

    <!-- Education Section -->
    <section class="bio__education" aria-label="Education">
      <h2 class="bio__education-title">{{ $t('bio.educationTitle') }}</h2>
      <ul class="bio__timeline">
        <li
          v-for="(edu, index) in $tm('bio.education')"
          :key="index"
          class="bio__timeline-item"
        >
          <article class="bio__event">
            <time class="bio__event-date" :datetime="edu.date">
              {{ edu.date }}
            </time>
            <h3 class="bio__event-title">{{ edu.title }}</h3>
            <p v-if="edu.field" class="bio__event-field">{{ edu.field }}</p>
            <p v-if="edu.location" class="bio__event-location">{{ edu.location }}</p>
            <p class="bio__event-degree">{{ edu.degree }}</p>
          </article>
        </li>
      </ul>
    </section>
  </main>
</template>
