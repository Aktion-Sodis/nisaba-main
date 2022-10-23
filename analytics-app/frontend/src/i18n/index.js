import { createI18n } from "vue-i18n";

import messages from '@intlify/unplugin-vue-i18n/messages'


const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || import.meta.env.VITE_APP_I18N_LOCALE || 'en-US',
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'en-US',
  globalInjection: true,
  messages
});

export default i18n;