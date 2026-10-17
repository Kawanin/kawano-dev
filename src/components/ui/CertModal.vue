<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import IssuerLogo from './IssuerLogo.vue'

const props = defineProps({ cert: { type: Object, default: null } })
const emit = defineEmits(['close'])
const { t } = useI18n()
const host = ref(null)
const state = ref('idle') // idle | loading | ready | error
let renderToken = 0

// pdfjs-dist 6 usa APIs novas (Map.getOrInsert*); polyfill para navegadores um pouco mais antigos
function polyfill() {
  for (const C of [Map, WeakMap]) {
    if (!C.prototype.getOrInsert) {
      C.prototype.getOrInsert = function (k, v) { if (!this.has(k)) this.set(k, v); return this.get(k) }
    }
    if (!C.prototype.getOrInsertComputed) {
      C.prototype.getOrInsertComputed = function (k, fn) { if (!this.has(k)) this.set(k, fn(k)); return this.get(k) }
    }
  }
}

async function renderPdf(url) {
  const token = ++renderToken
  state.value = 'loading'
  try {
    polyfill()
    const [pdfjs, worker] = await Promise.all([
      import('pdfjs-dist'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url')
    ])
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default
    const pdf = await pdfjs.getDocument({ url }).promise
    await nextTick()
    if (token !== renderToken || !host.value) return
    host.value.innerHTML = ''
    const width = host.value.clientWidth || 600
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    for (let n = 1; n <= pdf.numPages; n++) {
      const page = await pdf.getPage(n)
      const base = page.getViewport({ scale: 1 })
      const vp = page.getViewport({ scale: (width / base.width) * dpr })
      const canvas = document.createElement('canvas')
      canvas.width = vp.width
      canvas.height = vp.height
      canvas.style.width = '100%'
      canvas.style.height = 'auto'
      host.value.appendChild(canvas)
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise
      if (token !== renderToken) return
    }
    state.value = 'ready'
  } catch (e) {
    console.warn('[cert-preview]', e)
    if (token === renderToken) state.value = 'error'
  }
}

const onKey = (e) => { if (e.key === 'Escape') emit('close') }
watch(() => props.cert, async (c) => {
  document.body.style.overflow = c ? 'hidden' : ''
  if (!c) { renderToken++; state.value = 'idle'; return }
  if (c.pdf) { state.value = 'loading'; await nextTick(); renderPdf(c.pdf) } else state.value = 'idle'
})
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; renderToken++ })
</script>

<template>
  <Teleport to="body">
    <Transition name="cm">
      <div v-if="cert" class="overlay" role="dialog" aria-modal="true" :aria-label="cert.title" @click.self="emit('close')">
        <div class="sheet">
          <header class="top">
            <div class="logo"><IssuerLogo :issuer="cert.issuerKey" /></div>
            <div class="ttl"><b>{{ cert.title }}</b><span>{{ cert.issuer }} · {{ cert.date }}</span></div>
            <button class="x" :aria-label="t('projects.close')" @click="emit('close')">✕</button>
          </header>

          <div class="body">
            <template v-if="cert.pdf">
              <div v-if="state === 'loading'" class="msg"><i class="spin"></i>{{ t('certificates.loading') }}</div>
              <div v-if="state === 'error'" class="msg">{{ t('certificates.error') }}</div>
              <div ref="host" class="pages" :class="{ hide: state !== 'ready' }"></div>
            </template>
            <div v-else class="msg nopdf">{{ t('certificates.nopdf') }}</div>
          </div>

          <footer class="actions">
            <a v-if="cert.verifyUrl" class="btn primary" :href="cert.verifyUrl" target="_blank" rel="noopener noreferrer">{{ t('certificates.verify') }} <span>↗</span></a>
            <a v-if="cert.pdf" class="btn ghost" :href="cert.pdf" target="_blank" rel="noopener">{{ t('certificates.openpdf') }}</a>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay { position: fixed; inset: 0; z-index: 200; display: grid; place-items: center; padding: 20px; background: rgba(5, 9, 18, .78); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.sheet { width: min(860px, 100%); max-height: 92vh; display: flex; flex-direction: column; border: 1px solid var(--border-edge); border-radius: 18px; background: var(--bg-elevated); overflow: hidden; box-shadow: 0 40px 90px -30px rgba(0, 0, 0, .8); }
.top { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border-bottom: 1px solid var(--border-subtle); }
.logo { width: 32px; flex: none; }
.ttl { display: grid; gap: 2px; min-width: 0; flex: 1; } .ttl b { font: 600 16px/1.3 var(--font-heading); } .ttl span { color: var(--text-muted); font-size: 13px; }
.x { width: 36px; height: 36px; flex: none; border-radius: 9px; border: 1px solid var(--border-edge); background: transparent; color: var(--text-secondary); transition: .2s; } .x:hover { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
.body { flex: 1; overflow: auto; background: #0a101c; padding: 14px; min-height: 180px; -webkit-overflow-scrolling: touch; }
.pages { display: grid; gap: 12px; } .pages.hide { visibility: hidden; height: 0; } .pages :deep(canvas) { border-radius: 6px; background: #fff; display: block; box-shadow: 0 8px 30px rgba(0,0,0,.4); }
.msg { display: flex; gap: 10px; align-items: center; justify-content: center; min-height: 160px; color: var(--text-secondary); text-align: center; padding: 20px; }
.spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--border-edge); border-top-color: var(--accent); animation: sp .8s linear infinite; } @keyframes sp { to { transform: rotate(360deg); } }
.actions { display: flex; gap: 10px; flex-wrap: wrap; padding: 14px 18px; border-top: 1px solid var(--border-subtle); }
.btn { display: inline-flex; gap: 8px; align-items: center; justify-content: center; padding: 11px 18px; border-radius: 10px; font-weight: 600; font-size: 14px; transition: transform .3s var(--ease), background .2s, border-color .2s, color .2s; }
.btn:hover { transform: translateY(-2px); } .primary { background: var(--accent); color: var(--accent-ink); } .primary:hover { background: #7bcdf0; } .ghost { border: 1px solid var(--border-edge); } .ghost:hover { border-color: var(--accent); color: var(--accent); }
.cm-enter-active, .cm-leave-active { transition: opacity .25s; } .cm-enter-active .sheet, .cm-leave-active .sheet { transition: transform .4s var(--ease); } .cm-enter-from, .cm-leave-to { opacity: 0; } .cm-enter-from .sheet, .cm-leave-to .sheet { transform: translateY(24px) scale(.97); }
@media (max-width: 600px) { .overlay { padding: 0; align-items: end; } .sheet { max-height: 94vh; border-radius: 18px 18px 0 0; width: 100%; } .actions .btn { flex: 1; } .body { padding: 8px; } }
</style>
