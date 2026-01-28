<script setup lang="ts">
const localePath = useLocalePath()

// Gallery images
const homeGalleryImagesRow1 = [
  { src: '/images/gallery/home-gallery/hg1.jpg', alt: 'Photography by Loubna Photo' },
  { src: '/images/gallery/home-gallery/hg2.jpg', alt: 'Photography by Loubna Photo' },
  { src: '/images/gallery/home-gallery/hg3.jpg', alt: 'Photography by Loubna Photo' },
]
const homeGalleryImagesRow2 = [
  { src: '/images/gallery/home-gallery/hg4.jpg', alt: 'Photography by Loubna Photo' },
  { src: '/images/gallery/home-gallery/hg5.jpg', alt: 'Photography by Loubna Photo' },
  { src: '/images/gallery/home-gallery/hg6.jpg', alt: 'Photography by Loubna Photo' }
]

const secondaryGalleryImages = [
  { src: '/images/gallery/home-small-gallery/hsg1.jpg', alt: 'Photography by Loubna Photo' },
  { src: '/images/gallery/home-small-gallery/hsg2.png', alt: 'Photography by Loubna Photo' },
  { src: '/images/gallery/home-small-gallery/hsg3.png', alt: 'Photography by Loubna Photo' }
]

// Scroll reveal
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    }
  )

  // Observe elements
  const elements = document.querySelectorAll('.home__question-content')
  elements.forEach((el) => observer.observe(el))

  // Equal heights for option titles
  const equalizeHeights = () => {
    const titles = document.querySelectorAll('.home__option-title')
    if (titles.length === 0) return

    // Reset heights
    titles.forEach(title => {
      title.style.height = 'auto'
    })

    // Get max height
    let maxHeight = 0
    titles.forEach(title => {
      const height = title.offsetHeight
      if (height > maxHeight) maxHeight = height
    })

    // Set all to max height
    titles.forEach(title => {
      title.style.height = `${maxHeight}px`
    })
  }

  equalizeHeights()
  window.addEventListener('resize', equalizeHeights)

  // Cleanup
  onUnmounted(() => {
    elements.forEach((el) => observer.unobserve(el))
    window.removeEventListener('resize', equalizeHeights)
  })
})
</script>

<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="home__hero" role="banner">
      <div class="o-container">
        <div class="home__hero-content">
          <h1 class="home__hero-heading">
            <span class="home__hero-heading-line1">{{ $t('home.hero.heading.line1') }}</span>
            <span class="home__hero-heading-line2">{{ $t('home.hero.heading.line2') }}</span>
          </h1>
        </div>
      </div>
    </section>

    <!-- Intro & Question Wrapper -->
    <div class="home__intro-question-wrapper">
      <!-- Intro Section -->
      <section class="home__intro">
        <div class="o-container o-container--3xl">
          <p class="home__intro-statement"><strong>{{ $t('home.intro.statement') }}</strong></p>
          <p class="home__intro-footnote"><em>{{ $t('home.intro.footnote') }}</em></p>
        </div>
      </section>

      <!-- How to Get Pictures Section -->
      <section class="home__question">
        <div class="o-container o-container--3xl">
          <div class="home__question-content">
            <p class="home__question-line1">
              {{ $t('home.howToGet.line1') }} <em>{{ $t('home.howToGet.line2') }}</em> {{ $t('home.howToGet.line3') }}
            </p>
            <p class="home__question-line2">
              <span class="home__question-the"><em>{{ $t('home.howToGet.line4') }}</em></span>
              <span class="home__question-emphasis"><strong>{{ $t('home.howToGet.line5') }}</strong></span>
              <span class="home__question-mark-inline">{{ $t('home.howToGet.question') }}</span>
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- Options Section -->
    <section class="home__options" aria-label="Photography options">
      <div class="o-container">
        <article class="home__option">
          <div class="home__option-icon">
            <Icon name="mdi:image-multiple-outline" />
          </div>
          <h3 class="home__option-title">{{ $t('home.options.stock.title') }}</h3>
          <RichText class="home__option-description" :content="$t('home.options.stock.description')" />
        </article>

        <article class="home__option">
          <div class="home__option-icon">
            <Icon name="mdi:camera-enhance-outline" />
          </div>
          <h3 class="home__option-title">{{ $t('home.options.studio.title') }}</h3>
          <RichText class="home__option-description" :content="$t('home.options.studio.description')" />
        </article>

        <article class="home__option">
          <div class="home__option-icon">
            <Icon name="mdi:compass-outline" />
          </div>
          <h3 class="home__option-title">{{ $t('home.options.scout.title') }}</h3>
          <RichText class="home__option-description" :content="$t('home.options.scout.description')" />
        </article>
      </div>
    </section>

    <!-- Alternative/Solution Section -->
    <section class="home__solution">
      <div class="o-container o-container--3xl">
        <p class="home__solution-heading">
          <span class="home__solution-or"><em>{{ $t('home.alternative.or') }}</em></span>
          {{ $t('home.alternative.youCanOwn') }} <strong>{{ $t('home.alternative.photography') }}</strong>
        </p>
        <p class="home__solution-subtext"><em>{{ $t('home.alternative.thatIsReally') }}</em></p>
        <p class="home__solution-handcrafted"><strong>{{ $t('home.alternative.handcrafted') }}</strong></p>
      </div>
    </section>

    <!-- Handcrafted Gallery & Video Section -->
    <section class="home__handcrafted-gallery">
      <div class="o-container o-container--full">
        <!-- Video Section for Mobile -->
        <div class="home__video-two-mobile-wrapper show-on-mobile">
          <div class="home__video-container">
            <HomeVideoTwo
              no-desktop-src="https://player.mediadelivery.net/embed/584298/42e3056b-9532-491a-a7e7-005833992fbe"
              en-desktop-src="https://player.mediadelivery.net/embed/584298/6ec8223e-1519-4c09-93d2-569bbafd7cd0"
              no-mobile-src="https://player.mediadelivery.net/embed/584298/84f24ad5-aedb-4db6-8b4a-cb5475c28501"
              en-mobile-src="https://player.mediadelivery.net/embed/584298/745ccea1-62e6-43b7-ae26-75ca3173c37c"
            />
          </div>
        </div>

        <!-- Gallery Row 1 -->
        <PhotoGallery :images="homeGalleryImagesRow1" :columns="3" />

        <!-- Video Section for Desktop -->
        <div class="home__video-two-desktop-wrapper show-on-desktop">
          <div class="home__video-container">
            <HomeVideoTwo
              no-desktop-src="https://player.mediadelivery.net/embed/584298/42e3056b-9532-491a-a7e7-005833992fbe"
              en-desktop-src="https://player.mediadelivery.net/embed/584298/6ec8223e-1519-4c09-93d2-569bbafd7cd0"
              no-mobile-src="https://player.mediadelivery.net/embed/584298/84f24ad5-aedb-4db6-8b4a-cb5475c28501"
              en-mobile-src="https://player.mediadelivery.net/embed/584298/745ccea1-62e6-43b7-ae26-75ca3173c37c"
            />
          </div>
        </div>

        <!-- Gallery Row 2 -->
        <PhotoGallery :images="homeGalleryImagesRow2" :columns="3" />
      </div>
    </section>

    <!-- What Makes Different Section -->
    <section class="home__differentiation">
      <div class="o-container o-container--4xl">
        <h2 class="home__differentiation-heading">
          {{ $t('home.whatMakesDifferent.line1') }}
          <strong>{{ $t('home.whatMakesDifferent.line2') }}</strong>{{ $t('home.whatMakesDifferent.line3') }}
        </h2>
      </div>
    </section>

    <!-- Features Section -->
    <section class="home__features" aria-label="Key features">
      <div class="o-container">
        <article class="home__feature">
          <div class="home__feature-image">
            <NuxtImg src="/images/deco/difference/difference1.jpg" alt="Local photography" fit="cover" />
          </div>
          <h3 class="home__feature-title">{{ $t('home.features.local.title') }}</h3>
          <RichText class="home__feature-description" :content="$t('home.features.local.description')" />
        </article>

        <article class="home__feature">
          <div class="home__feature-image">
            <NuxtImg src="/images/deco/difference/difference2.jpg" alt="Made to order" fit="cover" />
          </div>
          <h3 class="home__feature-title">{{ $t('home.features.madeToOrder.title') }}</h3>
          <RichText class="home__feature-description" :content="$t('home.features.madeToOrder.description')" />
        </article>

        <article class="home__feature">
          <div class="home__feature-image">
            <NuxtImg src="/images/deco/difference/difference3.jpg" alt="No AI or Photoshop" fit="cover" />
          </div>
          <h3 class="home__feature-title">{{ $t('home.features.noAI.title') }}</h3>
          <RichText class="home__feature-description" :content="$t('home.features.noAI.description')" />
        </article>

        <article class="home__feature">
          <div class="home__feature-image">
            <NuxtImg src="/images/deco/difference/difference4.jpg" alt="Certified quality" fit="cover" />
          </div>
          <h3 class="home__feature-title">{{ $t('home.features.certified.title') }}</h3>
          <RichText class="home__feature-description" :content="$t('home.features.certified.description')" />
        </article>
      </div>
    </section>

    <!-- Video Section -->
    <section class="home__video" aria-label="Photography showcase video">
      <BunnyVideo
        landscape-id="57a91730-dd63-4310-af70-1513286bcdc4"
        portrait-id="d796aa9c-fe0f-405c-b8ea-99713684d658"
      />
    </section>

    <!-- Gallery 2 -->
    <section class="home__gallery-secondary" aria-label="Additional photography gallery">
      <div class="o-container o-container--full">
        <PhotoGallery :images="secondaryGalleryImages" :columns="3" />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="home__cta">
      <div class="o-container o-container--4xl">
        <h2 class="home__cta-heading">{{ $t('home.cta.heading') }}</h2>
        <p class="home__cta-subtext">{{ $t('home.cta.subtext') }}</p>
        <NuxtLink
          :to="localePath('book-a-call')"
          class="home__cta-button"
        >
          {{ $t('home.cta.button') }}
        </NuxtLink>
      </div>
    </section>

    <!-- Partners Gallery -->
    <PartnersGallery />

    <!-- Photography Quote -->
    <PhotoQuote />
  </main>
</template>

<style scoped>
.show-on-desktop {
  display: none;
}
.show-on-mobile {
  display: block;
}
@media (min-width: 768px) {
  .show-on-desktop {
    display: block;
  }
  .show-on-mobile {
    display: none;
  }
}

.home__handcrafted-gallery {
  background-color: #F9F0E2;
  padding: var(--space-fluid-lg) 0 calc(var(--space-fluid-2xl) + 5vw);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));
}

@media (max-width: 767px) {
  .home__handcrafted-gallery {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2vw));
    padding-bottom: calc(var(--space-fluid-2xl) + 2vw);
  }
}

.home__video-two-desktop-wrapper,
.home__video-two-mobile-wrapper {
    padding-top: var(--space-xl);
    padding-bottom: var(--space-xl);
}

@media (min-width: 768px) {
  .home__video-two-desktop-wrapper {
    max-width: 75vw;
    margin: 0 auto;
  }
}

.home__video-container {
  background-color: var(--color-white);
  padding: var(--space-sm);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: rotate(-1.5deg);
  position: relative; /* for the ::after pseudo-element */
  border-radius: var(--border-radius-md);
}

.home__video-container::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(0, 0, 0, 0.15) 0, rgba(0, 0, 0, 0.15) 12px, transparent 12px),
    linear-gradient(-135deg, rgba(0, 0, 0, 0.15) 0, rgba(0, 0, 0, 0.15) 12px, transparent 12px),
    linear-gradient(45deg, rgba(0, 0, 0, 0.15) 0, rgba(0, 0, 0, 0.15) 12px, transparent 12px),
    linear-gradient(-45deg, rgba(0, 0, 0, 0.15) 0, rgba(0, 0, 0, 0.15) 12px, transparent 12px);
  background-size: 20px 20px;
  background-position: top left, top right, bottom left, bottom right;
  background-repeat: no-repeat;
  z-index: 3;
  border-radius: var(--border-radius-md);
}
</style>