<template>
  <Card v-if="localQuestion && surveyDetailStore.localSurvey">
    <template #title>
      {{
        $t('surveydetails.question_card.title', { index: questionIndex + 1 })
      }}
    </template>
    <template #content>
      <div class="flex flex-col gap-2 mb-4">
        <Message
          v-for="(error, index) in surveyDetailStore.errors[questionIndex] ||
          []"
          :key="index"
          severity="error"
          :closable="false"
        >
          {{ error }}
        </Message>
      </div>
      <div class="flex flex-row gap-8">
        <div class="flex flex-col gap-4 flex-1">
          <h4 class="mb-2">
            {{ $t('surveydetails.question_card.general_information') }}
          </h4>
          <div class="flex flex-row justify-between items-center gap-2">
            <label for="questionType" class="w-[40%]">
              {{ $t('surveydetails.question_card.input.question_type.label') }}
            </label>
            <Select
              v-model="questionType"
              :options="questionTypeOptions"
              option-label="label"
              option-value="value"
              class="w-[60%]"
              :disabled="!surveyDetailStore.editMode"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="question">
              {{ $t('surveydetails.question_card.input.question.label') }}
            </label>
            <multi-language-text-field
              v-model:value="localQuestion.text"
              :allowed-keys="surveyDetailStore.allowedLanguageKeys"
              :n-lines="3"
              :disabled="!surveyDetailStore.editMode"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="image">
              {{ $t('surveydetails.question_card.input.image.label') }}
            </label>
            <custom-image-upload
              :path="
                deriveS3Path('questionPicPath', {
                  surveyID: surveyDetailStore.localSurvey.id,
                  questionID: localQuestion.id,
                })
              "
              :editable="surveyDetailStore.editMode"
            />
          </div>
          <div
            v-if="followUpQuestionPossible"
            class="flex flex-row justify-between items-center gap-2"
          >
            <label for="isFollowUpQuestion" class="w-[40%]">
              {{ $t('surveydetails.question_card.input.is_follow_up.label') }}
            </label>
            <InputSwitch
              v-model="isFollowUpQuestionLocal"
              :disabled="!surveyDetailStore.editMode"
            />
          </div>
          <div
            v-if="followUpQuestionPossible && isFollowUpQuestionLocal"
            class="flex flex-row justify-between items-center gap-2"
          >
            <label for="conditionOptions" class="w-[40%]">
              {{
                $t('surveydetails.question_card.input.condition_options.label')
              }}
            </label>
            <MultiSelect
              v-model="selectedConditionOptions"
              :options="availableConditionOptions"
              option-group-label="question_text"
              option-group-children="options"
              option-label="text"
              option-value="id"
              display="chip"
              :filter="true"
              fluid
              class="w-[60%]"
              :disabled="!surveyDetailStore.editMode"
            />
          </div>
        </div>
        <Divider layout="vertical" />
        <div class="flex flex-col gap-4 flex-1">
          <template
            v-if="
              questionType === 'SINGLECHOICE' ||
              questionType === 'MULTIPLECHOICE'
            "
          >
            <question-option-editor
              v-model:question="localQuestion"
              :error="''"
              :disabled="!surveyDetailStore.editMode"
            />
          </template>
          <template v-else>
            <div
              class="flex flex-col items-center justify-center gap-4 p-8 text-center"
            >
              <i class="pi pi-info-circle text-[3rem] text-surface-400"></i>
              <p class="text-oneliner-light text-surface-500">
                {{
                  $t(
                    'surveydetails.question_card.no_options_needed_description'
                  )
                }}
              </p>
            </div>
          </template>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { cloneDeep, isEqual } from 'lodash';
import { useConfirm } from 'primevue/useconfirm';
import { computed, defineProps, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import QuestionOptionEditor from './QuestionOptionEditor.vue';
import { useSurveyDetailStore } from '../../surveyDetailStore';

import CustomImageUpload from '@/components/elements/CustomImageUpload.vue';
import MultiLanguageTextField from '@/components/elements/MultiLanguageTextField.vue';
import type { Question, QuestionType } from '@/models';
import { formatMLString } from '@/utils/formatStrings';
import { createNewQuestionOption } from '@/utils/newObjects';
import { deriveS3Path } from '@/utils/s3Paths';

const props = defineProps<{
  questionIndex: number;
}>();

const surveyDetailStore = useSurveyDetailStore();
const { t, locale } = useI18n();

const localQuestion = ref<Question | undefined>(undefined);

const questionTypeOptions = computed(() => [
  {
    label: t('surveydetails.question_card.input.question_type.options.TEXT'),
    value: 'TEXT',
  },
  {
    label: t(
      'surveydetails.question_card.input.question_type.options.SINGLECHOICE'
    ),
    value: 'SINGLECHOICE',
  },
  {
    label: t(
      'surveydetails.question_card.input.question_type.options.MULTIPLECHOICE'
    ),
    value: 'MULTIPLECHOICE',
  },
  {
    label: t('surveydetails.question_card.input.question_type.options.INT'),
    value: 'INT',
  },
  {
    label: t('surveydetails.question_card.input.question_type.options.DOUBLE'),
    value: 'DOUBLE',
  },
  {
    label: t('surveydetails.question_card.input.question_type.options.RATING'),
    value: 'RATING',
  },
  {
    label: t('surveydetails.question_card.input.question_type.options.AUDIO'),
    value: 'AUDIO',
  },
  {
    label: t('surveydetails.question_card.input.question_type.options.PICTURE'),
    value: 'PICTURE',
  },
]);

const confirm = useConfirm();

const questionType = computed({
  get: () => localQuestion.value?.type,
  set: (newType: QuestionType) => {
    if (!localQuestion.value) return;
    localQuestion.value = {
      ...localQuestion.value,
      type: newType,
    };
  },
});

const handleTypeChange = (newType: QuestionType, oldType: QuestionType) => {
  if (!localQuestion.value) return;

  const simpleTypes = ['TEXT', 'INT', 'DOUBLE', 'RATING', 'AUDIO', 'PICTURE'];
  if (simpleTypes.includes(oldType)) {
    if (newType === 'SINGLECHOICE' || newType === 'MULTIPLECHOICE') {
      localQuestion.value = {
        ...localQuestion.value,
        questionOptions: [
          createNewQuestionOption(surveyDetailStore.allowedLanguageKeys),
        ],
      };
    }
    return;
  }

  if (
    (oldType === 'SINGLECHOICE' || oldType === 'MULTIPLECHOICE') &&
    (newType === 'SINGLECHOICE' || newType === 'MULTIPLECHOICE')
  ) {
    return;
  }

  if (
    (oldType === 'SINGLECHOICE' || oldType === 'MULTIPLECHOICE') &&
    !(newType === 'SINGLECHOICE' || newType === 'MULTIPLECHOICE')
  ) {
    confirm.require({
      message: t(
        'surveydetails.question_card.input.question_type.confirm_delete_options'
      ),
      header: t(
        'surveydetails.question_card.input.question_type.confirm_delete_options_title'
      ),
      icon: 'pi pi-exclamation-triangle',
      rejectProps: {
        label: t('utils.actions.cancel_delete'),
        severity: 'secondary',
        outlined: true,
      },
      acceptProps: {
        label: t('utils.actions.confirm_delete'),
        icon: 'pi pi-trash',
        severity: 'danger',
      },
      accept: () => {
        localQuestion.value?.questionOptions?.forEach((option) => {
          surveyDetailStore.cleanupQuestionOptionDeletion({
            id: option.id,
            followUpQuestionIDs: option.followUpQuestionIDs || undefined,
          });
        });
        if (localQuestion.value) {
          localQuestion.value = {
            ...localQuestion.value,
            questionOptions: null,
          };
        }
      },
      reject: () => {
        questionType.value = oldType as QuestionType;
      },
    });
  }
};

watch(
  () => questionType.value,
  (newType, oldType) => {
    if (newType !== oldType && newType && oldType) {
      handleTypeChange(newType as QuestionType, oldType as QuestionType);
    }
  }
);

const followUpQuestionPossible = computed(() => {
  return surveyDetailStore.isFollowUpQuestionPossible(props.questionIndex);
});

watch(
  () => surveyDetailStore.localSurvey?.questions[props.questionIndex],
  (newQuestion) => {
    if (newQuestion && !isEqual(newQuestion, localQuestion.value)) {
      localQuestion.value = cloneDeep(newQuestion);
    }
  },
  { immediate: true }
);

watch(
  () => localQuestion.value,
  (newQuestion) => {
    if (newQuestion && surveyDetailStore.localSurvey) {
      surveyDetailStore.localSurvey.questions[props.questionIndex] =
        cloneDeep(newQuestion);
    }
  },
  { deep: true }
);

const isFollowUpQuestionLocal = ref(false);

const availableConditionOptions = computed(() => {
  const options = surveyDetailStore.getPreviousQuestionOptions(
    props.questionIndex
  );
  return options.map((questionGroup) => ({
    ...questionGroup,
    question_text: formatMLString(questionGroup.question_text, locale.value),
    options: questionGroup.options.map((option) => ({
      ...option,
      text: formatMLString(option.text, locale.value),
    })),
  }));
});

const selectedConditionOptions = computed({
  get: () => {
    return surveyDetailStore.getConditionQuestionOptionIds(props.questionIndex);
  },
  set: (value: string[]) => {
    if (localQuestion.value) {
      localQuestion.value = {
        ...localQuestion.value,
        isFollowUpQuestion: value.length > 0,
      };
    }
    surveyDetailStore.setConditionQuestionOptionIds(props.questionIndex, value);
  },
});
</script>
