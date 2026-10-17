<script setup>
defineProps({ id: String, label: String, num: String, title: String })
</script>

<template>
  <section :id="id" class="shell">
    <div class="wrap">
      <header class="head" v-reveal>
        <span class="num" aria-hidden="true">{{ num }}</span>
        <div>
          <div class="chip label">{{ label }}</div>
          <h2>{{ title }}</h2>
        </div>
      </header>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.shell { padding: var(--space-section) 0 0; position: relative; z-index: 1; overflow-x: clip; }
.head { display: flex; align-items: flex-end; gap: clamp(16px, 3vw, 36px); margin-bottom: 36px; }
.num { font: 700 clamp(64px, 9vw, 120px)/0.8 var(--font-heading); color: transparent; -webkit-text-stroke: 1.5px var(--blue-700); letter-spacing: -0.04em; flex: none; transition: -webkit-text-stroke-color .4s, transform .5s var(--ease); }
.head:hover .num { -webkit-text-stroke-color: var(--accent); transform: translateY(-4px); }
.chip { display: inline-block; padding: 4px 10px; border: 1px solid var(--border-edge); border-radius: 99px; margin-bottom: 12px; color: var(--accent); }
h2 { font-size: var(--text-h2); line-height: 1.1; letter-spacing: -0.02em; max-width: 24ch; }
@media (max-width: 600px) { .head { flex-direction: column; align-items: flex-start; gap: 10px; } .num { font-size: 56px; } }
</style>
