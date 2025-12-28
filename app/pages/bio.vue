<script setup lang="ts">
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
    const item: any = {
      date: t(`bio.highlights.${i}.date`),
      title: t(`bio.highlights.${i}.title`)
    }

    const role = t(`bio.highlights.${i}.role`)
    if (role && !role.startsWith('bio.')) item.role = role

    const organization = t(`bio.highlights.${i}.organization`)
    if (organization && !organization.startsWith('bio.')) item.organization = organization

    const location = t(`bio.highlights.${i}.location`)
    if (location && !location.startsWith('bio.')) item.location = location

    const description = t(`bio.highlights.${i}.description`)
    if (description && !description.startsWith('bio.')) item.description = description

    const image = t(`bio.highlights.${i}.image`)
    if (image && !image.startsWith('bio.') && !image.startsWith('/images/')) item.image = image
    else if (image && image.startsWith('/images/')) item.image = image

    items.push(item)
  }
  return items
})

const education = computed(() => {
  const items = []
  for (let i = 0; i < 3; i++) {
    const item: any = {
      date: t(`bio.education.${i}.date`),
      title: t(`bio.education.${i}.title`)
    }

    const field = t(`bio.education.${i}.field`)
    if (field && !field.startsWith('bio.')) item.field = field

    const location = t(`bio.education.${i}.location`)
    if (location && !location.startsWith('bio.')) item.location = location

    const degree = t(`bio.education.${i}.degree`)
    if (degree && !degree.startsWith('bio.')) item.degree = degree

    items.push(item)
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
        <p class="bio__section-intro">{{ $t('bio.highlightsIntro') }}</p>
        <BioTimeline :events="highlights" />
      </div>
    </section>

    <!-- Education Section -->
    <section class="bio__education" aria-label="Education">
      <div class="o-container">
        <h2 class="bio__education-title">{{ $t('bio.educationTitle') }}</h2>
        <p class="bio__section-intro">{{ $t('bio.educationIntro') }}</p>
        <BioTimeline :events="education" />
      </div>
    </section>

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>
