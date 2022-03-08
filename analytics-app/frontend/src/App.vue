<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="navbar">
      <span> <router-link :to="{ name: 'Home' }"> Home </router-link> </span>
      <span>
        <router-link :to="{ name: 'DummyView1' }"> Dummy View 1 </router-link>
      </span>
      <span>
        <router-link :to="{ name: 'DummyView2' }"> Dummy View 2 </router-link>
      </span>
    </div>
    <router-view> </router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
