<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionShell from '../ui/SectionShell.vue'
import { jobs } from '../../assets/data/experience.js'
import { setHover, rowState, tagState } from '../../composables/useCrossHighlight.js'

const { t, locale } = useI18n()
const L = computed(() => locale.value)
const jobId = ref(jobs[0].id)
const job = computed(() => jobs.find((j) => j.id === jobId.value))
const caseId = ref(jobs[0].cases[0].id)
const cur = computed(() => job.value.cases.find((c) => c.id === caseId.value) || job.value.cases[0])
watch(jobId, () => { caseId.value = job.value.cases[0].id })
const steps = ['problem', 'solution', 'result']
</script>

<template>
  <SectionShell id="experiencia" num="02" :label="t('experience.label')" :title="t('experience.title')">
    <p class="intro">{{ t('experience.intro') }}</p>

    <div class="jobs" role="tablist">
      <button v-for="j in jobs" :key="j.id" role="tab" :aria-selected="jobId === j.id" class="jobtab" :class="{ on: jobId === j.id }" @click="jobId = j.id">
        <b>{{ j.company.split('·').pop().trim() }}</b>
        <small>{{ j.role[L] }}</small>
        <em class="mono">{{ j.period[L] }}<i v-if="j.current" class="now"></i></em>
      </button>
    </div>
    <p class="sum" :key="jobId">{{ job.summary[L] }}</p>

    <div class="split">
      <ul class="list" role="tablist" aria-orientation="vertical">
        <li v-for="(c, i) in job.cases" :key="c.id" :class="rowState(c.tags)">
          <button role="tab" :aria-selected="caseId === c.id" class="item" :class="{ on: caseId === c.id }" @click="caseId = c.id">
            <span class="idx mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="ttl">{{ c.title[L] }}</span>
            <span class="arr" aria-hidden="true">→</span>
          </button>
        </li>
      </ul>

      <article class="panel" :key="cur.id">
        <header class="ph">
          <div class="big"><b>{{ cur.big.value }}</b><small>{{ cur.big.label[L] }}</small></div>
          <h3>{{ cur.title[L] }}</h3>
        </header>
        <ol class="flow">
          <li v-for="(s, k) in steps" :key="s" class="st" :class="s" :style="{ '--d': k * 120 + 'ms' }">
            <span class="dot">{{ k + 1 }}</span>
            <div><h4 class="mono">{{ t('experience.' + s) }}</h4><p>{{ cur[s][L] }}</p></div>
          </li>
        </ol>
        <div class="tags">
          <span v-for="tg in cur.tags" :key="tg" class="tag" :class="tagState(tg)" @mouseenter="setHover(tg)" @mouseleave="setHover('')">{{ tg }}</span>
        </div>
      </article>
    </div>
  </SectionShell>
</template>

<style scoped>
.intro { color: var(--text-muted); margin: -12px 0 24px; font-size: 15px; }
.mono { font: 500 12px var(--font-mono); letter-spacing: .04em; }
.jobs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.jobtab { text-align: left; display: grid; gap: 3px; padding: 16px 18px; border-radius: 14px; border: 1px solid var(--border-subtle); background: var(--bg-secondary); color: var(--text-secondary); transition: transform .35s var(--ease), border-color .25s, background .25s; }
.jobtab b { font: 700 19px var(--font-heading); color: var(--text-primary); } .jobtab small { font-size: 14px; } .jobtab em { font-style: normal; color: var(--text-muted); display: flex; align-items: center; gap: 8px; }
.jobtab:hover { transform: translateY(-3px); border-color: var(--border-edge); } .jobtab.on { border-color: var(--accent); background: var(--bg-elevated); }
.now { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: blink 2s infinite; } @keyframes blink { 50% { opacity: .25; } }
.sum { color: var(--text-secondary); margin: 18px 0 26px; max-width: 70ch; animation: fade .4s var(--ease); }
@keyframes fade { from { opacity: 0; transform: translateY(5px); } }
.split { display: grid; grid-template-columns: minmax(260px, 340px) minmax(0, 1fr); gap: 20px; align-items: start; }
.list { list-style: none; display: grid; gap: 6px; position: sticky; top: calc(var(--nav-h) + 16px); }
.list li { transition: opacity .3s; } .list li.dim { opacity: .3; } .list li.match .item { border-color: var(--accent); background: rgba(75,180,230,.08); }
.item { width: 100%; display: grid; grid-template-columns: 30px minmax(0, 1fr) 18px; gap: 10px; align-items: center; text-align: left; padding: 14px 16px; border-radius: 12px; border: 1px solid var(--border-subtle); background: transparent; color: var(--text-secondary); transition: transform .35s var(--ease), background .25s, border-color .25s, color .25s; }
.item .idx { color: var(--text-faint); } .item .ttl { font: 600 15.5px/1.3 var(--font-heading); } .item .arr { opacity: 0; transform: translateX(-6px); transition: .3s var(--ease); color: var(--accent); }
.item:hover { transform: translateX(6px); border-color: var(--border-edge); color: var(--text-primary); } .item:hover .arr { opacity: 1; transform: none; }
.item.on { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); transform: translateX(10px); } .item.on .idx, .item.on .arr { color: var(--accent-ink); opacity: 1; transform: none; }
.panel { border: 1px solid var(--border-subtle); border-radius: 16px; padding: clamp(20px, 3vw, 32px); background: linear-gradient(165deg, var(--bg-elevated), var(--bg-secondary)); animation: fade .45s var(--ease); }
.ph { display: grid; gap: 14px; margin-bottom: 26px; padding-bottom: 22px; border-bottom: 1px solid var(--border-subtle); }
.big b { display: block; font: 700 clamp(34px, 4.5vw, 52px)/1 var(--font-heading); color: var(--accent); letter-spacing: -.02em; } .big small { color: var(--text-muted); font-size: 13px; }
.ph h3 { font-size: var(--text-h3); }
.flow { list-style: none; display: grid; gap: 22px; position: relative; }
.flow::before { content: ''; position: absolute; left: 15px; top: 14px; bottom: 14px; width: 2px; background: linear-gradient(var(--accent), var(--blue-700)); opacity: .5; }
.st { display: grid; grid-template-columns: 32px minmax(0, 1fr); gap: 16px; opacity: 0; transform: translateY(10px); animation: rise .5s var(--ease) var(--d) forwards; }
@keyframes rise { to { opacity: 1; transform: none; } }
.dot { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; background: var(--bg-primary); border: 2px solid var(--accent); color: var(--accent); font: 600 13px var(--font-mono); position: relative; z-index: 1; transition: background .25s, color .25s, transform .35s var(--ease); }
.st:hover .dot { background: var(--accent); color: var(--accent-ink); transform: scale(1.12); }
.st.result .dot { background: var(--accent); color: var(--accent-ink); }
.st h4 { color: var(--accent); text-transform: uppercase; margin-bottom: 6px; } .st p { color: var(--text-secondary); font-size: 15.5px; max-width: 64ch; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 26px; padding-top: 20px; border-top: 1px solid var(--border-subtle); }
.tag { font: 500 12px var(--font-mono); padding: 5px 11px; border-radius: 99px; border: 1px solid var(--border-edge); color: var(--text-secondary); transition: .2s; cursor: default; }
.tag:hover, .tag.match { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); transform: translateY(-2px); } .tag.dim { opacity: .35; }
@media (max-width: 820px) { .split { grid-template-columns: 1fr; } .list { position: static; grid-template-columns: 1fr; } .item.on { transform: none; } .jobs { grid-template-columns: 1fr; } }
</style>
