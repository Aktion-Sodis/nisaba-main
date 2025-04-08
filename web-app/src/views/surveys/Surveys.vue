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
            <Button 
              v-if="isFilterActive" 
              type="button" 
              icon="pi pi-filter-slash" 
              label="Filter zurücksetzen" 
              outlined 
              @click="clearFilter()" 
              class="mr-2"
            />
            <IconField>
              <InputIcon>
                <i class="pi pi-search align-top" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Suche..." />
            </IconField>
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
          :value="surveys" 
          :loading="loading"
          paginator 
          :rows="10" 
          :rowsPerPageOptions="[5, 10, 20, 50]"
          tableStyle="min-width: 50rem;"
          scroll-height="h-[calc(100vh_-_18rem)]"
          v-model:filters="filters"
          filterDisplay="menu"
          :globalFilterFields="['name', 'description', 'createdAt']"
        >
          <template #empty> Keine Umfragen gefunden. </template>
          <template #loading> Lade Umfragedaten... </template>
          
          <Column field="name" header="Name" sortable>
            <template #body="slotProps">
              {{ formatMLString(slotProps.data.name) }}
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" placeholder="Nach Name filtern" />
            </template>
          </Column>
          <Column field="description" header="Beschreibung">
            <template #body="slotProps">
              {{ formatMLString(slotProps.data.description) }}
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" placeholder="Nach Beschreibung filtern" />
            </template>
          </Column>
          <Column field="createdAt" header="Erstellt am" sortable>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createdAt) }}
            </template>
            <template #filter="{ filterModel }">
              <DatePicker v-model="filterModel.value" dateFormat="dd.mm.yy" placeholder="Datum wählen" />
            </template>
          </Column>
        </DataTable>

        <!-- Grid-Ansicht mit Flexbox -->
        <div v-else-if="viewMode === 'grid'" class="survey-grid">
          <div v-if="loading" class="flex justify-content-center">
            <ProgressSpinner />
          </div>
          <div v-else-if="surveys.length === 0" class="flex justify-content-center">
            Keine Umfragen gefunden.
          </div>
          <div v-else class="survey-grid-container" paginator  :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
            <div v-for="survey in surveys" :key="survey.id" class="survey-grid-item">
              <Card class="h-full">
                <template #title>
                  {{ formatMLString(survey.name) }}
                </template>
                <template #subtitle>
                  Erstellt am: {{ formatDate(survey.createdAt) }}
                </template>
                <template #content>
                  <p class="line-clamp-3">{{ formatMLString(survey.description) }}</p>
                </template>
                <template #footer>
                  <!-- Edit and View buttons
                  
                  <div class="flex justify-content-end">
                    <Button icon="pi pi-eye" rounded text aria-label="Details anzeigen" />
                    <Button icon="pi pi-pencil" rounded text aria-label="Bearbeiten" class="ml-2" />
                  </div> -->
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
import { ref, onMounted, computed } from 'vue';
import { generateClient } from 'aws-amplify/api';
import { listSurveys } from '@/graphql/queries';
import { Survey } from '@/models';
import { formatMLString } from '@/utils/formatStrings'; // Pfad anpassen
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';


// Zustandsvariablen
const surveys = ref<Array<Survey>>([]);
const loading = ref(true);
const viewMode = ref('table'); // 'table' oder 'grid'
const viewOptions = ref([
  { value: 'table', icon: 'pi pi-list' },
  { value: 'grid', icon: 'pi pi-th-large' }
]);

// Filter-Zustand initialisieren
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS }
});

// Computed property zur Überprüfung, ob Filter aktiv sind
const isFilterActive = computed(() => {
  return filters.value.global.value !== null ||
         filters.value.name.value !== null ||
         filters.value.description.value !== null ||
         filters.value.createdAt.value !== null;
});

// Filter zurücksetzen
const clearFilter = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS }
  };
};

// API-Client erstellen
const client = generateClient();

// Umfragen aus der Datenbank abrufen
const fetchSurveys = async () => {
  loading.value = true;
  
  try {
    const response = await client.graphql({
      query: listSurveys
    });
    
    surveys.value = response.data.listSurveys.items as unknown as Survey[];
    console.log('Geladene Umfragen:', surveys.value);
  } catch (err) {
    console.error('Fehler beim Abrufen der Umfragedaten:', err);
  } finally {
    loading.value = false;
  }
};

// Hilfsfunktion zum Formatieren des Datums
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE');
};

// Daten beim Laden der Komponente abrufen
onMounted(fetchSurveys);
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.survey-grid-container {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem; /* Negativer Margin für gleichmäßige Abstände */
}

.survey-grid-item {
  flex: 0 0 calc(25% - 1rem); /* 4 Elemente pro Zeile */
  max-width: calc(25% - 1rem);
  margin: 0.5rem;
  box-sizing: border-box;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .survey-grid-item {
    flex: 0 0 calc(33.333% - 1rem); /* 3 Elemente pro Zeile */
    max-width: calc(33.333% - 1rem);
  }
}

@media (max-width: 768px) {
  .survey-grid-item {
    flex: 0 0 calc(50% - 1rem); /* 2 Elemente pro Zeile */
    max-width: calc(50% - 1rem);
  }
}

@media (max-width: 480px) {
  .survey-grid-item {
    flex: 0 0 calc(100% - 1rem); /* 1 Element pro Zeile */
    max-width: calc(100% - 1rem);
  }
}
</style>
