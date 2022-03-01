<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<template>
  <h1>This is the Dummy View 2.</h1>
  <p>{{ store.getters["persistedDummyModule/getMessage"] }}</p>
  <h2>{{ store.getters["persistedDummyModule/getRandomNumber"] }}</h2>
</template>