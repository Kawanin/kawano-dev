<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionShell from '../ui/SectionShell.vue'
import { projects } from '../../assets/data/projects.js'
import { rowState, setHover } from '../../composables/useCrossHighlight.js'

const { t, locale } = useI18n()
const L = computed(() => locale.value)
const names = { powerbi: 'Power BI', n8n: 'n8n', tableau: 'Tableau', looker: 'Looker', snowflake: 'Snowflake', aws: 'AWS' }
const tools = [...new Set(projects.map((p) => p.tool))]
const filter = ref('all')
const openSlug = ref('')
const shown = computed(() => projects.filter((p) => filter.value === 'all' || p.tool === filter.value))
const opened = computed(() => projects.find((p) => p.slug === openSlug.value))
const tagsOf = (p) => [names[p.tool] || p.tool, ...p.stack]
const onKey = (e) => { if (e.key === 'Escape') openSlug.value = '' }
watch(openSlug, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
  v ? window.addEventListener('keydown', onKey) : window.removeEventListener('keydown', onKey)
})
onUnmounted(() => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) })
</script>

<template>
  <SectionShell id="projetos" num="03" :label="t('projects.label')" :title="t('projects.title')">
    <p class="intro">{{ t('projects.intro') }}</p>
    <div class="slicer" role="group">
      <button class="chip" :class="{ on: filter === 'all' }" @click="filter = 'all'">{{ t('projects.all') }}</button>
      <button v-for="k in tools" :key="k" class="chip" :class="{ on: filter === k }" @click="filter = k">{{ names[k] || k }}</button>
      <span class="count">{{ t('projects.count', { n: shown.length, total: projects.length }) }}</span>
    </div>

    <TransitionGroup name="g" tag="div" class="grid">
      <button v-for="p in shown" :key="p.slug" class="card" :class="rowState(tagsOf(p))" @click="openSlug = p.slug">
        <span class="tg">{{ p.tag[L] }}</span>
        <h3>{{ p.title[L] }}</h3>
        <p>{{ p.hook[L] }}</p>
        <span class="open">{{ t('projects.open') }} <i>↗</i></span>
        <span class="glow" aria-hidden="true"></span>
      </button>
    </TransitionGroup>

    <Teleport to="body">
      <Transition name="m">
        <div v-if="opened" class="modal" role="dialog" aria-modal="true" @click.self="openSlug = ''">
          <div class="sheet">
            <button class="x" :aria-label="t('projects.close')" @click="openSlug = ''">✕</button>
            <span class="tg">{{ opened.tag[L] }}</span>
            <h3>{{ opened.title[L] }}</h3>
            <dl>
              <div v-for="k in ['context', 'discovery', 'solution', 'result']" :key="k"><dt>{{ t('projects.' + k) }}</dt><dd>{{ opened[k][L] }}</dd></div>
            </dl>
            <div class="tags"><span v-for="s in tagsOf(opened)" :key="s" class="tag">{{ s }}</span></div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </SectionShell>
</template>

<style scoped>
.intro { color: var(--text-muted); margin: -12px 0 20px; font-size: 15px; max-width: 62ch; }
.slicer { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 24px; }
.chip { font: 500 12.5px var(--font-mono); padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border-edge); background: transparent; color: var(--text-secondary); transition: .25s var(--ease); }
.chip:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); } .chip.on { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
.count { margin-left: auto; color: var(--text-faint); font: 500 12px var(--font-mono); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; position: relative; }
.card { position: relative; overflow: hidden; text-align: left; display: flex; flex-direction: column; gap: 10px; padding: 20px; min-height: 210px; border-radius: 16px; border: 1px solid var(--border-subtle); background: var(--bg-secondary); color: inherit; transition: transform .45s var(--ease), border-color .3s, opacity .3s, box-shadow .4s; }
.card h3 { font: 600 19px/1.25 var(--font-heading); position: relative; } .card p { color: var(--text-secondary); font-size: 14.5px; position: relative; }
.tg { font: 500 11.5px var(--font-mono); color: var(--accent); letter-spacing: .04em; text-transform: uppercase; position: relative; }
.open { margin-top: auto; font: 500 12px var(--font-mono); color: var(--text-muted); position: relative; transition: color .2s; } .open i { display: inline-block; font-style: normal; transition: transform .35s var(--ease); }
.glow { position: absolute; inset: auto -30% -60% -30%; height: 70%; background: radial-gradient(closest-side, var(--accent-glow), transparent); opacity: 0; transition: opacity .4s, transform .6s var(--ease); transform: translateY(30px); }
.card:hover { transform: translateY(-8px) rotate(-.4deg); border-color: var(--accent); box-shadow: 0 26px 50px -26px var(--accent-glow); } .card:hover .glow { opacity: .6; transform: none; } .card:hover .open { color: var(--accent); } .card:hover .open i { transform: translate(4px, -4px); }
.card.dim { opacity: .28; } .card.match { border-color: var(--accent); }
.g-enter-active, .g-leave-active { transition: opacity .35s, transform .4s var(--ease); } .g-enter-from, .g-leave-to { opacity: 0; transform: scale(.94); } .g-leave-active { position: absolute; }
.modal { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px; background: rgba(5, 9, 18, .72); backdrop-filter: blur(6px); }
.sheet { position: relative; width: min(680px, 100%); max-height: 86vh; overflow: auto; border-radius: 18px; border: 1px solid var(--border-edge); background: var(--bg-elevated); padding: clamp(22px, 4vw, 36px); display: grid; gap: 16px; }
.sheet h3 { font: 700 clamp(22px, 3vw, 28px)/1.2 var(--font-heading); padding-right: 36px; }
.x { position: absolute; top: 16px; right: 16px; width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border-edge); background: transparent; color: var(--text-secondary); transition: .2s; } .x:hover { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
dl { display: grid; gap: 14px; } dl > div { padding-left: 16px; border-left: 2px solid var(--blue-700); transition: border-color .25s; } dl > div:hover { border-color: var(--accent); }
dt { font: 500 11.5px var(--font-mono); text-transform: uppercase; letter-spacing: .06em; color: var(--accent); margin-bottom: 4px; } dd { color: var(--text-secondary); font-size: 15.5px; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; } .tag { font: 500 12px var(--font-mono); padding: 5px 11px; border-radius: 99px; border: 1px solid var(--border-edge); color: var(--text-secondary); }
.m-enter-active, .m-leave-active { transition: opacity .25s; } .m-enter-active .sheet, .m-leave-active .sheet { transition: transform .4s var(--ease); } .m-enter-from, .m-leave-to { opacity: 0; } .m-enter-from .sheet, .m-leave-to .sheet { transform: translateY(24px) scale(.97); }
</style>
