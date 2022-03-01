<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<template>
  <h1>This is the Dummy View 1.</h1>
  <p>{{ store.getters["volatileDummyModule/getMessage"] }}</p>
  <h2>{{ store.getters["volatileDummyModule/getRandomNumber"] }}</h2>
</template>