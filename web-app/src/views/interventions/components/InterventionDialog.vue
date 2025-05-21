<template>
  <Dialog
    v-model:visible="isOpened"
    modal
    :header="dialogTitle"
    :style="{ width: '50vw', minWidth: '450px' }"
    :maximizable="true"
    class="intervention-dialog"
    @hide="onDialogHide"
  >
    <div class="p-fluid">
      <!-- Sprachauswahl für die Intervention -->
      <div class="field mb-4">
        <label class="font-bold">{{ t('interventiondialog.labels.languages') }}</label>
        <LanguageMultiSelector 
          v-model:value="interventionFormState.selectedLanguages" />
      </div>

      <!-- Intervention Name mit mehrsprachiger Eingabe -->
      <div class="field mb-4">
        <label for="interventionName" class="font-bold">{{ t('interventiondialog.labels.name') }}</label>
        <MultiLanguageTextField
          v-model:value="interventionFormState.currentIntervention.name"
          :allowed-keys="interventionFormState.selectedLanguages"
          :hint="t('interventiondialog.placeholders.name')"
          :mode="MLTextFieldMode.AllDisplayed"
          :n-lines="1"
        />
      </div>

      <!-- Intervention Description mit mehrsprachiger Eingabe -->
      <div class="field mb-4">
        <label for="interventionDescription" class="font-bold">{{ t('interventiondialog.labels.description') }}</label>
        <MultiLanguageTextField
          v-model:value="interventionFormState.currentIntervention.description"
          :allowed-keys="interventionFormState.selectedLanguages"
          :hint="t('interventiondialog.placeholders.description')"
          :mode="MLTextFieldMode.AllDisplayed"
          :n-lines="5"
        />
      </div>

      <div class="grid">
        <!-- Intervention Type -->
        <div class="field col-12 md:col-6 mb-4">
          <label for="interventionType" class="font-bold">{{ t('interventiondialog.labels.type') }}</label>
          <div class="card p-0">
            <SelectButton
              v-model="interventionFormState.currentIntervention.type"
              :options="interventionTypes"
              optionLabel="name"
              optionValue="value"
              aria-labelledby="interventionType"
              class="w-full"
              :allow-empty="false"
            />
          </div>
        </div>

        <!-- Intervention Image -->
        <div class="field col-12 md:col-6 mb-4">
          <label for="interventionImage" class="font-bold">{{ t('interventiondialog.labels.image') }}</label>
          <div class="upload-container">
            <FileUpload
              name="interventionImage"
              @uploader="onImageUpload"
              :multiple="false"
              accept="image/*"
              :maxFileSize="1000000"
              :showCancelButton="false"
              chooseLabel=""
              class="w-full"
            >
              <template #empty>
                <div class="upload-placeholder p-3 border-dashed border-1 border-300 text-center">
                  <i class="pi pi-image text-4xl text-500 mb-2"></i>
                  <p>{{ t('interventiondialog.imageUpload.dnd') }}</p>
                </div>
              </template>
            </FileUpload>
            
            <div v-if="interventionFormState.currentIntervention.imageUrl" class="image-preview mt-2 text-center">
              <Image
                :src="interventionFormState.currentIntervention.imageUrl"
                :alt="t('interventiondialog.imageUpload.alt')"
                width="150"
                preview
                class="shadow-1"
              />
              <Button 
                icon="pi pi-trash" 
                class="p-button-rounded p-button-danger p-button-sm image-delete-btn"
                @click="removeImage"
                v-tooltip="t('interventiondialog.buttons.removeImage')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-content-end gap-2">
        <Button
          :label="t('interventiondialog.buttons.cancel')"
          icon="pi pi-times"
          class="p-button-text"
          @click="closeDialog"
        />
        <Button
          :label="t('interventiondialog.buttons.save')"
          icon="pi pi-check"
          @click="saveIntervention"
          :loading="interventionFormState.isSaving"
          class="p-button-primary"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import MultiLanguageTextField from '@/components/elements/MultiLanguageTextField.vue';
import LanguageMultiSelector from '@/components/elements/LanguageMultiSelector.vue';
import { I18nString } from '@/models';

// Enum für MultiLanguageTextField
enum MLTextFieldMode {
  AllDisplayed = 'AllDisplayed',
  Select = 'Select',
}

// Interface für die lokalen Interventionsdaten
interface LocalIntervention {
  id: string | null;
  name: I18nString;
  description: I18nString;
  type: string | null; // Oder InterventionType, falls importiert
  imageUrl: string | null;
}

// Props
const props = defineProps({
  modelValue: Boolean,
  interventionId: {
    type: String,
    default: null,
  },
});

// Emits
const emit = defineEmits(['update:modelValue', 'saved']);

// i18n
const { t } = useI18n();

// Dialog Sichtbarkeit
const isOpened = ref(props.modelValue);
watch(
  () => props.modelValue,
  (newValue) => {
    isOpened.value = newValue;
    if (newValue) {
      loadInterventionData();
    }
  }
);

// Mögliche Interventionstypen
const interventionTypes = computed(() => [
  { name: t('interventiondialog.types.technology'), value: 'technology' },
  { name: t('interventiondialog.types.education'), value: 'education' },
]);

// Lokaler Store für Formulardaten
const interventionFormState = reactive<{
  currentIntervention: LocalIntervention;
  selectedLanguages: string[];
  isSaving: boolean;
}>({
  currentIntervention: {
    id: null,
    name: { languageKeys: ['en'], languageTexts: [''] },
    description: { languageKeys: ['en'], languageTexts: [''] },
    type: interventionTypes.value.length > 0 ? interventionTypes.value[0].value : null,
    imageUrl: null,
  },
  selectedLanguages: ['en'],
  isSaving: false,
});

// Watcher, um Name und Beschreibung an selectedLanguages anzupassen
watch(() => interventionFormState.selectedLanguages, (newLangs, oldLangs) => {
  // Nur ausführen, wenn sich die Sprachen tatsächlich geändert haben, um Endlosschleifen zu vermeiden
  if (JSON.stringify(newLangs) === JSON.stringify(oldLangs)) {
    return;
  }

  const updateI18nString = (currentI18n: I18nString): I18nString => {
    const newKeys = [...newLangs];
    const newTexts: string[] = [];
    const oldTextsMap = new Map(currentI18n.languageKeys.map((k, i) => [k, currentI18n.languageTexts[i]]));

    newKeys.forEach(langKey => {
      newTexts.push(oldTextsMap.get(langKey) || '');
    });
    return { languageKeys: newKeys, languageTexts: newTexts };
  };

  interventionFormState.currentIntervention.name = updateI18nString(interventionFormState.currentIntervention.name);
  interventionFormState.currentIntervention.description = updateI18nString(interventionFormState.currentIntervention.description);
}, { deep: true });


// Computed Properties
const isEditMode = computed(() => !!props.interventionId);
const dialogTitle = computed(() =>
  isEditMode.value ? t('interventiondialog.title.edit') : t('interventiondialog.title.create')
);

// Methoden
const resetFormState = () => {
  // Wichtig: Zuerst selectedLanguages setzen, damit der Watcher korrekt arbeitet
  interventionFormState.selectedLanguages = ['en']; 
  
  // Dann den Rest des Formulars zurücksetzen
  interventionFormState.currentIntervention = {
    id: null,
    name: { languageKeys: ['en'], languageTexts: [''] },
    description: { languageKeys: ['en'], languageTexts: [''] },
    type: interventionTypes.value.length > 0 ? interventionTypes.value[0].value : null,
    imageUrl: null,
  };
  interventionFormState.isSaving = false;
};

const loadInterventionData = async () => {
  if (isEditMode.value && props.interventionId) {
    console.log('Edit mode: Load data for ID', props.interventionId);
    // HINWEIS: Ersetzen Sie dies durch tatsächliche Ladelogik, z.B. aus einem globalen Store
    // const interventionFromStore = projectConfigStore.getInterventionById(props.interventionId);
    // if (interventionFromStore) { ... }

    // Beispielhafte Befüllung für Edit-Mode (ersetzen durch Store-Logik)
    const loadedData = { // Dies ist ein Platzhalter
      id: props.interventionId,
      // Das Backend liefert wahrscheinlich ein Objekt wie { en: "Name", de: "Name" }
      name: { en: 'Loaded Name', de: 'Geladener Name', fr: 'Nom chargé' },
      description: { en: 'Loaded Description', de: 'Geladene Beschreibung', fr: 'Description chargée' },
      type: 'technology',
      imageUrl: 'https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg'
    };
    
    interventionFormState.currentIntervention.id = loadedData.id;
    interventionFormState.currentIntervention.type = loadedData.type;
    interventionFormState.currentIntervention.imageUrl = loadedData.imageUrl;
    
    // Konvertiere Name von {en: "Text"} zu I18nString
    const nameKeys = Object.keys(loadedData.name);
    const nameTexts = nameKeys.map(key => loadedData.name[key] || '');
    
    // Konvertiere Description von {en: "Text"} zu I18nString
    const descKeys = Object.keys(loadedData.description);
    const descTexts = descKeys.map(key => loadedData.description[key] || '');

    // Setze selectedLanguages basierend auf den geladenen Daten
    // Stelle sicher, dass der Watcher für selectedLanguages nicht unnötig getriggert wird,
    // indem wir die Zuweisung vor der Aktualisierung von Name und Beschreibung machen.
    const allKeys = [...new Set([...nameKeys, ...descKeys])];
    let newSelectedLanguages = allKeys.length > 0 ? allKeys : ['en']; // Default to 'en' if no keys found

    // Ensure selectedLanguages is updated only if it's different to avoid unnecessary watcher triggers
    if (JSON.stringify(interventionFormState.selectedLanguages) !== JSON.stringify(newSelectedLanguages)) {
        interventionFormState.selectedLanguages = newSelectedLanguages;
    }
    
    interventionFormState.currentIntervention.name = { languageKeys: nameKeys, languageTexts: nameTexts };
    interventionFormState.currentIntervention.description = { languageKeys: descKeys, languageTexts: descTexts };

  } else {
    resetFormState();
    console.log('Create mode');
  }
};

const saveIntervention = async () => {
  interventionFormState.isSaving = true;
  try {
    // Daten aus I18nString in das Backend-Format ({en: "Text"}) konvertieren
    const nameObj: Record<string, string> = {};
    interventionFormState.currentIntervention.name.languageKeys.forEach((key, index) => {
      if (interventionFormState.currentIntervention.name.languageTexts[index]) { // Nur nicht-leere Texte speichern
        nameObj[key] = interventionFormState.currentIntervention.name.languageTexts[index];
      }
    });
    
    const descriptionObj: Record<string, string> = {};
    interventionFormState.currentIntervention.description.languageKeys.forEach((key, index) => {
      if (interventionFormState.currentIntervention.description.languageTexts[index]) { // Nur nicht-leere Texte speichern
        descriptionObj[key] = interventionFormState.currentIntervention.description.languageTexts[index];
      }
    });
    
    // Gesamtes Interventions-Objekt zusammenstellen
    const interventionToSave = {
      id: interventionFormState.currentIntervention.id, // ist null bei neuer Intervention
      name: nameObj,
      description: descriptionObj,
      type: interventionFormState.currentIntervention.type,
      imageUrl: interventionFormState.currentIntervention.imageUrl,
      // Fügen Sie hier weitere Felder hinzu, die Teil des Intervention-Modells sind
    };
    
    if (isEditMode.value) {
      console.log('Updating intervention:', interventionToSave);
      // Hier Aufruf der Update-Funktion, z.B. await projectConfigStore.updateIntervention(interventionToSave);
    } else {
      console.log('Adding new intervention:', interventionToSave);
      // Hier Aufruf der Create-Funktion, z.B. await projectConfigStore.createIntervention(interventionToSave);
    }
    
    emit('saved', interventionToSave);
    closeDialog();
  } catch (error) {
    console.error('Error saving intervention:', error);
    // Fehlerbehandlung, z.B. Toast-Nachricht anzeigen
  } finally {
    interventionFormState.isSaving = false;
  }
};

const closeDialog = () => {
  isOpened.value = false;
  // emit('update:modelValue', false); // Wird durch onDialogHide behandelt
};

const onDialogHide = () => {
  emit('update:modelValue', false);
  // Optional: Formular zurücksetzen, wenn der Dialog geschlossen wird, falls nicht gespeichert wurde
  // resetFormState(); 
};

const onImageUpload = (event: any) => { // Typ genauer definieren, falls bekannt
  const file = event.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      interventionFormState.currentIntervention.imageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    console.log('Image selected:', file);
  }
};

const removeImage = () => {
  interventionFormState.currentIntervention.imageUrl = null;
};

// Lifecycle Hooks
onMounted(() => {
  // Initialisiere den Typ, falls noch nicht geschehen und Typen verfügbar sind
  if (!interventionFormState.currentIntervention.type && interventionTypes.value.length > 0) {
    interventionFormState.currentIntervention.type = interventionTypes.value[0].value;
  }
  if (props.modelValue) { // Wenn der Dialog initial geöffnet ist
    loadInterventionData();
  }
});
</script>

<style scoped>
.intervention-dialog :deep(.p-dialog-content) {
  padding: 1.5rem;
}

.upload-placeholder {
  border-radius: 6px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-preview {
  position: relative;
  display: inline-block;
}

.image-delete-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 2rem;
  height: 2rem;
}

.field > label {
  display: block;
  margin-bottom: 0.5rem;
}

:deep(.p-selectbutton) {
  display: flex;
}

:deep(.p-selectbutton .p-button) {
  flex: 1;
}

:deep(.p-fileupload-content) {
  padding: 0;
}

:deep(.p-fileupload) {
  border: none;
}
</style>
