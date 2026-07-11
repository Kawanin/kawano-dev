import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../components/view/HomeView.vue'
import AboutView from '../../components/view/AboutView.vue'
import ProjectsView from '../../components/view/ProjectsView.vue'
import ProjectDetailView from '../../components/view/ProjectDetailView.vue'
import DesignSystemView from '../../components/view/DesignSystemView.vue'

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/sobre', name: 'about', component: AboutView },
    { path: '/projetos', name: 'projects', component: ProjectsView },
    { path: '/projetos/:slug', name: 'project-detail', component: ProjectDetailView, props: true },
    { path: '/design-system', name: 'design-system', component: DesignSystemView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router
