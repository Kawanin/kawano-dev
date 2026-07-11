export const reveal = {
    mounted(el) {
        el.classList.add('reveal')
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                el.classList.toggle('in-view', entry.isIntersecting)
            })
        }, { threshold: 0.15 })
        observer.observe(el)
        el._revealObserver = observer
    },
    unmounted(el) {
        el._revealObserver?.disconnect()
    }
}