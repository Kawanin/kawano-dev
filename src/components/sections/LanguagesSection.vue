<script setup>
import { useI18n } from 'vue-i18n'
import SectionShell from '../ui/SectionShell.vue'
const { t, tm, rt } = useI18n()
const items = () => tm('languages.items')
</script>

<template>
  <SectionShell id="idiomas" num="06" :label="t('languages.label')" :title="t('languages.title')">
    <div class="grid">
      <div v-for="(l, i) in items()" :key="i" class="lang" v-reveal="i * 70">
        <span :class="`fi fi-${rt(l.flag)}`" class="flag"></span>
        <div class="info"><b>{{ rt(l.n) }}</b><small>{{ rt(l.l) }}</small></div>
        <div class="bar"><i :style="{ '--w': l.v + '%' }"></i></div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.lang { display: grid; gap: 14px; padding: 20px; border: 1px solid var(--border-subtle); border-radius: 14px; background: var(--bg-secondary); transition: transform .4s var(--ease), border-color .3s; }
.lang:hover { transform: translateY(-6px); border-color: var(--accent); }
.flag { width: 40px; height: 28px; border-radius: 5px; background-size: cover; transition: transform .4s var(--ease); } .lang:hover .flag { transform: scale(1.15) rotate(-4deg); }
.info b { display: block; font: 600 17px var(--font-heading); } .info small { color: var(--text-muted); font-size: 14px; }
.bar { height: 4px; background: var(--border-subtle); border-radius: 2px; overflow: hidden; } .bar i { display: block; height: 100%; width: 0; background: linear-gradient(90deg, var(--blue-500), var(--blue-300)); transition: width 1s var(--ease); }
.lang.in-view .bar i, .lang:hover .bar i { width: var(--w); }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr 1fr; } }
</style>
