<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectCard from '../ui/ProjectCard.vue'
import { projects } from '../../assets/data/projects.js'

const { t, locale } = useI18n()

const toolFilters = ['powerbi', 'n8n', 'tableau', 'looker', 'snowflake', 'aws']
const active = ref('all')

const filtered = computed(() =>
  active.value === 'all' ? projects : projects.filter((p) => p.tool === active.value)
)
</script>

<template>
  <section>
    <div class="hero">
      <div class="eyebrow">{{ t('projects_page.eyebrow') }}</div>
      <h1>{{ t('projects_page.title') }}</h1>
      <p>{{ t('projects_page.subtitle') }}</p>
    </div>

    <div class="section">
      <div class="filter-row" v-reveal>
        <button class="chip" :class="{ active: active === 'all' }" @click="active = 'all'">{{ t('projects_page.filter_all') }}</button>
        <button v-for="f in toolFilters" :key="f" class="chip" :class="{ active: active === f }" @click="active = f">
          {{ f === 'powerbi' ? 'Power BI' : f === 'n8n' ? 'n8n' : f === 'tableau' ? 'Tableau' : f === 'looker' ? 'Looker' : f === 'snowflake' ? 'Snowflake' : 'AWS' }}
        </button>
      </div>

      <div class="proj-grid">
        <ProjectCard v-for="p in filtered" :key="p.slug" :project="p" v-reveal />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 56px 48px 16px; max-width: 700px; }
.eyebrow { font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300); display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
.eyebrow::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--blue-300); box-shadow: 0 0 12px var(--blue-300); }
.hero h1 { font-size: 40px; margin-bottom: 14px; }
.hero p { color: var(--text-secondary); font-size: var(--text-body); }
.section { padding: 32px 48px 56px; }
.filter-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; }
.chip { font-family: var(--font-mono); font-size: 12.5px; padding: 8px 16px; border-radius: 20px; border: 1px solid var(--border-subtle); color: var(--text-secondary); background: transparent; }
.chip.active { background: var(--blue-500); border-color: var(--blue-500); color: #fff; }
.proj-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
@media (max-width: 720px) { .proj-grid { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .hero, .section { padding-left: 24px; padding-right: 24px; } }
</style>