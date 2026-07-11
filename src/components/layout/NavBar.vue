<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const contactOpen = ref(false)
function toggleContact() { contactOpen.value = !contactOpen.value }
function setLocale(l) {
  locale.value = l
  localStorage.setItem('locale', l)
}

function handleOutsideClick(e) {
  if (!e.target.closest('.contact-wrap')) contactOpen.value = false
}
onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))
</script>

<template>
  <nav>
    <router-link to="/" class="logo">kawano<span>.dev</span></router-link>

    <div class="nav-links">
      <router-link to="/" class="nav-link">{{ t('nav.home') }}</router-link>
      <router-link to="/sobre" class="nav-link">{{ t('nav.about') }}</router-link>
      <router-link to="/projetos" class="nav-link">{{ t('nav.projects') }}</router-link>
    </div>

    <div class="nav-right">
      <div class="lang-switch">
        <button @click="setLocale('pt')" :class="{ active: locale === 'pt' }" title="Português">
          <span class="fi fi-br"></span>
        </button>
        <button @click="setLocale('en')" :class="{ active: locale === 'en' }" title="English">
          <span class="fi fi-us"></span>
        </button>
      </div>
      <a class="icon-link" href="https://www.linkedin.com/in/lucianokawano/" target="_blank" title="LinkedIn">in</a>
      <div class="contact-wrap">
        <button class="contact-btn" @click="toggleContact">{{ t('nav.contact') }}</button>
        <div class="contact-pop" :class="{ open: contactOpen }">
          <a href="https://www.linkedin.com/in/lucianokawano/" target="_blank"><span class="ic">in</span> LinkedIn</a>
          <a href="#" target="_blank"><span class="ic">ig</span> Instagram</a>
          <a href="#" target="_blank"><span class="ic">wa</span> WhatsApp</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: sticky; top: 0; z-index: 50;
  display: flex; justify-content: space-between; align-items: center;
  padding: 22px 48px; border-bottom: 1px solid var(--border-subtle);
  background: rgba(11, 18, 32, 0.75); backdrop-filter: blur(10px);
}
.logo { font-family: var(--font-heading); font-weight: 700; font-size: 18px; }
.logo span { color: var(--blue-300); }
.nav-links { display: flex; gap: 8px; font-size: 14px; }
.nav-link { color: var(--text-secondary); padding: 8px 16px; border-radius: 8px; font-size: 14px; }
.nav-link:hover { color: var(--text-primary); }
.nav-link.router-link-exact-active { color: var(--text-primary); background: var(--bg-elevated); }
.nav-right { display: flex; align-items: center; gap: 14px; }
.lang-switch { display: flex; gap: 6px; border: 1px solid var(--border-subtle); border-radius: 20px; padding: 4px; }
.lang-switch button {
  width: 26px; height: 26px; border-radius: 50%; border: none; background: transparent;
  display: flex; align-items: center; justify-content: center; opacity: 0.45; transition: opacity 0.2s;
}
.lang-switch button.active { opacity: 1; box-shadow: 0 0 0 2px var(--blue-300); }
.lang-switch .fi { border-radius: 50%; width: 16px; height: 16px; }
.icon-link {
  width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border-subtle);
  display: flex; align-items: center; justify-content: center; font-family: var(--font-mono);
  font-size: 11px; color: var(--text-secondary); transition: all 0.2s;
}
.icon-link:hover { border-color: var(--blue-300); color: var(--blue-300); }
.contact-wrap { position: relative; }
.contact-btn {
  font-family: var(--font-body); font-weight: 500; font-size: 13.5px; color: var(--text-primary);
  background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 8px 18px;
}
.contact-pop {
  position: absolute; top: calc(100% + 10px); right: 0; background: var(--bg-elevated);
  border: 1px solid var(--border-subtle); border-radius: 12px; padding: 10px;
  display: none; flex-direction: column; gap: 4px; min-width: 180px;
  box-shadow: 0 16px 40px -12px rgba(0,0,0,0.5); z-index: 60;
}
.contact-pop.open { display: flex; }
.contact-pop a { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px; color: var(--text-secondary); font-size: 13.5px; }
.contact-pop a:hover { background: var(--bg-secondary); color: var(--text-primary); }
.contact-pop .ic {
  width: 24px; height: 24px; border-radius: 50%; background: var(--bg-secondary);
  display: flex; align-items: center; justify-content: center; font-family: var(--font-mono);
  font-size: 10px; color: var(--blue-300); flex-shrink: 0;
}
@media (max-width: 720px) {
  nav { padding: 16px 20px; flex-wrap: wrap; gap: 12px; }
  .nav-links { order: 3; width: 100%; justify-content: center; }
}
</style>