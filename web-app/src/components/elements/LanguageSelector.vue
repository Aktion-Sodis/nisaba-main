<template>
  <div class="language-selector">
    <Select
      v-model="selectedLanguageInternal"
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

import { SELECTED_LANGUAGE_KEY } from '@/data/constants';
import { toUpperCase } from '@/utils/format-string';

/**
 * Define Props
 * Defines the properties passed from the parent component to the child for configuration and data.
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
 * Sets up utility functions and services for use throughout the component.
 */
const { availableLocales, locale } = useI18n();

/**
 * Computed Properties
 * Defines properties that derive values from reactive state, updated automatically when dependencies change.
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
 * Defines functions that perform specific actions or handle events within the component.
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
