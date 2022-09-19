<template>
  <div class="text-wrapper">
    <div v-for="answer in question.answers" :key="answer">
      {{ answer }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TextComponent",
  props: ["question"],
};
</script>

<style></style>
