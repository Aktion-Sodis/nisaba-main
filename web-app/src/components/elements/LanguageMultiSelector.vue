<template>
  <div class="flex flex-col gap-2">
    <MultiSelect
      v-model="localValue"
      :options="languageOptions"
      option-label="displayName"
      option-value="key"
      :placeholder="$t('utils.select_language')"
      :show-toggle-all="false"
      fluid
      :max-selected-labels="2"
      :disabled="disabled"
      @change="handleChange"
    />
    <Message v-if="showError" severity="error" :closable="false">
      {{ $t('utils.at_least_one_language_required') }}
    </Message>
  </div>
</template>

<script setup lang="ts">
import { isEqual, cloneDeep } from 'lodash';
import { PropType, ref, watch, computed } from 'vue';

import { getAvailableLanguages } from '@/utils/i18nLanguageStrings';

const props = defineProps({
  value: {
    type: Array as PropType<string[]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  'update:value': [string[]];
}>();

// Handle v-model bindability
const localValue = ref<string[]>(cloneDeep(props.value));
const showError = ref(false);
const previousValidValue = ref<string[]>(cloneDeep(props.value));

// Compute language options with combined display name
const languageOptions = computed(() => {
  return getAvailableLanguages().map((lang) => ({
    ...lang,
    displayName: `${lang.emoji} ${lang.name}`,
  }));
});

// Handle change event to ensure at least one language is selected
const handleChange = (event: any) => {
  if (event.value.length === 0) {
    showError.value = true;
    // Revert to previous valid value
    localValue.value = cloneDeep(previousValidValue.value);
  } else {
    showError.value = false;
    previousValidValue.value = cloneDeep(event.value);
    emit('update:value', cloneDeep(event.value));
  }
};

// Watch for changes in props
watch(
  () => props.value,
  (newValue) => {
    if (!isEqual(newValue, localValue.value)) {
      localValue.value = cloneDeep(newValue);
      previousValidValue.value = cloneDeep(newValue);
    }
  },
  { deep: true }
);

// Watch for changes in local value
watch(
  () => localValue.value,
  (newValue) => {
    if (!isEqual(newValue, props.value) && newValue.length > 0) {
      previousValidValue.value = cloneDeep(newValue);
      emit('update:value', cloneDeep(newValue));
    }
  },
  { deep: true }
);
</script>
