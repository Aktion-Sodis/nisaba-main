<template>
  <v-card style="height: 100%" class="pa-2" outlined tile>
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>
    <v-card-title>
      {{ interventionName }}
    </v-card-title>
    <v-card-subtitle>
      {{ interventionDescription }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { validate as uuidValidate } from "uuid";

export default {
  name: "Intervention",
  props: {
    interventionId: {
      required: true,
      validator: (e) => uuidValidate(e) || e === null,
    },
    interventionName: {
      type: String,
      required: true,
    },
    interventionDescription: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
