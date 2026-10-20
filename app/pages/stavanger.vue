<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/stavanger',
    nb: '/stavanger'
  }
})

usePageSeo('stavanger')

const localePath = useLocalePath()
</script>

<template>
  <main class="stavanger">
    <PageHero
      variant="plain"
      :headline="$t('stavanger.title')"
      :tagline="$t('stavanger.tagline')"
    />

    <section class="stavanger__intro">
      <div class="o-container o-container--3xl">
        <p class="stavanger__intro-text">{{ $t('stavanger.intro') }}</p>
      </div>
    </section>

    <section class="stavanger__projects">
      <div class="o-container o-container--3xl">
        <h2 class="stavanger__projects-heading">{{ $t('stavanger.projectsHeading') }}</h2>
        <ul class="stavanger__projects-list">
          <li
            v-for="(project, index) in $tm('stavanger.projects')"
            :key="index"
            class="stavanger__projects-item"
          >
            {{ $rt(project) }}
          </li>
        </ul>
        <div class="stavanger__actions">
          <NuxtLink :to="localePath('workshop')" class="stavanger__action">
            {{ $t('stavanger.ctaWorkshop') }}
          </NuxtLink>
          <NuxtLink :to="localePath('contact')" class="stavanger__action">
            {{ $t('stavanger.ctaContact') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <PartnersGallery />
  </main>
</template>

<style scoped>
.stavanger__intro {
  padding: var(--space-fluid-xl) 0 0;
}

.stavanger__intro-text {
  font-size: var(--font-size-md);
  text-align: center;
  margin-inline: auto;
}

.stavanger__projects {
  padding: var(--space-fluid-xl) 0;
}

.stavanger__projects-heading {
  font-family: var(--font-family-heading);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-style: italic;
  font-weight: var(--font-weight-normal);
  text-align: center;
  margin-bottom: var(--space-lg);
}

.stavanger__projects-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-md);
}

.stavanger__projects-item {
  padding-left: var(--space-md);
  border-left: 2px solid rgba(0, 0, 0, 0.15);
}

.stavanger__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.stavanger__action {
  text-decoration: underline;
}
</style>
