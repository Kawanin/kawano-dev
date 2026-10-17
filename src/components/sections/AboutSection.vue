<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionShell from '../ui/SectionShell.vue'
import HobbyIcon from '../ui/HobbyIcon.vue'
import { aboutContent } from '../../assets/data/about.js'

const { t, tm, rt, locale } = useI18n()
const L = computed(() => locale.value)
const steps = computed(() => tm('about.method'))
const cur = ref(0)
const hobbies = [
  { icon: 'spotify', k: 'music' }, { icon: 'playstation', k: 'games' }, { icon: 'cooking', k: 'cooking' }
]
</script>

<template>
  <SectionShell id="sobre" num="01" :label="t('about.label')" :title="t('about.title')">
    <div class="intro">
      <p v-for="(p, i) in aboutContent.intro[L]" :key="i" v-html="p" v-reveal="i * 80"></p>
    </div>

    <h3 class="sub label">{{ t('about.method_title') }}</h3>
    <div class="method" v-reveal>
      <button v-for="(s, i) in steps" :key="i" class="step" :class="{ on: cur === i, done: i < cur }" @mouseenter="cur = i" @focus="cur = i">
        <span class="n">0{{ i + 1 }}</span><span class="t">{{ rt(s.t) }}</span>
      </button>
      <div class="line"><i :style="{ width: (cur / (steps.length - 1)) * 100 + '%' }"></i></div>
    </div>
    <p class="desc" :key="cur">{{ rt(steps[cur].d) }}</p>

    <div class="two">
      <div>
        <h3 class="sub label">{{ t('about.education') }}</h3>
        <ul class="edu">
          <li v-for="e in aboutContent.education" :key="e.date" v-reveal><span class="mono">{{ e.date }}</span>{{ e.title[L] }}</li>
        </ul>
      </div>
      <div>
        <h3 class="sub label">{{ t('about.outside') }}</h3>
        <div class="hobbies">
          <div v-for="h in hobbies" :key="h.k" class="hob" v-reveal>
            <HobbyIcon :icon="h.icon" />
            <div><b>{{ t(`about.hobby_${h.k}`) }}</b><small>{{ t(`about.hobby_${h.k}_text`) }}</small></div>
          </div>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.intro p { font-size: 18px; color: var(--text-secondary); max-width: 66ch; margin-bottom: 16px; }
.intro :deep(strong) { color: var(--text-primary); font-weight: 600; }
.sub { margin: 44px 0 16px; }
.method { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.step { position: relative; z-index: 1; text-align: left; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 14px; color: var(--text-muted); transition: transform .35s var(--ease), border-color .25s, color .25s, background .25s; }
.step .n { display: block; font: 500 11px var(--font-mono); margin-bottom: 8px; } .step .t { font: 600 15px var(--font-heading); }
.step.done { color: var(--text-secondary); } .step:hover, .step.on { color: var(--text-primary); border-color: var(--accent); background: var(--bg-elevated); transform: translateY(-5px); } .step.on .n { color: var(--accent); }
.line { position: absolute; left: 0; right: 0; bottom: -10px; height: 2px; background: var(--border-subtle); } .line i { display: block; height: 100%; background: var(--accent); transition: width .5s var(--ease); }
.desc { margin-top: 26px; min-height: 28px; color: var(--text-secondary); animation: fade .4s var(--ease); } @keyframes fade { from { opacity: 0; transform: translateY(4px); } }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.edu { list-style: none; display: grid; gap: 4px; } .edu li { padding: 14px 0; border-bottom: 1px solid var(--border-subtle); display: grid; gap: 4px; font-size: 15.5px; transition: padding-left .35s var(--ease), color .2s; } .edu li:hover { padding-left: 10px; color: var(--accent); }
.mono { font: 500 12px var(--font-mono); color: var(--text-muted); }
.hobbies { display: grid; gap: 10px; } .hob { display: flex; gap: 14px; align-items: center; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 12px 14px; transition: transform .35s var(--ease), border-color .25s; } .hob:hover { transform: translateX(8px); border-color: var(--accent); }
.hob > :first-child { flex: none; }
.hob > div { flex: 1; text-align: left; }
.hob b { display: block; font-size: 15px; } .hob small { color: var(--text-muted); font-size: 13.5px; }
@media (max-width: 760px) { .method { grid-template-columns: 1fr 1fr; } .line { display: none; } .two { grid-template-columns: 1fr; } }
</style>
