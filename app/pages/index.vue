<script setup lang="ts">
const localePath = useLocalePath()

// Gallery images
const homeGalleryImages = [
  { src: '/images/gallery/home-gallery/hg1.jpg', alt: 'Photography by Loubna Photo' },
  { src: '/images/gallery/home-gallery/hg2.jpg', alt: 'Photography by Loubna Photo' },
  { src: '/images/gallery/home-gallery/hg3.jpg', alt: 'Photography by Loubna Photo' },
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
        <p class="home__solution-or"><em>{{ $t('home.alternative.or') }}</em></p>
        <p class="home__solution-heading">
          {{ $t('home.alternative.youCanOwn') }} <strong>{{ $t('home.alternative.photography') }}</strong>
        </p>
        <p class="home__solution-subtext"><em>{{ $t('home.alternative.thatIsReally') }}</em></p>
        <p class="home__solution-handcrafted"><strong>{{ $t('home.alternative.handcrafted') }}</strong></p>
      </div>
    </section>

    <!-- Gallery -->
    <section class="home__gallery" aria-label="Photography gallery">
      <div class="o-container o-container--full">
        <PhotoGallery :images="homeGalleryImages" :columns="3" />
      </div>
    </section>

    <!-- What Makes Different Section -->
    <section class="home__differentiation">
      <div class="o-container o-container--4xl">
        <h2 class="home__differentiation-heading">{{ $t('home.whatMakesDifferent') }}</h2>
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
        <NuxtLink
          :to="localePath('book-a-call')"
          class="home__cta-button"
        >
          {{ $t('home.cta.button') }}
        </NuxtLink>
      </div>
    </section>
  </main>
</template>