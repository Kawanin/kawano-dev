<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <footer class="foot">
    <div class="wrap row">
      <span>© 2026 Luciano Kawano</span>
      <span class="mono">kawano.dev</span>
      <span>{{ t('footer') }}</span>
    </div>
  </footer>
</template>

<style scoped>
.foot { border-top: 1px solid var(--border-subtle); padding: 32px 0 40px; color: var(--text-muted); font-size: 13px; position: relative; z-index: 1; }
.row { display: flex; justify-content: space-between; gap: 12px 24px; flex-wrap: wrap; }
.mono { font-family: var(--font-mono); color: var(--text-secondary); }
</style>
