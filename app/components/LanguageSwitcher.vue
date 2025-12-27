<script lang="ts" setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// Map language codes to flag icons
const flagMap: Record<string, string> = {
  en: 'flag:gb-4x3',
  nb: 'flag:no-4x3'
}

const getFlagIcon = (code: string) => flagMap[code] || 'flag:un-4x3'
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
      :aria-label="l.name"
    >
      <Icon :name="getFlagIcon(l.code)" class="language-switcher__flag" />
    </NuxtLink>
  </div>
</template>