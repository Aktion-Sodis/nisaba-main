<template>
    <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            color="white"
            v-bind="props"
            prepend-icon="mdi-web"
            append-icon="mdi-menu-down"
          >
            {{ formattedLocale() }}
          </v-btn>
        </template>
        <v-list class="list">
          <v-list-item
            v-for="(language, index) in languages"
            :key="index"
            :value="index"
            @click="changeLocale(language.locale)"
          >
            <v-list-item-title>{{ language.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
  </template>
  
  
  <script>
  import { mapStores } from "pinia";
//   import { usei18nStore } from "@/store/i18n";
  
  
  export default {
    // Component name
    name: 'LanguageSwitcher',
    
    // Component props
    props: {},
    
    // Components used in the template
    components: {},
    
    // Data properties
    data() {
      return {
        languages: [
          {
            locale: 'en-US',
            name: 'EN',
          },
          {
            locale: 'de-DE',
            name: 'DE',
          },
          {
            locale: 'es-BO',
            name: 'BO',
          },
        ]
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
      changeLocale(locale) {
        // localStorage.setItem("lang", locale);
        // this.$i18n.locale = locale;
        // return localStorage, this.$i18n.locale;
      },
  
      formattedLocale() {
        // const locale = this.$i18n.locale;
        // const language = this.languages.find((lang) => lang.locale === locale);
        // return language ? language.name : locale;
      },
  
    },
  };
  </script>
  
  
  <style scoped>
  .list {
    padding: 0 !important;
  }
  .language-selector {
    max-width: 80px;
    border-style: none;
    align-self: flex-start;
    opacity: 1;
  }
  .language-selector::before {
    opacity: 1;
  }
  </style>