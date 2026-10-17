<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionShell from '../ui/SectionShell.vue'
import BrandIcon from '../ui/BrandIcon.vue'

const { t } = useI18n()
const rows = [
  { name: 'mail', label: 'E-mail', val: 'l.kawano.jr@gmail.com', href: 'mailto:l.kawano.jr@gmail.com' },
  { name: 'linkedin', label: 'LinkedIn', val: '/in/lucianokawano', href: 'https://www.linkedin.com/in/lucianokawano/' },
  { name: 'whatsapp', label: 'WhatsApp', val: '+55 41 99540-2023', href: 'https://api.whatsapp.com/send/?phone=554195402023' },
  { name: 'instagram', label: 'Instagram', val: '@lucio_kawano', href: 'https://www.instagram.com/lucio_kawano/' }
]
const sortKey = ref('')
const asc = ref(true)
const sorted = computed(() => {
  if (!sortKey.value) return rows
  const k = sortKey.value
  return [...rows].sort((a, b) => (asc.value ? 1 : -1) * a[k].localeCompare(b[k]))
})
function sortBy(k) { if (sortKey.value === k) asc.value = !asc.value; else { sortKey.value = k; asc.value = true } }
const copied = ref('')
async function copy(r) {
  try { await navigator.clipboard.writeText(r.val); copied.value = r.name; setTimeout(() => (copied.value = ''), 1400) } catch (e) { /* sem clipboard */ }
}
</script>

<template>
  <SectionShell id="contato" num="07" :label="t('contact.label')" :title="t('contact.title')">
    <p class="text">{{ t('contact.text') }}</p>
    <div class="visual">
      <div class="vbar"><span class="vt">{{ t('contact.label') }}</span><span class="vdots" aria-hidden="true">···</span></div>
      <div class="hdr">
        <button @click="sortBy('label')">{{ t('contact.channel') }} <i :class="{ on: sortKey === 'label' }">{{ sortKey === 'label' && !asc ? '▼' : '▲' }}</i></button>
        <button @click="sortBy('val')">{{ t('contact.value') }} <i :class="{ on: sortKey === 'val' }">{{ sortKey === 'val' && !asc ? '▼' : '▲' }}</i></button>
        <span></span>
      </div>
      <TransitionGroup name="r" tag="div">
        <div v-for="r in sorted" :key="r.name" class="row">
          <a class="c" :href="r.href" target="_blank" rel="noopener"><BrandIcon :name="r.name" />{{ r.label }}</a>
          <a class="v" :href="r.href" target="_blank" rel="noopener">{{ r.val }}</a>
          <button class="cp" :class="{ ok: copied === r.name }" @click="copy(r)">{{ copied === r.name ? t('contact.copied') : t('contact.copy') }}</button>
          <span class="bar" aria-hidden="true"></span>
        </div>
      </TransitionGroup>
    </div>
  </SectionShell>
</template>

<style scoped>
.text { color: var(--text-secondary); max-width: 56ch; margin: -8px 0 24px; }
.visual { max-width: 780px; border: 1px solid var(--border-edge); border-radius: 14px; background: var(--bg-secondary); overflow: hidden; }
.vbar { display: flex; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid var(--border-subtle); font: 500 12px var(--font-mono); color: var(--text-muted); letter-spacing: .06em; text-transform: uppercase; background: var(--bg-deep); }
.hdr, .row { display: grid; grid-template-columns: 190px minmax(0, 1fr) 96px; gap: 12px; align-items: center; padding: 0 16px; }
.hdr { background: var(--bg-elevated); border-bottom: 1px solid var(--border-subtle); }
.hdr button { text-align: left; padding: 12px 0; background: transparent; border: none; color: var(--text-secondary); font: 600 13px var(--font-body); } .hdr button:hover { color: var(--accent); } .hdr i { font-style: normal; font-size: 9px; margin-left: 4px; opacity: .25; } .hdr i.on { opacity: 1; color: var(--accent); }
.row { position: relative; border-bottom: 1px solid var(--border-subtle); min-height: 58px; transition: background .25s; } .row:last-child { border-bottom: none; }
.row::after { content: ''; position: absolute; left: 0; bottom: 0; height: 2px; width: 0; background: var(--accent); transition: width .5s var(--ease); } .row:hover::after { width: 100%; } .row:hover { background: rgba(75,180,230,.06); }
.c { display: flex; align-items: center; gap: 10px; font-weight: 500; } .c svg { width: 17px; height: 17px; color: var(--accent); }
.v { color: var(--text-secondary); font: 400 14px var(--font-mono); word-break: break-all; transition: color .2s; } .row:hover .v { color: var(--text-primary); }
.cp { padding: 7px 10px; border-radius: 8px; border: 1px solid var(--border-edge); background: transparent; color: var(--text-secondary); font: 500 12px var(--font-mono); transition: .2s; } .cp:hover, .cp.ok { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
.r-move { transition: transform .5s var(--ease); }
@media (max-width: 600px) { .hdr, .row { grid-template-columns: minmax(0, 1fr) 80px; } .hdr button:nth-child(2) { display: none; } .v { grid-column: 1; grid-row: 2; padding-bottom: 12px; } .row { padding-top: 6px; } .cp { grid-row: 1; grid-column: 2; } }
</style>
