<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { SECTIONS, activeId, goTo } from '../../composables/useScrollState.js'

const { t } = useI18n()
const router = useRouter()
const idx = computed(() => Math.max(0, SECTIONS.findIndex((s) => s.id === activeId.value)))
function go(id) {
  if (!goTo(id)) router.push({ path: '/', hash: id === 'topo' ? '' : `#${id}` })
}
function step(d) {
  const n = Math.min(SECTIONS.length - 1, Math.max(0, idx.value + d))
  go(SECTIONS[n].id)
}
</script>

<template>
  <nav class="tabs" :aria-label="t('nav.sections')">
    <div class="pager">
      <button :disabled="idx === 0" aria-label="‹" @click="step(-1)">‹</button>
      <span class="mono">{{ t('nav.page') }} {{ idx + 1 }} / {{ SECTIONS.length }}</span>
      <button :disabled="idx === SECTIONS.length - 1" aria-label="›" @click="step(1)">›</button>
    </div>
    <div class="scroller">
      <button v-for="s in SECTIONS" :key="s.id" class="tab" :class="{ on: activeId === s.id }" :aria-current="activeId === s.id ? 'page' : undefined" @click="go(s.id)">
        {{ t(`nav.${s.key}`) }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.tabs { position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; height: var(--tabs-h); display: flex; align-items: stretch; background: rgba(8, 13, 24, 0.94); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-top: 1px solid var(--border-edge); }
.pager { display: flex; align-items: center; gap: 6px; padding: 0 14px; border-right: 1px solid var(--border-subtle); flex: none; }
.pager button { width: 26px; height: 26px; border-radius: 6px; border: 1px solid var(--border-subtle); background: transparent; color: var(--text-secondary); font-size: 16px; line-height: 1; transition: .2s; }
.pager button:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.pager button:disabled { opacity: .3; }
.mono { font: 500 11.5px var(--font-mono); color: var(--text-muted); min-width: 92px; text-align: center; letter-spacing: .04em; }
.scroller { display: flex; overflow-x: auto; scrollbar-width: none; flex: 1; }
.scroller::-webkit-scrollbar { display: none; }
.tab { position: relative; flex: none; padding: 0 20px; border: none; border-right: 1px solid var(--border-subtle); background: transparent; color: var(--text-muted); font: 500 13px var(--font-body); transition: background .25s, color .25s; }
.tab::before { content: ''; position: absolute; left: 0; right: 0; top: -1px; height: 2px; background: var(--accent); transform: scaleX(0); transition: transform .35s var(--ease); }
.tab:hover { color: var(--text-primary); background: rgba(75, 180, 230, 0.06); }
.tab.on { color: var(--text-primary); background: var(--bg-elevated); font-weight: 600; }
.tab.on::before { transform: scaleX(1); }
@media (max-width: 700px) { .pager .mono { display: none; } .pager { padding: 0 8px; } .tab { padding: 0 15px; } }
</style>
