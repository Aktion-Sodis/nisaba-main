<template>
  <v-list-item class="px-2">
    <v-list-item-avatar class="my-0">
      <v-progress-circular
        v-if="syncStatus === syncStatusDict.synchronizing"
        indeterminate
        color="white"
      ></v-progress-circular>
      <v-icon x-large color="white" v-else>
        {{ syncStatus === syncStatusDict.inSync ? 'mdi-refresh' : 'mdi-cloud-check' }}
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-title class="white--text text-subtitle-2 font-italic ml-3">
      {{ $t(`general.api.${syncStatus}`) }}
    </v-list-item-title>
  </v-list-item>
</template>

<script>
const syncStatusDict = {
  inSync: 'inSync',
  synched: 'synched',
  synchronizing: 'synchronizing',
};

export default {
  name: 'SyncAction',
  data() {
    return {
      syncStatusDict,
      syncStatus: syncStatusDict.synched,
    };
  },
};
</script>
