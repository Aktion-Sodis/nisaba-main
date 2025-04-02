import { I18nString } from "@/models";
import { useI18n } from 'vue-i18n';


// THIS IS UPPER CASE
export const toUpperCase = (s: string) => {
  return s.toUpperCase();
};

export const formatMLString = (
  i18nString: I18nString,
  overrideLanguage?: string
): string => {

  const { languageKeys, languageTexts } = i18nString;

  if (overrideLanguage) {
    const index = languageKeys.indexOf(overrideLanguage);
    if (index > -1 && languageTexts[index]) {
      return languageTexts[index];
    }
  }

  let currentLanguage = useI18n().locale.value;

  let index = languageKeys.indexOf(currentLanguage);
  if (index > -1 && languageTexts[index]) {
    return languageTexts[index];
  }

  const languageCode = currentLanguage.split('-')[0];
  currentLanguage = languageCode;

  index = languageKeys.findIndex((key) => key.startsWith(currentLanguage));

  if (index > -1 && languageTexts[index]) {
    return languageTexts[index];
  }

  const firstNonEmptyIndex = languageTexts.findIndex((text) => text !== '');
  if (firstNonEmptyIndex > -1) {
    return languageTexts[firstNonEmptyIndex];
  }

  return '';
};