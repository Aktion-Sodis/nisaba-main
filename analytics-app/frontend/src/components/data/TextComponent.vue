<template>
  <v-card class="component-wrapper">
    <v-list-item
      v-for="(answer, i) in questionProperties.answers"
      :key="i"
      :value="answer"
      color="primary"
      class="list-item mb-2 ml-2"
    >
      <v-list-item-subtitle class="list-item-subtitle">
        {{ answer.answer_value }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  // Component name
  name: "ChartComponent",

  // Component props
  props: {
    questionProperties: {
      type: Object,
      required: true,
    },
  },

  // Data
  data() {
    return {};
  },
};
</script>

<style scoped>
.component-wrapper {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.list-item {
  padding-top: 10px;
  padding-bottom: 10px;
  height: 70px;
  border-radius: 5px;
  border: black 1px solid;
  background-color: #ffffff;
}
.list-item-subtitle {
  color: black;
}
</style>
