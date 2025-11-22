<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :header="modalTitle"
    class="w-dialog-lg"
    :maximizable="true"
    :draggable="false"
    @update:visible="onClose"
  >
    <div
      v-if="executedSurvey"
      class="flex flex-col gap-4 max-h-[70vh] overflow-auto"
    >
      <!-- Entity Name -->
      <div class="flex flex-row justify-between items-center gap-2">
        <label class="w-[40%] text-label">
          {{ $t('analytics_executed_survey_overview.details.entity_name') }}
        </label>
        <div class="w-[55%] text-body">
          {{ getEntityName(executedSurvey) }}
        </div>
      </div>

      <!-- Date -->
      <div class="flex flex-row justify-between items-center gap-2">
        <label class="w-[40%] text-label">
          {{ $t('analytics_executed_survey_overview.details.date') }}
        </label>
        <div class="w-[55%] text-body">
          {{ formatDate(executedSurvey.date) }}
        </div>
      </div>

      <!-- Executor -->
      <div class="flex flex-row justify-between items-center gap-2">
        <label class="w-[40%] text-label">
          {{ $t('analytics_executed_survey_overview.details.executor') }}
        </label>
        <div class="w-[55%] text-body">
          {{ getExecutorName(executedSurvey) }}
        </div>
      </div>

      <Divider />

      <!-- Questions and Answers -->
      <div
        v-for="question in executedSurvey.survey.questions"
        :key="question.id"
        class="flex flex-col gap-2"
      >
        <div class="flex flex-row justify-between items-start gap-2">
          <label class="w-[40%] text-label">
            {{ getQuestionText(question, executedSurvey) }}
          </label>
          <div class="w-[55%] text-body">
            <template
              v-if="getAnswerType(question, executedSurvey) === 'AUDIO'"
            >
              <div
                v-if="
                  getFileExists(executedSurvey.id, question.id, 'AUDIO') ===
                  true
                "
              >
                <audio-player
                  :file-path="
                    deriveS3Path('questionAudioAnswerPath', {
                      executedSurveyID: executedSurvey.id,
                      questionID: question.id,
                    })
                  "
                />
              </div>
              <span
                v-else-if="
                  getFileExists(executedSurvey.id, question.id, 'AUDIO') ===
                  false
                "
                class="text-oneliner-light-small italic"
              >
                {{ $t('analytics_aggregated.audio_responses.file_not_found') }}
              </span>
              <div v-else class="flex items-center gap-2">
                <i class="pi pi-spin pi-spinner text-sm"></i>
                <span class="text-oneliner-light-small">Checking...</span>
              </div>
            </template>
            <template
              v-else-if="getAnswerType(question, executedSurvey) === 'PICTURE'"
            >
              <div
                v-if="
                  getFileExists(executedSurvey.id, question.id, 'PICTURE') ===
                  true
                "
              >
                <image-thumbnail
                  :file-path="
                    deriveS3Path('questionPicAnswerPath', {
                      executedSurveyID: executedSurvey.id,
                      questionID: question.id,
                    })
                  "
                />
              </div>
              <span
                v-else-if="
                  getFileExists(executedSurvey.id, question.id, 'PICTURE') ===
                  false
                "
                class="text-oneliner-light-small italic"
              >
                {{ $t('analytics_aggregated.image_responses.file_not_found') }}
              </span>
              <div v-else class="flex items-center gap-2">
                <i class="pi pi-spin pi-spinner text-sm"></i>
                <span class="text-oneliner-light-small">Checking...</span>
              </div>
            </template>
            <template v-else>
              {{ formatAnswer(question, executedSurvey) }}
            </template>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { list } from '@aws-amplify/storage';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { QuestionAnswer } from '@/API';
import { useAnalyticsStore } from '@/stores/analytics';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { useDateFormat } from '@/utils/dateFormat';
import { formatMLString } from '@/utils/formatStrings';
import { deriveS3Path } from '@/utils/s3Paths';
import AudioPlayer from '@/views/analyticsaggregated/components/AudioPlayer.vue';
import ImageThumbnail from '@/views/analyticsaggregated/components/ImageThumbnail.vue';

const { locale, t } = useI18n();
const analyticsStore = useAnalyticsStore();
const projectConfigStore = useProjectConfigStore();
const { formatDate } = useDateFormat();

// File existence cache
const fileExistsCache = ref<Map<string, boolean>>(new Map());
const fileExistsMap = ref<Record<string, boolean | undefined>>({});

const isVisible = computed(
  () => analyticsStore.selectedExecutedSurvey !== null
);

const executedSurvey = computed(() => {
  if (!analyticsStore.selectedExecutedSurvey) return null;
  return analyticsStore.executedSurveysData.find(
    (s) => s.id === analyticsStore.selectedExecutedSurvey
  );
});

const modalTitle = computed(() => {
  if (!executedSurvey.value?.survey?.name) return '';
  return formatMLString(executedSurvey.value.survey.name as any, locale.value);
});

const getEntityName = (survey: any): string => {
  const entityId = survey.appliedIntervention?.entityAppliedInterventionsId;
  if (!entityId) return '-';

  const entity = analyticsStore.availableEntities.find(
    (e) => e.id === entityId
  );
  if (!entity) return '-';

  return formatMLString(entity.name as any, locale.value) || '-';
};

const getExecutorName = (survey: any): string => {
  if (!survey.whoExecutedIt) return '-';

  const firstName = survey.whoExecutedIt.firstName || '';
  const lastName = survey.whoExecutedIt.lastName || '';
  const name = `${firstName} ${lastName}`.trim();

  return name || survey.whoExecutedIt.id || '-';
};

const getQuestionText = (question: any, survey: any): string => {
  // First try to get text from question itself (if available from getExecutedSurvey query)
  if (question.text) {
    return formatMLString(question.text as any, locale.value);
  }

  // If not available, try to get from the survey in project config store
  const surveyId = survey.surveyID || survey.survey?.id;
  if (surveyId) {
    const fullSurvey = projectConfigStore.surveys.find(
      (s) => s.id === surveyId
    );
    if (fullSurvey) {
      const fullQuestion = fullSurvey.questions?.find(
        (q: any) => q.id === question.id
      );
      if (fullQuestion?.text) {
        return formatMLString(fullQuestion.text as any, locale.value);
      }
    }
  }

  // Fallback to question ID if no text found
  return question.id || '-';
};

const findAnswer = (questionId: string, survey: any): QuestionAnswer | null => {
  return (
    survey.answers.find((answer: any) => answer.questionID === questionId) ||
    null
  );
};

const getAnswerType = (question: any, survey: any): string | null => {
  const answer = findAnswer(question.id, survey);
  if (!answer) return null;
  return answer.type || question.type || null;
};

const formatAnswer = (question: any, survey: any): string => {
  const answer = findAnswer(question.id, survey);

  if (!answer) {
    return t('analytics_executed_survey_overview.details.no_answer');
  }

  const answerType = answer.type || question.type;

  switch (answerType) {
    case 'TEXT':
      return answer.text || '-';

    case 'INT':
      return answer.intValue?.toString() || '-';

    case 'DOUBLE':
      return answer.doubleValue?.toString() || '-';

    case 'RATING':
      return answer.rating?.toString() || '-';

    case 'SINGLECHOICE':
    case 'MULTIPLECHOICE': {
      if (!answer.questionOptions || answer.questionOptions.length === 0) {
        return '-';
      }

      // Try to get option texts from multiple sources
      const optionTexts = answer.questionOptions
        .map((answerOption: any) => {
          // First try to get text from answerOption itself (if available from getExecutedSurvey query)
          if (answerOption.text) {
            return formatMLString(answerOption.text, locale.value);
          }

          // Try to match to question's questionOptions from executed survey
          const questionOption = question.questionOptions?.find(
            (qo: any) => qo.id === answerOption.id
          );
          if (questionOption?.text) {
            return formatMLString(questionOption.text, locale.value);
          }

          // Finally, try to get from the survey in project config store
          const surveyId = survey.surveyID || survey.survey?.id;
          if (surveyId) {
            const fullSurvey = projectConfigStore.surveys.find(
              (s) => s.id === surveyId
            );
            if (fullSurvey) {
              const fullQuestion = fullSurvey.questions?.find(
                (q: any) => q.id === question.id
              );
              const fullQuestionOption = fullQuestion?.questionOptions?.find(
                (qo: any) => qo.id === answerOption.id
              );
              if (fullQuestionOption?.text) {
                return formatMLString(fullQuestionOption.text, locale.value);
              }
            }
          }

          // If none have text, just return the ID
          return answerOption.id || null;
        })
        .filter((text: string | null) => text !== null);

      return optionTexts.length > 0 ? optionTexts.join('; ') : '-';
    }

    case 'AUDIO':
    case 'PICTURE':
      // These are handled in template with components
      return '-';

    default:
      return '-';
  }
};

const checkFileExists = async (filePath: string): Promise<boolean> => {
  // Return cached result if available
  if (fileExistsCache.value.has(filePath)) {
    return fileExistsCache.value.get(filePath)!;
  }

  try {
    const result = await list({ path: filePath });
    const exists = result.items.length > 0;
    // Cache the result
    fileExistsCache.value.set(filePath, exists);
    return exists;
  } catch (error) {
    // Cache false result on error
    fileExistsCache.value.set(filePath, false);
    return false;
  }
};

const getFileExists = (
  executedSurveyId: string,
  questionId: string,
  type: 'AUDIO' | 'PICTURE'
): boolean | undefined => {
  const cacheKey = `${executedSurveyId}-${questionId}-${type}`;
  return fileExistsMap.value[cacheKey];
};

const checkAllFiles = async () => {
  const survey = executedSurvey.value;
  if (!survey) return;

  const fileChecks: Promise<void>[] = [];

  survey.survey.questions.forEach((question: any) => {
    const answer = findAnswer(question.id, survey);
    if (!answer) return;

    const answerType = answer.type || question.type;
    if (answerType === 'AUDIO' || answerType === 'PICTURE') {
      const pathKey =
        answerType === 'AUDIO'
          ? 'questionAudioAnswerPath'
          : 'questionPicAnswerPath';
      const filePath = deriveS3Path(pathKey, {
        executedSurveyID: survey.id,
        questionID: question.id,
      });
      const cacheKey = `${survey.id}-${question.id}-${answerType}`;

      if (fileExistsMap.value[cacheKey] === undefined) {
        fileExistsMap.value[cacheKey] = undefined; // Mark as checking
        fileChecks.push(
          checkFileExists(filePath).then((exists) => {
            fileExistsMap.value[cacheKey] = exists;
          })
        );
      }
    }
  });

  await Promise.all(fileChecks);
};

watch(
  () => analyticsStore.selectedExecutedSurvey,
  (newId, oldId) => {
    // Only check files if the ID actually changed and is not null
    if (newId && newId !== oldId) {
      checkAllFiles();
    }
  }
);

onMounted(() => {
  if (executedSurvey.value) {
    checkAllFiles();
  }
});

const onClose = () => {
  analyticsStore.selectExecutedSurvey(null);
};
</script>
