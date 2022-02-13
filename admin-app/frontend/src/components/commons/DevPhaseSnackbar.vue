<template>
  <a href="https://github.com/Aktion-Sodis/software-main" class="d-none d-md-block" target="_blank">
    <v-alert
      class="version-wrapper white--text"
      :outlined="$route.name !== 'Login'"
      color="primary"
      icon="🚧"
      border="left"
      style="z-index: 3"
    >
      The Admin-App v0.1, development phase 🔗
    </v-alert>
  </a>
</template>

<script>
export default {
  name: 'DevPhaseSnackbar',
};
</script>

<style scoped>
.version-wrapper {
  position: fixed;
  right: 1rem;
  bottom: 0;
}
</style>
