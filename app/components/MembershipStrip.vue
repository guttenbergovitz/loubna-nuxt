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
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  color: var(--color-text-primary);
  opacity: 0.7;
  margin: 0 0 var(--space-lg);
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

.membership__logo {
  display: block;
  height: 72px;
  width: auto;
}

@media (max-width: 767px) {
  .membership__logo {
    height: 56px;
  }
}
</style>
