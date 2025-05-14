<template>
  <div
    v-if="localQuestion && localQuestion.questionOptions"
    class="flex flex-col gap-4"
  >
    <h4 class="mb-2">
      {{ $t('surveydetails.question_card.options.title') }}
    </h4>

    <div class="flex flex-col gap-4">
      <template
        v-for="(option, index) in localQuestion.questionOptions"
        :key="option.id"
      >
        <div class="flex flex-row justify-between items-center gap-2">
          <label class="w-[40%]">
            {{
              $t('surveydetails.question_card.options.option_label', {
                number: index + 1,
              })
            }}
          </label>
          <div class="flex gap-2 items-center w-[60%]">
            <multi-language-text-field
              v-model:value="option.text"
              v-model:allowed-keys="surveyDetailStore.allowedLanguageKeys"
              :hint="$t('surveydetails.question_card.options.option_text.hint')"
              :error="error"
              class="flex-1"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              outlined
              @click="removeOption(index)"
            />
          </div>
        </div>
        <Divider v-if="index !== localQuestion.questionOptions.length - 1" />
      </template>
      <Button
        icon="pi pi-plus"
        :label="$t('surveydetails.question_card.options.add_button')"
        @click="addOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEqual, cloneDeep } from 'lodash';
import { PropType, ref, watch, onMounted } from 'vue';

import MultiLanguageTextField from '@/components/elements/MultiLanguageTextField.vue';
import { Question } from '@/models';
import { createNewQuestionOption } from '@/utils/newObjects';
import { useSurveyDetailStore } from '@/views/surveydetail/surveyDetailStore';

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['update:question']);
const surveyDetailStore = useSurveyDetailStore();

const localQuestion = ref<Question>(cloneDeep(props.question));

// Watch for changes in props
watch(
  () => props.question,
  (newValue) => {
    if (!isEqual(newValue, localQuestion.value)) {
      localQuestion.value = cloneDeep(newValue);
    }
  },
  { deep: true }
);

// Watch for changes in local value
watch(
  () => localQuestion.value,
  (newValue) => {
    if (!isEqual(newValue, props.question)) {
      emit('update:question', cloneDeep(newValue));
    }
  },
  { deep: true }
);

const addOption = () => {
  const newOption = createNewQuestionOption(
    surveyDetailStore.allowedLanguageKeys
  );

  localQuestion.value = {
    ...localQuestion.value,
    questionOptions: [
      ...(localQuestion.value.questionOptions || []),
      newOption,
    ],
  };
};

const removeOption = (index: number) => {
  if (localQuestion.value.questionOptions) {
    const optionToRemove = localQuestion.value.questionOptions[index];
    const newOptions = [...localQuestion.value.questionOptions];
    newOptions.splice(index, 1);

    localQuestion.value = {
      ...localQuestion.value,
      questionOptions: newOptions,
    };

    surveyDetailStore.cleanupQuestionOptionDeletion({
      id: optionToRemove.id,
      followUpQuestionIDs: optionToRemove.followUpQuestionIDs || undefined,
    });
  }
};

// Initialize on mount
onMounted(() => {
  if (!localQuestion.value.questionOptions) {
    localQuestion.value = {
      ...localQuestion.value,
      questionOptions: [],
    };
  }
});
</script>
