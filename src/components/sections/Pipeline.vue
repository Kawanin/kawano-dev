<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { t, tm } = useI18n()
const stages = computed(() => tm('home.pipeline'))
</script>

<template>
  <div class="section pipeline-section">
    <div class="kicker" v-reveal>{{ t('home.methodology') }}</div>
    <div class="section-head" v-reveal><h2>{{ t('home.how_i_work') }}</h2></div>
    <div class="pipeline">
      <template v-for="(stage, i) in stages" :key="stage.num">
        <div class="pipe-stage" v-reveal>
          <span class="pipe-num">{{ stage.num }}</span>
          <h4>{{ stage.title }}</h4>
          <p>{{ stage.desc }}</p>
        </div>
        <div class="pipe-connector" v-if="i < stages.length - 1" v-reveal></div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.pipeline-section { background: var(--bg-secondary); overflow: visible; }
.kicker { font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
.section-head { margin-bottom: 32px; }
.section-head h2 { font-size: var(--text-h2); }
.pipeline { display: flex; align-items: stretch; flex-wrap: wrap; gap: 0; padding: 14px 4px 24px; }
.pipe-stage {
  flex: 1; min-width: 170px; background: var(--bg-elevated); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md); padding: 26px 20px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.pipe-stage:hover { transform: translateY(-6px); border-color: rgba(75, 180, 230, 0.4); box-shadow: 0 16px 36px -14px rgba(46, 111, 217, 0.45); }
.pipe-num { font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300); margin-bottom: 10px; display: block; }
.pipe-stage h4 { font-size: var(--text-h3); margin-bottom: 6px; }
.pipe-stage p { font-size: var(--text-small); color: var(--text-secondary); }
.pipe-connector { display: flex; align-items: center; justify-content: center; width: 36px; flex-shrink: 0; }
.pipe-connector::before { content: ''; width: 100%; height: 1px; background: linear-gradient(90deg, var(--blue-500), var(--blue-300)); }
@media (max-width: 900px) {
  .pipeline { flex-direction: column; flex-wrap: nowrap; }
  .pipe-connector { width: 100%; height: 24px; }
  .pipe-connector::before { width: 1px; height: 100%; background: linear-gradient(180deg, var(--blue-500), var(--blue-300)); margin: 0 auto; }
}
</style>