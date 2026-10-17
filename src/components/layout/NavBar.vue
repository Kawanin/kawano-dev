<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { persistLocale } from '../../i18n.js'
import { SECTIONS, activeId, goTo } from '../../composables/useScrollState.js'

const { locale, t } = useI18n()
const router = useRouter()
const setLocale = (l) => { locale.value = l; persistLocale(l) }
function go(id) { if (!goTo(id)) router.push({ path: '/', hash: id === 'topo' ? '' : `#${id}` }) }
// Como na referência: "Topo" não aparece nos links (o logo leva ao topo)
const links = SECTIONS.filter((s) => s.id !== 'topo')
</script>

<template>
  <div class="nav">
    <a class="logo" href="/" @click.prevent="go('topo')" aria-label="kawano.dev"><i class="mark"></i><b class="wm">kawano<span>.dev</span></b></a>

    <nav class="links" :aria-label="t('nav.sections')">
      <a v-for="s in links" :key="s.id" :href="`#${s.id}`" :class="{ on: activeId === s.id }" :aria-current="activeId === s.id ? 'page' : undefined" @click.prevent="go(s.id)">
        {{ t(`nav.${s.key}`) }}
      </a>
    </nav>

    <div class="lang" role="group" aria-label="Language">
      <button :class="{ active: locale === 'pt' }" @click="setLocale('pt')" title="Português">PT</button>
      <button :class="{ active: locale === 'en' }" @click="setLocale('en')" title="English">EN</button>
    </div>
  </div>
</template>

<style scoped>
.nav { max-width: 1136px; margin: 0 auto; height: var(--nav-h); display: flex; align-items: center; gap: 28px; padding: 0 clamp(16px, 3vw, 32px); box-sizing: content-box; }
.logo { display: flex; align-items: center; gap: 10px; margin-right: auto; font: 700 16px var(--font-mono); letter-spacing: -.01em; white-space: nowrap; }
.wm span { color: var(--accent); }
.mark { width: 12px; height: 12px; display: inline-block; background: linear-gradient(135deg, var(--blue-500) 50%, var(--blue-300) 50%); border-radius: 3px; transition: transform .5s var(--ease); }
.logo:hover .mark { transform: rotate(90deg); }

.links { display: flex; align-items: center; gap: 28px; }
.links a { font: 400 14px var(--font-body); color: var(--text-muted); white-space: nowrap; transition: color .2s; }
.links a:hover { color: var(--text-primary); }
.links a.on { color: var(--text-primary); font-weight: 600; }

.lang { display: flex; border: 1px solid var(--border-subtle); border-radius: 6px; overflow: hidden; }
.lang button { font: 500 11.5px var(--font-mono); letter-spacing: .08em; border: none; background: transparent; color: var(--text-muted); padding: 7px 11px; transition: .2s; }
.lang button:hover { color: var(--text-primary); }
.lang button.active { background: var(--text-primary); color: var(--bg-primary); }

@media (max-width: 900px) {
  .nav { height: auto; min-height: var(--nav-h); flex-wrap: wrap; row-gap: 0; padding-top: 10px; padding-bottom: 10px; gap: 12px; }
  .links { order: 3; flex: 1 0 100%; gap: 20px; overflow-x: auto; scrollbar-width: none; padding-bottom: 2px; }
  .links::-webkit-scrollbar { display: none; }
}
</style>
