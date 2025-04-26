// /Users/Dev/Programming/nisaba-main/web-app/src/utils/formatStrings.ts
import { I18nString } from '@/models';
// import { useI18n } from 'vue-i18n'; // Nicht mehr hier benötigt

// THIS IS UPPER CASE
export const toUpperCase = (s: string) => {
  return s.toUpperCase();
};

/**
 * Extrahiert den Text für eine bestimmte Zielsprache aus einem I18nString-Objekt.
 * @param i18nString Das Objekt mit languageKeys und languageTexts.
 * @param targetLang Die gewünschte Sprache (z.B. 'de-DE', übergeben von der Komponente).
 * @returns Der gefundene Text oder ein leerer String.
 */
export const formatMLString = (
  i18nString: I18nString | null | undefined, // Erlaube null/undefined als Input
  targetLang: string | null | undefined // Die Zielsprache von außen
): string => {
  // Frühzeitige Rückgabe bei ungültigem Input
  if (
    !i18nString ||
    !Array.isArray(i18nString.languageKeys) ||
    !Array.isArray(i18nString.languageTexts) ||
    !targetLang
  ) {
    // Optional: Versuche den ersten verfügbaren Text als Fallback, wenn keine Zielsprache gegeben, aber Objekt vorhanden
    if (i18nString && Array.isArray(i18nString.languageTexts)) {
      const firstNonEmptyIndex = i18nString.languageTexts.findIndex(
        (text) => text && text !== ''
      );
      if (firstNonEmptyIndex > -1) {
        return i18nString.languageTexts[firstNonEmptyIndex];
      }
    }
    return '';
  }

  const { languageKeys, languageTexts } = i18nString;

  // 1. Versuche exakten Match mit der Zielsprache
  let index = languageKeys.indexOf(targetLang);
  if (index > -1 && languageTexts[index]) {
    return languageTexts[index];
  }

  // 2. Versuche Match nur mit dem Sprachcode (z.B. 'de' aus 'de-DE')
  const languageCode = targetLang.split('-')[0];
  index = languageKeys.findIndex((key) => key.startsWith(languageCode));
  if (index > -1 && languageTexts[index]) {
    return languageTexts[index];
  }

  // 3. Fallback: Versuche Englisch ('en' oder 'en-US')
  index = languageKeys.findIndex((key) => key.startsWith('en'));
  if (index > -1 && languageTexts[index]) {
    return languageTexts[index];
  }

  // 4. Fallback: Nimm den ersten nicht-leeren Text
  const firstNonEmptyIndex = languageTexts.findIndex(
    (text) => text && text !== ''
  );
  if (firstNonEmptyIndex > -1) {
    return languageTexts[firstNonEmptyIndex];
  }

  // 5. Letzter Fallback: Leerer String
  return '';
};
