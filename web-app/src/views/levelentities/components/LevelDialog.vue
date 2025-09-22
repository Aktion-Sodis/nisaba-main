<template>
  <Dialog
    v-model:visible="dialogVisible"
    modal
    :header="dialogTitle"
    class="w-dialog-lg"
    :maximizable="false"
    :draggable="false"
  >
    <div v-if="localLevel != null" class="flex flex-col gap-4">
      <!-- General validation errors -->
      <div v-if="errors.general.length > 0" class="flex flex-col gap-2 mb-4">
        <Message
          v-for="(error, index) in errors.general"
          :key="index"
          severity="error"
          :closable="false"
        >
          {{ error }}
        </Message>
      </div>

      <!-- Language Selection -->
      <div class="flex flex-row justify-between items-center gap-2">
        <label for="language" class="w-[40%] text-label">
          {{ $t('level_entities.levelDialog.labels.languages') }}
        </label>
        <language-multi-selector
          v-model:value="allowedLanguageKeys"
          class="w-[60%]"
          :disabled="isViewMode"
        />
      </div>

      <!-- Name with multilanguage input -->
      <div class="flex flex-col gap-2">
        <label for="levelName" class="text-label">
          {{ $t('level_entities.levelDialog.labels.name') }}
          <span class="text-red-500">*</span>
        </label>
        <multi-language-text-field
          v-model:value="localLevel.name"
          :allowed-keys="allowedLanguageKeys"
          :n-lines="1"
          :disabled="isViewMode"
        />
        <!-- Name validation errors -->
        <div
          v-if="errors.name && errors.name.length > 0"
          class="flex flex-col gap-2"
        >
          <Message
            v-for="(error, index) in errors.name"
            :key="index"
            severity="error"
            :closable="false"
          >
            {{ error }}
          </Message>
        </div>
      </div>

      <!-- Description with multilanguage input -->
      <div class="flex flex-col gap-2">
        <label for="levelDescription" class="text-label">
          {{ $t('level_entities.levelDialog.labels.description') }}
        </label>
        <multi-language-text-field
          v-model:value="localLevel.description"
          :allowed-keys="allowedLanguageKeys"
          :n-lines="2"
          :disabled="isViewMode"
        />
      </div>

      <!-- Intervention Connections -->
      <div class="flex flex-col gap-2">
        <label for="interventionConnections" class="text-label">
          {{ $t('level_entities.levelDialog.labels.interventionConnections') }}
        </label>
        <MultiSelect
          v-model="localConnectedInterventionIds"
          :options="interventionOptions"
          option-label="name"
          option-value="id"
          display="chip"
          :placeholder="
            $t('level_entities.levelDialog.placeholders.selectInterventions')
          "
          :disabled="isViewMode"
          :show-toggle-all="false"
          :max-selected-labels="3"
          fluid
        />
      </div>

      <!-- Custom Data -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <label for="customData" class="text-label">
            {{ $t('level_entities.levelDialog.labels.customData') }}
          </label>
          <Button
            v-if="!isViewMode"
            :label="$t('level_entities.levelDialog.buttons.addCustomData')"
            icon="pi pi-plus"
            size="small"
            severity="secondary"
            @click="addCustomDataItem"
          />
        </div>

        <div
          v-if="localCustomData.length === 0"
          class="text-center py-4 text-oneliner-light-small"
        >
          {{ $t('level_entities.levelDialog.noCustomData') }}
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="(item, index) in localCustomData"
            :key="index"
            class="flex flex-col gap-3 p-3 border border-surface-200 rounded"
          >
            <!-- Custom data validation errors -->
            <div
              v-if="errors[index] && errors[index].length > 0"
              class="flex flex-col gap-2"
            >
              <Message
                v-for="(error, errorIndex) in errors[index]"
                :key="errorIndex"
                severity="error"
                :closable="false"
              >
                {{ error }}
              </Message>
            </div>

            <!-- Name field -->
            <div class="flex flex-col gap-2">
              <label class="text-label">
                {{ $t('level_entities.levelDialog.labels.customDataName') }}
              </label>
              <multi-language-text-field
                v-model:value="item.name"
                :allowed-keys="allowedLanguageKeys"
                :n-lines="1"
                :disabled="
                  isViewMode || (isEditMode && isExistingCustomDataItem(index))
                "
              />
            </div>

            <!-- Type selector and delete button row -->
            <div class="flex flex-row justify-between items-center gap-2">
              <label class="text-label w-[40%]">
                {{ $t('level_entities.levelDialog.labels.customDataType') }}
              </label>
              <div class="flex gap-2 items-center w-[60%]">
                <Select
                  v-model="item.type"
                  :options="customDataTypeOptions"
                  option-label="name"
                  option-value="value"
                  :disabled="
                    isViewMode ||
                    (isEditMode && isExistingCustomDataItem(index))
                  "
                  class="flex-1"
                />
                <Button
                  v-if="
                    !isViewMode &&
                    (!isEditMode || !isExistingCustomDataItem(index))
                  "
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  :aria-label="
                    $t('level_entities.levelDialog.buttons.removeCustomData')
                  "
                  @click="removeCustomDataItem(index)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Data Warning for Edit Mode -->
      <Message
        v-if="isEditMode && hasExistingCustomData"
        severity="info"
        :closable="false"
      >
        {{ $t('level_entities.levelDialog.warnings.customDataEdit') }}
      </Message>
    </div>

    <template #footer>
      <div class="flex justify-content-end gap-2">
        <Button
          v-if="!isViewMode"
          :label="t('level_entities.levelDialog.buttons.cancel')"
          icon="pi pi-times"
          severity="secondary"
          text
          @click="closeDialog"
        />
        <Button
          v-if="!isViewMode"
          :label="
            isCreate
              ? t('level_entities.levelDialog.buttons.save')
              : t('level_entities.levelDialog.buttons.update')
          "
          icon="pi pi-check"
          :loading="isSaving"
          :disabled="!unsavedChanges"
          severity="success"
          @click="saveLevel"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { isEqual, cloneDeep } from 'lodash';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { ref, watch, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import { useLevelEntityStore } from '../levelEntityStore';

import { Type } from '@/API';
import LanguageMultiSelector from '@/components/elements/LanguageMultiSelector.vue';
import MultiLanguageTextField from '@/components/elements/MultiLanguageTextField.vue';
import i18n from '@/i18n';
import { StoreLevel, StoreIntervention } from '@/stores/projectConfigStore';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { formatMLString } from '@/utils/formatStrings';
import { createNewLevel } from '@/utils/newObjects';
import { validateMLString } from '@/utils/validation';

const projectConfigStore = useProjectConfigStore();
const levelEntityStore = useLevelEntityStore();

// i18n
const { t, locale } = useI18n();
const toast = useToast();
const confirm = useConfirm();

// Dialog visibility
const isOpenedLocal = ref(levelEntityStore.showLevelDialog);

// Computed property with setter to handle confirmation on close
const dialogVisible = computed({
  get: () => isOpenedLocal.value,
  set: (value: boolean) => {
    if (!value) {
      // Dialog is being closed, check for confirmation
      closeDialog();
    } else {
      // Dialog is being opened
      isOpenedLocal.value = value;
    }
  },
});
watch(
  () => levelEntityStore.showLevelDialog,
  (newValue) => {
    isOpenedLocal.value = newValue;
    if (newValue) {
      initialize();
    }
  }
);
watch(
  () => isOpenedLocal.value,
  (newValue) => {
    if (!newValue) {
      clear();
    }
  }
);

// Computed properties
const isCreate = computed(() => !dbLevel.value);
const isEditMode = computed(() => levelEntityStore.isEditingLevel);
const isViewMode = computed(() => levelEntityStore.isViewingLevel);

const dialogTitle = computed(() => {
  if (isViewMode.value) {
    return t('level_entities.levelDialog.title.view');
  }
  return isCreate.value
    ? t('level_entities.levelDialog.title.create')
    : t('level_entities.levelDialog.title.edit');
});

// State
const allowedLanguageKeys = ref<Array<string>>([]);
const localLevel = ref<StoreLevel | null>(null);
const dbLevel = ref<StoreLevel | null>(null);
const localConnectedInterventionIds = ref<Array<string>>([]);
const dbConnectedInterventionIds = ref<Array<string>>([]);
const localCustomData = ref<
  Array<{ id?: string; name: any; type: Type; __typename?: string }>
>([]);
const dbCustomData = ref<
  Array<{ id?: string; name: any; type: Type; __typename?: string }>
>([]);
const isSaving = ref(false);
const errors = ref<{
  general: string[];
  name: string[];
  [key: number]: string[];
}>({
  general: [],
  name: [],
});

// Options
const interventionOptions = computed(() => {
  return projectConfigStore.interventions.map(
    (intervention: StoreIntervention) => ({
      id: intervention.id,
      name: formatMLString(intervention.name, locale.value),
    })
  );
});

const customDataTypeOptions = computed(() => [
  { name: t('level_entities.levelDialog.types.text'), value: Type.STRING },
  { name: t('level_entities.levelDialog.types.number'), value: Type.INT },
]);

// Computed for changes detection
const unsavedChanges = computed(() => {
  if (!localLevel.value) return false;

  const levelChanged = dbLevel.value
    ? !isEqual(localLevel.value, dbLevel.value)
    : true;
  const interventionsChanged = !isEqual(
    localConnectedInterventionIds.value,
    dbConnectedInterventionIds.value
  );
  const customDataChanged = !isEqual(localCustomData.value, dbCustomData.value);

  return levelChanged || interventionsChanged || customDataChanged;
});

const hasExistingCustomData = computed(() => {
  return dbCustomData.value.length > 0;
});

// Check if a custom data item is from the original data (not newly added)
const isExistingCustomDataItem = (index: number) => {
  return index < dbCustomData.value.length;
};

// Initialize dialog
const initialize = async () => {
  if (levelEntityStore.selectedLevel) {
    // Edit/View mode
    try {
      const level = levelEntityStore.selectedLevel;
      localLevel.value = cloneDeep(level);
      dbLevel.value = cloneDeep(level);

      // Initialize language keys
      allowedLanguageKeys.value = level.name.languageKeys || ['en-US'];

      // Initialize custom data
      localCustomData.value = cloneDeep(level.customData || []);
      dbCustomData.value = cloneDeep(level.customData || []);

      // Initialize intervention connections
      const existingInterventionIds =
        projectConfigStore.getInterventionIdsByLevelId(level.id);
      localConnectedInterventionIds.value = [...existingInterventionIds];
      dbConnectedInterventionIds.value = [...existingInterventionIds];
    } catch (error) {
      console.error('Error initializing level dialog:', error);
      toast.add({
        severity: 'error',
        summary: t('levelDialog.errors.initializationFailed'),
        detail: t('levelDialog.errors.initializationFailedDetail'),
        life: 3000,
      });
    }
  } else {
    // Create mode
    try {
      allowedLanguageKeys.value = ['en-US'];

      // Get parent level ID - use the last level from all available levels (sorted by hierarchy)
      // If no levels exist, create a top-level entity (parentLevelId = null)
      const allLevels = levelEntityStore.levels;
      const parentLevelId =
        allLevels.length > 0 ? allLevels[allLevels.length - 1].id : null;

      localLevel.value = createNewLevel(
        allowedLanguageKeys.value,
        parentLevelId
      );

      dbLevel.value = null;
      localConnectedInterventionIds.value = [];
      dbConnectedInterventionIds.value = [];
      localCustomData.value = [];
      dbCustomData.value = [];
    } catch (error) {
      console.error('Error creating new level:', error);
      toast.add({
        severity: 'error',
        summary: t('levelDialog.errors.creationFailed'),
        detail: t('levelDialog.errors.creationFailedDetail'),
        life: 3000,
      });
    }
  }

  errors.value = {
    general: [],
    name: [],
  };
};

// Custom data management
const addCustomDataItem = () => {
  localCustomData.value.push({
    id: `temp-${Date.now()}-${localCustomData.value.length}`,
    name: {
      languageKeys: allowedLanguageKeys.value,
      languageTexts: allowedLanguageKeys.value.map(() => ''),
      __typename: 'I18nString',
    },
    type: Type.STRING,
    __typename: 'CustomData' as const,
  });
};

const removeCustomDataItem = (index: number) => {
  localCustomData.value.splice(index, 1);
};

// Validation
const validate = (showValidationErrors: boolean = true): boolean => {
  errors.value = {
    general: [],
    name: [],
  };

  let hasValidationErrors = false;

  if (!localLevel.value) {
    hasValidationErrors = true;
    if (showValidationErrors) {
      errors.value.general.push(
        i18n.global.t('level_entities.levelDialog.validation.levelRequired')
      );
    }
    return false;
  }

  // Check if name has valid multilanguage text
  const hasValidName = validateMLString(
    localLevel.value.name,
    allowedLanguageKeys.value
  );
  if (!hasValidName) {
    hasValidationErrors = true;
    if (showValidationErrors) {
      errors.value.name.push(
        i18n.global.t('level_entities.levelDialog.validation.nameRequired')
      );
    }
  }

  // Validate each custom data item
  localCustomData.value.forEach((item, index) => {
    const customDataErrors: string[] = [];

    // In edit mode, only validate newly added custom data items (not existing ones)
    const shouldValidateItem =
      !isEditMode.value || !isExistingCustomDataItem(index);

    if (shouldValidateItem) {
      // Check custom data name
      const hasValidCustomDataName = validateMLString(
        item.name,
        allowedLanguageKeys.value
      );
      if (!hasValidCustomDataName) {
        hasValidationErrors = true;
        if (showValidationErrors) {
          customDataErrors.push(
            i18n.global.t(
              'level_entities.levelDialog.validation.customDataNameRequired',
              {
                number: index + 1,
              }
            )
          );
        }
      }
    }

    if (customDataErrors.length > 0 && showValidationErrors) {
      errors.value[index] = customDataErrors;
    }
  });

  return !hasValidationErrors;
};

// Save level
const saveLevel = async () => {
  if (isViewMode.value) return;

  if (!localLevel.value) return;

  isSaving.value = true;

  try {
    const isValidated = validate(true);
    if (!isValidated) {
      isSaving.value = false;
      return;
    }

    // Continue with save
    performSave();
  } catch (error) {
    console.error('Error saving level:', error);
    isSaving.value = false;
    toast.add({
      severity: 'error',
      summary: t('level_entities.levelDialog.errors.saveFailed'),
      detail: t('level_entities.levelDialog.errors.saveFailedDetail'),
      life: 3000,
    });
  }
};

const performSave = async () => {
  try {
    if (!localLevel.value) return;

    // Update the level with custom data
    const levelToSave = {
      ...localLevel.value,
      customData: localCustomData.value.map((item, index) => ({
        ...item,
        id: item.id || `temp-${Date.now()}-${index}`, // Generate temp ID for new items
        __typename: 'CustomData' as const,
      })),
    };

    if (isCreate.value) {
      // Create new level
      await projectConfigStore.createLevel(levelToSave);

      // Set intervention relations for the new level
      if (localConnectedInterventionIds.value.length > 0) {
        await projectConfigStore.setLevelInterventionRelations(
          levelToSave.id,
          localConnectedInterventionIds.value
        );
      }

      toast.add({
        severity: 'success',
        summary: t('level_entities.levelDialog.success.created'),
        detail: t('level_entities.levelDialog.success.createdDetail'),
        life: 3000,
      });
      clear();
      levelEntityStore.closeLevelDialog();
    } else {
      // Update existing level
      await projectConfigStore.updateLevel(levelToSave);

      // Update intervention relations
      await projectConfigStore.setLevelInterventionRelations(
        levelToSave.id,
        localConnectedInterventionIds.value
      );

      toast.add({
        severity: 'success',
        summary: t('level_entities.levelDialog.success.saved'),
        detail: t('level_entities.levelDialog.success.savedDetail'),
        life: 3000,
      });
      // Don't close dialog on update, just update the local state
      dbLevel.value = cloneDeep(levelToSave);
      dbCustomData.value = cloneDeep(localCustomData.value);
      dbConnectedInterventionIds.value = [
        ...localConnectedInterventionIds.value,
      ];
    }

    isSaving.value = false;
  } catch (error) {
    console.error('Error performing save:', error);
    isSaving.value = false;
    toast.add({
      severity: 'error',
      summary: t('level_entities.levelDialog.errors.saveFailed'),
      detail: t('level_entities.levelDialog.errors.saveFailedDetail'),
      life: 3000,
    });
  }
};

const clear = () => {
  localLevel.value = null;
  dbLevel.value = null;
  localConnectedInterventionIds.value = [];
  dbConnectedInterventionIds.value = [];
  localCustomData.value = [];
  dbCustomData.value = [];
  allowedLanguageKeys.value = [];
  errors.value = {
    general: [],
    name: [],
  };
  isSaving.value = false;
};

const closeDialog = () => {
  if (unsavedChanges.value && !isViewMode.value) {
    confirm.require({
      message: t('level_entities.levelDialog.confirm.unsaved_changes.message'),
      header: t('level_entities.levelDialog.confirm.unsaved_changes.title'),
      icon: 'pi pi-exclamation-triangle',
      acceptProps: {
        label: t('level_entities.levelDialog.confirm.unsaved_changes.accept'),
        icon: 'pi pi-times',
        severity: 'danger',
      },
      rejectProps: {
        label: t('level_entities.levelDialog.confirm.unsaved_changes.reject'),
        severity: 'secondary',
        outlined: true,
      },
      accept: () => {
        clear();
        levelEntityStore.closeLevelDialog();
      },
      reject: () => {
        // Keep dialog open - reset isOpenedLocal to true
        isOpenedLocal.value = true;
      },
    });
  } else {
    clear();
    levelEntityStore.closeLevelDialog();
  }
};

// Initialize on mount
onMounted(() => {
  if (levelEntityStore.showLevelDialog) {
    initialize();
  }
});
</script>
