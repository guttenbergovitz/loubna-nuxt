<script setup lang="ts">
const quotesQuery = useContentByLocale('quotes')

const { data: quotes } = await useAsyncData('quotes', () => quotesQuery.fetchAll())

const randomIndex = ref(0)

const quote = computed(() => quotes.value?.[randomIndex.value]?.text ?? '')
const author = computed(() => quotes.value?.[randomIndex.value]?.author ?? '')

onMounted(() => {
  if (quotes.value?.length) {
    randomIndex.value = Math.floor(Math.random() * quotes.value.length)
  }
})
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
