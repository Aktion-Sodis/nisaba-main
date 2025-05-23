<template>
  <Dialog
    v-model:visible="isOpenedLocal"
    modal
    :header="dialogTitle"
    class="w-dialog-lg"
    :maximizable="true"
  >
    <div v-if="localIntervention!=null" class="flex flex-col gap-4">
      <!-- Sprachauswahl für die Intervention -->
      <div class="flex flex-row justify-between items-center gap-2">
        <label for="language" class="w-[40%]">
          {{ $t('interventiondialog.labels.languages') }}
        </label>
        <LanguageMultiSelector
          v-model:value="allowedLanguageKeys"
          class="w-[60%]"
        />
      </div>

      <!-- Name mit mehrsprachiger Eingabe -->
      <div class="flex flex-col gap-2">
        <label for="interventionName">
          {{ $t('interventiondialog.labels.name') }}
        </label>
        <MultiLanguageTextField
          v-model:value="localIntervention.name"
          :allowed-keys="allowedLanguageKeys"
          :n-lines="1"
        />
      </div>

      <!-- Intervention Description mit mehrsprachiger Eingabe -->
      <div class="flex flex-col gap-2">
        <label for="interventionDescription">
          {{ t('interventiondialog.labels.description') }}
        </label>
        <MultiLanguageTextField
          v-model:value="localIntervention.description"
          :allowed-keys="allowedLanguageKeys"
          :n-lines="2"
        />
      </div>

        <!-- Level zuordnung -->
        <div class="flex flex-row justify-between items-center gap-2">
          <label for="levels" class="w-[40%]">
            {{ t('interventiondialog.labels.levels') }}
          </label>
          <MultiSelect
            v-model="localConnectedLevelIds"
            :options="availableLevels"
            option-label="formattedName"
            option-value="id"
            display="chip"
            :filter="true"
            class="w-[60%]"
          />
        </div>

        <!-- Intervention Type -->
        <div class="flex flex-row justify-between items-center gap-2">
          <label for="interventionType">
            {{ t('interventiondialog.labels.type') }}
          </label>
            <SelectButton
              v-model="localIntervention.interventionType"
              :options="interventionTypes"
              optionLabel="name"
              optionValue="value"
              aria-labelledby="interventionType"
              :allow-empty="false"
            />
        </div>

        <!-- Intervention Image -->
        <div class="flex flex-col gap-2">
          <label for="image">
            {{ t('interventiondialog.labels.image') }}
          </label>
          <custom-image-upload
            :path="
            deriveS3Path('interventionPicPath', {
              interventionID: localIntervention.id
            })
            "
            :editable="true"
          />
        </div>
    </div>

    <template #footer>
      <div class="flex justify-content-end gap-2">
        <Button
          :label="t('interventiondialog.buttons.cancel')"
          icon="pi pi-times"
          class="p-button-text p-button-danger"
          @click="() => { emit('update:isOpened', false); clear(); }"
        />
        <Button
          :label="t('interventiondialog.buttons.save')"
          icon="pi pi-check"
          @click="saveInterventionAndConnections"
          :loading="isSaving"
          class="p-button-primary"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import MultiLanguageTextField from '@/components/elements/MultiLanguageTextField.vue';
import LanguageMultiSelector from '@/components/elements/LanguageMultiSelector.vue';
import { isEqual, cloneDeep } from 'lodash';
import { StoreIntervention } from '@/stores/projectConfigStore';
import { deriveS3Path } from '@/utils/s3Paths';
import CustomImageUpload from '@/components/elements/CustomImageUpload.vue';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { formatMLString } from '@/utils/formatStrings';
import { useToast } from 'primevue/usetoast';
import { createNewIntervention } from '@/utils/newObjects';

const projectConfigStore = useProjectConfigStore();

// Props
const props = defineProps({
  isOpened: Boolean,
  interventionId: {
    type: String,
    default: null,
  },
});

// Emits
const emit = defineEmits(['update:isOpened', 'saved']);

// i18n
const { t, locale } = useI18n(); // Destructure locale here
const toast = useToast();

// Dialog Sichtbarkeit
const isOpenedLocal = ref(props.isOpened);
watch(
  () => props.isOpened,
  (newValue) => {
    isOpenedLocal.value = newValue;
    if (newValue) {
      initialize(); // Call initialize when the dialog is opened
    }
  }
);
watch(
  () => isOpenedLocal.value,
  (newValue) => {
    emit('update:isOpened', newValue);
    if (!newValue) {
      clear();
    }
  }
)
// Mögliche Interventionstypen
const interventionTypes = computed(() => [
  { name: t('interventiondialog.types.technology'), value: 'technology' },
  { name: t('interventiondialog.types.education'), value: 'education' },
]);

// Computed Properties
const isCreate = computed(() => !dbIntervention.value);
const dialogTitle = computed(() =>
  isCreate.value ? t('interventiondialog.title.create'):t('interventiondialog.title.edit')
);

//state
const allowedLanguageKeys = ref<Array<string>>([]);


const localIntervention = ref<StoreIntervention | null>(null);
const dbIntervention = ref<StoreIntervention | null>(null);

const localConnectedLevelIds = ref<Array<string> | null>(null);
const dbConnectedLevelIds = ref<Array<string>| null>(null);

const isEditMode = ref(false);

const isInitializing = ref(false);
const initialize = async () => {
  isInitializing.value = true;
    //set language key array initial selection
allowedLanguageKeys.value = [locale.value];
    
    if (props.interventionId) {
      try {
        //get from store dbIntervention and dbInterventionLevelConnections
      const intervention = projectConfigStore.getInterventionById(props.interventionId);
      if (intervention) {
        dbIntervention.value = cloneDeep(intervention);
        localIntervention.value = cloneDeep(intervention);
        
        // Wenn die Intervention eigene Sprachschlüssel hat, diese verwenden
        if (intervention.name && intervention.name.languageKeys && intervention.name.languageKeys.length > 0) {
          allowedLanguageKeys.value = [...intervention.name.languageKeys];
        }
        
        // Lade die Level-Verbindungen für diese Intervention
        const levelConnections = projectConfigStore.getLevelIdsByInterventionId(props.interventionId);
        localConnectedLevelIds.value = cloneDeep(levelConnections);
        dbConnectedLevelIds.value = cloneDeep(levelConnections);
        
      } else {
        throw new Error('Intervention not found');
      }
      } catch (error) {
        isOpenedLocal.value = false;
        toast.add({
          severity: 'error',
          summary: t('interventiondialog.toast.intervention_not_found.title'),
          detail: t('interventiondialog.toast.intervention_not_found.detail'),
          life: 3000,
        });
      }
      
    } else {
      try {
        //create new empty element
        const newIntervention = createNewIntervention(allowedLanguageKeys.value);
      localIntervention.value = newIntervention;
      dbIntervention.value = null;
      
      localConnectedLevelIds.value = [];
      dbConnectedLevelIds.value = null;
      
      isEditMode.value = true;

      } catch (error) {
        isOpenedLocal.value = false;
        toast.add({
          severity: 'error',
          summary: t('interventiondialog.toast.new_intervention_not_created.title'),
          detail: t('interventiondialog.toast.new_intervention_not_created.detail'),
          life: 3000,
        });
      }
      
    }
    isInitializing.value = false;
}

const clear = () => {
  localIntervention.value = null;
  dbIntervention.value = null;
  localConnectedLevelIds.value = null;
  dbConnectedLevelIds.value = null;
  isInitializing.value = false;
  isSaving.value = false;
  isEditMode.value = false;
  allowedLanguageKeys.value = [];
  errors.value = { general: [] };
}


const isSaving = ref(false);
const saveInterventionAndConnections = async () => {

  if (!localIntervention.value || !localConnectedLevelIds.value) {
    return;
  }

  isSaving.value = true;
  errors.value = [];
  try {
    const isValidated = validate();
    if (!isValidated) {
      // Zeige Validierungsfehler an
  errors.value.general.forEach(error => {
    toast.add({
      severity: 'error',
      summary: t('interventiondialog.validation.error_summary'),
      detail: error,
      life: 5000
    });
  });
      isSaving.value = false;
      return;
    }
    if (unsavedChangesIntervention.value) {
      if (dbIntervention.value) {
      try {
        await projectConfigStore.updateIntervention(localIntervention.value);
        dbIntervention.value = cloneDeep(localIntervention.value);
      } catch (error) {
        isSaving.value = false;
        toast.add({
          severity: 'error',
          summary: t('interventiondialog.toast.intervention_update_failed.title'),
          detail: t('interventiondialog.toast.intervention_update_failed.detail'),
          life: 3000,
        });
        return;
      }  
      
      } else {
        try {
        await projectConfigStore.createIntervention(localIntervention.value);
        dbIntervention.value = cloneDeep(localIntervention.value);
      } catch (error) {
        isSaving.value = false;
        toast.add({
          severity: 'error',
          summary: t('interventiondialog.toast.intervention_create_failed.title'),
          detail: t('interventiondialog.toast.intervention_create_failed.detail'),
          life: 3000,
        });
        return;
      }  
      }
    }

    if (dbIntervention.value && unsavedChangesLevelConnections.value) {
      try {
        await projectConfigStore.setInterventionLevelRelations(localIntervention.value.id, localConnectedLevelIds.value);
        dbConnectedLevelIds.value = cloneDeep(localConnectedLevelIds.value);
      } catch (error) {
        isSaving.value = false;
        toast.add({
          severity: 'error',
          summary: t('interventiondialog.toast.level_connections_failed.title'),
          detail: t('interventiondialog.toast.level_connections_failed.detail'),
          life: 3000,
        });
        return;
      }
    }
  } catch (error) {
    isSaving.value = false;
    toast.add({
      severity: 'error',
      summary: t('interventiondialog.toast.save_operation_failed.title'),
      detail: t('interventiondialog.toast.save_operation_failed.detail'),
      life: 3000,
    });
    return;
  }
 isSaving.value = false;
}

const errors = ref<{
  general: string[];
}>({
  general: [],
});

const clearErrors = () => {
  errors.value = { general: [] };
};

const validate = (): boolean => {
  clearErrors();

  if (!localIntervention.value) {
    errors.value.general.push(t('interventiondialog.validation.no_intervention_data'));
    return false;
  }

  // Titel-Validierung (mindestens eine Sprache)
  const hasTitle = localIntervention.value.name.languageKeys.some((key, index) =>
    localIntervention.value?.name.languageTexts[index]?.trim()
  );
  if (!hasTitle) {
    errors.value.general.push(t('interventiondialog.validation.title_required'));
  }

  // Alle Titel wenn mehrere Sprachen
  if (allowedLanguageKeys.value.length > 1) {
    const missingTitleLanguages = allowedLanguageKeys.value.filter(key => {
      const index = localIntervention.value.name.languageKeys.indexOf(key);
      return index === -1 || !localIntervention.value.name.languageTexts[index]?.trim();
    });
    
    if (missingTitleLanguages.length > 0) {
      errors.value.general.push(
        t('interventiondialog.validation.title_all_languages_required', {
          languages: missingTitleLanguages.join(', ')
        })
      );
    }
  }


  // Interventionstyp
  if (!localIntervention.value.interventionType) {
    errors.value.general.push(t('interventiondialog.validation.type_required'));
  }

  return errors.value.general.length === 0;
};


const unsavedChanges = computed(() => {
  return unsavedChangesIntervention.value || unsavedChangesLevelConnections.value;
});

const unsavedChangesIntervention = computed(() => {
  return !isEqual(localIntervention.value, dbIntervention.value);
});

const unsavedChangesLevelConnections = computed(() => {
  let connectionsChanged = false;

  if (localConnectedLevelIds.value && dbConnectedLevelIds.value) {
    // Check if the number of connections is different
    if (localConnectedLevelIds.value.length !== dbConnectedLevelIds.value.length) {
      connectionsChanged = true;
    } else {
      // Check if any level IDs are different between local and db
      connectionsChanged = localConnectedLevelIds.value.some(
        localId => !dbConnectedLevelIds.value?.includes(localId)
      ) || dbConnectedLevelIds.value.some(
        dbId => !localConnectedLevelIds.value?.includes(dbId)
      );
    }
  } else {
    // If either list is null, there are changes
    connectionsChanged = true;
  }
  return connectionsChanged;
});

const imagePath = computed(() => {
  if (!localIntervention.value?.id) return null;
  
  return deriveS3Path('interventionPicPath', {
    interventionID: localIntervention.value.id
  });
});


// Verfügbare Level für die Auswahl
const availableLevels = computed(() => {
  return projectConfigStore.levelsSortedByHierarchy.map(level => ({
    ...level,
    formattedName: formatMLString(level.name, locale.value)
  }));
});


</script>
