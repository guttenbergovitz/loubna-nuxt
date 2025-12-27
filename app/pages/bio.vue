<script setup lang="ts">
import Timeline from 'primevue/timeline'

defineI18nRoute({
  paths: {
    en: '/bio',
    nb: '/bio-nb'
  }
})

const highlights = computed(() => $tm('bio.highlights'))
const education = computed(() => $tm('bio.education'))
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
      <Timeline :value="highlights" align="alternate" class="bio__timeline">
        <template #content="slotProps">
          <article class="bio__event">
            <h3 class="bio__event-title">{{ slotProps.item.title }}</h3>
            <p v-if="slotProps.item.role" class="bio__event-role">{{ slotProps.item.role }}</p>
            <p v-if="slotProps.item.organization" class="bio__event-organization">{{ slotProps.item.organization }}</p>
            <p v-if="slotProps.item.location" class="bio__event-location">{{ slotProps.item.location }}</p>
            <p class="bio__event-description">{{ slotProps.item.description }}</p>
          </article>
        </template>
        <template #opposite="slotProps">
          <time class="bio__event-date" :datetime="slotProps.item.date">
            {{ slotProps.item.date }}
          </time>
        </template>
      </Timeline>
    </section>

    <!-- Education Section -->
    <section class="bio__education" aria-label="Education">
      <h2 class="bio__education-title">{{ $t('bio.educationTitle') }}</h2>
      <Timeline :value="education" align="alternate" class="bio__timeline">
        <template #content="slotProps">
          <article class="bio__event">
            <h3 class="bio__event-title">{{ slotProps.item.title }}</h3>
            <p v-if="slotProps.item.field" class="bio__event-field">{{ slotProps.item.field }}</p>
            <p v-if="slotProps.item.location" class="bio__event-location">{{ slotProps.item.location }}</p>
            <p class="bio__event-degree">{{ slotProps.item.degree }}</p>
          </article>
        </template>
        <template #opposite="slotProps">
          <time class="bio__event-date" :datetime="slotProps.item.date">
            {{ slotProps.item.date }}
          </time>
        </template>
      </Timeline>
    </section>
  </main>
</template>
