<script setup>
import { useI18n } from 'vue-i18n'
import CountUp from '../ui/CountUp.vue'
const { tm, rt } = useI18n()
const kpis = () => tm('kpis')
</script>

<template>
  <div class="wrap strip">
    <div v-for="(k, i) in kpis()" :key="i" class="kpi" tabindex="0" v-reveal="i * 80">
      <div class="inner">
        <div class="face front">
          <div class="v"><CountUp :to="k.v" :suffix="k.s" /></div>
          <div class="l">{{ rt(k.l) }}</div>
        </div>
        <div class="face back"><span class="mono">{{ rt(k.b) }}</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: clamp(48px, 7vw, 88px); position: relative; z-index: 1; }
.kpi { perspective: 900px; height: 150px; outline: none; }
.inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform .7s var(--ease); }
.kpi:hover .inner, .kpi:focus-visible .inner { transform: rotateX(180deg); }
.face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 14px; padding: 22px; display: flex; flex-direction: column; justify-content: center; border: 1px solid var(--border-subtle); }
.front { background: linear-gradient(160deg, var(--bg-elevated), var(--bg-secondary)); }
.back { background: var(--accent); color: var(--accent-ink); transform: rotateX(180deg); border-color: var(--accent); align-items: flex-start; }
.v { font: 700 clamp(36px, 4vw, 50px)/1 var(--font-heading); color: var(--accent); }
.l { margin-top: 10px; font-size: 14px; color: var(--text-secondary); max-width: 24ch; }
.mono { font: 600 13px/1.5 var(--font-mono); letter-spacing: .02em; }
@media (max-width: 760px) { .strip { grid-template-columns: 1fr 1fr; } .kpi { height: 160px; } }
</style>
