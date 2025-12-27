<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} Loubna Photography. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 1rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.footer p {
  margin: 0;
  color: #6c757d;
}
</style>