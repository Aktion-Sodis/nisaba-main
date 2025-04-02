<template>
  <div class = "h-full">
    <Card class = "h-full">
      <template #title>
        Umfragen
      </template>

      <template #subtitle>
        Hier können Sie Ihre Umfragen verwalten.
      </template>

      <template #content>
        <DataTable 
      :value="surveys" 
      :loading="loading"
      paginator 
      :rows="10" 
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem;"
      scroll-height="h-[calc(100vh_-_18rem)]"
      
    >
      <template #empty> Keine Umfragen gefunden. </template>
      <template #loading> Lade Umfragedaten... </template>
      
      <Column field="name" header="Name" sortable>
        <template #body="slotProps">
          {{ formatMLString(slotProps.data.name) }}
        </template>
      </Column>
      <Column field="description" header="Beschreibung">
        <template #body="slotProps">
          {{ formatMLString(slotProps.data.description) }}
        </template>
      </Column>
      <Column field="createdAt" header="Erstellt am" sortable>
        <template #body="slotProps">
         {{ formatDate(slotProps.data.createdAt) }}
        </template>
      </Column>
    </DataTable> 
  </template>
    </Card>
    
    
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { generateClient } from 'aws-amplify/api';
import { listSurveys } from '@/graphql/queries';
import { Survey } from '@/models';
import { formatMLString } from '@/utils/formatStrings'; // Pfad anpassen
//import { useI18n } from 'vue-i18n'; // I18n-Komposition-API importieren

// Zustandsvariablen
const surveys = ref<Array<Survey>>([]);
const loading = ref(true);

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
