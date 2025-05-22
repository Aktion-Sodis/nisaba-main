<template>
  <Dialog
    v-model:visible="isOpenedLocal"
    modal
    :header="dialogTitle"
    class="w-dialog-lg"
    :maximizable="true"
  >
    <div v-if="localIntervention!=null" class="flex flex-col gap-2">
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
        <multi-language-text-field
          v-model:value="localIntervention.name"
          :allowed-keys="allowedLanguageKeys"
          :n-lines="3"
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
          :n-lines="5"
        />
      </div>

        <!-- Level zuordnung -->
        <div class="flex flex-row justify-between items-center gap-2 mb-4">
          <label for="levels" class="w-[40%]">
            {{ t('interventiondialog.labels.levels') }}
          </label>
          <MultiSelect
            v-model="selectedLevels"
            :options="availableLevels"
            option-label="formattedName"
            option-value="id"
            display="chip"
            :filter="true"
            class="w-[60%]"
          />
        </div>

        <!-- Intervention Type -->
        <div class="flex flex-col gap-2">
          <label for="interventionType">
            {{ t('interventiondialog.labels.type') }}
          </label>
            <SelectButton
              v-model="localIntervention.type"
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
          class="p-button-text p-button-secondary"
          @click="closeDialog"
        />
        <Button
          :label="t('interventiondialog.buttons.save')"
          icon="pi pi-check"
          @click="saveIntervention"
          :loading="isSaving"
          class="p-button-primary"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import MultiLanguageTextField from '@/components/elements/MultiLanguageTextField.vue';
import LanguageMultiSelector from '@/components/elements/LanguageMultiSelector.vue';
import { Intervention } from '@/models';
import { isEqual, cloneDeep } from 'lodash';
import { MinimalLevelInterventionRelation, StoreIntervention } from '@/stores/projectConfigStore';
import { deriveS3Path } from '@/utils/s3Paths';
import CustomImageUpload from '@/components/elements/CustomImageUpload.vue';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { formatMLString } from '@/utils/formatStrings';

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
  }
)
// Mögliche Interventionstypen
const interventionTypes = computed(() => [
  { name: t('interventiondialog.types.technology'), value: 'technology' },
  { name: t('interventiondialog.types.education'), value: 'education' },
]);

// Computed Properties
const isCreate = computed(() => !!props.interventionId);
const dialogTitle = computed(() =>
  isCreate.value ? t('interventiondialog.title.create'):t('interventiondialog.title.edit')
);

//state
const allowedLanguageKeys = ref<Array<string>>([]);

// Initialisieren Sie die erlaubten Sprachschlüssel, ähnlich wie in surveyDetailStore
// Sie können dies entweder aus dem projectConfigStore beziehen oder manuell festlegen
onMounted(() => {
  // Option 1: Verwenden Sie die verfügbaren Sprachen aus dem projectConfigStore
 //  allowedLanguageKeys.value = projectConfigStore.availableLanguages.map(lang => lang.key) || [];;
  
  // Option 2: Oder setzen Sie die Sprachen basierend auf den Daten des Interventions-Objekts
  // wenn Sie ein Interventions-Objekt bearbeiten
  if (props.intervention && props.intervention.name.languageKeys.length > 0) {
    const intervention = projectConfigStore.getInterventionById(props.interventionId);
    if (intervention?.name?.languageKeys) {
      allowedLanguageKeys.value = [...intervention.name.languageKeys];
    }
  }
});
const localIntervention = ref<StoreIntervention | null>(null);
const dbIntervention = ref<StoreIntervention | null>(null);

const localInterventionLevelConnections = ref<Array<MinimalLevelInterventionRelation> | null>(null);
const dbInterventionLevelConnections = ref<Array<MinimalLevelInterventionRelation> | null>(null);

const isEditMode = ref(false);
const errors = ref<Array<string>>([]);

const isInitializing = ref(false);
const initialize = async () => {
  isInitializing.value = true;
  try {
    //set language key array initial selection
    allowedLanguageKeys.value = (projectConfigStore.availableLanguages || []).map(lang => lang.key) || [];
    
    if (props.interventionId) {
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
        const levelConnections = projectConfigStore.getRelationsByInterventionId(props.interventionId);
        dbInterventionLevelConnections.value = cloneDeep(levelConnections);
        localInterventionLevelConnections.value = cloneDeep(levelConnections);
        
        isEditMode.value = true;
      } else {
        console.error(`Intervention mit ID ${props.interventionId} nicht gefunden`);
        emit('update:isOpened', false);
      }
    } else {
      //create new empty element
      const newId = crypto.randomUUID();
      const emptyIntervention: StoreIntervention = {
        id: newId,
        name: { languageMap: {}, languageKeys: [...allowedLanguageKeys.value] },
        description: { languageMap: {}, languageKeys: [...allowedLanguageKeys.value] },
        type: 'technology', // Standardwert
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _version: 1,
        _lastChangedAt: Date.now(),
        _deleted: false,
      };
      
      localIntervention.value = emptyIntervention;
      dbIntervention.value = null;
      localInterventionLevelConnections.value = [];
      dbInterventionLevelConnections.value = null;
      
      isEditMode.value = false;
    }
  } catch (error) {
    console.error('Fehler bei der Initialisierung:', error);
    errors.value.push('Fehler beim Laden der Intervention');
  } finally {
    isInitializing.value = false;
  }
}

const clear = () => {
  localIntervention.value = null;
  dbIntervention.value = null;

}

const isSaving = ref(false);
const saveInterventionAndConnections = async () => {
  //check for changes in intervention and connections
  isSaving.value = true;
  try {
    let savedIntervention;
    
    // Prüfen, ob es sich um eine neue Intervention handelt oder eine Bearbeitung
    if (!isEditMode.value) {
      // Neue Intervention erstellen
      savedIntervention = await projectConfigStore.createIntervention(localIntervention.value);
    } else {
      // Bestehende Intervention aktualisieren
      savedIntervention = await projectConfigStore.updateIntervention(localIntervention.value);
      
      // Prüfen, ob Level-Verbindungen geändert wurden
      if (localInterventionLevelConnections.value && dbInterventionLevelConnections.value) {
        // Finde gelöschte Verbindungen
        const deletedConnections = dbInterventionLevelConnections.value.filter(
          dbConn => !localInterventionLevelConnections.value.some(
            localConn => localConn.id === dbConn.id
          )
        );
        
        // Finde neue Verbindungen
        const newConnections = localInterventionLevelConnections.value.filter(
          localConn => !dbInterventionLevelConnections.value.some(
            dbConn => dbConn.id === localConn.id
          )
        );
        
        // Lösche entfernte Verbindungen
        for (const connection of deletedConnections) {
          await projectConfigStore.deleteLevelInterventionRelation(connection.id);
        }
        
        // Erstelle neue Verbindungen
        for (const connection of newConnections) {
          await projectConfigStore.createLevelInterventionRelation(
            connection.levelId,
            connection.interventionId
          );
        }
      }
    }
    
    // Dialog schließen und Erfolg melden
    emit('saved', savedIntervention);
    emit('update:isOpened', false);
    clear();
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    errors.value.push('Fehler beim Speichern der Intervention');
  } finally {
    isSaving.value = false;
  }
}

const validate = () => {
  
}

const unsavedChanges = computed(() => {
  // Prüfe, ob die Intervention geändert wurde
  const interventionChanged = !isEqual(localIntervention.value, dbIntervention.value);
  
  // Prüfe, ob die Level-Verbindungen geändert wurden
  let connectionsChanged = false;
  if (localInterventionLevelConnections.value && dbInterventionLevelConnections.value) {
    // Prüfe, ob die Anzahl der Verbindungen unterschiedlich ist
    if (localInterventionLevelConnections.value.length !== dbInterventionLevelConnections.value.length) {
      connectionsChanged = true;
    } else {
      // Prüfe, ob alle lokalen Verbindungen auch in den DB-Verbindungen vorhanden sind
      connectionsChanged = localInterventionLevelConnections.value.some(
        localConn => !dbInterventionLevelConnections.value.some(
          dbConn => isEqual(localConn, dbConn)
        )
      );
    }
  }
  
  return interventionChanged || connectionsChanged;
});

const imagePath = computed(() => {
  if (!localIntervention.value?.id) return '';
  
  return deriveS3Path('interventionPicPath', {
    interventionID: localIntervention.value.id
  });
});


// Für die Level-Auswahl
const selectedLevels = computed({
  get: () => {
    if (!localInterventionLevelConnections.value) return [];
    return localInterventionLevelConnections.value.map(connection => connection.levelId);
  },
  set: (newLevelIds) => {
    if (!localIntervention.value) return;
    
    // Bestehende Verbindungen entfernen, die nicht mehr ausgewählt sind
    localInterventionLevelConnections.value = (localInterventionLevelConnections.value || [])
      .filter(connection => newLevelIds.includes(connection.levelId));
    
    // Neue Verbindungen hinzufügen
    newLevelIds.forEach(levelId => {
      if (!localInterventionLevelConnections.value?.some(connection => connection.levelId === levelId)) {
        localInterventionLevelConnections.value = [
          ...(localInterventionLevelConnections.value || []),
          {
            id: crypto.randomUUID(),
            levelId: levelId,
            interventionId: localIntervention.value.id
          }
        ];
      }
    });
  }
});

// Verfügbare Level für die Auswahl
const availableLevels = computed(() => {
  return (projectConfigStore.levels || []).map(level => ({
    ...level,
    formattedName: formatMLString(level.name, locale.value)
  }));
});

</script>
