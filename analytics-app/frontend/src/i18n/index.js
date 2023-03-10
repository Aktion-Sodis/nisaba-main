import { createI18n } from "vue-i18n";

import en from './en-US.json'
import de from './de-DE.json'
import es from './es-BO.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || import.meta.env.VITE_APP_I18N_LOCALE || 'en-US',
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'en-US',
  globalInjection: true,
  messages: {
    'en-US': en,
    'de-DE': de,
    'es-BO': de,
  }
});

export default i18n;