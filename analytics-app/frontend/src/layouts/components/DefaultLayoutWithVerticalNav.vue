<template>
  <v-layout class="app">
    <v-navigation-drawer class="vertical-navbar">
      <v-list-item class="organization-content ma-4 ml-0">
        <template v-slot:prepend>
          <v-img
            class="organization-img"
            :width="30"
            cover
            src="@/assets/NisabaSmall.png"
          ></v-img>
        </template>
        <v-list-item-title class="organization-name">Nisaba</v-list-item-title>
      </v-list-item>

      <v-list density="compact" nav>
        <v-list-item
          class="vertical-navbar-item"
          :to="{ name: 'Dashboard' }"
          :class="{ 'active-route': $route.name === 'Dashboard' }"
        >
          <template v-slot:prepend>
            <v-icon
              class="vertical-navbar-item-icon"
              icon="mdi-home-city"
            ></v-icon>
          </template>
          <v-list-item-title>{{
            $t("navbar.items.dashboard")
          }}</v-list-item-title>
        </v-list-item>

        <v-list-item
          class="vertical-navbar-item"
          :to="{ name: 'Surveys' }"
          :class="{ 'active-route': $route.name === 'Surveys' }"
        >
          <template v-slot:prepend>
            <v-icon
              class="vertical-navbar-item-icon"
              icon="mdi-account"
            ></v-icon>
          </template>
          <v-list-item-title>{{
            $t("navbar.items.surveys")
          }}</v-list-item-title>
        </v-list-item>

        <v-list-item
          class="vertical-navbar-item"
          :to="{ name: 'Maps' }"
          :class="{ 'active-route': $route.name === 'Maps' }"
        >
          <template v-slot:prepend>
            <v-icon
              class="vertical-navbar-item-icon"
              icon="mdi-google-maps"
            ></v-icon>
          </template>
          <v-list-item-title>{{ $t("navbar.items.maps") }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="main-wrapper ma-0">
      <v-row class="navbar align-center ma-4">
        <v-col offset="9" cols="3" class="d-flex justify-end settings pa-0">
          <div class="language-switcher mr-2">
            <LanguageSwitcher></LanguageSwitcher>
          </div>

          <div class="mr-2 ml-2">
            <ThemeSwitcher></ThemeSwitcher>
          </div>

          <div class="user-profile mr-2">
            <UserProfile></UserProfile>
          </div>
        </v-col>
      </v-row>
      <v-row class="ma-4 ml-2 mr-2">
        <v-col class="pa-0">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
</template>

<script>
import LanguageSwitcher from "@/layouts/components/LanguageSwitcher.vue";
import UserProfile from "@/layouts/components/UserProfile.vue";
import ThemeSwitcher from "@/layouts/components/ThemeSwitcher.vue";

export default {
  components: { LanguageSwitcher, UserProfile, ThemeSwitcher },
};
</script>

<style scoped>
.app {
  max-height: 100vh;
  background-color: rgb(232, 232, 232);
}
.vertical-navbar {
  width: 260px;
  background-color: rgba(var(--v-theme-on-primary), 1);
}
.vertical-navbar-item-icon {
  margin-right: 20px !important;
}
.vertical-navbar-item {
  height: 50px;
}
.vertical-navbar-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.2);
}
.vertical-navbar-item.active-route {
  background-color: rgba(var(--v-theme-primary), 0.8);
  color: rgba(var(--v-theme-on-primary), 1);
}
.organization-content {
  height: 64px;
  display: flex;
  align-items: center;
}
.organization-img {
  margin-right: 10px;
}
.organization-name {
  font-size: 30px;
  color: rgba(var(--v-theme-primary), 1);
}
.navbar {
  background-color: white;
  height: 64px;
  border-radius: 5px;
  box-shadow: inset;
}
.language-switcher {
  margin-top: 6px;
}
.settings {
  padding: 0 !important;
}
.main-wrapper {
  /* overflow-y: auto; */
}
</style>
