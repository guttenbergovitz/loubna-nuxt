<script setup lang="ts">
interface Props {
  variant?: 'banner' | 'plain'
  headline?: string
  tagline?: string
  backgroundImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'plain'
})
</script>

<template>
  <section
    class="page-hero"
    :class="`page-hero--${variant}`"
    :style="variant === 'banner' && backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined"
  >
    <div class="o-container o-container--4xl">
      <div class="page-hero__content">
        <!-- Slot for custom content (banner variant) -->
        <slot v-if="variant === 'banner'" />

        <!-- Plain text variant -->
        <template v-else-if="variant === 'plain'">
          <h1 v-if="headline" class="page-hero__headline">{{ headline }}</h1>
          <p v-if="tagline" class="page-hero__tagline">{{ tagline }}</p>
          <slot name="content" />
        </template>
      </div>
    </div>
  </section>
</template>
