import { createI18n } from "vue-i18n";

import en from './en-US.json';
import de from './de-DE.json';
import es from './es-BO.json';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en,
    de,
    es
  }
});

export default i18n;