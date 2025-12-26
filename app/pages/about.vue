<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/about',
    nb: '/om'
  }
})
</script>

<template>
  <div>
    <h1>{{ $t('about.title') }}</h1>
    <p>{{ $t('about.content') }}</p>
  </div>
</template>