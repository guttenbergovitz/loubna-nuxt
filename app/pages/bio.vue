<script setup lang="ts">
import Timeline from 'primevue/timeline'

defineI18nRoute({
  paths: {
    en: '/bio',
    nb: '/bio-nb'
  }
})

const { t } = useI18n()

const highlights = computed(() => {
  const items = []
  for (let i = 0; i < 13; i++) {
    items.push({
      date: t(`bio.highlights.${i}.date`),
      title: t(`bio.highlights.${i}.title`),
      role: t(`bio.highlights.${i}.role`),
      organization: t(`bio.highlights.${i}.organization`),
      location: t(`bio.highlights.${i}.location`),
      description: t(`bio.highlights.${i}.description`)
    })
  }
  return items
})

const education = computed(() => {
  const items = []
  for (let i = 0; i < 3; i++) {
    items.push({
      date: t(`bio.education.${i}.date`),
      title: t(`bio.education.${i}.title`),
      field: t(`bio.education.${i}.field`),
      location: t(`bio.education.${i}.location`),
      degree: t(`bio.education.${i}.degree`)
    })
  }
  return items
})
</script>

<template>
  <main class="bio">
    <PageHero
      variant="plain"
      :headline="$t('bio.title')"
      :tagline="$t('bio.tagline')"
    />

    <!-- Highlights Section -->
    <section class="bio__highlights" aria-label="Professional Highlights">
      <div class="o-container">
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
      </div>
    </section>

    <!-- Education Section -->
    <section class="bio__education" aria-label="Education">
      <div class="o-container">
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
      </div>
    </section>

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>
