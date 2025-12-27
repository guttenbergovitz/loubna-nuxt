<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/contact',
    nb: '/kontakt'
  }
})
</script>

<template>
  <div>
    <h1>{{ $t('contact.title') }}</h1>
    <p>{{ $t('contact.intro') }}</p>
  </div>
</template>