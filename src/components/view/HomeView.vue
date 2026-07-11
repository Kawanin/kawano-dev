<script setup>
import { useI18n } from 'vue-i18n'
import Hero from '../sections/Hero.vue'
import Pipeline from '../sections/Pipeline.vue'
import SkillsGrid from '../sections/SkillsGrid.vue'
import ProjectCard from '../ui/ProjectCard.vue'
import BaseButton from '../ui/BaseButton.vue'
import { projects } from '../../assets/data/projects.js'

const { t } = useI18n()
const featured = projects.slice(0, 2)
</script>

<template>
  <section>
    <Hero />

    <div class="section">
      <div class="section-head" v-reveal>
        <h2>{{ t('home.featured') }}</h2>
        <router-link to="/projetos">
          <BaseButton variant="pill">{{ t('home.see_all') }} →</BaseButton>
        </router-link>
      </div>
      <div class="cards">
        <ProjectCard v-for="p in featured" :key="p.slug" :project="p" v-reveal />
      </div>
    </div>

    <Pipeline />
    <SkillsGrid />
  </section>
</template>

<style scoped>
.section { padding: 48px 48px; }
.section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; flex-wrap: wrap; gap: 12px; }
.section-head h2 { font-size: var(--text-h2); }
.cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
@media (max-width: 720px) { .cards { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .section { padding: 36px 24px; } }
</style>