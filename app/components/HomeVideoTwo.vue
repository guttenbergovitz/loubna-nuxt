<script setup lang="ts">
const { locale } = useI18n()

const props = withDefaults(defineProps<{
  noDesktopSrc: string
  enDesktopSrc: string
  noMobileSrc: string
  enMobileSrc: string
  autoplay?: boolean
}>(), {
  autoplay: false
})

const addParams = (url: string) => {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}autoplay=${props.autoplay}&loop=false&muted=false&preload=true`
}

const desktopSrc = computed(() => {
  const base = locale.value === 'nb' ? props.noDesktopSrc : props.enDesktopSrc
  return addParams(base)
})

const mobileSrc = computed(() => {
  const base = locale.value === 'nb' ? props.noMobileSrc : props.enMobileSrc
  return addParams(base)
})
</script>

<template>
  <div class="home-video-two">
    <!-- Desktop Video -->
    <div class="home-video-two__desktop">
      <div style="position:relative;padding-top:56.25%;">
        <iframe
          :src="desktopSrc"
          loading="lazy"
          style="border:0;position:absolute;top:0;height:100%;width:100%;"
          allow="accelerometer;gyroscope;encrypted-media;picture-in-picture;"
          allowfullscreen="true"
        ></iframe>
      </div>
    </div>

    <!-- Mobile Video -->
    <div class="home-video-two__mobile">
      <div style="position:relative;padding-top:56.25%;">
        <iframe
          :src="mobileSrc"
          loading="lazy"
          style="border:0;position:absolute;top:0;height:100%;width:100%;"
          allow="accelerometer;gyroscope;encrypted-media;picture-in-picture;"
          allowfullscreen="true"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-video-two {
  width: 100%;
  max-width: 100%;
}

.home-video-two__desktop {
  display: none;
}

.home-video-two__mobile {
  display: block;
}

/* Show desktop on tablet and up */
@media (min-width: 768px) {
  .home-video-two__desktop {
    display: block;
  }

  .home-video-two__mobile {
    display: none;
  }
}
</style>
