<template>
  <span class="badge"><slot /></span>
</template>

<style scoped>
.badge {
  font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary);
  border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 20px;
}
</style>