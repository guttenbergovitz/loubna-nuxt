<template>
  <nav>
    <NuxtLink v-for="item in navItems" :key="item.route" :to="localePath(item.route)">
      {{ $t(`${item.key}.name`) }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const navItems = [
  { route: 'index', key: 'home' },
  { route: 'about', key: 'about' },
  { route: 'workshop', key: 'workshop' },
  { route: 'bio', key: 'bio' },
  { route: 'contact', key: 'contact' }
]

const localePath = useLocalePath()
</script>