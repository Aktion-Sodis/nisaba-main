<template>
  <button @click="logout">Logout</button>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  methods: {
    async logout() {
      try {
        await Auth.signOut();
        alert("Success");
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style></style>
