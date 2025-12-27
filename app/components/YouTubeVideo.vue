<script setup lang="ts">
import { YouTube } from 'youtube-vue3'

const props = defineProps<{
  videoId: string
  title?: string
}>()
</script>

<template>
  <div class="youtube-video">
    <YouTube
      :videoid="props.videoId"
      :width="'100%'"
      :height="'100%'"
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
