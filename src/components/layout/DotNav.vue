<script setup>
import { useI18n } from 'vue-i18n'
import { SECTIONS, activeId, goTo } from '../../composables/useScrollState.js'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
function go(id) {
  if (!goTo(id)) router.push({ path: '/', hash: id === 'topo' ? '' : `#${id}` })
}
</script>

<template>
  <nav class="dots" :aria-label="t('nav.sections')">
    <button
      v-for="s in SECTIONS"
      :key="s.id"
      class="dot"
      :class="{ on: activeId === s.id }"
      :aria-label="t(`nav.${s.key}`)"
      :aria-current="activeId === s.id ? 'true' : undefined"
      @click="go(s.id)"
    >
      <span class="tip">{{ t(`nav.${s.key}`) }}</span>
      <i></i>
    </button>
  </nav>
</template>

<style scoped>
.dots { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); z-index: 40; display: flex; flex-direction: column; gap: 10px; }
.dot { position: relative; width: 14px; height: 14px; border: none; background: transparent; display: flex; align-items: center; justify-content: flex-end; padding: 0; }
.dot i { display: block; width: 7px; height: 7px; border: 1px solid var(--text-faint); border-radius: 2px; transition: height 0.35s var(--ease), background 0.25s, border-color 0.25s, box-shadow 0.25s; }
.dot:hover i { border-color: var(--accent); }
.dot.on i { height: 22px; background: var(--accent); border-color: var(--accent); box-shadow: 0 0 10px var(--accent-glow); }
.tip {
  position: absolute; right: 24px; top: 50%; transform: translate(6px, -50%);
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
  color: var(--text-primary); background: var(--bg-elevated); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 6px;
  opacity: 0; pointer-events: none; transition: opacity 0.2s, transform 0.25s var(--ease);
}
.dot:hover .tip, .dot:focus-visible .tip { opacity: 1; transform: translate(0, -50%); }
@media (max-width: 1100px) { .dots { display: none; } }
</style>
