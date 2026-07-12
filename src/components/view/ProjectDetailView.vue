<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projects } from '../../assets/data/projects.js'
import BaseBadge from '../ui/BaseBadge.vue'

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

    <div class="case-layout">
      <div class="case-content">
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

        <a class="download-btn download-bottom" :class="{ disabled: !project.downloadUrl }" :href="project.downloadUrl || '#'" :target="project.downloadUrl ? '_blank' : undefined" v-reveal>{{ t('project_detail.download') }} ↓</a>
      </div>

      <aside class="case-side">
        <a class="download-btn" :class="{ disabled: !project.downloadUrl }" :href="project.downloadUrl || '#'" :target="project.downloadUrl ? '_blank' : undefined">{{ t('project_detail.download') }} ↓</a>

        <div class="gif-frame">
          <img v-if="project.gifUrl" :src="project.gifUrl" :alt="project.title[locale]" />
          <span v-else class="gif-placeholder">{{ t('project_detail.gif_placeholder') }}</span>
        </div>
      </aside>
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

.case-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 48px;
  align-items: start;
  padding: 16px 48px 72px;
  max-width: 1100px;
}
.case-content { max-width: 680px; }
.block { margin-bottom: 36px; }
.block h3 { font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
.block p { font-size: var(--text-body); color: var(--text-secondary); }

.case-side { display: flex; flex-direction: column; gap: 16px; }

.download-btn {
  display: block; text-align: center; font-family: var(--font-body); font-weight: 600; font-size: 15px;
  padding: 16px 24px; border-radius: var(--radius-sm); background: var(--blue-500); color: #fff;
  transition: transform 0.2s, opacity 0.2s;
}
.download-btn:hover { transform: translateY(-2px); }
.download-btn.disabled { opacity: 0.4; pointer-events: none; }
.download-bottom { max-width: 340px; margin-top: 8px; }

.gif-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.gif-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gif-placeholder { font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); }

@media (max-width: 900px) {
  .case-layout { grid-template-columns: 1fr; }
  .case-side { order: -1; margin-bottom: 8px; }
  .download-bottom { max-width: 100%; }
}

@media (max-width: 640px) {
  .hero, .case-layout { padding-left: 24px; padding-right: 24px; }
}
</style>