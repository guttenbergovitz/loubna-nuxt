<script setup lang="ts">
import Toolbar from 'primevue/toolbar'

const localePath = useLocalePath()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="site-header" :class="{ 'site-header--scrolled': isScrolled }">
    <Toolbar class="site-header__toolbar">
      <template #start>
        <NuxtLink :to="localePath('index')" class="site-header__logo-link">
          <NuxtImg
            src="/images/logo-main.webp"
            alt="Loubna Photo"
            class="site-header__logo"
            width="180"
            height="60"
            loading="eager"
          />
        </NuxtLink>
      </template>

      <template #center>
        <MainNavigationVue />
      </template>

      <template #end>
        <LanguageSwitcher />
      </template>
    </Toolbar>
  </header>
</template>
