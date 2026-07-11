<script setup>
import { ref, computed } from 'vue'
import ProjectCard from '../components/ui/ProjectCard.vue'
import { projects } from '../../assets/data/projects.js'

const filters = [
  { label: 'Todos', value: 'all' },
  { label: 'Power BI', value: 'powerbi' },
  { label: 'n8n', value: 'n8n' },
  { label: 'Tableau', value: 'tableau' },
  { label: 'Looker', value: 'looker' },
  { label: 'Snowflake', value: 'snowflake' },
  { label: 'AWS', value: 'aws' }
]
const active = ref('all')

const filtered = computed(() =>
  active.value === 'all' ? projects : projects.filter((p) => p.tool === active.value)
)
</script>

<template>
  <section>
    <div class="hero">
      <div class="eyebrow">Portfolio</div>
      <h1>Projetos</h1>
      <p>Oito projetos de Business Intelligence, automação e engenharia de dados — do Power BI ao AWS.</p>
    </div>

    <div class="section">
      <div class="filter-row" v-reveal>
        <button
          v-for="f in filters" :key="f.value"
          class="chip" :class="{ active: active === f.value }"
          @click="active = f.value"
        >{{ f.label }}</button>
      </div>

      <div class="proj-grid">
        <ProjectCard v-for="p in filtered" :key="p.slug" :project="p" v-reveal />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 90px 48px 20px; max-width: 700px; }
.eyebrow {
  font-family: var(--font-mono); font-size: 13px; color: var(--blue-300);
  display: flex; align-items: center; gap: 8px; margin-bottom: 24px;
}
.eyebrow::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--blue-300); box-shadow: 0 0 12px var(--blue-300); }
.hero h1 { font-size: 42px; margin-bottom: 16px; }
.hero p { color: var(--text-secondary); }
.section { padding: 40px 48px 70px; }
.filter-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; }
.chip {
  font-family: var(--font-mono); font-size: 12.5px; padding: 8px 16px; border-radius: 20px;
  border: 1px solid var(--border-subtle); color: var(--text-secondary); background: transparent;
}
.chip.active { background: var(--blue-500); border-color: var(--blue-500); color: #fff; }
.proj-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
@media (max-width: 720px) { .proj-grid { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .hero, .section { padding-left: 24px; padding-right: 24px; } }
</style>