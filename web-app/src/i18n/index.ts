import { createI18n, type I18nOptions } from 'vue-i18n';

import de from '@/i18n/de-DE';
import en from '@/i18n/en-US';
import es from '@/i18n/es-BO';

const messages = {
  'en-US': en,
  'de-DE': de,
  'es-BO': es,
};

const options: I18nOptions = {
  legacy: false,
  globalInjection: true,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages,
};

export default createI18n(options);
