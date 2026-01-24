<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/thank-you/book-call',
    nb: '/takk/bestill-samtale'
  }
})

const localePath = useLocalePath()
</script>

<template>
  <main class="thank-you">
    <section class="thank-you__content">
      <div class="o-container o-container--2xl">
        <div class="thank-you__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h1 class="thank-you__title">{{ $t('thankYou.bookCall.title') }}</h1>
        <p class="thank-you__message">{{ $t('thankYou.bookCall.message') }}</p>
        <p class="thank-you__next-steps">{{ $t('thankYou.bookCall.nextSteps') }}</p>
        <NuxtLink :to="localePath('/')" class="thank-you__back-link">
          {{ $t('thankYou.bookCall.backHome') }}
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.thank-you {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) var(--space-4);
}

.thank-you__content {
  text-align: center;
}

.thank-you__icon {
  color: var(--color-success, #22c55e);
  margin-bottom: var(--space-6);
}

.thank-you__icon svg {
  width: 64px;
  height: 64px;
}

.thank-you__title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--color-text-primary);
}

.thank-you__message {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.thank-you__next-steps {
  font-size: var(--font-size-base);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-8);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.thank-you__back-link {
  display: inline-block;
  padding: var(--space-3) var(--space-6);
  background-color: var(--color-primary);
  color: var(--color-text-on-primary, white);
  text-decoration: none;
  border-radius: var(--border-radius-md, 4px);
  font-weight: var(--font-weight-medium);
  transition: background-color 0.2s ease;
}

.thank-you__back-link:hover {
  background-color: var(--color-primary-dark, var(--color-primary));
  opacity: 0.9;
}
</style>
