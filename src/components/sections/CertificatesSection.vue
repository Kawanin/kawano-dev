<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionShell from '../ui/SectionShell.vue'
import IssuerLogo from '../ui/IssuerLogo.vue'
import CertModal from '../ui/CertModal.vue'
import { standaloneCertificates as certs } from '../../assets/data/certificates.js'
const { t } = useI18n()
const opened = ref(null)
const clickable = (c) => c.status === 'done'
</script>

<template>
  <SectionShell id="certificados" num="04" :label="t('certificates.label')" :title="t('certificates.title')">
    <div class="grid">
      <component
        :is="clickable(c) ? 'button' : 'div'"
        v-for="(c, i) in certs" :key="c.title"
        class="cert" :class="[c.status, { click: clickable(c) }]"
        :type="clickable(c) ? 'button' : undefined"
        @click="clickable(c) && (opened = c)"
        v-reveal="i * 70"
      >
        <div class="logo"><IssuerLogo :issuer="c.issuerKey" /></div>
        <div class="txt">
          <b>{{ c.title }}</b>
          <span>{{ c.issuer }}</span>
          <div class="meta"><i class="dot"></i>{{ c.status === 'done' ? t('certificates.done') : t('certificates.progress') }} · {{ c.date }}</div>
        </div>
        <span v-if="clickable(c)" class="go">{{ t('certificates.view') }} <i>↗</i></span>
      </component>
    </div>
    <CertModal :cert="opened" @close="opened = null" />
  </SectionShell>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.cert { position: relative; display: flex; flex-direction: column; gap: 14px; align-items: flex-start; text-align: left; color: inherit; padding: 20px; border: 1px solid var(--border-subtle); border-radius: 14px; background: var(--bg-secondary); overflow: hidden; transition: transform .4s var(--ease), border-color .3s, box-shadow .4s; }
.cert::before { content: ''; position: absolute; inset: 0; background: radial-gradient(260px circle at 0 0, var(--accent-glow), transparent 70%); opacity: 0; transition: opacity .4s; }
.cert.click { cursor: pointer; }
.cert.click:hover { transform: translateY(-6px); border-color: var(--accent); box-shadow: 0 22px 44px -24px var(--accent-glow); } .cert.click:hover::before { opacity: .35; }
.logo { width: 34px; position: relative; } .txt { position: relative; display: grid; gap: 4px; } .txt b { font: 600 16px/1.3 var(--font-heading); } .txt span { color: var(--text-muted); font-size: 14px; }
.meta { margin-top: 6px; color: var(--text-secondary); font: 500 11.5px var(--font-mono); display: flex; gap: 8px; align-items: center; } .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); } .in-progress .dot { background: #E9B949; } .in-progress { border-style: dashed; }
.go { position: relative; margin-top: auto; font: 500 12px var(--font-mono); color: var(--accent); letter-spacing: .04em; } .go i { display: inline-block; font-style: normal; transition: transform .3s var(--ease); } .cert:hover .go i { transform: translate(3px, -3px); }
@media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
</style>
