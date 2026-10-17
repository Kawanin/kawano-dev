<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CountUp from '../ui/CountUp.vue'
import BrandIcon from '../ui/BrandIcon.vue'
import { goTo } from '../../composables/useScrollState.js'

const { t, locale } = useI18n()
const cv = computed(() => (locale.value === 'en' ? '/documents/cv-luciano-kawano-en.pdf' : '/documents/cv-luciano-kawano-pt.pdf'))
const bars = [
  { q: 'T1', v: 46 }, { q: 'T2', v: 62 }, { q: 'T3', v: 55 }, { q: 'T4', v: 82 }
]
const hov = ref(-1)
const nodes = ['Webhook', 'SQL', 'Python', 'E-mail']
const flowOn = ref(false)
const tableOn = ref('')
</script>

<template>
  <section id="topo" class="hero">
    <div class="wrap grid">
      <div class="copy">
        <div class="status" v-reveal><i class="pulse"></i>{{ t('hero.status') }}</div>
        <h1 v-reveal="80">{{ t('hero.title_1') }} <em>{{ t('hero.title_2') }}</em></h1>
        <p class="sub" v-reveal="160">{{ t('hero.subtitle') }}</p>
        <div class="ctas" v-reveal="240">
          <a class="btn primary" href="#experiencia" @click.prevent="goTo('experiencia')">{{ t('hero.cta_projects') }} <span>→</span></a>
          <a class="btn ghost" :href="cv" target="_blank" rel="noopener">{{ t('hero.cta_cv') }} <span>↓</span></a>
        </div>
        <div class="socials" v-reveal="320">
          <a href="https://www.linkedin.com/in/lucianokawano/" target="_blank" rel="noopener" aria-label="LinkedIn"><BrandIcon name="linkedin" /></a>
          <a href="https://www.instagram.com/lucio_kawano/" target="_blank" rel="noopener" aria-label="Instagram"><BrandIcon name="instagram" /></a>
          <a href="https://api.whatsapp.com/send/?phone=554195402023" target="_blank" rel="noopener" aria-label="WhatsApp"><BrandIcon name="whatsapp" /></a>
          <a href="mailto:l.kawano.jr@gmail.com" aria-label="E-mail"><BrandIcon name="mail" /></a>
        </div>
      </div>

      <div class="cards" aria-hidden="true">
        <div class="card c1">
          <div class="ct"><span>{{ t('hero.card_kpi') }}</span><i>···</i></div>
          <div class="big"><CountUp :to="87" suffix="%" /></div>
          <svg viewBox="0 0 120 32" class="spark"><polyline points="0,26 18,22 36,24 54,14 72,16 90,8 120,4" /></svg>
        </div>
        <div class="card c2">
          <div class="ct"><span>{{ t('hero.card_bars') }}</span><i>···</i></div>
          <div class="bars" @mouseleave="hov = -1">
            <div v-for="(b, i) in bars" :key="b.q" class="bar" :class="{ on: hov === i }" @mouseenter="hov = i">
              <span class="tip">{{ b.v }}</span><i :style="{ height: b.v + '%' }"></i><b>{{ b.q }}</b>
            </div>
          </div>
        </div>
        <div class="card c3" @mouseenter="flowOn = true" @mouseleave="flowOn = false">
          <div class="ct"><span>{{ t('hero.card_flow') }}</span><i>···</i></div>
          <div class="flow" :class="{ on: flowOn }">
            <template v-for="(n, i) in nodes" :key="n">
              <span class="node">{{ n }}</span><span v-if="i < nodes.length - 1" class="wire"></span>
            </template>
          </div>
        </div>
        <div class="card c4" @mouseleave="tableOn = ''">
          <div class="ct"><span>{{ t('hero.card_model') }}</span><i>···</i></div>
          <svg viewBox="0 0 140 80" class="star">
            <g stroke="currentColor" stroke-width="1" opacity=".5"><line x1="70" y1="40" x2="20" y2="14" /><line x1="70" y1="40" x2="120" y2="14" /><line x1="70" y1="40" x2="20" y2="66" /><line x1="70" y1="40" x2="120" y2="66" /></g>
            <rect v-for="(p, k) in [[8,4,'Dim'],[108,4,'Dim'],[8,56,'Dim'],[108,56,'Dim']]" :key="k" :x="p[0]" :y="p[1]" width="24" height="20" rx="3" class="dim" :class="{ hot: tableOn === 'd' }" @mouseenter="tableOn = 'd'" />
            <rect x="52" y="28" width="36" height="24" rx="3" class="fact" :class="{ hot: tableOn === 'f' }" @mouseenter="tableOn = 'f'" />
          </svg>
        </div>
        <div class="hint mono">{{ t('hero.hint') }} ↑ <small>(ilustrativo)</small></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: clamp(48px, 8vw, 110px) 0 0; position: relative; z-index: 1; }
.grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 48px; align-items: center; }
.status { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 12.5px; letter-spacing: .04em; color: var(--text-secondary); border: 1px solid var(--border-subtle); padding: 7px 14px; border-radius: 99px; margin-bottom: 26px; }
.pulse { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 0 var(--accent-glow); animation: pulse 2s infinite; }
@keyframes pulse { 70% { box-shadow: 0 0 0 9px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
h1 { font-size: var(--text-hero); line-height: 1.04; letter-spacing: -0.03em; margin-bottom: 24px; }
h1 em { font-style: normal; background: linear-gradient(100deg, var(--blue-500), var(--blue-300)); -webkit-background-clip: text; background-clip: text; color: transparent; background-size: 200% 100%; transition: background-position .8s var(--ease); }
h1:hover em { background-position: 100% 0; }
.sub { font-size: 18px; color: var(--text-secondary); max-width: 56ch; margin-bottom: 32px; }
.ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
.btn { display: inline-flex; gap: 10px; align-items: center; padding: 14px 24px; border-radius: 10px; font-weight: 600; font-size: 15px; transition: transform .3s var(--ease), background .25s, color .25s, border-color .25s; }
.btn span { transition: transform .3s var(--ease); }
.btn:hover { transform: translateY(-3px); }
.btn:hover span { transform: translateX(4px); }
.btn.primary { background: var(--accent); color: var(--accent-ink); }
.btn.primary:hover { background: #7bcdf0; }
.btn.ghost { border: 1px solid var(--border-edge); }
.btn.ghost:hover { border-color: var(--accent); color: var(--accent); }
.btn.ghost:hover span { transform: translateY(3px); }
.socials { display: flex; gap: 10px; }
.socials a { width: 40px; height: 40px; display: grid; place-items: center; border: 1px solid var(--border-subtle); border-radius: 10px; color: var(--text-secondary); transition: transform .3s var(--ease), color .2s, border-color .2s, background .2s; }
.socials svg { width: 18px; height: 18px; }
.socials a:hover { transform: translateY(-4px); color: var(--accent); border-color: var(--accent); background: rgba(75,180,230,.08); }

.cards { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.card { background: linear-gradient(160deg, var(--bg-elevated), var(--bg-secondary)); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 16px; min-height: 150px; transition: transform .4s var(--ease), border-color .3s, box-shadow .4s; animation: float 7s ease-in-out infinite; }
.card:hover { transform: translateY(-8px) rotate(-.6deg); border-color: var(--accent); box-shadow: 0 24px 50px -22px var(--accent-glow); animation-play-state: paused; }
.c2 { animation-delay: -2s; margin-top: 22px; } .c3 { animation-delay: -4s; } .c4 { animation-delay: -1s; margin-top: 22px; }
@keyframes float { 50% { translate: 0 -6px; } }
.ct { display: flex; justify-content: space-between; margin: -16px -16px 12px; padding: 9px 16px; border-bottom: 1px solid var(--border-subtle); background: var(--bg-deep); border-radius: 14px 14px 0 0; font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--text-muted); }
.ct i { font-style: normal; letter-spacing: .1em; opacity: .6; }
.big { font-family: var(--font-heading); font-size: 44px; font-weight: 700; color: var(--text-primary); line-height: 1; }
.spark { width: 100%; height: 34px; margin-top: 10px; } .spark polyline { fill: none; stroke: var(--accent); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 220; stroke-dashoffset: 220; animation: draw 1.8s .5s var(--ease) forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
.bars { display: flex; align-items: flex-end; gap: 10px; height: 92px; }
.bar { flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; position: relative; gap: 4px; }
.bar i { width: 100%; background: var(--blue-700); border-radius: 4px 4px 0 0; transition: background .2s, transform .3s var(--ease); transform-origin: bottom; }
.bar.on i { background: var(--accent); transform: scaleY(1.05); }
.bar b { font: 500 10px var(--font-mono); color: var(--text-muted); }
.tip { position: absolute; top: -4px; font: 600 11px var(--font-mono); color: var(--accent); opacity: 0; transform: translateY(4px); transition: .2s; } .bar.on .tip { opacity: 1; transform: none; }
.flow { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 0; }
.node { font: 500 11px var(--font-mono); padding: 5px 8px; border: 1px solid var(--border-edge); border-radius: 6px; color: var(--text-secondary); transition: .3s; }
.wire { width: 14px; height: 1px; background: var(--border-edge); position: relative; overflow: hidden; } .wire::after { content: ''; position: absolute; inset: 0; background: var(--accent); transform: translateX(-100%); }
.flow.on .node { border-color: var(--accent); color: var(--accent); } .flow.on .wire::after { animation: run 1s linear infinite; }
@keyframes run { to { transform: translateX(100%); } }
.star { width: 100%; color: var(--text-muted); } .dim { fill: var(--blue-900); stroke: var(--blue-500); transition: .25s; } .fact { fill: var(--blue-700); stroke: var(--accent); transition: .25s; }
.hot { fill: var(--accent); }
.hint { grid-column: 1 / -1; text-align: right; color: var(--text-faint); font-size: 11px; } .hint small { opacity: .8; }
@media (max-width: 960px) { .grid { grid-template-columns: 1fr; } .card { animation: none; } }
@media (max-width: 520px) { .cards { grid-template-columns: 1fr; } .c2, .c4 { margin-top: 0; } }
</style>
