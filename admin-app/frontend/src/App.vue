<template>
    <v-app>
        <SideBar v-if="isAuthenticated" :currentRouteName="currentRouteName" />

        <div class="search-bar-wrapper">
            <!-- Language switch is planned only for development -->
            <v-select
                v-model="$root.$i18n.locale"
                :items="langs"
                item-text="name"
                item-value="abbr"
                outlined
                dense
                background-color="grey"
                class="lang-select"
                :style="currentRouteName === 'Login' ? '' : 'margin-right: 1rem;'"
                dark
            ></v-select>
            <v-text-field
                v-if="currentRouteName !== 'Login'"
                :label="$t('general.search-box')"
                prepend-inner-icon="mdi-magnify"
                outlined
                dense
                background-color="grey"
                dark
            ></v-text-field>
        </div>

        <v-main :class="currentRouteName === 'Login' ? 'ml-0' : 'ml-16 mt-12'">
            <router-view />
        </v-main>

        <!-- <v-snackbar :timeout="-1" :value="true" color="warning" bottom right text>
            🚧 The Admin-App v0.1, development phase
        </v-snackbar> -->

        <a href="https://github.com/Aktion-Sodis/software-main">
            <v-alert class="version-wrapper" outlined color="primary" icon="🚧" border="left">
                The Admin-App v0.1, development phase 🔗
            </v-alert>
        </a>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import SideBar from './components/commons/SideBar.vue';

export default {
  name: 'App',
  components: { SideBar },
  data: () => ({
    langs: [
      { name: 'English US', abbr: 'en-US' },
      { name: 'Español España', abbr: 'es-ES' },
      { name: 'Türkçe Türkiye', abbr: 'tr-TR' },
    ],
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/getIsAuthenticated',
    }),
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style scoped>
.search-bar-wrapper {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 2;
    display: flex;
}

.lang-select {
    max-width: 10.5rem;
}

.version-wrapper {
    position: fixed;
    right: 1rem;
    bottom: 0;
}
</style>
