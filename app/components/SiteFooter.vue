<script setup lang="ts">
const localePath = useLocalePath()
const currentYear = new Date().getFullYear()

const navItems = [
  { route: 'index', key: 'home' },
  { route: 'about', key: 'about' },
  { route: 'workshop', key: 'workshop' },
  { route: 'bio', key: 'bio' },
  { route: 'book-a-call', key: 'bookCall' },
  { route: 'contact', key: 'contact' }
]

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/loubnaphoto',
    icon: 'mdi:facebook',
    label: 'footer.social.facebook'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@loubnaphoto',
    icon: 'mdi:youtube',
    label: 'footer.social.youtube'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/loubnaphoto',
    icon: 'mdi:instagram',
    label: 'footer.social.instagram'
  },
  {
    name: 'X',
    url: 'https://x.com/loubnaphoto',
    icon: 'simple-icons:x',
    label: 'footer.social.x'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/loubnaphoto',
    icon: 'mdi:linkedin',
    label: 'footer.social.linkedin'
  }
]
</script>

<template>
  <footer class="site-footer">
    <div class="o-container o-container--7xl">
      <!-- Main Content -->
      <div class="site-footer__main">
        <div class="site-footer__nav-wrapper">
          <nav class="site-footer__nav" aria-label="Footer navigation">
            <NuxtLink
              v-for="item in navItems"
              :key="item.route"
              :to="localePath(item.route)"
              class="site-footer__nav-link"
            >
              {{ $t(`${item.key}.name`) }}
            </NuxtLink>
          </nav>
          <LanguageSwitcher />
        </div>

        <div class="site-footer__left">
          <div class="site-footer__contact">
            <a :href="`mailto:${$t('footer.email')}`" class="site-footer__contact-link">
              {{ $t('footer.email') }}
            </a>
            <a :href="`tel:${$t('footer.phone')}`" class="site-footer__contact-link">
              {{ $t('footer.phone') }}
            </a>
          </div>

          <p class="site-footer__statement">
            {{ $t('footer.tagline') }}
          </p>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="site-footer__bottom">
        <p class="site-footer__copyright">
          &copy; {{ currentYear }} Loubna Photo
        </p>

        <div class="site-footer__social">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            :aria-label="$t(link.label)"
            class="site-footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon :name="link.icon" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
