<script setup lang="ts">
import RichText from '~/components/RichText.vue';

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
    <RichText :content="$t('about.content')" />
  </div>
</template>