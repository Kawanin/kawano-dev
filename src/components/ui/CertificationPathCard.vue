<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import IssuerLogo from './IssuerLogo.vue'

const { locale, t } = useI18n()
const props = defineProps({ path: { type: Object, required: true } })
const open = ref(false)

const doneCount = props.path.courses.filter(c => c.status === 'done').length
</script>

<template>
  <div class="path-card">
    <button class="path-header" @click="open = !open">
      <IssuerLogo :issuer="path.issuerKey" />
      <div class="path-info">
        <strong>{{ path.title[locale] }}</strong>
        <span class="path-meta">{{ path.issuer }} · {{ t('about.cert_completed_of', { done: doneCount, total: path.totalCourses }) }}</span>
      </div>
      <span class="chevron" :class="{ open }">⌄</span>
    </button>

    <div class="path-body" :class="{ open }">
      <div class="course-row" v-for="c in path.courses" :key="c.title.pt" :class="c.status">
        <span class="course-dot"></span>
        <div class="course-info">
          <span class="course-title">{{ c.title[locale] }}</span>
          <span v-if="c.status === 'in-progress'" class="course-progress">{{ t('about.cert_percent_complete', { percent: c.progress }) }}</span>
        </div>
        <a v-if="c.pdf" :href="c.pdf" target="_blank" class="course-link">{{ t('about.cert_view') }}</a>
        <span v-else-if="c.status === 'in-progress'" class="course-link muted">{{ t('about.cert_pending') }}</span>
        <span v-else class="course-link muted">{{ t('about.cert_not_started') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.path-card { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; }
.path-header { width: 100%; display: flex; align-items: center; gap: 14px; padding: 16px; background: none; border: none; cursor: pointer; text-align: left; }
.path-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.path-info strong { font-size: var(--text-small); font-weight: 600; color: var(--text-primary); }
.path-meta { font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); }
.chevron { color: var(--text-muted); transition: transform 0.2s; }
.chevron.open { transform: rotate(180deg); }

.path-body { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; border-top: 1px solid transparent; }
.path-body.open { max-height: 600px; border-top: 1px solid var(--border-subtle); }

.course-row { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border-subtle); }
.course-row:last-child { border-bottom: none; }
.course-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--blue-300); flex-shrink: 0; }
.course-row.not-started .course-dot { background: var(--text-muted); opacity: 0.5; }
.course-row.in-progress .course-dot { background: var(--blue-500); }
.course-info { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.course-title { font-size: 13.5px; color: var(--text-primary); }
.course-row.not-started .course-title { color: var(--text-muted); }
.course-progress { font-family: var(--font-mono); font-size: 11px; color: var(--blue-300); }
.course-link { font-family: var(--font-mono); font-size: 12px; color: var(--blue-300); white-space: nowrap; }
.course-link.muted { color: var(--text-muted); }
</style>