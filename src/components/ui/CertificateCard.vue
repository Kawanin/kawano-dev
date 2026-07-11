<script setup>
import IssuerLogo from './IssuerLogo.vue'

defineProps({ cert: { type: Object, required: true } })
</script>

<template>
  <div class="cert-card" :class="{ pending: cert.status === 'in-progress' }">
    <div class="cert-thumb">
      <img v-if="cert.thumb" :src="cert.thumb" :alt="cert.title" class="thumb-img" />
      <span v-else class="thumb-fallback">{{ cert.status === 'in-progress' ? '···' : 'PDF' }}</span>
      <div class="issuer-badge"><IssuerLogo :issuer="cert.issuerKey" /></div>
    </div>
    <div class="cert-body">
      <strong>{{ cert.title }}</strong>
      <span class="cert-meta">{{ cert.issuer }} · {{ cert.date }}</span>
      <a v-if="cert.pdf" :href="cert.pdf" target="_blank" class="cert-link">Ver certificado</a>
      <span v-else class="cert-link muted">Em andamento</span>
    </div>
  </div>
</template>

<style scoped>
.cert-card { display: flex; gap: 16px; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; align-items: center; }
.cert-card.pending { opacity: 0.65; }
.cert-thumb {
  width: 72px; height: 72px; flex-shrink: 0; border-radius: 8px; overflow: hidden;
  background: var(--bg-elevated); display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--border-subtle); position: relative;
}
.thumb-img { width: 100%; height: 100%; object-fit: cover; object-position: top left; display: block; }
.thumb-fallback { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
.issuer-badge { position: absolute; bottom: 3px; right: 3px; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.6)); }
.cert-body { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
.cert-body strong { font-size: var(--text-small); font-weight: 600; color: var(--text-primary); }
.cert-meta { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); }
.cert-link { font-family: var(--font-mono); font-size: 12.5px; color: var(--blue-300); margin-top: 2px; }
.cert-link.muted { color: var(--text-muted); }
</style>