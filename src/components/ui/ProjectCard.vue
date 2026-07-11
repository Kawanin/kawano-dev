<script setup>
import { useI18n } from 'vue-i18n'
import ToolIcon from './ToolIcon.vue'

const { locale } = useI18n()
defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <router-link :to="`/projetos/${project.slug}`" class="card">
    <div class="card-top">
      <ToolIcon :tool="project.tool" />
      <span class="card-tag">{{ project.tag[locale] }}</span>
    </div>
    <h3>{{ project.title[locale] }}</h3>
    <p>{{ project.hook[locale] }}</p>
    <div class="badge-row">
      <span class="badge" v-for="s in project.stack" :key="s">{{ s }}</span>
    </div>
  </router-link>
</template>

<style scoped>
.card { display: block; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 28px; transition: border-color 0.2s, transform 0.25s, box-shadow 0.25s; }
.card:hover { border-color: rgba(75, 180, 230, 0.35); transform: translateY(-4px); box-shadow: 0 12px 30px -12px rgba(46, 111, 217, 0.35); }
.card-top { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.card-tag { font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300); text-transform: uppercase; letter-spacing: 0.08em; }
.card h3 { font-size: var(--text-h3); margin-bottom: 10px; }
.card p { font-size: var(--text-small); color: var(--text-secondary); margin-bottom: 18px; }
.badge-row { display: flex; gap: 8px; flex-wrap: wrap; }
.badge { font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 20px; }
</style>