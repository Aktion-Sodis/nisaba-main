<template>
  <div >
    <h1>Umfragen</h1>
    
  <DataTable 
  :value="surveys" 
  :loading="loading"
  paginator 
  :rows="10" 
  :rowsPerPageOptions="[5, 10, 20, 50]"
  tableStyle="min-width: 50rem"
 >
  
  
  <template #empty> Keine Umfragen gefunden. </template>
  <template #loading> Lade Umfragedaten... </template>
  
  <Column field="id" header="ID"></Column>
  <Column field="name" header="Name" sortable ></Column>
  <Column field="description" header="Beschreibung"></Column>
  <Column field="createdAt" header="Erstellt am" sortable>
    <template #body="slotProps">
     {{ formatDate(slotProps.data.createdAt) }}
    </template>
  </Column>
 </DataTable> 
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { generateClient } from 'aws-amplify/api';
import { listSurveys } from '@/graphql/queries';
//import { FilterMatchMode } from 'primevue/api';
import { Survey } from '@/models';

// Zustandsvariablen
const surveys = ref<Array<Survey>>([]);
const loading = ref(true);

// Filter-Einstellungen
/*const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
}); */

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
    console.log(surveys.value[0].name);
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

