<script setup>
import { progress } from '../../composables/useScrollState.js'
</script>

<template>
  <div class="progress" aria-hidden="true">
    <div class="bar" :style="{ transform: `scaleX(${progress})` }"></div>
  </div>
</template>

<style scoped>
.progress { position: fixed; top: var(--nav-h); left: 0; right: 0; height: 2px; z-index: 49; pointer-events: none; }
.bar { height: 100%; transform-origin: left; background: linear-gradient(90deg, var(--blue-500), var(--blue-300)); box-shadow: 0 0 12px var(--accent-glow); will-change: transform; }
</style>
