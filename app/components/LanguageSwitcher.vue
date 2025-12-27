<script lang="ts" setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="language-switcher" role="navigation" aria-label="Language selector">
    <NuxtLink
      v-for="l in locales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      :class="[
        'language-switcher__button',
        { 'language-switcher__button--active': l.code === locale }
      ]"
      :aria-current="l.code === locale ? 'true' : undefined"
    >
      {{ l.code }}
    </NuxtLink>
  </div>
</template>