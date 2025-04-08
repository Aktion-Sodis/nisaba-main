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
            :value="interventions" 
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
            <template #empty> Keine Interventions gefunden. </template>
            <template #loading> Lade Interventionsdaten... </template>
            
            <Column field="name" header="Name" sortable>
              <template #body="{ data }">
                {{ formatMLString(data.name) }}
              </template>
              <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="text" placeholder="Nach Name filtern" />
              </template>
            </Column>
            <Column field="description" header="Beschreibung">
              <template #body="{ data }">
                {{ formatMLString(data.description) }}
              </template>
              <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="text" placeholder="Nach Beschreibung filtern" />
              </template>
            </Column>
            <Column field="createdAt" header="Erstellt am" sortable>
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
            <div v-if="loading" class="flex justify-content-center">
              <ProgressSpinner />
            </div>
            <div v-else-if="interventions.length === 0" class="flex justify-content-center">
              Keine Interventions gefunden.
            </div>
            <div v-else class="intervention-grid-container">
              <div v-for="intervention in interventions" :key="intervention.id" class="intervention-grid-item">
                <Card class="h-full">
                  <template #title>
                    {{ formatMLString(intervention.name) }}
                  </template>
                  <template #subtitle>
                    Erstellt am: {{ formatDate(intervention.createdAt) }}
                  </template>
                  <template #content>
                    <p class="line-clamp-3">{{ formatMLString(intervention.description) }}</p>
                  </template>
                  <!-- Footer kann bei Bedarf hinzugefügt werden -->
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
  import { generateClient } from 'aws-amplify/api';
  import { listInterventions } from '@/graphql/queries';
  import { Intervention } from '@/models';
  import { formatMLString } from '@/utils/formatStrings';
  import { FilterMatchMode } from '@primevue/core/api';
  
  // Zustandsvariablen
  const interventions = ref<Array<Intervention>>([]);
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
  
  // Interventions aus der Datenbank abrufen
  const fetchInterventions = async () => {
    loading.value = true;
  
    try {
      const response = await client.graphql({
        query: listInterventions
      });
  
      interventions.value = response.data.listInterventions.items as unknown as Intervention[];
      console.log('Geladene Interventions:', interventions.value);
    } catch (err) {
      console.error('Fehler beim Abrufen der Interventionsdaten:', err);
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
  onMounted(fetchInterventions);
  </script>
  
  <style scoped>
  /* Styling für Grid und Kartenansicht */
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
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
  </style>
  