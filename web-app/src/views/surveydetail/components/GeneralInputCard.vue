<template>
  <Card v-if="surveyDetailStore.localSurvey">
    <template #title>
      {{
        surveyDetailStore.isCreate
          ? $t('surveydetails.general_card.title.create')
          : $t('surveydetails.general_card.title.edit')
      }}
    </template>
    <template #content>
      <div class="flex flex-row gap-8">
        <div class="flex flex-col gap-8 flex-1">
          <div class="flex flex-row justify-between items-center gap-2">
            <label for="name" class="w-[40%]">
              {{ $t('surveydetails.general_card.input.name.label') }}
            </label>
            <multi-language-text-field
              v-model:value="surveyDetailStore.localSurvey!.name"
              :allowed-keys="surveyDetailStore.allowedLanguageKeys"
              class="w-[60%]"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="description">
              {{ $t('surveydetails.general_card.input.description.label') }}
            </label>
            <multi-language-text-field
              v-model:value="surveyDetailStore.localSurvey!.description"
              :allowed-keys="surveyDetailStore.allowedLanguageKeys"
              :n-lines="3"
            />
          </div>
        </div>
        <Divider layout="vertical" />
        <div class="flex flex-col gap-8 flex-1">
          <div class="flex flex-col gap-4">
            <div class="flex flex-row justify-between items-center gap-2">
              <label for="language" class="w-[40%]">
                {{
                  $t('surveydetails.general_card.input.select_language.label')
                }}
              </label>
              <language-multi-selector
                v-model:value="surveyDetailStore.allowedLanguageKeys"
                class="w-[60%]"
              />
            </div>
            <div class="flex flex-row justify-between items-center gap-2">
              <label for="intervention" class="w-[40%]">
                {{ $t('surveydetails.general_card.input.intervention.label') }}
              </label>
              <Select
                v-model="surveyDetailStore.localSurvey!.interventionSurveysId"
                :options="formattedInterventions"
                option-label="formattedName"
                option-value="id"
                class="w-[60%]"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="image">
              {{ $t('surveydetails.general_card.input.image.label') }}
            </label>
            <custom-image-upload
              :path="
                deriveS3Path('surveyPicPath', {
                  surveyID: surveyDetailStore.localSurvey!.id,
                })
              "
              :editable="true"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSurveyDetailStore } from '../surveyDetailStore';

import CustomImageUpload from '@/components/elements/CustomImageUpload.vue';
import LanguageMultiSelector from '@/components/elements/LanguageMultiSelector.vue';
import MultiLanguageTextField from '@/components/elements/MultiLanguageTextField.vue';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { formatMLString } from '@/utils/formatStrings';
import { deriveS3Path } from '@/utils/s3Paths';

const surveyDetailStore = useSurveyDetailStore();
const projectConfigStore = useProjectConfigStore();
const { locale } = useI18n();

const formattedInterventions = computed(() => {
  return projectConfigStore.interventions.map((intervention) => ({
    ...intervention,
    formattedName: formatMLString(intervention.name, locale.value),
  }));
});
</script>
