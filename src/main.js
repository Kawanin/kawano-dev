import { createApp } from 'vue'
import App from './App.vue'
import router from './assets/router'
import { reveal } from './directives/reveal'
import { i18n } from './i18n'
import 'flag-icons/css/flag-icons.min.css'
import './assets/tokens.css'
import './assets/base.css'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.directive('reveal', reveal)
app.mount('#app')