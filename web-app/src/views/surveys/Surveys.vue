<template>
  <div class="h-full">
    <Card class="h-full">
      <template #title>
        Umfragen
      </template>

      <template #subtitle>
        Hier können Sie Ihre Umfragen verwalten.
      </template>

      <template #content>
        <div class="flex justify-between mb-3">
          <div class="flex items-center">
            <IconField>
              <InputIcon>
                <i class="pi pi-search align-top" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Suche..." />
            </IconField>
            <Button
              v-if="isFilterActive"
              type="button"
              icon="pi pi-filter-slash"
              label="Filter zurücksetzen"
              outlined
              @click="clearFilter()"
              class="ml-2"
            />
          </div>
          <div class="flex align-items-center">
            <SelectButton v-model="viewMode" :options="viewOptions" optionValue="value">
              <template #option="slotProps">
                <i :class="slotProps.option.icon"></i>
             </template>
            </SelectButton>
          </div>
        </div>

        <DataTable
          v-if="viewMode === 'table'"
          :value="searchableSurveys"
          :loading="loading"
          paginator
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          tableStyle="min-width: 50rem;"
          scroll-height="h-[calc(100vh_-_18rem)]"
          v-model:filters="filters"
          filterDisplay="menu"
          :globalFilterFields="['name_searchable', 'description_searchable', 'createdAt_formatted']"
        >
          <template #empty> Keine Umfragen gefunden. </template>
          <template #loading> Lade Umfragedaten... </template>

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
               <DatePicker v-model="filterModel.value" dateFormat="dd.mm.yy" placeholder="Datum wählen" />
             </template>
           </Column>
           
           <Column header="Aktionen">
             <template #body="slotProps">
               <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editSurvey(slotProps.data)" />
               <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mr-2" @click="confirmDeleteSurvey(slotProps.data)" />
               <Button icon="pi pi-eye" class="p-button-rounded p-button-info" @click="viewResults(slotProps.data)" />
             </template>
           </Column>

        </DataTable>

        <div v-else-if="viewMode === 'grid'" class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 p-4">
          <div v-if="loading" class="col-span-full flex justify-center">
            <ProgressSpinner />
          </div>
          <div v-else-if="filteredGridSurveys.length === 0" class="col-span-full flex justify-center">
            Keine Umfragen gefunden{{ filters.global.value ? ' (mit aktivem Filter)' : '' }}.
          </div>
          <Card v-for="survey in filteredGridSurveys"
                :key="survey.id"
                class="w-full group shadow-sm border border-white md:shadow-none hover:bg-surface-100 md:border-surface-300 hover:border-surface-300 transition duration-200 ease-in-out relative cursor-pointer"
                @click="viewResults(survey)">
            <template #content>
              <div class="p-2 h-full relative flex flex-col">
                <div class="absolute z-10 top-0 right-0 -mt-1 -mr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    severity="light"
                    :fluid="false"
                    size="small"
                    class="w-[2em] h-[2em]"
                    @click.stop="toggleMenu($event, survey)"
                    aria-haspopup="true"
                    :aria-controls="'overlay_menu'"
                  >
                    <template #icon>
                      <i class="pi pi-ellipsis-v"></i>
                    </template>
                  </Button>
                </div>
                <h3 class="text-xl font-semibold mb-1 pr-8">
                  {{ formatMLString(survey.name, locale) }}
                </h3>
                <div class="text-sm text-gray-600 mb-3">
                  Erstellt am: {{ formatDate(survey.createdAt) }}
                </div>
                <p class="text-base text-gray-700 flex-grow line-clamp-3 pr-8">
                  {{ formatMLString(survey.description, locale) }}
                </p>
                <i class="pi pi-arrow-right absolute bottom-0 right-0 -mb-1 -mr-1 transition-opacity opacity-0 group-hover:opacity-100 duration-200"></i>
              </div>
            </template>
          </Card>
        </div>

        <Menu ref="menuRef" :model="menuItems" :popup="true" :id="'overlay_menu'" />

      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { generateClient } from 'aws-amplify/api';
import { listSurveys } from '@/graphql/queries';
import { Survey, I18nString } from '@/models';
import { formatMLString } from '@/utils/formatStrings';
import { FilterMatchMode } from '@primevue/core/api';

const { locale } = useI18n();

const surveys = ref<Array<Survey>>([]);
const loading = ref(true);
const viewMode = ref('table');
const viewOptions = ref([
  { value: 'table', icon: 'pi pi-list' },
  { value: 'grid', icon: 'pi pi-th-large' }
]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name_searchable: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description_searchable: { value: null, matchMode: FilterMatchMode.CONTAINS },
  createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS }
});


const isFilterActive = computed(() => {
  return Object.entries(filters.value).some(([key, filter]) => {
    // Optional: Globalen Filter ignorieren
    return filter.value !== null && filter.value !== '';
  });
});

const searchableSurveys = computed(() => {
  if (!Array.isArray(surveys.value)) {
      return [];
  }
  const currentLocale = locale.value;
  return surveys.value.map(survey => {
    try {
      const nameFormatted = formatMLString(survey.name, currentLocale);
      const descriptionFormatted = formatMLString(survey.description, currentLocale);
      const nameSearchable = (nameFormatted || '').toLowerCase();
      const descriptionSearchable = (descriptionFormatted || '').toLowerCase();
      const createdAtFormatted = formatDate(survey.createdAt);

      return {
        ...survey,
        name_searchable: nameSearchable,
        description_searchable: descriptionSearchable,
        createdAt_formatted: createdAtFormatted
      };
    } catch (error) {
        console.error('Error processing survey in searchableSurveys:', survey, error);
        // Fallback-Werte bereitstellen
        return { ...survey, name_searchable: '', description_searchable: '', createdAt_formatted: '' };
    }
  });
});

const filteredGridSurveys = computed(() => {
  const globalFilterValue = filters.value.global.value;
  if (!globalFilterValue) {
    return searchableSurveys.value;
  }
  const filterText = String(globalFilterValue).toLowerCase();
  return searchableSurveys.value.filter(survey => {
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
    description_searchable: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS }
  };
};

const client = generateClient();

const fetchSurveys = async () => {
  loading.value = true;
  try {
    const response = await client.graphql({ query: listSurveys });
    surveys.value = (response.data.listSurveys?.items || []) as Survey[];
    console.log('Geladene Umfragen:', surveys.value);
  } catch (err) {
    console.error('Fehler beim Abrufen der Umfragedaten:', err);
    surveys.value = [];
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return '-';
    }
    return date.toLocaleDateString('de-DE', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return '-';
  }
};


const menuRef = ref<Menu | null>(null);
const menuItems = ref<MenuItem[]>([]);
const currentSurveyForMenu = ref<Survey | null>(null);

const editSurvey = (survey: Survey) => {
  console.log('Edit survey:', survey.id);
  // TODO: Implement navigation or modal logic for editing
};

const confirmDeleteSurvey = (survey: Survey) => {
  console.log('Delete survey:', survey.id);
  // TODO: Implement confirmation dialog and deletion logic
};

const viewResults = (survey: Survey) => {
  console.log('View results for survey:', survey.id);
  // TODO: Implement navigation to results view
};


const getMenuItems = (survey: Survey): MenuItem[] => [
  {
    label: 'Bearbeiten',
    icon: 'pi pi-pencil',
    command: () => editSurvey(survey)
  },
  {
    label: 'Ergebnisse ansehen',
    icon: 'pi pi-eye',
    command: () => viewResults(survey)
  },
  {
    separator: true
  },
  {
    label: 'Archivieren',
    icon: 'pi pi-inbox',
    class: 'text-red-600',
    command: () => confirmDeleteSurvey(survey)
  }
];

const toggleMenu = (event: Event, survey: Survey) => {
  currentSurveyForMenu.value = survey;
  menuItems.value = getMenuItems(survey);
  if (menuRef.value) {
    menuRef.value.toggle(event);
  } else {
    console.error("Menu reference not found.");
  }
};


onMounted(fetchSurveys);

</script>

<style scoped>

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>
