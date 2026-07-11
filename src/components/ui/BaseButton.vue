<script setup>
defineProps({
  variant: { type: String, default: 'primary' } // 'primary' | 'secondary' | 'pill'
})
</script>

<template>
  <button class="btn" :class="`btn-${variant}`">
    <slot />
  </button>
</template>

<style scoped>
.btn { font-family: var(--font-body); font-weight: 600; font-size: 16px; padding: 17px 32px; border-radius: var(--radius-sm); border: none; transition: transform 0.2s; }
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: var(--blue-500); color: #fff; }
.btn-secondary { border: 1.5px solid var(--border-subtle); color: var(--text-primary); background: transparent; }
.btn-pill {
  font-size: 13px; font-family: var(--font-mono); font-weight: 500;
  padding: 9px 18px; border-radius: 20px; background: rgba(46, 111, 217, 0.16);
  color: var(--blue-300); border: 1px solid rgba(46, 111, 217, 0.3);
}
.btn-pill:hover { background: rgba(46, 111, 217, 0.26); transform: translateY(-2px); }
</style>