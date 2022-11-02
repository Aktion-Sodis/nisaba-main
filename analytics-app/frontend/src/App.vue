<template>
  <div class="app">
    <div class="navbar-wrapper">
      <Navbar v-if="!$route.meta.hideNavbar" />
    </div>
    <div class="main-wrapper" v-if="!$route.meta.hideNavbar">
      <router-view></router-view>
    </div>
    <div class="login-wrapper" v-if="$route.meta.hideNavbar">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";

// console.log(import.meta.env);

export default {
  components: { Navbar },
};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
:root {
  --bg-color: rgb(45, 145, 190);
  --bg-color-bright: rgb(66, 195, 255);
  --item-hover: #64aa73;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar-wrapper {
  z-index: 100;
  position: sticky;
  top: 0;
}
.main-wrapper {
  background-color: rgb(236, 245, 254);
  margin-left: var(--sidebar-width);
  margin-top: var(--navbar-height);
  height: calc(100vh - var(--navbar-height));
  width: calc(100vw - var(--sidebar-width));
}
</style>
