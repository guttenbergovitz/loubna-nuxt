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
    icon: 'mdi:twitter',
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
    <div class="o-container">
      <div class="site-footer__content">
        <!-- Brand Section -->
        <div class="site-footer__brand">
          <NuxtLink :to="localePath('index')" class="site-footer__logo-link">
            <NuxtImg
              src="/images/logo-main.png"
              alt="Loubna Photo"
              class="site-footer__logo"
              fit="contain"
            />
          </NuxtLink>
          <p class="site-footer__tagline">
            {{ $t('footer.tagline') }}
          </p>
        </div>

        <!-- Navigation Section -->
        <nav class="site-footer__nav" aria-label="Footer navigation">
          <h2 class="site-footer__nav-title">{{ $t('footer.navigation') }}</h2>
          <ul class="site-footer__nav-list">
            <li v-for="item in navItems" :key="item.route" class="site-footer__nav-item">
              <NuxtLink
                :to="localePath(item.route)"
                class="site-footer__nav-link"
              >
                {{ $t(`${item.key}.name`) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Contact Section -->
        <div class="site-footer__contact">
          <h2 class="site-footer__contact-title">{{ $t('footer.connect') }}</h2>
          <div class="site-footer__contact-info">
            <a :href="`mailto:${$t('footer.email')}`" class="site-footer__contact-link">
              <Icon name="mdi:email" class="site-footer__contact-icon" />
              {{ $t('footer.email') }}
            </a>
            <a :href="`tel:${$t('footer.phone')}`" class="site-footer__contact-link">
              <Icon name="mdi:phone" class="site-footer__contact-icon" />
              {{ $t('footer.phone') }}
            </a>
          </div>
        </div>

        <!-- Social Section -->
        <div class="site-footer__social-section">
          <h2 class="site-footer__social-title">{{ $t('footer.followUs') }}</h2>
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
              <Icon :name="link.icon" class="site-footer__social-icon" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="site-footer__bottom">
        <p class="site-footer__copyright">
          &copy; {{ currentYear }} Loubna Photo. {{ $t('footer.rights') }}
        </p>
        <LanguageSwitcher />
      </div>
    </div>
  </footer>
</template>
