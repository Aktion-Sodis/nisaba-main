import { createI18n } from "vue-i18n";

import messages from '@intlify/unplugin-vue-i18n/messages'

// import en from './en-US.json';
// import de from './de-DE.json';
// import es from './es-BO.json';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en-US',
  fallbackLocale: 'en-US',
  globalInjection: true,
  messages
});

export default i18n;