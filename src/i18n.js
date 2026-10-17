import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import en from './locales/en.json'

const KEY = 'locale'
let saved = 'pt'
try {
    saved = localStorage.getItem(KEY) || 'pt'
} catch (e) { /* storage indisponível */ }

export const i18n = createI18n({
    legacy: false,
    locale: saved,
    fallbackLocale: 'pt',
    messages: { pt, en }
})

export function persistLocale(l) {
    try { localStorage.setItem(KEY, l) } catch (e) { /* ignore */ }
    document.documentElement.lang = l === 'en' ? 'en' : 'pt-BR'
}

document.documentElement.lang = saved === 'en' ? 'en' : 'pt-BR'
