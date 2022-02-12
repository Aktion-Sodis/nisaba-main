<template>
  <v-bottom-navigation
    v-model="value"
    fixed
    app
    background-color="primary-dark"
    class="align-center"
    height="44"
  >
    <v-btn value="0" large class="primary-dark" :to="{ name: routes[value] }">
      <v-icon color="white">mdi-home-outline</v-icon>
    </v-btn>

    <v-btn value="1" large class="primary-dark" :to="{ name: routes[value] }">
      <v-icon color="white">mdi-domain</v-icon>
    </v-btn>

    <v-btn value="2" large class="primary-dark" :to="{ name: routes[value] }">
      <v-icon color="white">mdi-clipboard-text-outline</v-icon>
    </v-btn>

    <v-btn value="3" large class="primary-dark" :to="{ name: routes[value] }">
      <v-icon color="white">mdi-wrench-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'BottomNav',
  data: () => ({
    value: 0,
    routes: ['Home', 'BaseData', 'OrganizationStructure', 'Interventions'],
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/getIsAuthenticated',
      credentials: 'auth/credentials',
    }),
  },
  props: { currentRouteName: String },
  methods: {
    ...mapActions({
      deleteSession: 'auth/deleteSession',
      showToBeImplementedFeedback: 'FEEDBACK_UI/showToBeImplementedFeedback',
    }),
    logout() {
      this.deleteSession();
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style scoped></style>
