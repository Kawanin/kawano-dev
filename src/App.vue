<script setup>
import { watch, ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
import FooterBar from './components/layout/FooterBar.vue'
import DataFlowBackground from './components/layout/DataFlowBackground.vue'
import PageTabs from './components/layout/PageTabs.vue'
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
  <NavBar />
  <main :class="{ 'locale-fade': fading }">
    <router-view />
  </main>
  <FooterBar />
  <PageTabs />
</template>

<style>
main { position: relative; z-index: 1; }
</style>
