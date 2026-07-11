/**
 * Gera thumbnails PNG renderizando os PDFs via pdfjs dentro do Puppeteer.
 * Uso: node scripts/gen-cert-thumbs.mjs
 */
import puppeteer from 'puppeteer'
import { readdir, readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const CERTS_DIR = resolve(__dirname, '../public/certificates')
const SCALE = 1.5

const files = (await readdir(CERTS_DIR)).filter(f => f.endsWith('.pdf'))
console.log(`Gerando thumbs para ${files.length} certificados...`)

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })

for (const file of files) {
  const pdfPath = join(CERTS_DIR, file)
  const pngPath = join(CERTS_DIR, file.replace('.pdf', '.png'))

  if (existsSync(pngPath)) {
    console.log(`  [skip] ${file} (PNG já existe)`)
    continue
  }

  try {
    // Lê o PDF e converte para base64 para embutir no HTML (sem CORS)
    const pdfBuffer = await readFile(pdfPath)
    const base64 = pdfBuffer.toString('base64')

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { background: white; width: fit-content; height: fit-content; }
canvas { display: block; }
</style>
</head>
<body>
<canvas id="c"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const raw = atob('${base64}');
const bytes = new Uint8Array(raw.length);
for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
pdfjsLib.getDocument({ data: bytes }).promise
  .then(pdf => pdf.getPage(1))
  .then(page => {
    const vp = page.getViewport({ scale: ${SCALE} });
    const canvas = document.getElementById('c');
    canvas.width = vp.width;
    canvas.height = vp.height;
    return page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
  })
  .then(() => { document.title = 'done'; });
</script>
</body>
</html>`

    const page = await browser.newPage()
    await page.setViewport({ width: 1400, height: 1000 })
    await page.setContent(html, { waitUntil: 'networkidle0' })
    await page.waitForFunction(() => document.title === 'done', { timeout: 30000 })

    // Screenshot apenas do canvas, sem UI do browser
    const canvasEl = await page.$('#c')
    await canvasEl.screenshot({ path: pngPath })

    await page.close()
    console.log(`  [ok] ${file.replace('.pdf', '.png')}`)
  } catch (e) {
    console.error(`  [erro] ${file}:`, e.message)
  }
}

await browser.close()
console.log('Pronto!')
