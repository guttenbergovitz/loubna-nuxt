<script setup lang="ts">
const props = defineProps<{
  landscapeId: string
  portraitId: string
  libraryId?: string
}>()

const library = props.libraryId || '584298'
</script>

<template>
  <div class="bunny-video">
    <!-- Desktop/Landscape Video -->
    <div class="bunny-video__landscape">
      <div style="position:relative;padding-top:56.25%;">
        <iframe 
          :src="`https://player.mediadelivery.net/embed/${library}/${landscapeId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`"
          loading="lazy" 
          style="border:0;position:absolute;top:0;height:100%;width:100%;" 
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
          allowfullscreen="true"
        />
      </div>
    </div>

    <!-- Mobile/Portrait Video -->
    <div class="bunny-video__portrait">
      <div style="position:relative;padding-top:177.78%;">
        <iframe 
          :src="`https://player.mediadelivery.net/embed/${library}/${portraitId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`"
          loading="lazy" 
          style="border:0;position:absolute;top:0;height:100%;width:100%;" 
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
          allowfullscreen="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bunny-video {
  width: 100%;
  max-width: 100%;
}

.bunny-video__landscape {
  display: none;
}

.bunny-video__portrait {
  display: block;
}

/* Show landscape on tablet and up */
@media (min-width: 768px) {
  .bunny-video__landscape {
    display: block;
  }
  
  .bunny-video__portrait {
    display: none;
  }
}
</style>
