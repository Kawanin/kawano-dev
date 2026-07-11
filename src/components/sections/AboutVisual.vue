<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const bars = ref(Array.from({ length: 9 }, () => Math.random() * 65 + 25))
let interval = null

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return
  interval = setInterval(() => {
    bars.value = bars.value.map(() => Math.random() * 65 + 25)
  }, 2200)
})
onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="about-visual">
    <div class="bars">
      <div class="bar" v-for="(h, i) in bars" :key="i" :style="{ height: h + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.about-visual {
  position: relative;
  height: 100%;
  min-height: 420px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.bars {
  display: flex;
  align-items: flex-end;
  gap: 14px;
  padding: 40px;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.bar {
  width: 22px;
  border-radius: 6px 6px 0 0;
  background: linear-gradient(180deg, var(--blue-300), var(--blue-900));
  transition: height 1.8s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>