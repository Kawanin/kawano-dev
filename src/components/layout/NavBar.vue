<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { persistLocale } from '../../i18n.js'
import { scrolled, goTo } from '../../composables/useScrollState.js'

const { locale, t } = useI18n()
const router = useRouter()
const setLocale = (l) => { locale.value = l; persistLocale(l) }
function go(id) { if (!goTo(id)) router.push({ path: '/', hash: id === 'topo' ? '' : `#${id}` }) }
</script>

<template>
  <header class="nav" :class="{ scrolled }">
    <a class="logo" href="/" @click.prevent="go('topo')" aria-label="kawano.dev"><i class="mark"></i><b class="wm">kawano<span>.dev</span></b></a>
    <div class="right">
      <div class="lang" role="group" aria-label="Language">
        <button :class="{ active: locale === 'pt' }" @click="setLocale('pt')" title="Português"><span class="fi fi-br"></span>PT</button>
        <button :class="{ active: locale === 'en' }" @click="setLocale('en')" title="English"><span class="fi fi-us"></span>EN</button>
      </div>
      <a class="cta" href="#contato" @click.prevent="go('contato')">{{ t('nav.contact') }}</a>
    </div>
  </header>
</template>

<style scoped>
.nav { position: sticky; top: 0; z-index: 50; height: var(--nav-h); display: flex; align-items: center; justify-content: space-between; padding: 0 clamp(20px, 4vw, 48px); border-bottom: 1px solid transparent; transition: background .3s, border-color .3s; }
.nav.scrolled { background: rgba(11, 18, 32, 0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom-color: var(--border-subtle); }
.logo { display: flex; align-items: center; gap: 10px; font: 700 18px var(--font-heading); letter-spacing: -.01em; }
.wm { font-weight: 700; } .wm span { color: var(--accent); }
.mark { width: 14px; height: 14px; display: inline-block; background: linear-gradient(135deg, var(--blue-500) 50%, var(--blue-300) 50%); border-radius: 3px; transition: transform .5s var(--ease); }
.logo:hover .mark { transform: rotate(90deg); }
.right { display: flex; align-items: center; gap: 12px; }
.lang { display: flex; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 2px; }
.lang button { display: flex; align-items: center; gap: 6px; font: 500 11.5px var(--font-mono); letter-spacing: .06em; border: none; background: transparent; color: var(--text-muted); padding: 5px 9px; border-radius: 6px; transition: .2s; }
.lang button:hover { color: var(--text-primary); } .lang button.active { background: var(--text-primary); color: var(--bg-primary); }
.lang .fi { width: 14px; height: 10px; border-radius: 2px; }
.cta { font: 500 12px var(--font-mono); letter-spacing: .06em; text-transform: uppercase; padding: 9px 16px; border-radius: 8px; border: 1px solid var(--border-edge); transition: .25s var(--ease); }
.cta:hover { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); transform: translateY(-2px); }
@media (max-width: 480px) { .cta { display: none; } }
</style>
