<script setup lang="ts">
const props = defineProps<{
  videoId: string
  title?: string
  aspectRatio?: 'landscape' | 'portrait' // landscape = 16:9, portrait = 9:16
}>()

const embedUrl = computed(() => {
  const params = new URLSearchParams({
    autoplay: '0',
    rel: '0',
    modestbranding: '1',
    controls: '1',
    fs: '1',
    playsinline: '1',
    vq: 'hd1080',
    hd: '1'
  })
  return `https://www.youtube-nocookie.com/embed/${props.videoId}?${params.toString()}`
})

const aspectRatioClass = computed(() => {
  return props.aspectRatio === 'portrait' ? 'youtube-video--portrait' : 'youtube-video--landscape'
})
</script>

<template>
  <div class="youtube-video" :class="aspectRatioClass">
    <iframe
      :src="embedUrl"
      :title="title || 'YouTube video player'"
      frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.youtube-video {
  position: relative;
  height: 0;
  overflow: hidden;
}

.youtube-video--landscape {
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.youtube-video--portrait {
  padding-bottom: 0;
  aspect-ratio: 9 / 16;
  height: auto;
}

.youtube-video :deep(iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
