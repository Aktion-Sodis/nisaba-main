<template>
  <div class="h-full pb-4">
    <Card class="h-full">
      <template #title>
        <div class="flex justify-between items-center w-full">
          <span class="text-screen-title">{{ $t('interventions.title') }}</span>
          <Button
            icon="pi pi-plus"
            :label="$t('interventions.newIntervention')"
            class="ml-auto"
            size="small"
            @click="createIntervention()"
          />
        </div>
      </template>

      <template #subtitle>{{ $t('interventions.subtitle') }}</template>

      <template #content>
        <div class="flex justify-between mb-3">
          <div class="flex items-center">
            <IconField>
              <InputIcon>
                <i class="pi pi-search align-top" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                :placeholder="$t('interventions.filters.search')"
              />
            </IconField>
            <Button
              v-if="isFilterActive"
              type="button"
              icon="pi pi-filter-slash"
              :label="$t('interventions.resetFilter')"
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
              :allow-empty="false"
            >
              <template #option="slotProps">
                <i :class="slotProps.option.icon"></i>
              </template>
            </SelectButton>
          </div>
        </div>

        <!-- Tabellen-Ansicht -->
        <DataTable
          v-if="viewMode === 'table'"
          v-model:filters="filters"
          :value="searchableInterventions"
          :loading="loading"
          paginator
          :rows="10"
          :rows-per-page-options="[5, 10, 20, 50]"
          table-style="min-width: 50rem;"
          scroll-height="h-[calc(100vh_-_21rem)]"
          filter-display="menu"
          :global-filter-fields="[
            'name_searchable',
            'description_searchable',
            'createdAt_formatted',
          ]"
          row-hover
        >
          <template #empty>{{ $t('interventions.noInterventionsFound') }}</template>
          <template #loading>{{ $t('interventions.loadingInterventions') }}</template>

          <Column field="name_searchable" :header="$t('interventions.columns.name')" sortable filter>
            <template #body="{ data }">
              {{ formatMLString(data.name, locale) }}
              <!-- Display original formatted string -->
            </template>
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                :placeholder="$t('interventions.filters.filterByName')"
              />
            </template>
          </Column>
          <Column field="description_searchable" :header="$t('interventions.columns.description')" filter>
            <template #body="{ data }">
              {{ formatMLString(data.description, locale) }}
              <!-- Display original formatted string -->
            </template>
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                :placeholder="$t('interventions.filters.filterByDescription')"
              />
            </template>
          </Column>
          <Column field="createdAt" :header="$t('interventions.columns.createdAt')" sortable filter>
            <!-- Keep original field for date filtering -->
            <template #body="{ data }">
              {{ formatDate(data.createdAt) }}
            </template>
            <template #filter="{ filterModel }">
              <DatePicker
                v-model="filterModel.value"
                date-format="dd.mm.yy"
                :placeholder="$t('interventions.filters.selectDate')"
              />
            </template>
          </Column>

          <Column
            header-style="width: 5rem; text-align: center"
            body-style="text-align: center; overflow: visible"
          >
            <template #body="slotProps">
              <Button
                severity="light"
                :fluid="false"
                size="small"
                class="w-[2em] h-[2em]"
                aria-haspopup="true"
                :aria-controls="'overlay_menu_intervention_' + slotProps.data.id"
                @click.stop="toggleInterventionMenu($event, slotProps.data)"
              >
                <template #icon>
                  <i class="pi pi-ellipsis-v"></i>
                </template>
              </Button>
            </template>
          </Column>
        </DataTable>

        <!-- Grid-Ansicht -->
        <div
          v-else-if="viewMode === 'grid'"
          class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
        >
          <div v-if="loading" class="col-span-full flex justify-center">
            <ProgressSpinner />
          </div>
          <div
            v-else-if="filteredGridInterventions.length === 0"
            class="col-span-full flex justify-center"
          >
            {{ $t('interventions.noInterventionsFound')
            }}{{
              filters.global.value
                ? ' (' + $t('interventions.withActiveFilter') + ')'
                : ''
            }}
          </div>
          <Card
            v-for="intervention in filteredGridInterventions"
            :key="intervention.id"
            class="w-full group shadow-sm border border-white md:shadow-none hover:bg-surface-100 md:border-surface-300 hover:border-surface-300 transition duration-200 ease-in-out relative cursor-pointer"
            @click="onInterventionCardClick(intervention)"
          >
            <template #content>
              <div class="p-2 h-full relative flex flex-col">
                <div
                  class="absolute z-10 top-0 right-0 -mt-1 -mr-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Button
                    severity="light"
                    :fluid="false"
                    size="small"
                    class="w-[2em] h-[2em]"
                    aria-haspopup="true"
                    :aria-controls="'overlay_menu_intervention_' + intervention.id"
                    @click.stop="toggleInterventionMenu($event, intervention)"
                  >
                    <template #icon>
                      <i class="pi pi-ellipsis-v"></i>
                    </template>
                  </Button>
                </div>
                <div class="flex justify-between items-start mb-1 pr-8">
                  <h3 class="text-section-inner-title">
                    {{ formatMLString(intervention.name, locale) }}
                  </h3>
                  <!-- No status tag for interventions in this example -->
                </div>
                <div
                  class="text-sm text-gray-600 mb-3 flex justify-between items-center"
                >
                  <span class="text-oneliner-light-small">
                    {{ $t('interventions.createdAt') }}:
                    {{ formatDate(intervention.createdAt) }}
                  </span>
                </div>
                <p
                  class="text-oneliner-light flex-grow line-clamp-3 pr-8"
                >
                  {{ formatMLString(intervention.description, locale) }}
                </p>
                <i
                  class="pi pi-arrow-right absolute bottom-0 right-0 -mb-1 -mr-1 transition-opacity opacity-0 group-hover:opacity-100 duration-200"
                ></i>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Card>
    <Menu ref="interventionMenu" :model="interventionMenuItems" :popup="true" />
    
    <!-- Verwenden Sie hier Ihre InterventionDialog Komponente -->
    <InterventionDialog 
      v-model="showInterventionDialog" 
      @saved="handleInterventionSaved" 
    />
    <!-- Der vorherige Dialog-Block wurde entfernt -->
  </div>
</template>

<script lang="ts" setup>
import { FilterMatchMode } from '@primevue/core/api';
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Menu from 'primevue/menu';
// Entfernen Sie: import Dialog from 'primevue/dialog';
import InterventionDialog from './components/InterventionDialog.vue'; // Pfad anpassen, falls nötig
import router from '@/router'; 

import type { Intervention } from '@/models/interventions'; 
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { formatMLString } from '@/utils/formatStrings';

const { locale, t } = useI18n(); // t function is now destructured
const projectConfigStore = useProjectConfigStore();

const interventions = projectConfigStore.interventions;
const loading = projectConfigStore.isLoadingInterventions;
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
  return interventions.map((intervention) => {
    try {
      const nameFormatted = formatMLString(intervention.name, currentLocale);
      const descriptionFormatted = formatMLString(
        intervention.description,
        currentLocale
      );
      // Create searchable, lowercase versions for filtering
      const nameSearchable = (nameFormatted || '').toLowerCase();
      const descriptionSearchable = (descriptionFormatted || '').toLowerCase();
      const createdAtFormatted = formatDate(intervention.createdAt);

      return {
        ...intervention,
        name_searchable: nameSearchable,
        description_searchable: descriptionSearchable,
        createdAt_formatted: createdAtFormatted,
      };
    } catch (error) {
      console.error(
        'Error processing intervention in searchableInterventions:',
        intervention,
        error
      );
      // Provide fallback values
      return {
        ...intervention,
        name_searchable: '',
        description_searchable: '',
        createdAt_formatted: '',
      };
    }
  });
});

const filteredGridInterventions = computed(() => {
  const globalFilterValue = filters.value.global.value;
  if (!globalFilterValue) {
    return searchableInterventions.value;
  }
  const filterText = String(globalFilterValue).toLowerCase();
  return searchableInterventions.value.filter((intervention) => {
    return (
      intervention.name_searchable.includes(filterText) ||
      intervention.description_searchable.includes(filterText) ||
      intervention.createdAt_formatted.toLowerCase().includes(filterText)
    );
  });
});

const clearFilter = () => {
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

// Menu-related refs and functions
const interventionMenu = ref();
const selectedInterventionForMenu = ref<Intervention | null>(null);

const interventionMenuItems = computed(() => {
  if (!selectedInterventionForMenu.value) {
    return [];
  }
  return [
    {
      label: t('interventions.menu.viewDetails'), // Add 'interventions.menu.viewDetails' to your i18n files
      icon: 'pi pi-fw pi-eye',
      command: () => {
        if (selectedInterventionForMenu.value) {
          viewInterventionDetails(selectedInterventionForMenu.value);
        }
      },
    },
    {
      label: t('interventions.menu.edit'), // Add 'interventions.menu.edit' to your i18n files
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        if (selectedInterventionForMenu.value) {
          editIntervention(selectedInterventionForMenu.value);
        }
      },
    },
    {
      label: t('interventions.menu.archive'), // Add 'interventions.menu.delete' to your i18n files
      icon: 'pi pi-fw pi-inbox',

      command: () => {
        if (selectedInterventionForMenu.value) {
          // Implement archive logic
        }
      },
    },
  ];
});

const toggleInterventionMenu = (event: Event, intervention: Intervention) => {
  selectedInterventionForMenu.value = intervention;
  interventionMenu.value.toggle(event);
};

// Placeholder functions for menu actions and card click
const viewInterventionDetails = (intervention: Intervention) => {
  console.log('View details for intervention:', intervention);
  // Example: router.push(`/interventions/details/${intervention.id}`);
};

const editIntervention = (intervention: Intervention) => {
  console.log('Edit intervention:', intervention);
  // Hier könnten Sie den InterventionDialog auch für Bearbeitungen öffnen:
  // selectedInterventionId.value = intervention.id; // Eine neue ref, um die ID zu speichern
  // showInterventionDialog.value = true;
  // Stellen Sie sicher, dass InterventionDialog eine `interventionId` Prop akzeptiert, um den Bearbeitungsmodus zu aktivieren.
};

const onInterventionCardClick = (intervention: Intervention) => {
  // Decide if clicking the card should do the same as "View Details" or something else
  viewInterventionDetails(intervention);
  console.log('Intervention card clicked:', intervention);
};

// Modal-bezogene Refs und Funktionen
const showInterventionDialog = ref(false);
// const selectedInterventionId = ref<string | null>(null); // Für den Bearbeitungsmodus, falls benötigt

const createIntervention = () => {
  // selectedInterventionId.value = null; // Sicherstellen, dass kein Bearbeitungsmodus aktiv ist
  showInterventionDialog.value = true;
};

const handleInterventionSaved = (savedIntervention: any) => { // Typ anpassen
  console.log('Intervention saved:', savedIntervention);
  showInterventionDialog.value = false;
  // Hier können Sie Logik hinzufügen, um die Interventionsliste zu aktualisieren,
  // z.B. durch erneutes Laden vom Store oder Hinzufügen zur lokalen Liste.
  // projectConfigStore.fetchInterventions(); // Beispiel
};

// Entfernen Sie die folgenden Refs und Funktionen, die für den inline Dialog waren:
// const displayModal = ref(false);
// const newIntervention = ref({ ... });
// const closeModal = () => { ... };
// const saveIntervention = async () => { ... };

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

.col-span-full {
  grid-column: 1 / -1;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
