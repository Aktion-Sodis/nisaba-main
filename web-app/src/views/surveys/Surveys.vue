<template>
  <div class="h-full pb-4">
    <Card class="h-full">
      <template #title>
        <div class="flex justify-between items-center w-full">
          <span class="text-screen-title">{{ $t('surveys.title') }}</span>
          <Button
            icon="pi pi-plus"
            :label="$t('surveys.newSurvey')"
            class="ml-auto"
            size="small"
            @click="createSurvey()"
          />
        </div>
      </template>

      <template #subtitle>
        <span class="text-oneliner-light">{{ $t('surveys.subtitle') }}</span>
      </template>

      <template #content>
        <div class="flex justify-between mb-3">
          <div class="flex items-center">
            <IconField>
              <InputIcon>
                <i class="pi pi-search align-top" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                :placeholder="$t('surveys.filters.search')"
              />
            </IconField>
            <Button
              v-if="isFilterActive"
              type="button"
              icon="pi pi-filter-slash"
              :label="$t('surveys.resetFilter')"
              outlined
              class="ml-2"
              @click="clearFilter()"
            />
          </div>
          <div>
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

        <DataTable
          v-if="viewMode === 'table'"
          v-model:filters="filters"
          :value="searchableSurveys"
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
            'status_searchable',
          ]"
          class="cursor-pointer"
          row-hover
          @row-click="onRowClick"
        >
          <template #empty>
            <span class="text-body">{{ $t('surveys.noSurveysFound') }}</span>
          </template>
          <template #loading>
            <span class="text-body">{{ $t('surveys.loadingSurveys') }}</span>
          </template>

          <Column
            field="name_searchable"
            :header="$t('surveys.columns.name')"
            sortable
            filter
          >
            <template #body="slotProps">
              {{ formatMLString(slotProps.data.name, locale) }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                :placeholder="$t('surveys.filters.filterByName')"
              />
            </template>
          </Column>

          <Column
            field="description_searchable"
            :header="$t('surveys.columns.description')"
            filter
          >
            <template #body="slotProps">
              {{ formatMLString(slotProps.data.description, locale) }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                :placeholder="$t('surveys.filters.filterByDescription')"
              />
            </template>
          </Column>

          <Column
            field="createdAt"
            :header="$t('surveys.columns.createdAt')"
            sortable
            filter
          >
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createdAt) }}
            </template>
            <template #filter="{ filterModel }">
              <DatePicker
                v-model="filterModel.value"
                date-format="dd.mm.yy"
                :placeholder="$t('surveys.filters.selectDate')"
              />
            </template>
          </Column>

          <Column
            field="status"
            :header="$t('surveys.columns.status')"
            sortable
            filter
            :show-filter-match-modes="false"
          >
            <template #body="slotProps">
              <Tag
                :value="formatSurveyStatus(slotProps.data.status)"
                :severity="getStatusSeverity(slotProps.data.status)"
                :icon="getStatusIcon(slotProps.data.status)"
                class="text-xs"
              />
            </template>
            <template #filter="{ filterModel }">
              <Select
                v-model="filterModel.value"
                :options="statusOptions"
                option-label="label"
                option-value="value"
                :placeholder="$t('surveys.filters.selectStatus')"
                class="p-column-filter"
                style="min-width: 12rem"
                show-clear
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
                :aria-controls="'overlay_menu'"
                @click.stop="toggleMenu($event, slotProps.data)"
              >
                <template #icon>
                  <i class="pi pi-ellipsis-v"></i>
                </template>
              </Button>
            </template>
          </Column>
        </DataTable>

        <!-- Grid View -->
        <div
          v-else-if="viewMode === 'grid'"
          class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
        >
          <div v-if="loading" class="col-span-full flex justify-center">
            <ProgressSpinner />
          </div>
          <div
            v-else-if="filteredGridSurveys.length === 0"
            class="col-span-full flex justify-center"
          >
            {{ $t('surveys.noSurveysFound')
            }}{{ filters.global.value ? $t('surveys.withActiveFilter') : '' }}.
          </div>
          <Card
            v-for="survey in filteredGridSurveys"
            :key="survey.id"
            class="w-full group shadow-sm border border-white md:shadow-none hover:bg-surface-100 md:border-surface-300 hover:border-surface-300 transition duration-200 ease-in-out relative cursor-pointer"
            @click="viewResults(survey)"
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
                    :aria-controls="'overlay_menu'"
                    @click.stop="toggleMenu($event, survey)"
                  >
                    <template #icon>
                      <i class="pi pi-ellipsis-v"></i>
                    </template>
                  </Button>
                </div>
                <div class="flex justify-between items-start mb-1 pr-8">
                  <h3 class="text-section-inner-title">
                    {{ formatMLString(survey.name, locale) }}
                  </h3>
                  <Tag
                    :value="formatSurveyStatus(survey.status)"
                    :severity="getStatusSeverity(survey.status)"
                    :icon="getStatusIcon(survey.status)"
                    class="text-xs ml-2 shrink-0"
                  />
                </div>
                <div
                  class="text-sm text-gray-600 mb-3 flex justify-between items-center"
                >
                  <span class="text-oneliner-light-small">
                    Erstellt am: {{ formatDate(survey.createdAt) }}
                  </span>
                </div>
                <p class="text-oneliner-light flex-grow line-clamp-3 pr-8">
                  {{ formatMLString(survey.description, locale) }}
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
    <Menu ref="menu" :model="menuItems" :popup="true" />
  </div>
</template>

<script lang="ts" setup>
import {
  FilterMatchMode,
  type DataTableRowClickEvent,
} from '@primevue/core/api';
import { useConfirm } from 'primevue/useconfirm';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSurveyDetailStore } from '../surveydetail/surveyDetailStore';

import { Survey, SurveyStatus } from '@/models';
import router from '@/router';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { formatMLString } from '@/utils/formatStrings';

const { locale, t } = useI18n();
const projectConfigStore = useProjectConfigStore();

const surveys = computed(() => projectConfigStore.surveys);
const loading = computed(() => projectConfigStore.isLoadingSurveys);
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
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const isFilterActive = computed(() => {
  return Object.entries(filters.value).some(([_key, filter]) => {
    // if (key === 'global') return false; // Optional: Globalen Filter ignorieren
    return filter.value !== null && filter.value !== '';
  });
});

const searchableSurveys = computed(() => {
  if (!Array.isArray(surveys.value)) {
    return [];
  }
  const currentLocale = locale.value;
  return surveys.value.map((survey) => {
    try {
      const nameFormatted = formatMLString(survey.name, currentLocale);
      const descriptionFormatted = formatMLString(
        survey.description,
        currentLocale
      );
      const nameSearchable = (nameFormatted || '').toLowerCase();
      const descriptionSearchable = (descriptionFormatted || '').toLowerCase();
      const createdAtFormatted = formatDate(survey.createdAt);
      const statusSearchable = formatSurveyStatus(survey.status).toLowerCase();

      return {
        ...survey,
        name_searchable: nameSearchable,
        description_searchable: descriptionSearchable,
        createdAt_formatted: createdAtFormatted,
        status_searchable: statusSearchable,
      };
    } catch (error) {
      console.error(
        'Error processing survey in searchableSurveys:',
        survey,
        error
      );
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
      survey.createdAt_formatted.toLowerCase().includes(filterText) ||
      survey.status_searchable.includes(filterText)
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
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
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

const getStatusSeverity = (status: SurveyStatus): string => {
  switch (status) {
    case SurveyStatus.DRAFT:
      return 'info';
    case SurveyStatus.ACTIVE:
      return 'success';
    case SurveyStatus.ARCHIVED:
      return 'secondary';
    default:
      return 'secondary';
  }
};

const getStatusIcon = (status: SurveyStatus): string => {
  switch (status) {
    case SurveyStatus.DRAFT:
      return 'pi pi-pencil';
    case SurveyStatus.ACTIVE:
      return 'pi pi-check-circle';
    case SurveyStatus.ARCHIVED:
      return 'pi pi-archive';
    default:
      return 'pi pi-question-circle'; // Fallback icon
  }
};

const formatSurveyStatus = (status: SurveyStatus): string => {
  switch (status) {
    case SurveyStatus.DRAFT:
      return t('surveys.status.draft');
    case SurveyStatus.ACTIVE:
      return t('surveys.status.active');
    case SurveyStatus.ARCHIVED:
      return t('surveys.status.archived');
    default:
      return status; // Fallback, falls ein unbekannter Status auftritt
  }
};

const createSurvey = () => {
  const surveyDetailStore = useSurveyDetailStore();
  surveyDetailStore.initCreate();
  router.push('/surveys/editor');
};

// Menu-related refs and functions
const menu = ref();
const selectedSurveyForMenu = ref<Survey | null>(null);

const menuItems = computed(() => {
  if (!selectedSurveyForMenu.value || !selectedSurveyForMenu.value.status) {
    return []; // Keine Optionen, wenn kein Survey oder kein Status vorhanden ist
  }

  const status = selectedSurveyForMenu.value.status;
  const items = [];

  if (status === SurveyStatus.DRAFT) {
    items.push({
      label: t('surveys.menu.edit'),
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        if (selectedSurveyForMenu.value) {
          editSurvey(selectedSurveyForMenu.value);
        }
      },
    });
    items.push({
      label: t('surveys.menu.delete'),
      icon: 'pi pi-fw pi-trash',
      command: () => {
        if (selectedSurveyForMenu.value) {
          confirmDeleteSurvey(selectedSurveyForMenu.value);
        }
      },
    });
  } else if (status === SurveyStatus.ACTIVE) {
    items.push({
      label: t('surveys.menu.archive'),
      icon: 'pi pi-fw pi-archive',
      command: () => {
        if (selectedSurveyForMenu.value) {
          archiveSurvey(selectedSurveyForMenu.value);
        }
      },
    });
    items.push({
      label: t('surveys.menu.viewResults'),
      icon: 'pi pi-fw pi-chart-bar',
      command: () => {
        if (selectedSurveyForMenu.value) {
          viewResults(selectedSurveyForMenu.value);
        }
      },
    });
  } else if (status === SurveyStatus.ARCHIVED) {
    items.push({
      label: t('surveys.menu.viewResults'),
      icon: 'pi pi-fw pi-chart-bar',
      command: () => {
        if (selectedSurveyForMenu.value) {
          viewResults(selectedSurveyForMenu.value);
        }
      },
    });
  }

  return items;
});

const toggleMenu = (event: Event, survey: Survey) => {
  // Survey Typ hier auch anpassen, falls Survey importiert wurde
  selectedSurveyForMenu.value = survey;
  menu.value.toggle(event);
};

// Placeholder functions for menu actions
const editSurvey = (survey: Survey) => {
  const surveyDetailStore = useSurveyDetailStore();
  surveyDetailStore.initEdit(survey);
  router.push('/surveys/editor');
};

const confirm = useConfirm();

const confirmDeleteSurvey = (survey: any) => {
  confirm.require({
    message: t('surveys.confirm.delete.message'),
    header: t('surveys.confirm.delete.title'),
    icon: 'pi pi-exclamation-triangle',
    acceptProps: {
      label: t('surveys.confirm.delete.accept'),
      icon: 'pi pi-trash',
      severity: 'danger',
    },
    rejectProps: {
      label: t('surveys.confirm.delete.reject'),
      severity: 'secondary',
      outlined: true,
    },
    accept: () => {
      projectConfigStore.deleteSurvey(survey.id);
    },
  });
};

const viewResults = (survey: any) => {
  // Adjust survey type
  console.log('View results for:', survey);
  // Implement navigation or other logic
  // Example: router.push(`/surveys/results/${survey.id}`);
};

const onRowClick = (event: DataTableRowClickEvent) => {
  // event.data enthält das Survey-Objekt der angeklickten Zeile
  if (event.data) {
    editSurvey(event.data);
  }
};

const archiveSurvey = (survey: any) => {
  // Adjust survey type
  console.log('Archive survey:', survey);
  // Implement logic to change survey state to 'archived'
  // Example: projectConfigStore.updateSurveyState(survey.id, 'archived');
  // Sie müssen sicherstellen, dass die Survey-Liste aktualisiert wird,
  // damit die Änderungen im UI sichtbar werden.
};
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
