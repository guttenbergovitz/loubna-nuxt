<script setup lang="ts">
interface TimelineEvent {
  date: string
  title: string
  role?: string
  organization?: string
  location?: string
  description?: string
  field?: string
  degree?: string
  image?: string
}

defineProps<{
  events: TimelineEvent[]
}>()

const activeIndex = ref<number | null>(null)

onMounted(() => {
  if (import.meta.client) {
    const events = document.querySelectorAll('.bio-timeline__event')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            activeIndex.value = index
          }
        })
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: '-20% 0px -20% 0px'
      }
    )

    events.forEach((event) => observer.observe(event))

    onUnmounted(() => {
      events.forEach((event) => observer.unobserve(event))
    })
  }
})
</script>

<template>
  <div class="bio-timeline">
    <div
      v-for="(event, index) in events"
      :key="index"
      :data-index="index"
      class="bio-timeline__event"
      :class="{
        'bio-timeline__event--even': index % 2 === 1,
        'bio-timeline__event--active': activeIndex === index
      }"
    >
      <!-- Date and Image (left/right alternating) -->
      <div class="bio-timeline__date-column">
        <time class="bio-timeline__date" :datetime="event.date">
          {{ event.date }}
        </time>
        <img
          v-if="event.image"
          :src="event.image"
          :alt="event.title"
          class="bio-timeline__image"
          loading="lazy"
        />
      </div>

      <!-- Center marker -->
      <div class="bio-timeline__separator">
        <div class="bio-timeline__marker"></div>
      </div>

      <!-- Content (right/left alternating) -->
      <article class="bio-timeline__content">
        <h3 class="bio-timeline__title">{{ event.title }}</h3>
        <p v-if="event.role" class="bio-timeline__role">{{ event.role }}</p>
        <p v-if="event.organization" class="bio-timeline__organization">{{ event.organization }}</p>
        <p v-if="event.field" class="bio-timeline__field">{{ event.field }}</p>
        <p v-if="event.location" class="bio-timeline__location">{{ event.location }}</p>
        <p v-if="event.description" class="bio-timeline__description">{{ event.description }}</p>
        <p v-if="event.degree" class="bio-timeline__degree">{{ event.degree }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.bio-timeline {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-2xl) 0;
  position: relative;
}

/* Continuous vertical line through all timeline */
.bio-timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(0, 0, 0, 0.25);
  transform: translateX(-50%);
}

.bio-timeline__event {
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-3xl);
  position: relative;
}

.bio-timeline__event:last-child {
  margin-bottom: 0;
}

/* Date column wrapper */
.bio-timeline__date-column {
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  align-self: start;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-md);
  max-width: 400px;
  width: 100%;
}

.bio-timeline__event--even .bio-timeline__date-column {
  grid-column: 3;
  justify-self: start;
  align-items: flex-start;
}

/* Date */
.bio-timeline__date {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-xs) var(--space-sm);
  background-color: #2a2a2a;
  border-radius: var(--border-radius-sm);
  white-space: nowrap;
}

/* Center separator */
.bio-timeline__separator {
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  align-self: start;
  position: relative;
  z-index: 1;
}

/* Marker dot */
.bio-timeline__marker {
  width: 24px;
  height: 24px;
  border: 3px solid var(--color-text-primary);
  border-radius: 50%;
  background-color: var(--color-background-primary);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.bio-timeline__event:hover .bio-timeline__marker {
  transform: scale(1.4);
  border-color: var(--color-cream);
  box-shadow: 0 0 0 6px rgba(248, 240, 226, 0.2);
}

/* Content */
.bio-timeline__content {
  grid-column: 3;
  grid-row: 1;
  justify-self: stretch;
  align-self: start;
  padding-top: var(--space-md);
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.bio-timeline__event--even .bio-timeline__content {
  grid-column: 1;
}

.bio-timeline__title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm);
  line-height: var(--line-height-tight);
}

.bio-timeline__role,
.bio-timeline__organization,
.bio-timeline__field {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-xs);
  font-style: italic;
  opacity: 0.8;
}

.bio-timeline__location {
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm);
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.bio-timeline__description,
.bio-timeline__degree {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: var(--line-height-relaxed);
  margin: var(--space-sm) 0 0;
  opacity: 0.9;
}

.bio-timeline__degree {
  font-weight: var(--font-weight-medium);
  opacity: 0.8;
}

/* Image */
.bio-timeline__image {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-sm);
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}

/* First image is visible by default */
.bio-timeline__event:first-child .bio-timeline__image {
  opacity: 1;
  transform: scale(1);
}

.bio-timeline__event--active .bio-timeline__image {
  opacity: 1;
  transform: scale(1);
}

/* Responsive */
@media (max-width: 767px) {
  .bio-timeline__event {
    grid-template-columns: 40px 1fr;
    gap: var(--space-md);
  }

  .bio-timeline__date-column {
    display: none;
  }

  .bio-timeline__separator {
    grid-column: 1;
  }

  .bio-timeline__content {
    grid-column: 2;
    padding: var(--space-md);
  }

  .bio-timeline__event--even .bio-timeline__content {
    grid-column: 2;
  }
}
</style>
