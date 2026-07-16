<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted, ref } from 'vue'
import BaseButton from '../ui/BaseButton.vue'

const { t, locale } = useI18n()
const canvasRef = ref(null)
let animationId = null

function openAndDownloadCV() {
  const path = locale.value === 'en'
    ? '/documents/cv-luciano-kawano-en.pdf'
    : '/documents/cv-luciano-kawano-pt.pdf'

  window.open(path, '_blank')

  const link = document.createElement('a')
  link.href = path
  link.download = locale.value === 'en' ? 'Luciano-Kawano-CV-EN.pdf' : 'Luciano-Kawano-CV-PT.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function resize() {
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * devicePixelRatio
    canvas.height = rect.height * devicePixelRatio
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(devicePixelRatio, devicePixelRatio)
  }
  resize()
  window.addEventListener('resize', resize)

  const NODE_COUNT = 46
  const LINK_DIST = 110
  let nodes = []

  function seed() {
    const w = canvas.getBoundingClientRect().width
    const h = canvas.getBoundingClientRect().height
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.8 + 1.4
    }))
  }
  seed()
  window.addEventListener('resize', seed)

  const blue300 = '75,180,230'
  const blue500 = '46,111,217'

  function step() {
    const w = canvas.getBoundingClientRect().width
    const h = canvas.getBoundingClientRect().height
    ctx.clearRect(0, 0, w, h)
    nodes.forEach((n) => {
      n.x += n.vx; n.y += n.vy
      if (n.x < 0 || n.x > w) n.vx *= -1
      if (n.y < 0 || n.y > h) n.vy *= -1
    })
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j]
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < LINK_DIST) {
          ctx.strokeStyle = `rgba(${blue500}, ${(1 - d / LINK_DIST) * 0.5})`
          ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
        }
      }
    }
    nodes.forEach((n) => {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${blue300}, 0.9)`
      ctx.shadowColor = `rgba(${blue300}, 0.5)`
      ctx.shadowBlur = 5
      ctx.fill()
      ctx.shadowBlur = 0
    })
    if (!prefersReduced) animationId = requestAnimationFrame(step)
  }
  step()

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
    window.removeEventListener('resize', seed)
    if (animationId) cancelAnimationFrame(animationId)
  })
})
</script>

<template>
  <div class="hero-outer">
    <div class="hero-text">
      <h1>{{ t('hero.title_1') }} <span class="grad">{{ t('hero.title_2') }}</span></h1>
      <p>{{ t('hero.subtitle') }}</p>
      <div class="cta-row">
        <router-link to="/projetos"><BaseButton variant="primary">{{ t('hero.cta_projects') }}</BaseButton></router-link>
        <BaseButton variant="secondary" @click="openAndDownloadCV">{{ t('hero.cta_cv') }}</BaseButton>
      </div>
    </div>
    <div class="hero-visual">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<style scoped>
.hero-outer {
  display: flex;
  align-items: stretch;
  min-height: 540px;
}
.hero-text {
  flex: 0 0 auto;
  max-width: 580px;
  padding: 56px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hero-text h1 {
  font-size: var(--text-hero);
  font-weight: 600;
  line-height: 1.15;
  margin-bottom: 20px;
  max-width: 460px;
}
.hero-text h1 .grad {
  background: linear-gradient(90deg, var(--blue-300), var(--blue-500));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.hero-text p { font-size: var(--text-body); color: var(--text-secondary); margin-bottom: 32px; }
.cta-row { display: flex; gap: 16px; flex-wrap: wrap; }

.hero-visual {
  flex: 1;
  position: relative;
  min-height: 480px;
  overflow: hidden;
}

.hero-visual canvas { width: 100%; height: 100%; display: block; }

@media (max-width: 900px) {
  .hero-outer {
    flex-direction: column;
    min-height: auto;
    position: relative;
  }
  .hero-text {
    padding: 48px 24px 40px;
    max-width: 100%;
    position: relative;
    z-index: 1;
  }
  .hero-text h1 { font-size: 38px; }
  .hero-visual {
    position: absolute;
    inset: 0;
    min-height: auto;
    opacity: 0.22;
    z-index: 0;
    pointer-events: none;
  }
}
</style>