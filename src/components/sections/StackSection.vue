<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionShell from '../ui/SectionShell.vue'
import { stackGroups } from '../../assets/data/stack.js'
import { setHover, tagState } from '../../composables/useCrossHighlight.js'

const { t, locale } = useI18n()
const L = computed(() => locale.value)
const active = ref('')
const enter = (n) => { active.value = n; setHover(n) }
const leave = () => { active.value = ''; setHover('') }
</script>

<template>
  <SectionShell id="stack" num="05" :label="t('stack.label')" :title="t('stack.title')">
    <p class="intro">{{ t('stack.intro') }}</p>
    <div class="groups">
      <div v-for="g in stackGroups" :key="g.key" class="group" v-reveal>
        <h3 class="label">{{ t('stack.groups.' + g.key) }}</h3>
        <div class="chips">
          <button v-for="it in g.items" :key="it.name" class="chip" :class="[tagState(it.name), { on: active === it.name }]" @mouseenter="enter(it.name)" @mouseleave="leave" @focus="enter(it.name)" @blur="leave">
            <span class="nm">{{ it.name }}</span>
            <span class="lv" aria-hidden="true"><i v-for="n in 5" :key="n" :class="{ f: n <= it.level }"></i></span>
            <span class="used">{{ it.used[L] }}</span>
          </button>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.intro { color: var(--text-muted); margin: -12px 0 28px; font-size: 15px; max-width: 60ch; }
.groups { display: grid; gap: 26px; } .group h3 { margin-bottom: 12px; } .chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chip { position: relative; display: grid; gap: 6px; min-width: 130px; text-align: left; padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border-edge); background: var(--bg-secondary); color: var(--text-primary); transition: transform .35s var(--ease), background .25s, color .25s, border-color .25s, opacity .3s; }
.nm { font: 600 15px var(--font-heading); } .lv { display: flex; gap: 3px; } .lv i { width: 14px; height: 3px; border-radius: 2px; background: var(--border-edge); transition: background .25s; } .lv i.f { background: var(--blue-500); }
.used { position: absolute; left: 0; right: 0; top: calc(100% + 8px); z-index: 5; width: max-content; max-width: 260px; background: var(--bg-elevated); border: 1px solid var(--border-edge); color: var(--text-secondary); font-size: 13px; padding: 8px 12px; border-radius: 8px; opacity: 0; transform: translateY(-4px); pointer-events: none; transition: .25s var(--ease); }
@media (max-width: 600px) { .chip:nth-child(2n) .used { left: auto; right: 0; } .used { max-width: 200px; } }
.chip:hover, .chip.on, .chip.match { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); transform: translateY(-4px); } .chip:hover .lv i.f, .chip.match .lv i.f { background: var(--accent-ink); } .chip:hover .lv i, .chip.match .lv i { background: rgba(7,16,30,.25); }
.chip:hover .used, .chip:focus-visible .used { opacity: 1; transform: none; } .chip.dim { opacity: .3; }
</style>
