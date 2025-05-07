import i18n from '@/i18n';

export function getLanguageInfo(localeKey: string) {
  const normalizedKey = localeKey.includes('-')
    ? localeKey
    : `${localeKey}-${localeKey.toUpperCase()}`;
  // @ts-expect-error i18n.global.getLocaleMessage is not typed
  const languageInfo =
    i18n.global.getLocaleMessage(normalizedKey)?.languageinfo;

  if (!languageInfo) {
    console.warn(`No language information found for locale: ${localeKey}`);
    return null;
  }

  return languageInfo;
}

interface LanguageListItem {
  key: string;
  name: string;
  emoji: string;
}

export function getAvailableLanguages(): LanguageListItem[] {
  const locales = i18n.global.availableLocales as string[];
  const fallbackLocale = i18n.global.fallbackLocale as string;

  const languages = locales.map((key) => ({
    key,
    name: getLanguageInfo(key)?.language_name,
    emoji: getLanguageInfo(key)?.language_emoji,
  }));

  return [
    ...languages.filter((lang) => lang.key === fallbackLocale),
    ...languages
      .filter((lang) => lang.key !== fallbackLocale)
      .sort((a, b) => a.name.localeCompare(b.name)),
  ];
}
