<template>
  <!-- <div class="container">
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
  </div> -->
  <div class="outer-wrapper">
    <div class="register-outer-wrapper">
      <div class="register-wrapper">
        <h1>{{ $t("register.title") }}</h1>
        <p>{{ $t("register.message") }}</p>
        <el-form @submit.prevent="register">
          <el-form-item required class="username-wrapper">
            <el-input v-model="email" :placeholder="$t('register.email')" />
          </el-form-item>
          <el-form-item required class="password-wrapper">
            <el-input
              v-model="password"
              type="password"
              :placeholder="$t('register.password')"
              show-password
            />
          </el-form-item>
          <el-form-item required class="password-wrapper">
            <el-input
              v-model="passwordCheck"
              type="password"
              :placeholder="$t('register.passwordCheck')"
              show-password
            />
          </el-form-item>
          <button @submit.prevent="register" class="block sodis">
            {{ $t("register.register") }}
          </button>
        </el-form>
      </div>
    </div>

    <div
      class="image-wrapper"
      :style="{ 'background-image': `url(${backgroundImage})` }"
    ></div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";

const backgroundImage = import.meta.env.VITE_APP_LOGIN_BACKGROUND_IMAGE_SRC;

export default {
  name: "Register",
  data() {
    return {
      backgroundImage,
      email: "",
      password: "",
      passwordCheck: "",
      passwordsMatch: true,
    };
  },
  methods: {
    async register() {
      if (this.passwordCheck !== this.password) {
        alert("The passwords you entered do not match. Please try again!");
        return;
      }
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

<style scoped>
.outer-wrapper {
  display: flex;
}
.register-outer-wrapper {
  width: 50%;
  display: flex;
  align-items: center;
}
.register-wrapper {
  width: 350px;
  margin-left: auto;
  margin-right: auto;
}
.block {
  display: block;
  width: 100%;
  border: none;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  height: 40px;
}
.block.sodis {
  background-color: #2d91be;
  color: white;
}
.push-to-end {
  display: flex;
  justify-content: flex-end;
}
.image-wrapper {
  background-size: cover;
  background-position: center;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  width: 50%;
}
.background-img {
  height: 100%;
}

@media screen and (max-width: 820px) {
  .image-wrapper {
    display: none;
  }
  .register-outer-wrapper {
    width: 100%;
    margin-top: 50px;
  }
}
</style>
