<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n()
const mastered = tm('home.skills_mastered')
const learning = tm('home.skills_learning')
</script>

<template>
  <div class="section">
    <div class="section-head" v-reveal><h2>{{ t('home.stack') }}</h2></div>
    <div class="skills-grid">
      <div class="skill-col solid" v-reveal>
        <h4>{{ t('home.mastered') }}</h4>
        <div class="skill-item" v-for="s in mastered" :key="s.name">
          {{ s.name }}
          <div class="dot-row"><div class="dot" :class="{ on: n <= s.level }" v-for="n in 4" :key="n"></div></div>
        </div>
      </div>
      <div class="skill-col learning" v-reveal>
        <h4>{{ t('home.learning') }}</h4>
        <div class="skill-item learning" v-for="s in learning" :key="s.name">
          {{ s.name }}
          <div class="dot-row"><div class="dot" :class="{ on: n <= s.level }" v-for="n in 4" :key="n"></div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-head h2 { font-size: var(--text-h2); margin-bottom: 32px; }
.skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 640px) { .skills-grid { grid-template-columns: 1fr; } }
.skill-col h4 { font-family: var(--font-mono); font-size: var(--text-mono); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
.skill-col.solid h4 { color: var(--blue-300); }
.skill-col.learning h4 { color: var(--text-muted); }
.skill-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: var(--text-small); }
.skill-item.learning { color: var(--text-secondary); }
.dot-row { display: flex; gap: 4px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border-subtle); }
.dot.on { background: var(--blue-300); }
</style>