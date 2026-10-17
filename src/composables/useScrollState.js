import { ref } from 'vue'

// Ordem = ordem das seções na página (ids precisam existir no DOM)
export const SECTIONS = [
    { id: 'topo', key: 'hero' },
    { id: 'sobre', key: 'about' },
    { id: 'experiencia', key: 'experience' },
    { id: 'projetos', key: 'projects' },
    { id: 'certificados', key: 'certificates' },
    { id: 'stack', key: 'stack' },
    { id: 'idiomas', key: 'languages' },
    { id: 'contato', key: 'contact' }
]

export const activeId = ref('topo')
export const progress = ref(0)
export const scrolled = ref(false)

let started = false
let update = () => {}

export function refreshScrollState() { update() }

export function startScrollState() {
    if (started) return
    started = true
    let ticking = false
    update = () => {
        ticking = false
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
        scrolled.value = window.scrollY > 24
        const line = window.innerHeight * 0.38
        let cur = 'topo'
        for (const s of SECTIONS) {
            const el = document.getElementById(s.id)
            if (el && el.getBoundingClientRect().top <= line) cur = s.id
        }
        activeId.value = cur
    }
    const onScroll = () => {
        if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
}

export function goTo(id) {
    const el = document.getElementById(id)
    if (!el) return false
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', id === 'topo' ? '/' : `#${id}`)
    return true
}
