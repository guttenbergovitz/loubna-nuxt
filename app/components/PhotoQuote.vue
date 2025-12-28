<script setup lang="ts">
const { t } = useI18n()

// Get random quote on component mount
const randomQuoteIndex = ref(0)

onMounted(() => {
  // Generate random number between 0 and 29 (30 quotes)
  randomQuoteIndex.value = Math.floor(Math.random() * 30)
})

const quote = computed(() => t(`quotes.${randomQuoteIndex.value}.text`))
const author = computed(() => t(`quotes.${randomQuoteIndex.value}.author`))
</script>

<template>
  <div class="photo-quote">
    <div class="o-container o-container--3xl">
      <blockquote class="photo-quote__text">
        <p class="photo-quote__content">{{ quote }}</p>
        <footer class="photo-quote__author">— {{ author }}</footer>
      </blockquote>
    </div>
  </div>
</template>
