<template>
    <v-menu
        width="230"
        location="bottom end"
        offset="10px"
    >
        <template v-slot:activator="{ props }">
            <v-btn icon variant="text" v-bind="props">
                <v-icon size="25">mdi-account-circle</v-icon>
            </v-btn>
        </template>
        <v-list class="list">
            <v-list-item>
                <template v-slot:prepend>
                    <v-icon class="item-icon" icon="mdi-account-circle"></v-icon>
                </template>
                <v-list-item-title>John Doe</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="list-item">
                <template v-slot:prepend>
                    <v-icon class="item-icon" icon="mdi-logout"></v-icon>
                </template>
                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
        </v-list>
      </v-menu>
  </template>
  
  
  <script>
  import { mapStores } from "pinia";
//   import { usei18nStore } from "@/store/i18n";
  
  
  export default {
    // Component name
    name: 'UserProfile',
    
    // Component props
    props: {},
    
    // Components used in the template
    components: {},
    
    // Data properties
    data() {
      return {
      };
    },
    
    // Computed properties
    // computed: {
    //   ...mapStores(usei18nStore),
    // },
    
    // Watchers
    watch: {},
    
    // Lifecycle hooks
    created() {
    },
    
    // Methods
    methods: {
  
    },
  };
  </script>
  
  
<style scoped>
.list {
    padding: 0 !important;
}
.list-item:hover {
    background-color: rgb(231, 231, 231);
}
.item-icon {
    margin-right: 20px;
}
</style>