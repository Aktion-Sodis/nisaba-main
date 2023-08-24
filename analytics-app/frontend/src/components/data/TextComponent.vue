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
  background-color: #444463;
  height: 100%;
  width: 100%;
  overflow: auto;
}
.list-item {
  /* border: 1px black solid; */
  padding-top: 10px;
  padding-bottom: 10px;
  height: 70px;
  /* width: 300px; */
  border-radius: 5px;
  background-color: #ffffff;
}
.list-item-subtitle {
  color: black;
}
</style>
