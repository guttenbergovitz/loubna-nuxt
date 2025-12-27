<script setup lang="ts">
interface GalleryImage {
  src: string
  alt?: string
  title?: string
  thumb?: string
}

interface Props {
  images: GalleryImage[]
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3
})

const { $img } = useNuxtApp()
const visibleRef = ref<number | null>(null)
const imgsRef = ref<string[]>([])

// Prepare images for lightbox
const prepareImages = () => {
  imgsRef.value = props.images.map(img => img.src)
}

const showImg = (index: number) => {
  prepareImages()
  visibleRef.value = index
}

const handleHide = () => {
  visibleRef.value = null
}
</script>

<template>
  <div class="photo-gallery">
    <div
      class="photo-gallery__grid"
      :style="{ '--columns': columns }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="photo-gallery__item"
        @click="showImg(index)"
        @keydown.enter="showImg(index)"
        role="button"
        tabindex="0"
        :aria-label="image.alt || `Gallery image ${index + 1}`"
      >
        <NuxtImg
          :src="image.thumb || image.src"
          :alt="image.alt || ''"
          class="photo-gallery__image"
          loading="lazy"
          fit="cover"
        />
      </div>
    </div>

    <ClientOnly>
      <vue-easy-lightbox
        :visible="visibleRef !== null"
        :imgs="imgsRef"
        :index="visibleRef || 0"
        @hide="handleHide"
      />
    </ClientOnly>
  </div>
</template>
