<template>
  <section class="section">
    <div class="tag">Brand Guidelines — v1</div>
    <h1>Manual de marca</h1>
    <p class="lead">Identidade visual do portfolio — referência de cores, tipografia e componentes.</p>

    <h3>Cores</h3>
    <div class="color-grid">
      <div class="swatch" style="background:#0B1220"><span>bg-primary #0B1220</span></div>
      <div class="swatch" style="background:#111A2E"><span>bg-secondary #111A2E</span></div>
      <div class="swatch" style="background:#1C4587"><span>blue-700 #1C4587</span></div>
      <div class="swatch" style="background:#2E6FD9"><span>blue-500 #2E6FD9</span></div>
      <div class="swatch" style="background:#4BB4E6"><span>blue-300 #4BB4E6</span></div>
    </div>

    <h3>Tipografia</h3>
    <p style="font-family:var(--font-heading);font-size:28px;">Space Grotesk — Títulos</p>
    <p style="font-family:var(--font-body);font-size:16px;color:var(--text-secondary);">IBM Plex Sans — Corpo de texto</p>
    <p style="font-family:var(--font-mono);font-size:14px;color:var(--blue-300);">IBM Plex Mono — Labels e dados</p>
  </section>
</template>

<style scoped>
.section { padding: 90px 48px; max-width: 900px; }
.tag { font-family: var(--font-mono); font-size: 13px; color: var(--blue-300); text-transform: uppercase; margin-bottom: 16px; }
h1 { font-size: 40px; margin-bottom: 12px; }
.lead { color: var(--text-secondary); margin-bottom: 48px; }
h3 { font-size: 18px; margin: 40px 0 16px; }
.color-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
.swatch { height: 80px; border-radius: 8px; display: flex; align-items: flex-end; padding: 10px; }
.swatch span { font-family: var(--font-mono); font-size: 11px; background: rgba(0,0,0,0.4); padding: 3px 8px; border-radius: 4px; color: #fff; }
</style>