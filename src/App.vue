<script setup>
import { watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavBar from './components/layout/NavBar.vue'
import FooterBar from './components/layout/FooterBar.vue'
import DataFlowBackground from './components/layout/DataFlowBackground.vue'

const { locale } = useI18n()
const fading = ref(false)

watch(locale, () => {
  fading.value = true
  setTimeout(() => { fading.value = false }, 220)
})
</script>

<template>
  <DataFlowBackground />
  <NavBar />
  <main :class="{ 'locale-fade': fading }">
    <router-view v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <FooterBar />
</template>

<style>
main { position: relative; z-index: 1; }
main.locale-fade { opacity: 0.3; transition: opacity 0.2s ease; }
</style>