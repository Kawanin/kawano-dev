<script setup>
import { useI18n } from 'vue-i18n'
import CountUp from '../ui/CountUp.vue'
const { tm, rt } = useI18n()
const kpis = () => tm('kpis')
const tools = ['Power BI', 'DAX', 'SQL Server', 'PostgreSQL', 'Python', 'n8n', 'Power Query', 'Fabric', 'Flutter', 'Figma', 'Git']
</script>

<template>
  <div class="strip">
    <div class="wrap kpis">
      <div v-for="(k, i) in kpis()" :key="i" class="kpi" v-reveal="i * 80">
        <div class="v"><CountUp :to="k.v" :suffix="k.s" /></div>
        <div class="l">{{ rt(k.l) }}</div>
      </div>
    </div>
    <div class="marquee" aria-hidden="true">
      <div class="track"><span v-for="(n, i) in [...tools, ...tools]" :key="n + i">{{ n }}</span></div>
    </div>
  </div>
</template>

<style scoped>
.strip { margin-top: clamp(56px, 8vw, 100px); border-block: 1px solid var(--border-subtle); background: rgba(8, 13, 24, .5); position: relative; z-index: 1; }
.kpis { display: grid; grid-template-columns: repeat(4, 1fr); }
.kpi { padding: 34px 20px 30px 0; border-right: 1px solid var(--border-subtle); padding-left: 20px; transition: background .3s; }
.kpi:first-child { padding-left: 0; } .kpi:last-child { border-right: none; }
.kpi:hover { background: rgba(75,180,230,.05); }
.v { font-family: var(--font-heading); font-size: clamp(36px, 4.4vw, 54px); font-weight: 700; color: var(--accent); line-height: 1; transition: transform .35s var(--ease); }
.kpi:hover .v { transform: translateX(6px); }
.l { margin-top: 10px; font-size: 14px; color: var(--text-secondary); max-width: 24ch; }
.marquee { border-top: 1px solid var(--border-subtle); overflow: hidden; padding: 14px 0; }
.track { display: flex; width: max-content; gap: 44px; animation: mq 38s linear infinite; }
.marquee:hover .track { animation-play-state: paused; }
.track span { font: 500 13px var(--font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--text-muted); transition: color .2s; }
.track span:hover { color: var(--accent); }
@keyframes mq { to { transform: translateX(-50%); } }
@media (max-width: 760px) { .kpis { grid-template-columns: 1fr 1fr; } .kpi { border-bottom: 1px solid var(--border-subtle); padding-left: 0; } .kpi:nth-child(2n) { border-right: none; padding-left: 20px; } }
</style>
