import { createI18n } from "vue-i18n";

import en from './locales/en-US.json'
import de from './locales/de-DE.json'
import es from './locales/es-BO.json'


export default createI18n({
    locale: localStorage.getItem('lang') || import.meta.env.VITE_APP_I18N_LOCALE || 'en-US',
    fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'en-US',
    legacy: false,
    globalInjection: true,
    messages: {
        'en-US': en,
        'de-DE': de,
        'es-BO': es,
    }
})