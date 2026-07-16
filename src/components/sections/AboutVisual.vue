<script setup>
</script>

<template>
  <div class="about-visual">
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
      <circle cx="120" cy="150" r="70" fill="none" stroke="#1C4587" stroke-width="1" opacity="0.7"/>
      <circle cx="230" cy="280" r="110" fill="none" stroke="#2E6FD9" stroke-width="1" opacity="0.6"/>
      <circle cx="90" cy="360" r="40" fill="none" stroke="#4BB4E6" stroke-width="1.2" opacity="0.8"/>
      <line x1="120" y1="150" x2="230" y2="280" stroke="#2E6FD9" stroke-width="0.6" opacity="0.4"/>
      <line x1="90" y1="360" x2="230" y2="280" stroke="#4BB4E6" stroke-width="0.6" opacity="0.4"/>
      <circle cx="120" cy="150" r="2.5" fill="#4BB4E6"/>
      <circle cx="230" cy="280" r="2.5" fill="#4BB4E6"/>
      <circle cx="90" cy="360" r="2.5" fill="#4BB4E6"/>
    </svg>
  </div>
</template>

<style scoped>
.about-visual {
  height: 100%;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 40% 50%, rgba(46,111,217,0.10), transparent 65%);
}
.about-visual svg { width: 100%; height: 100%; }

@media (max-width: 900px) {
  .about-visual { min-height: auto; opacity: 0.18; pointer-events: none; }
}
</style>