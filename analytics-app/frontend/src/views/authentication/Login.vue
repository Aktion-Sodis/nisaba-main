<template>
  <div class="outer-wrapper">
    <div class="login-outer-wrapper">
      <div class="login-wrapper">
        <h1>{{ $t("login.title") }}</h1>
        <p>{{ $t("login.message") }}</p>
        <el-form>
          <el-form-item required class="username-wrapper">
            <el-input v-model="email" :placeholder="$t('login.email')" />
          </el-form-item>
          <el-form-item required class="password-wrapper">
            <el-input
              v-model="password"
              type="password"
              :placeholder="$t('login.password')"
              show-password
            />
          </el-form-item>
          <!-- <el-form-item class="rememberMe-wrapper">
            <el-checkbox v-model="rememberMe">{{
              $t("login.rememberMe")
            }}</el-checkbox>
          </el-form-item> -->
          <el-form-item class="sign-in-wrapper">
            <el-button @click="login" class="block sodis">
              {{ $t("login.signIn") }}
            </el-button>
          </el-form-item>
          <el-form-item class="google-sign-in-wrapper">
            <el-button type="default" class="block" @click="toggleAlert()">
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- eslint-disable max-len -->
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path
                    fill="#4285F4"
                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                  />
                </g>
                <!-- eslint-enable max-len -->
              </svg>
              <p class="google-text-wrapper">{{ $t("login.googleSignIn") }}</p>
            </el-button>
          </el-form-item>
          <div class="push-to-end">
            <p>
              {{ $t("login.noAccount") }}
              <router-link to="/register">
                <a
                  href="#"
                  class="font-weight-bold font-italic text-decoration-none"
                >
                  {{ $t("login.registerHere") }}
                </a>
              </router-link>
            </p>
          </div>
          <div class="language-selector">
            <p>{{ $t("login.language") }}</p>
            <LanguageSelector></LanguageSelector>
          </div>
        </el-form>
      </div>
    </div>

    <div
      class="image-wrapper"
      :style="{ 'background-image': `url(${this.backgroundImage})` }"
    ></div>
  </div>
</template>

<script>
import "element-plus/theme-chalk/display.css";

import LanguageSelector from "../../components/commons/LanguageSelector.vue";

const backgroundImage = import.meta.env.VITE_APP_LOGIN_BACKGROUND_IMAGE_SRC;

import { Auth, DataStore } from "aws-amplify";
import { Organization } from '../../models';
import { rememberOrganization } from '../../local_storage/organization.js';

export default {
  name: "Login",
  components: {
    LanguageSelector,
  },
  methods: {
    async login() {
      try {
        const user = await Auth.signIn(this.email, this.password);
        const organizationID = user["attributes"]["custom:organization_id"]
        
        // Save the organization name locally
        const apiOrganization = await DataStore.query(Organization, organizationID);
        rememberOrganization(apiOrganization)
      } catch (error) {
        alert(error.message);
      }
    },
    toggleAlert() {
      alert("Function not implemented yet :)");
    },
  },
  data() {
    return {
      backgroundImage,
      email: "",
      password: "",
      rememberMe: false,
    };
  },
};
</script>

<style scoped>
.outer-wrapper {
  display: flex;
}
.login-outer-wrapper {
  width: 50%;
  display: flex;
  align-items: center;
}
.login-wrapper {
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
.google-sign-in-wrapper .block {
  border: 1px solid rgb(213, 213, 213);
}
.google-text-wrapper {
  margin-left: 5px;
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
  .login-outer-wrapper {
    width: 100%;
    margin-top: 50px;
  }
}
</style>
