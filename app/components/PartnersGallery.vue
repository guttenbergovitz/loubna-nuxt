<script setup lang="ts">
const { t } = useI18n()

const { data: partners } = await useAsyncData('partners', () =>
  queryCollection('partners').order('sort', 'ASC').all()
)

// Mobile touch support
const handleClick = (event: Event) => {
  if (window.innerWidth >= 1024) return // Only on mobile/tablet
  
  const item = (event.currentTarget as HTMLElement).closest('.partners-gallery__item')
  if (!item) return
  
  const wasActive = item.classList.contains('is-active')
  
  // Remove active from all items
  document.querySelectorAll('.partners-gallery__item.is-active').forEach(el => {
    el.classList.remove('is-active')
  })
  
  // Toggle current item
  if (!wasActive) {
    item.classList.add('is-active')
  }
}

// Scroll reveal animation
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.partners-gallery__item')
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('is-visible')
            }, index * 100) // Stagger animation
          })
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  const gallery = document.querySelector('.partners-gallery__grid')
  if (gallery) {
    observer.observe(gallery)
  }
})
</script>

<template>
  <div class="partners-gallery">
    <div class="o-container o-container--5xl">
      <h2 class="partners-gallery__heading">
        {{ t('partners.heading') }}
      </h2>
      
      <div class="partners-gallery__grid">
        <div 
          v-for="(partner, index) in partners" 
          :key="partner.name"
          class="partners-gallery__item"
          :data-index="index"
        >
          <div class="partners-gallery__frame" @click="handleClick">
            <NuxtImg
              :src="partner.image"
              :alt="partner.alt"
              class="partners-gallery__logo"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
