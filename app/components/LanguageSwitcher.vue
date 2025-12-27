
<script lang="ts" setup>
  const { locale, locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()

  const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
  })
</script>

<template>
    <NuxtLink v-for="l in availableLocales" :key="l.code" :to="switchLocalePath(l.code)">
    {{ l.name }}
  </NuxtLink>
</template>

<style>

</style>