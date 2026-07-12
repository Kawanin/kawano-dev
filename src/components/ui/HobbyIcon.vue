<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({ icon: { type: String, required: true } }) // 'spotify' | 'playstation' | 'cooking'

const brandMap = {
  spotify: { slug: 'spotify', color: '#1ED760' },
  playstation: { slug: 'playstation', color: '#2E6FD9' }
}
const brand = brandMap[props.icon] || null
const iconUrl = brand ? `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${brand.slug}.svg` : null
const loaded = ref(false)

onMounted(() => {
  if (!iconUrl) return
  const img = new Image()
  img.onload = () => { loaded.value = true }
  img.onerror = () => { loaded.value = false }
  img.src = iconUrl
})
</script>

<template>
  <div class="hobby-icon">
    <span
      v-if="brand && loaded"
      class="masked"
      :style="{ backgroundColor: brand.color, WebkitMaskImage: `url(${iconUrl})`, maskImage: `url(${iconUrl})` }"
    ></span>
    <svg v-else-if="icon === 'cooking'" viewBox="0 0 24 24" fill="none" stroke="#4BB4E6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
      <line x1="6" y1="17" x2="18" y2="17"/>
    </svg>
  </div>
</template>

<style scoped>
.hobby-icon {
  width: 44px; height: 44px; border-radius: 50%; background: var(--bg-elevated);
  border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px;
}
.masked { display: block; width: 22px; height: 22px; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-position: center; mask-position: center; -webkit-mask-size: contain; mask-size: contain; }
.hobby-icon svg { width: 22px; height: 22px; }
</style>