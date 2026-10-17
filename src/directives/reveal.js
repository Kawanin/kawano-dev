// v-reveal  |  v-reveal="120" (atraso em ms)
// Revela ao entrar na viewport e esconde ao sair (bidirecional).
export const reveal = {
    mounted(el, binding) {
        el.classList.add('reveal')
        if (typeof binding.value === 'number') el.style.setProperty('--reveal-delay', `${binding.value}ms`)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => el.classList.toggle('in-view', entry.isIntersecting))
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
        observer.observe(el)
        el._revealObserver = observer
    },
    unmounted(el) {
        el._revealObserver?.disconnect()
    }
}
