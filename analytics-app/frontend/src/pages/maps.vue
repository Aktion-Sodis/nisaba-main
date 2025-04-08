<template>
  <div>
    <div class="mx-2 outer-wrapper">
      <l-map ref="map" :zoom="zoom" :center="center" class="map-wrapper">
        <l-tile-layer
          :url="url"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker
          v-for="(marker, index) in filteredMarkers"
          :key="marker.id"
          :lat-lng="marker.markerLatLng"
          class="marker"
          @click="keepInfo()"
          @mouseover="showInfo(marker)"
          @mouseout="hideInfo()"
        >
        </l-marker>
      </l-map>
      <v-combobox
        v-model="selectedItems"
        :items="markerTypes"
        multiple
        chips
        clearable
        class="filter-card"
        variant="outlined"
      ></v-combobox>
      <v-card v-if="show || keep" class="info-card" tile>
        <v-toolbar color="rgba(0, 0, 0, 0)">
          <template v-slot:append>
            <v-btn @click="closeInfo()" icon="mdi-window-close"></v-btn>
          </template>
        </v-toolbar>

        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">
            {{ selectedMarker.name }}
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 8,
      center: [-18.267, -65.9854],
      selectedMarker: {
        name: "Kein Marker ausgewählt",
      },
      markerTypes: [],
      selectedItems: [],
      filteredMarkers: [],
      markers: [
        {
          id: 1,
          type: "Village",
          name: "Cochabamba",
          markerLatLng: [-17.3895, -66.1568],
        },
        {
          id: 2,
          type: "Village",
          name: "San Pedro de Buena Vista",
          markerLatLng: [-18.267, -65.9854],
        },
        {
          id: 3,
          type: "Village",
          name: "Ulupiquiri",
          markerLatLng: [-18.34052, -65.745616],
        },
        {
          id: 4,
          type: "Survey",
          name: "Survey 1",
          markerLatLng: [-18.7052, -65.845616],
        },
        {
          id: 5,
          type: "Technology",
          name: "Kitchen",
          markerLatLng: [-18.38052, -65.845616],
        },
      ],
      markerLatLng: [51.504, -0.159],
      show: false,
      keep: false,
    };
  },
  watch: {
    // Watch for changes in selectedItems and update the filtered markers accordingly
    selectedItems: {
      handler(newItems) {
        this.updateFilteredMarkers(newItems);
      },
      deep: true,
    },
  },
  created() {
    this.getUniqueMarkerTypes();
  },
  methods: {
    updateFilteredMarkers(selectedItems) {
      this.filteredMarkers = this.markers.filter((marker) =>
        selectedItems.includes(marker.type)
      );
    },
    getUniqueMarkerTypes() {
      const allMarkerTypes = this.markers.map((marker) => marker.type);
      this.markerTypes = [...new Set(allMarkerTypes)];
    },
    keepInfo() {
      this.keep = true;
    },
    closeInfo() {
      this.keep = false;
    },
    showInfo(marker) {
      this.selectedMarker = marker;
      this.show = true;
    },
    hideInfo() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.filter-card {
  position: absolute;
  top: 10px;
  left: 80px;
  z-index: 100;
  width: 500px;
  height: 60px;
  background-color: white;
  border-radius: 5px;
}
.outer-wrapper {
  height: calc(100vh - 96px - 16px);
  width: calc(100% - 16px);
  position: relative;
}
.map-wrapper {
  z-index: 1;
  border-radius: 5px;
}
.marker:hover {
  color: green;
}
.info-card {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
  width: 200px;
}
</style>
