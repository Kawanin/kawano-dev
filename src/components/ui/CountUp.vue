<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({ to: Number, suffix: { type: String, default: '' }, duration: { type: Number, default: 1200 } })
const val = ref(0)
const el = ref(null)
let io, raf
function run() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { val.value = props.to; return }
  const t0 = performance.now()
  const step = (t) => {
    const p = Math.min(1, (t - t0) / props.duration)
    val.value = Math.round(props.to * (1 - Math.pow(1 - p, 3)))
    if (p < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}
onMounted(() => {
  io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect() } }, { threshold: 0.4 })
  io.observe(el.value)
})
onUnmounted(() => { io && io.disconnect(); cancelAnimationFrame(raf) })
</script>

<template><span ref="el">{{ val }}{{ suffix }}</span></template>
