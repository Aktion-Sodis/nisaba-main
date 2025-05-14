<template>
  <div class="h-full">
    <Card class="h-full">
      <template #title>{{ $t('interventions.title') }}</template>

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
          scroll-height="h-[calc(100vh_-_18rem)]"
          filter-display="menu"
          :global-filter-fields="[
            'name_searchable',
            'description_searchable',
            'createdAt_formatted',
          ]"
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
        </DataTable>

        <!-- Grid-Ansicht -->
        <div v-else-if="viewMode === 'grid'" class="intervention-grid">
          <div v-if="loading" class="flex justify-content-center col-span-full">
            <!-- Added col-span-full for consistency -->
            <ProgressSpinner />
          </div>
          <div
            v-else-if="filteredGridInterventions.length === 0"
            class="flex justify-content-center col-span-full"
          >
            {{ $t('interventions.noInterventionsFound') }}{{
              filters.global.value ? ' (' + $t('interventions.withActiveFilter') + ')' : ''
            }}
          </div>
          <div v-else class="intervention-grid-container">
            <div
              v-for="intervention in filteredGridInterventions"
              :key="intervention.id"
              class="intervention-grid-item"
            >
              <Card class="h-full flex flex-col">
                <!-- Added flex classes for consistency -->
                <template #title>
                  {{ formatMLString(intervention.name, locale) }}
                </template>
                <template #subtitle>
                  {{ $t('interventions.createdAt') }}: {{ formatDate(intervention.createdAt) }}
                </template>
                <template #content>
                  <!-- Added flex-grow -->
                  <p class="line-clamp-3">
                    {{ formatMLString(intervention.description, locale) }}
                  </p>
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
import { FilterMatchMode } from '@primevue/core/api';
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { formatMLString } from '@/utils/formatStrings';

const { locale } = useI18n();
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

onMounted(() => {
});
</script>

<style scoped>
:deep(.p-card) {
  display: flex;
  flex-direction: column;
  height: 100%;
}
:deep(.p-card-content) {
  flex-grow: 1;
  overflow: auto; 
}

.intervention-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.intervention-grid-container {
  display: contents;
}

.intervention-grid-item .p-card {
  height: 100%; 
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
