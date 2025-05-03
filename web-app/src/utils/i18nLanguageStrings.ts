import i18n from '@/i18n';

export function getLanguageInfo(localeKey: string) {
  const normalizedKey = localeKey.includes('-')
    ? localeKey
    : `${localeKey}-${localeKey.toUpperCase()}`;
  const languageInfo = (i18n.global.messages as Record<string, any>)[
    normalizedKey
  ]?.languageinfo;

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
  const messages = i18n.global.messages as Record<string, any>;
  const fallbackLocale = i18n.global.fallbackLocale as string;

  const languages = Object.keys(messages).map((key) => ({
    key,
    name: messages[key].languageinfo.name,
    emoji: messages[key].languageinfo.emoji,
  }));

  return [
    ...languages.filter((lang) => lang.key === fallbackLocale),
    ...languages
      .filter((lang) => lang.key !== fallbackLocale)
      .sort((a, b) => a.name.localeCompare(b.name)),
  ];
}
