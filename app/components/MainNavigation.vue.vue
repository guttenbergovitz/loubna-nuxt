<template>
  <!-- Desktop Navigation -->
  <nav class="main-navigation main-navigation--desktop" aria-label="Main navigation">
    <NuxtLink
      v-for="item in navItems"
      :key="item.route"
      :to="localePath(item.route)"
      class="main-navigation__link"
    >
      {{ $t(`${item.key}.name`) }}
    </NuxtLink>
  </nav>

  <!-- Mobile Hamburger Button -->
  <button
    class="main-navigation__hamburger"
    :class="{ 'main-navigation__hamburger--active': isMobileMenuOpen }"
    @click="toggleMobileMenu"
    aria-label="Toggle mobile menu"
  >
    <span class="main-navigation__hamburger-line"></span>
    <span class="main-navigation__hamburger-line"></span>
    <span class="main-navigation__hamburger-line"></span>
  </button>

  <!-- Mobile Fullscreen Overlay -->
  <ClientOnly>
    <Teleport to="body">
      <Transition name="mobile-menu">
        <div
          v-if="isMobileMenuOpen"
          class="main-navigation__mobile-overlay"
          @click="closeMobileMenu"
        >
          <nav class="main-navigation__mobile-nav" @click.stop>
            <NuxtLink
              v-for="item in navItems"
              :key="item.route"
              :to="localePath(item.route)"
              class="main-navigation__mobile-link"
              @click="closeMobileMenu"
            >
              {{ $t(`${item.key}.name`) }}
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
const navItems = [
  { route: 'index', key: 'home' },
  { route: 'about', key: 'about' },
  { route: 'workshop', key: 'workshop' },
  { route: 'bio', key: 'bio' },
  { route: 'book-a-call', key: 'bookCall' },
  { route: 'contact', key: 'contact' }
]

const localePath = useLocalePath()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // Prevent body scroll when menu is open (client-only)
  if (import.meta.client) {
    if (isMobileMenuOpen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
}

// Close menu on route change
const route = useRoute()
watch(() => route.path, () => {
  closeMobileMenu()
})

// Cleanup on unmount
onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>