<script setup>
import { watch, ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
import DotNav from './components/layout/DotNav.vue'
import ScrollProgress from './components/layout/ScrollProgress.vue'
import FooterBar from './components/layout/FooterBar.vue'
import DataFlowBackground from './components/layout/DataFlowBackground.vue'
import { startScrollState, refreshScrollState } from './composables/useScrollState.js'

const { locale, t } = useI18n()
const route = useRoute()
const fading = ref(false)

watch(locale, () => {
  fading.value = true
  setTimeout(() => { fading.value = false }, 220)
  nextTick(refreshScrollState)
})

onMounted(startScrollState)
watch(() => route.fullPath, () => nextTick(refreshScrollState))
</script>

<template>
  <a class="skip" href="#sobre">{{ t('nav.skip') }}</a>
  <DataFlowBackground />
  <header class="topbar">
    <NavBar />
  </header>
  <ScrollProgress />
  <DotNav />
  <main :class="{ 'locale-fade': fading }">
    <router-view />
  </main>
  <FooterBar />
</template>

<style>
main { position: relative; z-index: 1; }
.topbar { position: sticky; top: 0; z-index: 60; background: rgba(8, 13, 24, 0.84); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-subtle); }
</style>
