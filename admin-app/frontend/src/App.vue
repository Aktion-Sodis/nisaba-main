<template>
  <v-app>
    <SideBar v-if="isAuthenticated" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import SideBar from './components/commons/SideBar.vue'

export default {
  name: "App",
  components: { SideBar },
  data: () => ({}),
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/getIsAuthenticated",
    })
  },
};
</script>
