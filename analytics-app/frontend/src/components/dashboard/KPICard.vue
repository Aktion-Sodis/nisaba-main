<template>
  <v-card>
    <v-card-text class="d-flex align-center pb-1 pt-1 pr-1 pl-1">
      <v-spacer />
      <v-btn icon @click="refresh" :ripple="false" size="35" variant="text">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-text>

    <v-card-text class="pb-6 pt-1 pr-5 pl-5">
      <p class="mb-3">{{ title }}</p>
      <h5 class="text-h5 text-no-wrap mb-3">{{ number }}</h5>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      numberOfSurveys: 0,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    refreshMethod: {
      type: Function,
      required: true,
    },
  },
  methods: {
    refresh() {
      this.refreshMethod();
    },
  },
};
</script>

<style scoped></style>
