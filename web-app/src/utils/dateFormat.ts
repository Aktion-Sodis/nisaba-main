import { useI18n } from 'vue-i18n';

export type DateFormatOptions = {
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  timeZone?: string;
};

export function useDateFormat() {
  const { locale } = useI18n();

  const formatDate = (
    date: Date | string | number,
    options: DateFormatOptions = {}
  ) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    const { dateStyle = 'medium', timeStyle = 'short', timeZone } = options;

    return new Intl.DateTimeFormat(locale.value, {
      dateStyle,
      timeStyle,
      timeZone,
    }).format(dateObj);
  };

  return {
    formatDate,
  };
}
