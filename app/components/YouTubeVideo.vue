<script setup lang="ts">
const props = defineProps<{
  videoId: string
  title?: string
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
</script>

<template>
  <div class="youtube-video">
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
