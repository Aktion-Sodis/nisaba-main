import { createI18n, type I18nOptions } from 'vue-i18n'

import en from '@/i18n/en';

const messages = {
  en,
};

const options: I18nOptions = {
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages
}

export default createI18n(options)