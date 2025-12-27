<script setup lang="ts">
import { marked } from 'marked'

const props = defineProps<{
  content: string
}>()

const html = computed(() => marked.parse(props.content))
</script>

<template>
  <div v-html="html" class="prose" />
</template>