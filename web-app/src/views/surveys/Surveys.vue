<template>
  <div class="h-full">
    <Card class="h-full">
      <template #title>Umfragen</template>

      <template #subtitle>Hier können Sie Ihre Umfragen verwalten.</template>

      <template #content>
        <div class="flex justify-between mb-3">
          <div class="flex items-center">
            <IconField>
              <InputIcon>
                <i class="pi pi-search align-top" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                placeholder="Suche..."
              />
            </IconField>
            <Button
              v-if="isFilterActive"
              type="button"
              icon="pi pi-filter-slash"
              label="Filter zurücksetzen"
              outlined
              class="ml-2"
              @click="clearFilter()"
            />
          </div>
          <div class="flex align-items-center">
            <SelectButton
              v-model="viewMode"
              :options="viewOptions"
              option-value="value"
            >
              <template #option="slotProps">
                <i :class="slotProps.option.icon"></i>
              </template>
            </SelectButton>
          </div>
        </div>

        <DataTable
          v-if="viewMode === 'table'"
          v-model:filters="filters"
          :value="searchableSurveys"
          :loading="loading"
          paginator
          :rows="10"
          :rows-per-page-options="[5, 10, 20, 50]"
          table-style="min-width: 50rem;"
          scroll-height="h-[calc(100vh_-_18rem)]"
          filter-display="menu"
          :global-filter-fields="[
            'name_searchable',
            'description_searchable',
            'createdAt_formatted',
          ]"
        >
          <template #empty>Keine Umfragen gefunden.</template>
          <template #loading>Lade Umfragedaten...</template>

          <Column field="name_searchable" header="Name" sortable filter>
            <template #body="slotProps">
              {{ formatMLString(slotProps.data.name, locale) }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                placeholder="Nach Name filtern"
              />
            </template>
          </Column>

          <Column field="description_searchable" header="Beschreibung" filter>
            <template #body="slotProps">
              {{ formatMLString(slotProps.data.description, locale) }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                placeholder="Nach Beschreibung filtern"
              />
            </template>
          </Column>

          <Column field="createdAt" header="Erstellt am" sortable filter>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createdAt) }}
            </template>
            <template #filter="{ filterModel }">
              <DatePicker
                v-model="filterModel.value"
                date-format="dd.mm.yy"
                placeholder="Datum wählen"
              />
            </template>
          </Column>
          <!-- Optional: Spalte für Aktionen hinzufügen -->
          <!--
           <Column header="Aktionen">
             <template #body="slotProps">
               <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editSurvey(slotProps.data)" />
               <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSurvey(slotProps.data)" />
             </template>
           </Column>
           -->
        </DataTable>

        <div v-else-if="viewMode === 'grid'" class="survey-grid">
          <div v-if="loading" class="flex justify-content-center col-span-full">
            <ProgressSpinner />
          </div>
          <div
            v-else-if="filteredGridSurveys.length === 0"
            class="flex justify-content-center col-span-full"
          >
            Keine Umfragen gefunden{{
              filters.global.value ? ' (mit aktivem Filter)' : ''
            }}.
          </div>
          <div v-else class="survey-grid-container">
            <div
              v-for="survey in filteredGridSurveys"
              :key="survey.id"
              class="survey-grid-item"
            >
              <Card class="h-full flex flex-col">
                <template #title>
                  {{ formatMLString(survey.name, locale) }}
                </template>
                <template #subtitle>
                  Erstellt am: {{ formatDate(survey.createdAt) }}
                </template>
                <template #content>
                  <p class="line-clamp-3">
                    {{ formatMLString(survey.description, locale) }}
                  </p>
                </template>
                <template #footer>
                  <div class="flex justify-end">
                    <!-- Beispiel-Aktionen für Grid -->
                    <!--
                    <Button icon="pi pi-pencil" class="p-button-sm p-button-success mr-1" @click="editSurvey(survey)" />
                    <Button icon="pi pi-trash" class="p-button-sm p-button-warning" @click="confirmDeleteSurvey(survey)" />
                    -->
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { FilterMatchMode } from '@primevue/core/api';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { formatMLString } from '@/utils/formatStrings';

const { locale } = useI18n();
const projectConfigStore = useProjectConfigStore();

const surveys = projectConfigStore.surveys;
const loading = projectConfigStore.isLoadingSurveys;
const viewMode = ref('table');
const viewOptions = ref([
  { value: 'table', icon: 'pi pi-list' },
  { value: 'grid', icon: 'pi pi-th-large' },
]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name_searchable: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description_searchable: { value: null, matchMode: FilterMatchMode.CONTAINS },
  createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
});

const isFilterActive = computed(() => {
  return Object.entries(filters.value).some(([_key, filter]) => {
    // if (key === 'global') return false; // Optional: Globalen Filter ignorieren
    return filter.value !== null && filter.value !== '';
  });
});

const searchableSurveys = computed(() => {
  if (!Array.isArray(surveys)) {
    return [];
  }
  const currentLocale = locale.value;
  return surveys.map((survey) => {
    try {
      const nameFormatted = formatMLString(survey.name, currentLocale);
      const descriptionFormatted = formatMLString(
        survey.description,
        currentLocale
      );
      // Wichtig: Diese Felder werden jetzt für Spalten- UND Globalfilter verwendet
      const nameSearchable = (nameFormatted || '').toLowerCase();
      const descriptionSearchable = (descriptionFormatted || '').toLowerCase();
      const createdAtFormatted = formatDate(survey.createdAt);

      return {
        ...survey,
        name_searchable: nameSearchable,
        description_searchable: descriptionSearchable,
        createdAt_formatted: createdAtFormatted,
      };
    } catch (error) {
      console.error(
        'Error processing survey in searchableSurveys:',
        survey,
        error
      );
      // Fallback-Werte bereitstellen
      return {
        ...survey,
        name_searchable: '',
        description_searchable: '',
        createdAt_formatted: '',
      };
    }
  });
});

const filteredGridSurveys = computed(() => {
  const globalFilterValue = filters.value.global.value;
  if (!globalFilterValue) {
    return searchableSurveys.value;
  }
  const filterText = String(globalFilterValue).toLowerCase();
  return searchableSurveys.value.filter((survey) => {
    return (
      survey.name_searchable.includes(filterText) ||
      survey.description_searchable.includes(filterText) ||
      survey.createdAt_formatted.toLowerCase().includes(filterText)
    );
  });
});

const clearFilter = () => {
  // Wichtig: Die Schlüssel müssen mit den Feldern in der DataTable übereinstimmen
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name_searchable: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description_searchable: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
  };
};

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '-';
    }
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch (e) {
    console.error('Error formatting date:', dateString, e);
    return '-';
  }
};

// *** filterMLString wurde entfernt ***
</script>

<style scoped>
:deep(.p-card) {
  display: flex;
  flex-direction: column;
  height: 100%;
}
:deep(.p-card-content) {
  flex-grow: 1;
  overflow: auto; /* Wichtig für scrollbare Tabelle/Grid */
}

.survey-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.survey-grid-container {
  display: contents; /* Lässt die Items direkt im Grid-Kontext sein */
}

.survey-grid-item .p-card {
  height: 100%;
}

.col-span-full {
  grid-column: 1 / -1;
}

/* Text auf maximal 3 Zeilen beschränken und mit ... abschneiden */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
