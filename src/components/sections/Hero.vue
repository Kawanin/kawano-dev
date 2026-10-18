<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import BrandIcon from '../ui/BrandIcon.vue'
import { goTo } from '../../composables/useScrollState.js'

const { t, locale } = useI18n()
const cv = computed(() => (locale.value === 'en' ? '/documents/cv-luciano-kawano-en.pdf' : '/documents/cv-luciano-kawano-pt.pdf'))

// ---- dados dos visuais (todos em loop contínuo) ----
const quarters = ['T1', 'T2', 'T3', 'T4']
const barSets = [[46, 62, 55, 82], [58, 48, 71, 66], [40, 74, 60, 90], [66, 52, 80, 70]]
const kpiTargets = [87, 64, 92, 78]
const nodes = ['Webhook', 'SQL', 'Python', 'E-mail']

const barSet = ref(0)
const bars = computed(() => quarters.map((q, i) => ({ q, v: barSets[barSet.value][i] })))
const hov = ref(-1)          // barra em destaque (cicla sozinha; o mouse assume)
const kpi = ref(0)           // número do KPI (conta até o alvo, em loop)
const step = ref(0)          // etapa do pipeline n8n
const tableOn = ref('')
const stage = ref(null)

let timers = []
let raf = 0
let kpiIdx = 0
const hovered = ref(false)

function tweenKpi(to, ms = 1100) {
  cancelAnimationFrame(raf)
  const from = kpi.value
  const t0 = performance.now()
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / ms)
    kpi.value = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)))
    if (p < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { kpi.value = kpiTargets[0]; step.value = nodes.length; return }
  const every = (fn, ms) => timers.push(setInterval(() => { if (!document.hidden) fn() }, ms))
  tweenKpi(kpiTargets[0])
  every(() => { kpiIdx = (kpiIdx + 1) % kpiTargets.length; tweenKpi(kpiTargets[kpiIdx]) }, 4000)   // card 1: KPI muda + sparkline redesenha
  every(() => { barSet.value = (barSet.value + 1) % barSets.length }, 3200)                         // card 2: barras trocam de valor
  every(() => { if (!hovered.value) hov.value = (hov.value + 1) % quarters.length }, 1100)                // card 2: destaque percorre as barras
  every(() => { step.value = (step.value + 1) % (nodes.length + 2) }, 750)                          // card 3: dado percorre o pipeline
})

// ---- parallax em profundidade (mouse move => cada camada se desloca/rotaciona conforme sua profundidade) ----
let layers = [], tx = 0, ty = 0, cx = 0, cy = 0, prx = 0
let onMove, onLeave
function startParallax() {
  const el = stage.value
  if (!el) return
  layers = [...el.querySelectorAll('.fc')].map((n) => ({ n, d: parseFloat(n.dataset.d) || 1 }))
  const hero = el.closest('.hero')
  onMove = (e) => {
    if (e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    tx = Math.max(-1.2, Math.min(1.2, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)))
    ty = Math.max(-1.2, Math.min(1.2, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)))
  }
  onLeave = () => { tx = 0; ty = 0 }
  hero.addEventListener('pointermove', onMove)
  hero.addEventListener('pointerleave', onLeave)
  const loop = () => {
    cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08
    for (const { n, d } of layers) {
      n.style.transform = `translate3d(${(cx * 26 * d).toFixed(2)}px, ${(cy * 18 * d).toFixed(2)}px, 0) rotateY(${(cx * 6 * d).toFixed(2)}deg) rotateX(${(-cy * 5 * d).toFixed(2)}deg)`
    }
    prx = requestAnimationFrame(loop)
  }
  loop()
}
onMounted(() => { if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) startParallax() })
onBeforeUnmount(() => {
  timers.forEach(clearInterval); cancelAnimationFrame(raf); cancelAnimationFrame(prx)
  const hero = stage.value && stage.value.closest('.hero')
  if (hero) { hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave) }
})
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

      <div ref="stage" class="stage" aria-hidden="true">
        <div class="fc fc-a" data-d="0.7"><div class="fc-in f1"><div class="card c1">
          <div class="ct"><span>{{ t('hero.card_kpi') }}</span><i>···</i></div>
          <div class="big">{{ kpi }}%</div>
          <svg viewBox="0 0 120 32" class="spark">
            <polyline points="0,26 18,22 36,24 54,14 72,16 90,8 120,4" />
            <circle r="2.6" class="dot">
              <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;.75;1" path="M0,26 L18,22 L36,24 L54,14 L72,16 L90,8 L120,4" />
            </circle>
          </svg>
        </div></div></div>
        <div class="fc fc-b" data-d="1.1"><div class="fc-in f2"><div class="card c2">
          <div class="ct"><span>{{ t('hero.card_bars') }}</span><i>···</i></div>
          <div class="bars" @mouseleave="hovered = false">
            <div v-for="(b, i) in bars" :key="b.q" class="bar" :class="{ on: hov === i }" @mouseenter="hovered = true; hov = i">
              <span class="tip">{{ b.v }}</span><i :style="{ height: b.v + '%' }"></i><b>{{ b.q }}</b>
            </div>
          </div>
        </div></div></div>
        <div class="fc fc-d" data-d="0.9"><div class="fc-in f3"><div class="card c3">
          <div class="ct"><span>{{ t('hero.card_flow') }}</span><i>···</i></div>
          <div class="flow">
            <template v-for="(n, i) in nodes" :key="n">
              <span class="node" :class="{ on: i < step }">{{ n }}</span><span v-if="i < nodes.length - 1" class="wire" :class="{ run: i === step - 1 }"></span>
            </template>
          </div>
        </div></div></div>
        <div class="fc fc-c" data-d="1.5"><div class="fc-in f4"><div class="card c4" @mouseleave="tableOn = ''">
          <div class="ct"><span>{{ t('hero.card_model') }}</span><i>···</i></div>
          <svg viewBox="0 0 140 80" class="star">
            <g class="links" stroke="currentColor" stroke-width="1"><line x1="20" y1="14" x2="70" y2="40" /><line x1="120" y1="14" x2="70" y2="40" style="animation-delay:-.6s" /><line x1="20" y1="66" x2="70" y2="40" style="animation-delay:-1.2s" /><line x1="120" y1="66" x2="70" y2="40" style="animation-delay:-1.8s" /></g>
            <rect v-for="(p, k) in [[8,4,'Dim'],[108,4,'Dim'],[8,56,'Dim'],[108,56,'Dim']]" :key="k" :x="p[0]" :y="p[1]" width="24" height="20" rx="3" class="dim" :class="{ hot: tableOn === 'd' }" :style="{ animationDelay: (-k * 0.6) + 's' }" @mouseenter="tableOn = 'd'" />
            <rect x="52" y="28" width="36" height="24" rx="3" class="fact" :class="{ hot: tableOn === 'f' }" @mouseenter="tableOn = 'f'" />
          </svg>
        </div></div></div>
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

.stage { position: relative; height: clamp(420px, 40vw, 540px); perspective: 900px; }
.fc { position: absolute; z-index: var(--z, 1); transform-style: preserve-3d; will-change: transform; }
.fc:hover { z-index: 9; }
.fc-a { left: 0; top: 8%; width: 58%; height: 40%; --z: 2; }
.fc-b { right: 0; top: 0; width: 50%; height: 44%; --z: 3; }
.fc-c { right: 2%; top: 47%; width: 46%; height: 44%; --z: 4; }
.fc-d { left: 6%; bottom: 0; width: 60%; height: 30%; --z: 5; }
/* movimento próprio de cada card, em loop, sem precisar de mouse */
.fc-in { width: 100%; height: 100%; transform-style: preserve-3d; animation-duration: var(--dur, 7s); animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-delay: var(--dl, 0s); }
.f1 { animation-name: floatA; --dur: 7s; --dl: 0s; }
.f2 { animation-name: floatB; --dur: 8.5s; --dl: -2.5s; }
.f3 { animation-name: floatC; --dur: 9.5s; --dl: -4s; }
.f4 { animation-name: floatB; --dur: 7.5s; --dl: -1s; }
@keyframes floatA { 0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); } 25% { transform: translate3d(8px, -12px, 0) rotate(.7deg); } 50% { transform: translate3d(0, -18px, 0) rotate(0deg); } 75% { transform: translate3d(-8px, -8px, 0) rotate(-.7deg); } }
@keyframes floatB { 0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); } 30% { transform: translate3d(-10px, 10px, 0) rotate(-.8deg); } 60% { transform: translate3d(6px, 16px, 0) rotate(.6deg); } }
@keyframes floatC { 0%, 100% { transform: translate3d(0, 0, 0); } 33% { transform: translate3d(12px, -10px, 0) rotate(.6deg); } 66% { transform: translate3d(-12px, 6px, 0) rotate(-.6deg); } }
.card { height: 100%; display: flex; flex-direction: column; overflow: hidden; background: linear-gradient(160deg, var(--bg-elevated), var(--bg-secondary)); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 16px; box-shadow: 0 18px 40px -26px rgba(0, 0, 0, .8); transition: transform .45s var(--ease), border-color .3s, box-shadow .4s, filter .35s; }
/* hover: o card sobe em Z (profundidade), ganha destaque e os vizinhos recuam */
.fc:hover .card { transform: translateZ(70px) scale(1.05); border-color: var(--accent); box-shadow: 0 34px 60px -24px rgba(0, 0, 0, .85), 0 0 0 1px var(--accent-glow); }
.stage:has(.fc:hover) .fc:not(:hover) .card { filter: brightness(.78); transform: translateZ(-30px); }
.ct { display: flex; justify-content: space-between; margin: -16px -16px 12px; padding: 9px 16px; border-bottom: 1px solid var(--border-subtle); background: var(--bg-deep); border-radius: 14px 14px 0 0; font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--text-muted); }
.ct i { font-style: normal; letter-spacing: .1em; opacity: .6; }
.big { font-family: var(--font-heading); font-size: 44px; font-weight: 700; color: var(--text-primary); line-height: 1; }
.spark { width: 100%; height: 34px; margin-top: 10px; } .spark { overflow: visible; } .spark polyline { fill: none; stroke: var(--accent); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 220; stroke-dashoffset: 220; animation: draw 4s linear infinite; }
.spark .dot { fill: var(--text-primary); filter: drop-shadow(0 0 4px var(--accent)); }
@keyframes draw { 0% { stroke-dashoffset: 220; } 75%, 100% { stroke-dashoffset: 0; } }
.bars { display: flex; align-items: flex-end; gap: 10px; flex: 1; min-height: 92px; padding-top: 14px; }
.bar { flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; position: relative; gap: 4px; }
.bar i { width: 100%; background: var(--blue-700); border-radius: 4px 4px 0 0; transition: height .9s var(--ease), background .25s, transform .3s var(--ease); transform-origin: bottom; }
.bar.on i { background: var(--accent); transform: scaleY(1.05); }
.bar b { font: 500 10px var(--font-mono); color: var(--text-muted); }
.tip { position: absolute; top: -4px; font: 600 11px var(--font-mono); color: var(--accent); opacity: 0; transform: translateY(4px); transition: .2s; } .bar.on .tip { opacity: 1; transform: none; }
.flow { display: flex; flex-wrap: wrap; align-content: center; align-items: center; gap: 8px 0; flex: 1; }
.node { font: 500 11px var(--font-mono); padding: 5px 8px; border: 1px solid var(--border-edge); border-radius: 6px; color: var(--text-secondary); transition: .3s; }
.node.on { border-color: var(--accent); color: var(--accent); background: rgba(75,180,230,.08); }
.wire { width: 14px; height: 1px; background: var(--border-edge); position: relative; overflow: hidden; } .wire::after { content: ''; position: absolute; inset: 0; background: var(--accent); transform: translateX(-100%); }
.wire.run::after { animation: run .75s linear forwards; }
@keyframes run { to { transform: translateX(100%); } }
.star { width: 100%; flex: 1; min-height: 0; color: var(--accent); }
.links line { stroke-dasharray: 3 5; opacity: .6; animation: dash 2.4s linear infinite; } @keyframes dash { to { stroke-dashoffset: -16; } }
.dim { fill: var(--blue-900); stroke: var(--blue-500); transition: .25s; animation: dimpulse 2.4s ease-in-out infinite; } @keyframes dimpulse { 0%, 100% { fill: var(--blue-900); } 40% { fill: var(--blue-700); } }
.fact { fill: var(--blue-700); stroke: var(--accent); transition: .25s; transform-box: fill-box; transform-origin: center; animation: factpulse 2.4s ease-in-out infinite; } @keyframes factpulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); fill: var(--blue-500); } }
.hot { fill: var(--accent); }
@media (max-width: 960px) { .grid { grid-template-columns: 1fr; } .stage { height: 480px; max-width: 560px; margin: 0 auto; width: 100%; } }
@media (prefers-reduced-motion: reduce) { .fc-in, .spark polyline, .links line, .dim, .fact { animation: none !important; } .spark polyline { stroke-dashoffset: 0; } }
@media (max-width: 600px) { .stage { height: auto; perspective: none; display: grid; gap: 14px; } .fc { position: static; width: auto; height: auto; transform: none !important; } .fc-in { animation-duration: 9s; } .card { min-height: 150px; } }
</style>
