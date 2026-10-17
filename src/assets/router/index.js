import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../components/view/HomeView.vue'
import DesignSystemView from '../../components/view/DesignSystemView.vue'

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/design-system', name: 'design-system', component: DesignSystemView },
    // rotas antigas (/sobre, /projetos, /projetos/:slug) agora são seções da página única
    { path: '/sobre', redirect: { path: '/', hash: '#sobre' } },
    { path: '/projetos/:slug?', redirect: { path: '/', hash: '#projetos' } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, saved) {
        if (saved) return saved
        if (to.hash) return { el: to.hash, behavior: 'smooth' }
        return { top: 0 }
    }
})

export default router
