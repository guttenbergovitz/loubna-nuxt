<script setup lang="ts">
import { YoutubeVue3 } from 'youtube-vue3'

const props = defineProps<{
  videoId: string
  title?: string
}>()
</script>

<template>
  <div class="youtube-video">
    <YoutubeVue3
      :videoid="props.videoId"
      ref="youtube"
    />
  </div>
</template>

<style scoped>
.youtube-video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}

.youtube-video :deep(iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
