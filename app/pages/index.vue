<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="home__hero" role="banner">
      <div class="home__hero-content">
        <h1 class="home__hero-heading">{{ $t('home.hero.heading') }}</h1>
      </div>
    </section>

    <!-- Intro Section -->
    <section class="home__intro">
      <p class="home__intro-statement"><strong>{{ $t('home.intro.statement') }}</strong></p>
      <p class="home__intro-footnote"><em>{{ $t('home.intro.footnote') }}</em></p>
    </section>

    <!-- How to Get Pictures Section -->
    <section class="home__question">
      <p class="home__question-text">
        {{ $t('home.howToGet.line1') }} <em>{{ $t('home.howToGet.line2') }}</em> {{ $t('home.howToGet.line3') }}<em> {{ $t('home.howToGet.line4') }}</em>
      </p>
      <p class="home__question-highlight">
        {{ $t('home.howToGet.line5') }}<strong> {{ $t('home.howToGet.line6') }}</strong>
      </p>
      <p class="home__question-mark">{{ $t('home.howToGet.question') }}</p>
    </section>

    <!-- Options Section -->
    <section class="home__options" aria-label="Photography options">
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
    </section>

    <!-- Alternative/Solution Section -->
    <section class="home__solution">
      <p class="home__solution-or"><em>{{ $t('home.alternative.or') }}</em></p>
      <p class="home__solution-heading">
        {{ $t('home.alternative.youCanOwn') }} <strong>{{ $t('home.alternative.photography') }}</strong>
      </p>
      <p class="home__solution-subtext"><em>{{ $t('home.alternative.thatIsReally') }}</em></p>
      <p class="home__solution-handcrafted"><strong>{{ $t('home.alternative.handcrafted') }}</strong></p>
    </section>

    <!-- Gallery placeholder -->
    <div class="home__gallery" role="img" aria-label="Photography gallery">
      <!-- Gallery images will go here -->
    </div>

    <!-- What Makes Different Section -->
    <section class="home__differentiation">
      <h2 class="home__differentiation-heading">{{ $t('home.whatMakesDifferent') }}</h2>
    </section>

    <!-- Features Section -->
    <section class="home__features" aria-label="Key features">
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
    </section>

    <!-- Gallery 2 placeholder -->
    <div class="home__gallery-secondary" role="img" aria-label="Additional photography gallery">
      <!-- Gallery images will go here -->
    </div>

    <!-- CTA Section -->
    <section class="home__cta">
      <h2 class="home__cta-heading">{{ $t('home.cta.heading') }}</h2>
      <a
        class="home__cta-button"
        :href="`/${$i18n.locale}/book-a-call`"
        role="button"
      >
        {{ $t('home.cta.button') }}
      </a>
    </section>
  </main>
</template>