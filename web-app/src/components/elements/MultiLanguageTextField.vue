<template>
  <div class="flex flex-col gap-2">
    <template v-if="mode === MLTextFieldMode.AllDisplayed">
      <div
        v-for="(key, index) in localValue.languageKeys"
        class="flex gap-2 items-center"
      >
        <InputText
          v-if="nLines === 1"
          v-model="localValue.languageTexts[index]"
          :placeholder="hint"
        />
        <Textarea
          v-else
          v-model="localValue.languageTexts[index]"
          :placeholder="hint"
          :rows="nLines"
          auto-resize
        />
        <Select
          :model-value="key"
          :options="getAvailableLanguages()"
          option-label="emoji"
          :disabled="true"
          class="w-12 shrink-0"
        />
      </div>
    </template>
    <template v-else-if="mode === MLTextFieldMode.Select">
      <div class="flex gap-2 items-center">
        <InputText
          v-if="nLines === 1"
          v-model="selectedText"
          :placeholder="hint"
        />
        <Textarea
          v-else
          v-model="selectedText"
          :placeholder="hint"
          :rows="nLines"
          auto-resize
        />
        <Select
          v-model="selectedLanguage"
          :options="filteredLanguages"
          option-label="emoji"
          option-value="key"
          class="w-12 shrink-0"
        />
      </div>
    </template>
    <Message v-if="error && error !== ''" severity="error" :text="error" />
  </div>
</template>

<script setup lang="ts">
import { isEqual, cloneDeep } from 'lodash';
import { PropType, ref, watch, onMounted, computed } from 'vue';

import { I18nString } from '@/models';
import { getAvailableLanguages } from '@/utils/i18nLanguageStrings';

enum MLTextFieldMode {
  AllDisplayed = 'AllDisplayed',
  Select = 'Select',
}

const props = defineProps({
  value: {
    type: Object as PropType<I18nString>,
    required: true,
  },
  allowedKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  hint: {
    type: String,
    required: false,
    default: '',
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
  mode: {
    type: String as PropType<MLTextFieldMode>,
    default: 'AllDisplayed',
  },
  nLines: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits<{
  'update:value': [I18nString];
  'update:allowedKeys': [string[]];
}>();

const selectedLanguage = ref<string>(props.value.languageKeys[0] || '');
const selectedText = computed({
  get: () => {
    const index = localValue.value.languageKeys.indexOf(selectedLanguage.value);
    return index !== -1 ? localValue.value.languageTexts[index] : '';
  },
  set: (value: string) => {
    const index = localValue.value.languageKeys.indexOf(selectedLanguage.value);
    if (index !== -1) {
      localValue.value.languageTexts[index] = value;
    }
  },
});

const filteredLanguages = computed(() => {
  return getAvailableLanguages().filter((lang) =>
    localAllowedKeys.value.includes(lang.key)
  );
});

const ensureKeysExist = () => {
  // Only add new keys that don't exist yet
  const newKeys = localAllowedKeys.value.filter(
    (key) => !localValue.value.languageKeys.includes(key)
  );

  if (newKeys.length > 0) {
    localValue.value = {
      languageKeys: [...localValue.value.languageKeys, ...newKeys],
      languageTexts: [
        ...localValue.value.languageTexts,
        ...newKeys.map(() => ''),
      ],
    };
  }
};

//handle v-model bindability
const localValue = ref<I18nString>(cloneDeep(props.value));
const localAllowedKeys = ref<string[]>(cloneDeep(props.allowedKeys));

// Watch for changes in props
watch(
  () => props.value,
  (newValue) => {
    if (!isEqual(newValue, localValue.value)) {
      localValue.value = cloneDeep(newValue);
      ensureKeysExist();
    }
  },
  { deep: true }
);

watch(
  () => localValue.value,
  (newValue) => {
    if (!isEqual(newValue, props.value)) {
      emit('update:value', cloneDeep(newValue));
    }
  },
  { deep: true }
);

watch(
  () => props.allowedKeys,
  (newValue) => {
    if (!isEqual(newValue, localAllowedKeys.value)) {
      localAllowedKeys.value = cloneDeep(newValue);
      ensureKeysExist();
    }
  },
  { deep: true }
);

watch(
  () => localAllowedKeys.value,
  (newValue) => {
    if (!isEqual(newValue, props.allowedKeys)) {
      emit('update:allowedKeys', cloneDeep(newValue));
    }
  },
  { deep: true }
);

// Initialize keys on mount
onMounted(() => {
  ensureKeysExist();
});
</script>
