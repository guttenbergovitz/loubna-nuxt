<script setup lang="ts">
// Example gallery images - replace with actual images from /public/images/gallery/home-gallery/
const homeGalleryImages = [
  { src: 'https://picsum.photos/400/600?random=1', alt: 'Gallery image 1' },
  { src: 'https://picsum.photos/400/500?random=2', alt: 'Gallery image 2' },
  { src: 'https://picsum.photos/400/700?random=3', alt: 'Gallery image 3' },
  { src: 'https://picsum.photos/400/550?random=4', alt: 'Gallery image 4' },
  { src: 'https://picsum.photos/400/650?random=5', alt: 'Gallery image 5' },
  { src: 'https://picsum.photos/400/600?random=6', alt: 'Gallery image 6' },
  { src: 'https://picsum.photos/400/500?random=7', alt: 'Gallery image 7' },
  { src: 'https://picsum.photos/400/700?random=8', alt: 'Gallery image 8' },
  { src: 'https://picsum.photos/400/550?random=9', alt: 'Gallery image 9' }
]

const secondaryGalleryImages = [
  { src: 'https://picsum.photos/400/600?random=10', alt: 'Gallery image 10' },
  { src: 'https://picsum.photos/400/500?random=11', alt: 'Gallery image 11' },
  { src: 'https://picsum.photos/400/700?random=12', alt: 'Gallery image 12' },
  { src: 'https://picsum.photos/400/550?random=13', alt: 'Gallery image 13' },
  { src: 'https://picsum.photos/400/650?random=14', alt: 'Gallery image 14' },
  { src: 'https://picsum.photos/400/600?random=15', alt: 'Gallery image 15' }
]
</script>

<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="home__hero" role="banner">
      <div class="o-container">
        <div class="home__hero-content">
          <h1 class="home__hero-heading">{{ $t('home.hero.heading') }}</h1>
        </div>
      </div>
    </section>

    <!-- Intro Section -->
    <section class="home__intro">
      <div class="o-container o-container--3xl">
        <p class="home__intro-statement"><strong>{{ $t('home.intro.statement') }}</strong></p>
        <p class="home__intro-footnote"><em>{{ $t('home.intro.footnote') }}</em></p>
      </div>
    </section>

    <!-- How to Get Pictures Section -->
    <section class="home__question">
      <div class="o-container o-container--4xl">
        <p class="home__question-text">
          {{ $t('home.howToGet.line1') }} <em>{{ $t('home.howToGet.line2') }}</em> {{ $t('home.howToGet.line3') }}<em> {{ $t('home.howToGet.line4') }}</em>
        </p>
        <p class="home__question-highlight">
          {{ $t('home.howToGet.line5') }}<strong> {{ $t('home.howToGet.line6') }}</strong>
        </p>
        <p class="home__question-mark">{{ $t('home.howToGet.question') }}</p>
      </div>
    </section>

    <!-- Options Section -->
    <section class="home__options" aria-label="Photography options">
      <div class="o-container">
        <article class="home__option">
          <h3 class="home__option-title">{{ $t('home.options.stock.title') }}</h3>
          <RichText class="home__option-description" :content="$t('home.options.stock.description')" />
        </article>

        <article class="home__option">
          <h3 class="home__option-title">{{ $t('home.options.studio.title') }}</h3>
          <RichText class="home__option-description" :content="$t('home.options.studio.description')" />
        </article>

        <article class="home__option">
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
            <!-- Feature image placeholder -->
          </div>
          <h3 class="home__feature-title">{{ $t('home.features.local.title') }}</h3>
          <RichText class="home__feature-description" :content="$t('home.features.local.description')" />
        </article>

        <article class="home__feature">
          <div class="home__feature-image">
            <!-- Feature image placeholder -->
          </div>
          <h3 class="home__feature-title">{{ $t('home.features.madeToOrder.title') }}</h3>
          <RichText class="home__feature-description" :content="$t('home.features.madeToOrder.description')" />
        </article>

        <article class="home__feature">
          <div class="home__feature-image">
            <!-- Feature image placeholder -->
          </div>
          <h3 class="home__feature-title">{{ $t('home.features.noAI.title') }}</h3>
          <RichText class="home__feature-description" :content="$t('home.features.noAI.description')" />
        </article>

        <article class="home__feature">
          <div class="home__feature-image">
            <!-- Feature image placeholder -->
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
        <a
          class="home__cta-button"
          :href="`/${$i18n.locale}/book-a-call`"
          role="button"
        >
          {{ $t('home.cta.button') }}
        </a>
      </div>
    </section>
  </main>
</template>