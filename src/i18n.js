import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import en from './locales/en.json'

const saved = localStorage.getItem('locale') || 'pt'

export const i18n = createI18n({
    legacy: false,
    locale: saved,
    fallbackLocale: 'pt',
    messages: { pt, en }
})