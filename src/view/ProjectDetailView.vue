<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BaseBadge from '../components/ui/BaseBadge.vue'
import { projects } from '../assets/data/projects.js'

const route = useRoute()
const { locale, t } = useI18n()
const project = computed(() => projects.find((p) => p.slug === route.params.slug))

const labels = {
  pt: { context: 'Contexto', investigation: 'Investigação', discovery: 'Descoberta', solution: 'Solução', result: 'Resultado', notFound: 'Projeto não encontrado.', back: 'Voltar' },
  en: { context: 'Context', investigation: 'Investigation', discovery: 'Discovery', solution: 'Solution', result: 'Result', notFound: 'Project not found.', back: 'Back' }
}
const l = computed(() => labels[locale.value])
</script>

<template>
  <section v-if="project" class="case">
    <div class="hero">
      <span class="card-tag">{{ project.tag[locale] }}</span>
      <h1>{{ project.title[locale] }}</h1>
      <div class="badge-row">
        <BaseBadge v-for="s in project.stack" :key="s">{{ s }}</BaseBadge>
      </div>
    </div>

    <div class="section">
      <div class="block" v-reveal>
        <h3>{{ l.context }}</h3>
        <p>{{ project.context[locale] }}</p>
      </div>
      <div class="block" v-reveal>
        <h3>{{ l.investigation }}</h3>
        <p>{{ project.investigation[locale] }}</p>
      </div>
      <div class="block" v-reveal>
        <h3>{{ l.discovery }}</h3>
        <p>{{ project.discovery[locale] }}</p>
      </div>
      <div class="block" v-reveal>
        <h3>{{ l.solution }}</h3>
        <p>{{ project.solution[locale] }}</p>
      </div>
      <div class="block" v-reveal>
        <h3>{{ l.result }}</h3>
        <p>{{ project.result[locale] }}</p>
      </div>
    </div>
  </section>

  <section v-else class="section">
    <p>{{ l.notFound }} <router-link to="/projetos">{{ l.back }}</router-link></p>
  </section>
</template>

<style scoped>
.hero { padding: 64px 48px 24px; max-width: 760px; }
.card-tag { font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300); text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 14px; }
.hero h1 { font-size: 38px; margin-bottom: 20px; }
.badge-row { display: flex; gap: 8px; flex-wrap: wrap; }
.section { padding: 16px 48px 72px; max-width: 720px; }
.block { margin-bottom: 36px; }
.block h3 { font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
.block p { font-size: var(--text-body); color: var(--text-secondary); }
@media (max-width: 640px) { .hero, .section { padding-left: 24px; padding-right: 24px; } }
</style>