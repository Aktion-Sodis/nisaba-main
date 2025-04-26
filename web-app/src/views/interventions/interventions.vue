<template>
    <div class="h-full">
      <Card class="h-full">
        <template #title>
          Aktivitäten
        </template>

        <template #subtitle>
          Hier können Sie Ihre Aktivitäten verwalten.
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

          <!-- Tabellen-Ansicht -->
          <DataTable
            v-if="viewMode === 'table'"
            :value="searchableInterventions"
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
            <template #empty> Keine Aktivitäten gefunden. </template>
            <template #loading> Lade Aktivitätsdaten... </template>

            <Column field="name_searchable" header="Name" sortable filter>
              <template #body="{ data }">
                {{ formatMLString(data.name, locale) }} <!-- Display original formatted string -->
              </template>
              <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="text" placeholder="Nach Name filtern" />
              </template>
            </Column>
            <Column field="description_searchable" header="Beschreibung" filter>
              <template #body="{ data }">
                {{ formatMLString(data.description, locale) }} <!-- Display original formatted string -->
              </template>
              <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="text" placeholder="Nach Beschreibung filtern" />
              </template>
            </Column>
            <Column field="createdAt" header="Erstellt am" sortable filter> <!-- Keep original field for date filtering -->
              <template #body="{ data }">
                {{ formatDate(data.createdAt) }}
              </template>
              <template #filter="{ filterModel }">
                <DatePicker v-model="filterModel.value" dateFormat="dd.mm.yy" placeholder="Datum wählen" />
              </template>
            </Column>
          </DataTable>

          <!-- Grid-Ansicht -->
          <div v-else-if="viewMode === 'grid'" class="intervention-grid">
            <div v-if="loading" class="flex justify-content-center col-span-full"> <!-- Added col-span-full for consistency -->
              <ProgressSpinner />
            </div>
            <div v-else-if="filteredGridInterventions.length === 0" class="flex justify-content-center col-span-full"> <!-- Added col-span-full -->
              Keine Aktivitäten gefunden{{ filters.global.value ? ' (mit aktivem Filter)' : '' }}. <!-- Improved message -->
            </div>
            <div v-else class="intervention-grid-container">
              <div v-for="intervention in filteredGridInterventions" :key="intervention.id" class="intervention-grid-item">
                <Card class="h-full flex flex-col"> <!-- Added flex classes for consistency -->
                  <template #title>
                    {{ formatMLString(intervention.name, locale) }}
                  </template>
                  <template #subtitle>
                    Erstellt am: {{ formatDate(intervention.createdAt) }}
                  </template>
                  <template #content class="flex-grow"> <!-- Added flex-grow -->
                    <p class="line-clamp-3">{{ formatMLString(intervention.description, locale) }}</p>
                  </template>
                  <template #footer>
                     <div class="flex justify-end">
                       <!-- Add actions if needed -->
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
  // Imports
  import { ref, onMounted, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Intervention } from '@/models';
  import { formatMLString } from '@/utils/formatStrings';
  import { FilterMatchMode } from '@primevue/core/api';
  import { useProjectConfigStore } from '@/stores/projectConfigStore';

  // i18n
  const { locale } = useI18n();
  const projectConfigStore = useProjectConfigStore();

  // Zustandsvariablen
  const interventions = projectConfigStore.interventions;
  const loading = projectConfigStore.isLoadingInterventions;
  const viewMode = ref('table');
  const viewOptions = ref([
    { value: 'table', icon: 'pi pi-list' },
    { value: 'grid', icon: 'pi pi-th-large' }
  ]);

  // Filter-Zustand initialisieren (using searchable keys)
  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name_searchable: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description_searchable: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS }
  });

  // Computed property zur Überprüfung, ob Filter aktiv sind (using updated keys)
  const isFilterActive = computed(() => {
    return Object.entries(filters.value).some(([key, filter]) => {
        // Example: return key !== 'global' && filter.value !== null && filter.value !== '';
        return filter.value !== null && filter.value !== ''; // Check all filters including global
    });
  });

  // Computed property to create searchable intervention data
  const searchableInterventions = computed(() => {
    if (!Array.isArray(interventions)) {
        return [];
    }
    const currentLocale = locale.value;
    return interventions.map(intervention => {
      try {
        const nameFormatted = formatMLString(intervention.name, currentLocale);
        const descriptionFormatted = formatMLString(intervention.description, currentLocale);
        // Create searchable, lowercase versions for filtering
        const nameSearchable = (nameFormatted || '').toLowerCase();
        const descriptionSearchable = (descriptionFormatted || '').toLowerCase();
        const createdAtFormatted = formatDate(intervention.createdAt); // Format date for global search

        return {
          ...intervention,
          name_searchable: nameSearchable,
          description_searchable: descriptionSearchable,
          createdAt_formatted: createdAtFormatted // Add formatted date for global search
        };
      } catch (error) {
          console.error('Error processing intervention in searchableInterventions:', intervention, error);
          // Provide fallback values
          return { ...intervention, name_searchable: '', description_searchable: '', createdAt_formatted: '' };
      }
    });
  });

  // Computed property for filtering in grid view
  const filteredGridInterventions = computed(() => {
    const globalFilterValue = filters.value.global.value;
    if (!globalFilterValue) {
      return searchableInterventions.value; // Return all searchable items if no global filter
    }
    const filterText = String(globalFilterValue).toLowerCase();
    // Filter based on the searchable fields
    return searchableInterventions.value.filter(intervention => {
      return (
        intervention.name_searchable.includes(filterText) ||
        intervention.description_searchable.includes(filterText) ||
        intervention.createdAt_formatted.toLowerCase().includes(filterText) // Search in formatted date string
      );
    });
  });


  // Filter zurücksetzen (using updated keys)
  const clearFilter = () => {
    filters.value = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name_searchable: { value: null, matchMode: FilterMatchMode.CONTAINS },
      description_searchable: { value: null, matchMode: FilterMatchMode.CONTAINS },
      createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS }
    };
  };

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return '-'; // Return '-' for invalid dates
        }
        return date.toLocaleDateString('de-DE', {
            day: '2-digit', month: '2-digit', year: 'numeric' // Consistent format
        });
    } catch (e) {
        console.error("Error formatting date:", dateString, e);
        return '-'; // Return '-' on error
    }
  };

  onMounted(() => {
    // Fetch interventions if needed
  });
  </script>

  <style scoped>
  /* Ensure Card takes full height and content scrolls */
  :deep(.p-card) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  :deep(.p-card-content) {
    flex-grow: 1;
    overflow: auto; /* Important for scrollable table/grid */
  }

  /* Styling für Grid und Kartenansicht - Adopted from Surveys.vue for consistency */
  .intervention-grid {
    display: grid;
    /* Use auto-fill and minmax for responsive columns */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  .intervention-grid-container {
     /* Allows items to be direct children of the grid */
    display: contents;
  }

  .intervention-grid-item .p-card {
    height: 100%; /* Ensure cards fill the grid item height */
  }

  /* Span the full grid width for loading/empty messages */
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

  /* Remove previous flexbox grid styling if not needed */
  /*
  .intervention-grid-container {
    display: flex;
    flex-wrap: wrap;
  }

  .intervention-grid-item {
    flex-basis: calc(25% - 1rem);
    margin: 0.5rem;
  }

  @media (max-width: 768px) {
    .intervention-grid-item {
      flex-basis: calc(50% - 1rem);
    }
  }

  @media (max-width: 480px) {
    .intervention-grid-item {
      flex-basis: calc(100% - 1rem);
    }
  }
  */
  </style>
