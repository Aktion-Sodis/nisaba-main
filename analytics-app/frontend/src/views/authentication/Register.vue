<template>
  <div class="container">
    <form @submit.prevent="register">
      <h2>{{ $t("register.title") }}</h2>
      <input type="email" v-model="email" :placeholder="$t('register.email')" />
      <input
        type="password"
        v-model="password"
        :placeholder="$t('register.password')"
      />
      <button>{{ $t("register.register") }}</button>
    </form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        await Auth.signUp({
          username: this.email,
          password: this.password,
        });
        alert(
          "User successfully registered. Please ask your admin to verify your account"
        );
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style></style>
