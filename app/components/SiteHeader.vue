<script setup lang="ts">
import Toolbar from 'primevue/toolbar'

const localePath = useLocalePath()
</script>

<template>
  <header class="site-header">
    <Toolbar class="site-header__toolbar">
      <template #start>
        <NuxtLink :to="localePath('index')" class="site-header__logo">
          Loubna Photo
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
