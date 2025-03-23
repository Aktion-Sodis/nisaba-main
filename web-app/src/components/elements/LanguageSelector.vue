<template>
  <div class="language-selector">
    <Select
      v-model="selectedLanguageInternal"
      :placeholder="$t('placeholder.select')"
      severity="light"
      :size="size"
      :disabled="disabled"
      option-label="label"
      :options="options"
      :fluid="fluid"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { toUpperCase } from '@/utils/formatStrings';

/**
 * Define Props
 */
withDefaults(
  defineProps<{
    size?: 'small' | 'large';
    disabled?: boolean;
    fluid?: boolean;
  }>(),
  {
    size: 'small',
    disabled: false,
    fluid: false,
  }
);

/**
 * Initialize Utilities
 */
const { availableLocales, locale } = useI18n();

const SELECTED_LANGUAGE_KEY = 'selectedLanguage';

/**
 * Computed Properties
 */
const options = computed(() => {
  return availableLocales.map((locale) => ({
    label: `${getFlagEmoji(locale)} ${toUpperCase(locale)}`,
    value: locale,
  }));
});

/**
 * Computed Property to handle language selection and store it in localStorage
 */
const selectedLanguageInternal = computed({
  get() {
    return options.value.find((l) => l.value === locale.value);
  },
  set(value: { label: string; value: string }) {
    locale.value = value.value;
    localStorage.setItem(SELECTED_LANGUAGE_KEY, value.value); // Save selected language to localStorage
  },
});

/**
 * Define Methods
 */
const getFlagEmoji = (locale: string) => {
  const mapping = {
    en: '🇬🇧🇺🇸',
    de: '🇩🇪🇨🇭🇦🇹',
    fr: '🇫🇷🇨🇭',
    it: '🇮🇹🇨🇭',
  };
  return (mapping as Record<string, string>)[locale] || '🏳️';
};
</script>
