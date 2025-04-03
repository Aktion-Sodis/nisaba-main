import { defineStore } from 'pinia';

export const usei18nStore = defineStore('i18n', {
  state: () => ({
  }),

  persist: {
    key: 'i18n',
    storage: sessionStorage,
  },

  actions: {

    getLanguageText(languageKeys, languageTexts, i18n) {
        let localeIndex = languageKeys.indexOf(i18n.locale);
        if (localeIndex !== -1 && languageTexts[localeIndex]) {
          return languageTexts[localeIndex];
        }
        let fallbackLocaleIndex = languageKeys.indexOf(i18n.fallbackLocale);
        if (fallbackLocaleIndex !== -1 && languageTexts[fallbackLocaleIndex]) {
          return languageTexts[fallbackLocaleIndex];
        }
        for(let i = 0; i < languageTexts.length; i++) {
          if (languageTexts[i]) {
            return languageTexts[i];
          }
        }
        return -1; // return -1 if no valid text is found
    }
    
  },
});