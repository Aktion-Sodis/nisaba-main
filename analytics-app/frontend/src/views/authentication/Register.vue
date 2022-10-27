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
        <div class="language-selector">
          <p>{{ $t("register.language") }}</p>
          <LanguageSelector></LanguageSelector>
        </div>
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

import LanguageSelector from "../../components/commons/LanguageSelector.vue";

const backgroundImage = process.env.VITE_APP_LOGIN_BACKGROUND_IMAGE_SRC;
const societyMail = process.env.VITE_APP_SOCIETY_MAIL;
// const backgroundImage = import.meta.env.VITE_APP_LOGIN_BACKGROUND_IMAGE_SRC;
// const societyMail = import.meta.env.VITE_APP_SOCIETY_MAIL;

export default {
  name: "Register",
  components: {
    LanguageSelector,
  },
  data() {
    return {
      backgroundImage,
      societyMail,
      email: "",
      password: "",
      passwordCheck: "",
      passwordsMatch: true,
    };
  },
  methods: {
    async register() {
      let regex = new RegExp("[a-z0-9]+@" + this.societyMail);
      if (!regex.test(this.email)) {
        alert(this.$t("register.emailCheckMessage") + "\n" + this.societyMail);
        return;
      }
      if (this.passwordCheck !== this.password) {
        alert(this.$t("register.passwordCheckMessage"));
        this.passwordCheck = this.password = "";
        return;
      }
      try {
        await Auth.signUp({
          username: this.email,
          password: this.password,
        });
        alert(this.$t("register.registerSuccessMessage"));
        this.$router.push("Login");
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
  border-radius: 5px;
}
.push-to-end {
  display: flex;
  justify-content: flex-end;
}
.language-selector {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
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
