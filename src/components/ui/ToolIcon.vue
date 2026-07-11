<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({ tool: { type: String, required: true } })

const iconMap = {
  powerbi: { slug: 'powerbi', color: '#F2C811' },
  n8n: { slug: 'n8n', color: '#EA4B71' },
  tableau: { slug: 'tableau', color: '#E97627' },
  looker: { slug: 'looker', color: '#4285F4' },
  snowflake: { slug: 'snowflake', color: '#29B5E8' },
  aws: { slug: 'amazonaws', color: '#FF9900' }
}

const icon = iconMap[props.tool] || null
const iconUrl = icon ? `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${icon.slug}.svg` : null
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
  <span
    v-if="icon && loaded"
    class="tool-icon"
    :style="{ backgroundColor: icon.color, WebkitMaskImage: `url(${iconUrl})`, maskImage: `url(${iconUrl})` }"
  ></span>
</template>

<style scoped>
.tool-icon {
  display: inline-block; width: 20px; height: 20px;
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: center; mask-position: center;
  -webkit-mask-size: contain; mask-size: contain;
}
</style>