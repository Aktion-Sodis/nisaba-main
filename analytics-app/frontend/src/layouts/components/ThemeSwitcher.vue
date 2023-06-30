<template>
    <v-btn icon variant="text" v-bind="$props">
        <v-icon size="25" @click="toggleTheme">{{ theme.global.current.value.dark ? 'mdi-theme-light-dark' : 'mdi-theme-light-dark' }}</v-icon>
    </v-btn>
  </template>
  
  <script>
  import { useTheme } from 'vuetify'
  
  export default {
    setup () {
      const theme = useTheme()
  
      return {
        theme,
        toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
      }
    },
  }
  </script>