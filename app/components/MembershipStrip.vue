<script setup lang="ts">
const { t } = useI18n()

const memberships = [
  {
    name: 'Forbundet Frie Fotografer',
    image: '/images/partners/forbundet_frie_fotografer.webp',
    alt: 'Forbundet Frie Fotografer logo'
  },
  {
    name: 'Norges Fotografforbund',
    image: '/images/partners/norges_fotografforbund.webp',
    alt: 'Norges Fotografforbund logo'
  }
]
</script>

<template>
  <section class="membership" aria-label="Memberships">
    <div class="o-container">
      <p class="membership__heading">{{ t('membership.heading') }}</p>
      <ul class="membership__list">
        <li v-for="org in memberships" :key="org.name" class="membership__item">
          <NuxtImg :src="org.image" :alt="org.alt" class="membership__logo" loading="lazy" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.membership {
  padding: var(--space-xl) 0;
  background-color: var(--color-background-primary);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.membership__heading {
  font-family: var(--font-family-heading);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: var(--font-weight-normal);
  font-style: italic;
  text-align: center;
  color: var(--color-text-primary);
  opacity: 0.75;
  max-width: none;
  margin: 0 auto var(--space-fluid-xl);
}

.membership__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--space-xl);
  list-style: none;
  margin: 0;
  padding: 0;
}

.membership__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 140px;
}

.membership__logo {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

@media (max-width: 767px) {
  .membership__item {
    width: 200px;
    height: 100px;
  }
}
</style>
