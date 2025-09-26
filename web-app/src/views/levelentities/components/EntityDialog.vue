<template>
  <Dialog
    v-model:visible="dialogVisible"
    modal
    :header="dialogTitle"
    class="w-dialog-lg"
    :maximizable="false"
    :draggable="false"
  >
    <div v-if="localEntity != null" class="flex flex-col gap-4">
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
          {{ $t('level_entities.entityDialog.labels.languages') }}
        </label>
        <language-multi-selector
          v-model:value="allowedLanguageKeys"
          class="w-[60%]"
          :disabled="isViewMode"
        />
      </div>

      <!-- Name with multilanguage input -->
      <div class="flex flex-col gap-2">
        <label for="entityName" class="text-label">
          {{ $t('level_entities.entityDialog.labels.name') }}
          <span class="text-red-500">*</span>
        </label>
        <multi-language-text-field
          v-model:value="localEntity.name"
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
        <label for="entityDescription" class="text-label">
          {{ $t('level_entities.entityDialog.labels.description') }}
        </label>
        <multi-language-text-field
          v-model:value="localEntity.description"
          :allowed-keys="allowedLanguageKeys"
          :n-lines="2"
          :disabled="isViewMode"
        />
      </div>

      <!-- Level Display (read-only, determined by column) -->
      <div class="flex flex-row justify-between items-center gap-2">
        <label for="level" class="w-[40%] text-label">
          {{ $t('level_entities.entityDialog.labels.level') }}
        </label>
        <div class="p-inputtext p-component p-filled w-[60%] text-right">
          {{ selectedLevelName }}
        </div>
      </div>

      <!-- Parent Entity Selection (not for top level) -->
      <div
        v-if="!isTopLevel"
        class="flex flex-row justify-between items-center gap-2"
      >
        <label for="parentEntity" class="w-[40%] text-label">
          {{ $t('level_entities.entityDialog.labels.parentEntity') }}
          <span class="text-red-500">*</span>
        </label>
        <Select
          v-model="selectedParentEntity"
          :options="availableParentEntities"
          option-label="formattedName"
          option-value="id"
          :placeholder="
            $t('level_entities.entityDialog.placeholders.selectParentEntity')
          "
          :disabled="isViewMode || availableParentEntities.length === 0"
          class="w-[60%]"
        />
        <!-- Parent entity validation errors -->
        <div
          v-if="errors.parentEntity && errors.parentEntity.length > 0"
          class="flex flex-col gap-2"
        >
          <Message
            v-for="(error, index) in errors.parentEntity"
            :key="index"
            severity="error"
            :closable="false"
          >
            {{ error }}
          </Message>
        </div>
      </div>

      <!-- Location (view mode only) -->
      <div
        v-if="isViewMode && localEntity.location"
        class="flex flex-col gap-2"
      >
        <label class="text-label">
          {{ $t('level_entities.entityDialog.labels.location') }}
        </label>
        <div class="p-3 border border-surface-200 rounded bg-surface-50">
          <div class="flex flex-col gap-2">
            <div v-if="localEntity.location.latitude" class="text-sm">
              <strong>
                {{ $t('level_entities.entityDialog.labels.latitude') }}:
              </strong>
              {{ localEntity.location.latitude }}
            </div>
            <div v-if="localEntity.location.longitude" class="text-sm">
              <strong>
                {{ $t('level_entities.entityDialog.labels.longitude') }}:
              </strong>
              {{ localEntity.location.longitude }}
            </div>
            <!-- Address field not available in Location type -->
          </div>
        </div>
      </div>

      <!-- Custom Data -->
      <div
        v-for="(item, index) in localCustomData"
        :key="index"
        class="flex flex-row justify-between items-center gap-2"
      >
        <label class="w-[40%]">
          {{ formatMLString(item.name, locale) }}
        </label>
        <div class="w-[60%] flex gap-2 items-center">
          <InputText
            v-if="item.type === Type.STRING"
            v-model="item.stringValue"
            :disabled="isViewMode"
            fluid
          />
          <InputNumber
            v-else-if="item.type === Type.INT"
            v-model="item.intValue"
            :disabled="isViewMode"
            fluid
          />
          <InputText
            :model-value="item.type === Type.STRING ? 'A' : '#'"
            :disabled="true"
            class="w-10 text-center"
          />
        </div>
      </div>

      <!-- Entity Image -->
      <div class="flex flex-col gap-2">
        <label for="image" class="text-label">
          {{ $t('level_entities.entityDialog.labels.image') }}
        </label>
        <custom-image-upload :path="imagePath" :editable="!isViewMode" />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-content-end gap-2">
        <Button
          v-if="!isViewMode"
          :label="t('level_entities.entityDialog.buttons.cancel')"
          icon="pi pi-times"
          severity="secondary"
          text
          @click="closeDialog"
        />
        <Button
          v-if="!isViewMode"
          :label="
            isCreate
              ? t('level_entities.entityDialog.buttons.save')
              : t('level_entities.entityDialog.buttons.update')
          "
          icon="pi pi-check"
          :loading="isSaving"
          :disabled="!unsavedChanges"
          severity="success"
          @click="saveEntity"
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
import CustomImageUpload from '@/components/elements/CustomImageUpload.vue';
import LanguageMultiSelector from '@/components/elements/LanguageMultiSelector.vue';
import MultiLanguageTextField from '@/components/elements/MultiLanguageTextField.vue';
import i18n from '@/i18n';
import { StoreEntity } from '@/stores/projectConfigStore';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { formatMLString } from '@/utils/formatStrings';
import { createNewEntity } from '@/utils/newObjects';
import { deriveS3Path } from '@/utils/s3Paths';
import { validateMLString } from '@/utils/validation';

const projectConfigStore = useProjectConfigStore();
const levelEntityStore = useLevelEntityStore();

// i18n
const { t, locale } = useI18n();
const toast = useToast();
const confirm = useConfirm();

// Dialog visibility
const isOpenedLocal = ref(levelEntityStore.showEntityDialog);

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
  () => levelEntityStore.showEntityDialog,
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
const isCreate = computed(() => !dbEntity.value);
const isViewMode = computed(() => false); // TODO: Add isViewingEntity to store

const dialogTitle = computed(() => {
  if (isViewMode.value) {
    return t('level_entities.entityDialog.title.view');
  }
  return isCreate.value
    ? t('level_entities.entityDialog.title.create')
    : t('level_entities.entityDialog.title.edit');
});

// State
const allowedLanguageKeys = ref<Array<string>>([]);
const localEntity = ref<StoreEntity | null>(null);
const dbEntity = ref<StoreEntity | null>(null);
const localCustomData = ref<
  Array<{
    customDataID?: string;
    name: any;
    type: Type;
    intValue?: number | null;
    stringValue?: string | null;
    __typename?: string;
  }>
>([]);
const dbCustomData = ref<
  Array<{
    customDataID?: string;
    name: any;
    type: Type;
    intValue?: number | null;
    stringValue?: string | null;
    __typename?: string;
  }>
>([]);
const isSaving = ref(false);
const errors = ref<{
  general: string[];
  name: string[];
  parentEntity: string[];
  [key: number]: string[];
}>({
  general: [],
  name: [],
  parentEntity: [],
});

// Computed properties
const selectedLevelName = computed(() => {
  if (!localEntity.value?.entityLevelId) return '';
  const level = projectConfigStore.getLevelById(
    localEntity.value.entityLevelId
  );
  return level ? formatMLString(level.name, locale.value) : '';
});

const isTopLevel = computed(() => {
  if (!localEntity.value?.entityLevelId) return true;
  const level = projectConfigStore.getLevelById(
    localEntity.value.entityLevelId
  );
  return level ? !level.parentLevelID : true;
});

const availableParentEntities = computed(() => {
  // Get entities from the parent level (one level up from current entity's level)
  const currentLevelId = localEntity.value?.entityLevelId;
  if (!currentLevelId) {
    return [];
  }

  const currentLevel = projectConfigStore.getLevelById(currentLevelId);
  if (!currentLevel?.parentLevelID) {
    return []; // No parent level means no parent entities
  }

  const parentEntities = projectConfigStore.entities
    .filter((entity) => entity.entityLevelId === currentLevel.parentLevelID)
    .map((entity) => ({
      id: entity.id,
      formattedName: formatMLString(entity.name, locale.value),
    }));

  return parentEntities;
});

// Computed property for parent entity selection
const selectedParentEntity = computed({
  get: () => {
    return localEntity.value?.parentEntityID || null;
  },
  set: (value: string | null) => {
    if (localEntity.value) {
      localEntity.value.parentEntityID = value;
    }
  },
});

// Custom data types are inherited from level, no options needed

// Computed for changes detection
const unsavedChanges = computed(() => {
  if (!localEntity.value) return false;

  const entityChanged = dbEntity.value
    ? !isEqual(localEntity.value, dbEntity.value)
    : true;
  const customDataChanged = !isEqual(localCustomData.value, dbCustomData.value);

  return entityChanged || customDataChanged;
});

// Custom data is inherited from level, no need to check if existing

// Initialize dialog
const initialize = async () => {
  if (levelEntityStore.selectedEntity) {
    // Edit/View mode
    try {
      const entity = levelEntityStore.selectedEntity;
      localEntity.value = cloneDeep(entity);
      dbEntity.value = cloneDeep(entity);

      // Initialize language keys
      allowedLanguageKeys.value = entity.name.languageKeys || ['en-US'];

      // Initialize custom data
      localCustomData.value = cloneDeep(
        entity.customData?.filter((item) => item !== null) || []
      );
      dbCustomData.value = cloneDeep(
        entity.customData?.filter((item) => item !== null) || []
      );
    } catch (error) {
      console.error('Error initializing entity dialog:', error);
      toast.add({
        severity: 'error',
        summary: t('level_entities.entityDialog.errors.initializationFailed'),
        detail: t(
          'level_entities.entityDialog.errors.initializationFailedDetail'
        ),
        life: 3000,
      });
    }
  } else {
    // Create mode
    try {
      allowedLanguageKeys.value = [locale.value];

      // Get level ID from the store (set when opening the dialog from a column)
      const selectedLevelId = levelEntityStore.selectedLevel?.id;

      if (!selectedLevelId) {
        throw new Error('No level selected for entity creation');
      }

      // Get the level to access its custom data schema
      const selectedLevel = projectConfigStore.getLevelById(selectedLevelId);
      const levelCustomData = selectedLevel?.customData || [];

      // Get parent entity ID from the selection path (selected entity from the level above)
      // If we're creating an entity for level 2, we want the selected entity from level 1
      const currentLevelIndex =
        projectConfigStore.levelsSortedByHierarchy.findIndex(
          (level) => level.id === selectedLevelId
        );

      const parentLevelIndex =
        currentLevelIndex > 0 ? currentLevelIndex - 1 : null;

      const parentEntityId =
        parentLevelIndex !== null
          ? levelEntityStore.selectedPath[parentLevelIndex].entityId
          : null;

      localEntity.value = createNewEntity(
        allowedLanguageKeys.value,
        selectedLevelId,
        parentEntityId,
        levelCustomData
      );

      dbEntity.value = null;
      localCustomData.value = cloneDeep(
        localEntity.value.customData?.filter((item) => item !== null) || []
      );
      dbCustomData.value = [];
    } catch (error) {
      console.error('Error creating new entity:', error);
      toast.add({
        severity: 'error',
        summary: t('level_entities.entityDialog.errors.creationFailed'),
        detail: t('level_entities.entityDialog.errors.creationFailedDetail'),
        life: 3000,
      });
    }
  }

  errors.value = {
    general: [],
    name: [],
    parentEntity: [],
  };
};

// Custom data is inherited from level, no management functions needed

// Validation
const validate = (showValidationErrors: boolean = true): boolean => {
  errors.value = {
    general: [],
    name: [],
    parentEntity: [],
  };

  let hasValidationErrors = false;

  if (!localEntity.value) {
    hasValidationErrors = true;
    if (showValidationErrors) {
      errors.value.general.push(
        i18n.global.t('level_entities.entityDialog.validation.entityRequired')
      );
    }
    return false;
  }

  // Check if name has valid multilanguage text
  const hasValidName = validateMLString(
    localEntity.value.name,
    allowedLanguageKeys.value
  );
  if (!hasValidName) {
    hasValidationErrors = true;
    if (showValidationErrors) {
      errors.value.name.push(
        i18n.global.t('level_entities.entityDialog.validation.nameRequired')
      );
    }
  }

  // Check if parent entity is required (not for top level)
  if (!isTopLevel.value && !localEntity.value.parentEntityID) {
    hasValidationErrors = true;
    if (showValidationErrors) {
      errors.value.parentEntity.push(
        i18n.global.t(
          'level_entities.entityDialog.validation.parentEntityRequired'
        )
      );
    }
  }

  // Custom data values are inherited from level, no validation needed

  return !hasValidationErrors;
};

// Save entity
const saveEntity = async () => {
  if (isViewMode.value) return;

  if (!localEntity.value) return;

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
    console.error('Error saving entity:', error);
    isSaving.value = false;
    toast.add({
      severity: 'error',
      summary: t('level_entities.entityDialog.errors.saveFailed'),
      detail: t('level_entities.entityDialog.errors.saveFailedDetail'),
      life: 3000,
    });
  }
};

const performSave = async () => {
  try {
    if (!localEntity.value) return;

    // Update the entity with custom data
    const entityToSave = {
      ...localEntity.value,
      customData: localCustomData.value.map((item, index) => ({
        ...item,
        customDataID: item.customDataID || `temp-${Date.now()}-${index}`, // Generate temp ID for new items
      })),
    };

    if (isCreate.value) {
      // Create new entity
      //@ts-expect-error /db autogeneration
      await projectConfigStore.createEntity(entityToSave);

      toast.add({
        severity: 'success',
        summary: t('level_entities.entityDialog.success.created'),
        detail: t('level_entities.entityDialog.success.createdDetail'),
        life: 3000,
      });
      clear();
      levelEntityStore.closeEntityDialog();
    } else {
      // Update existing entity
      //@ts-expect-error /db autogeneration
      await projectConfigStore.updateEntity(entityToSave);

      toast.add({
        severity: 'success',
        summary: t('level_entities.entityDialog.success.saved'),
        detail: t('level_entities.entityDialog.success.savedDetail'),
        life: 3000,
      });
      // Don't close dialog on update, just update the local state
      //@ts-expect-error /db autogeneration
      dbEntity.value = cloneDeep(entityToSave);
      dbCustomData.value = cloneDeep(localCustomData.value);
    }

    isSaving.value = false;
  } catch (error) {
    console.error('Error performing save:', error);
    isSaving.value = false;
    toast.add({
      severity: 'error',
      summary: t('level_entities.entityDialog.errors.saveFailed'),
      detail: t('level_entities.entityDialog.errors.saveFailedDetail'),
      life: 3000,
    });
  }
};

const clear = () => {
  localEntity.value = null;
  dbEntity.value = null;
  localCustomData.value = [];
  dbCustomData.value = [];
  allowedLanguageKeys.value = [];
  errors.value = {
    general: [],
    name: [],
    parentEntity: [],
  };
  isSaving.value = false;
};

const closeDialog = () => {
  if (unsavedChanges.value && !isViewMode.value) {
    confirm.require({
      message: t('level_entities.entityDialog.confirm.unsaved_changes.message'),
      header: t('level_entities.entityDialog.confirm.unsaved_changes.title'),
      icon: 'pi pi-exclamation-triangle',
      acceptProps: {
        label: t('level_entities.entityDialog.confirm.unsaved_changes.accept'),
        icon: 'pi pi-times',
        severity: 'danger',
      },
      rejectProps: {
        label: t('level_entities.entityDialog.confirm.unsaved_changes.reject'),
        severity: 'secondary',
        outlined: true,
      },
      accept: () => {
        clear();
        levelEntityStore.closeEntityDialog();
      },
      reject: () => {
        // Keep dialog open - reset isOpenedLocal to true
        isOpenedLocal.value = true;
      },
    });
  } else {
    clear();
    levelEntityStore.closeEntityDialog();
  }
};

// Image path
const imagePath = computed(() => {
  if (!localEntity.value?.id) return '';

  return deriveS3Path('entityPicPath', {
    entityID: localEntity.value.id,
  });
});

// Initialize on mount
onMounted(() => {
  if (levelEntityStore.showEntityDialog) {
    initialize();
  }
});
</script>
