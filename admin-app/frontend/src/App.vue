<template>
  <v-app>
    <div class="top-right-fixed">
      <LangSelect v-if ="$vuetify.breakpoint.name !== 'xs'" :style="isInAuthView ? '' : 'margin-right: 1rem;'" />
      <!-- <SearchBox v-if="!isInAuthView" /> -->
    </div>
    <v-main :class="vMainClass">
      <router-view />
    </v-main>

    <DevPhaseSnackbar />

    <Feedback />

    <NavBar v-if="isAuthenticated" />

    <DataModal />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DevPhaseSnackbar from './components/commons/floating/VersionSnackbar.vue';
import Feedback from './components/commons/Feedback.vue';
import LangSelect from './components/commons/floating/LangSelect.vue';
// import SearchBox from './components/commons/SearchBox.vue';
import NavBar from './components/commons/navbar/NavBar.vue';
import DataModal from './components/dataModal/DataModal.vue';
import { vuexModulesDict, routeNamesDict } from './lib/constants';

export default {
  name: 'App',
  components: {
    NavBar,
    Feedback,
    LangSelect,
    // SearchBox,
    DevPhaseSnackbar,
    DataModal,
  },
  provide() {
    return {
      isInAuthView: () => this.isInAuthView,
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: `${vuexModulesDict.auth}/getIsAuthenticated`,
    }),
    isInAuthView() {
      return (
        this.$route.name === routeNamesDict.Login
        || this.$route.name === routeNamesDict.CompleteUserInfo
        || this.$route.name === routeNamesDict.ForgotPassword
        || this.$route.name === routeNamesDict.ChangePassword
      );
    },
    vMainClass() {
      if (this.isInAuthView) return 'mt-0';
      return this.$vuetify.breakpoint.name === 'xs' ? 'ml-0 mt-8' : 'ml-16 mt-12';
    },
  },
  methods: {
    ...mapActions({
      showToBeImplementedFeedback: `${vuexModulesDict.feedback}/showToBeImplementedFeedback`,
    }),
  },
};
</script>

<style scoped>
.top-right-fixed {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 2;
  display: flex;
}
</style>
