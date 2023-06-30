<template>
    <v-layout class="app">
        <v-navigation-drawer class="vertical-navbar">

            <v-list-item
                    class="organization-content"
                >
                    <template v-slot:prepend>
                        <v-img class="organization-img" :width="30" cover src="@/assets/NisabaSmall.png"></v-img>
                    </template>
                    <v-list-item-title class="organization-name">Nisaba</v-list-item-title>
            </v-list-item>

            <v-list class="vertical-navbar-item-list" density="compact" nav>

                <v-list-item
                    class="vertical-navbar-item"
                    :to="{ name: 'Dashboard' }"
                    :class="{ 'active-route': $route.name === 'Dashboard' }"
                >
                    <template v-slot:prepend>
                        <v-icon class="vertical-navbar-item-icon" icon="mdi-home-city"></v-icon>
                    </template>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>

                <v-list-item
                    class="vertical-navbar-item"
                >
                    <template v-slot:prepend>
                        <v-icon class="vertical-navbar-item-icon" icon="mdi-account"></v-icon>
                    </template>
                    <v-list-item-title>Surveys</v-list-item-title>
                </v-list-item>

                <v-list-item
                    class="vertical-navbar-item"
                >
                    <template v-slot:prepend>
                        <v-icon class="vertical-navbar-item-icon" icon="mdi-google-maps"></v-icon>
                    </template>
                    <v-list-item-title>Maps</v-list-item-title>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>
        <v-main class="main-wrapper">
            <v-row class="navbar align-center">
                <v-col offset="9" cols="3" class="d-flex justify-end settings">
    
                        <div class="language-switcher">
                            <LanguageSwitcher></LanguageSwitcher>
                        </div>

                        <div class="theme-switcher">
                            <ThemeSwitcher></ThemeSwitcher>
                        </div>

                        <div class="user-profile">
                            <UserProfile></UserProfile>
                        </div>

                </v-col>
            </v-row>
            <v-row class="main-content">
                <v-col cols="12">
                    <router-view></router-view>
                </v-col>
            </v-row>
        </v-main>
    </v-layout>
</template>

<script>
import LanguageSwitcher from '@/layouts/components/LanguageSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import ThemeSwitcher from '@/layouts/components/ThemeSwitcher.vue';

export default {
    components: { LanguageSwitcher, UserProfile, ThemeSwitcher },
}
</script>

<style scoped>
.user-profile {
    margin-right: 10px;
}
.language-switcher {
    margin-top: 6px;
    margin-right: 10px;
}
.settings {
    padding: 0 !important;
}
.vertical-navbar-item-list {
    padding-top: 0 !important;
}
.main-wrapper {
    overflow-y: auto;
    margin: 0 !important;
}
.vertical-navbar-item-icon {
    margin-right: 20px !important;
}
.vertical-navbar-item {
    height: 50px;
    margin-bottom: 5px !important;
}
.vertical-navbar-item:hover {
    background-color: rgba(var(--v-theme-primary), 0.2);
}
.vertical-navbar-item.active-route {
    background-color: rgba(var(--v-theme-primary), 0.8);
    color: rgba(var(--v-theme-on-primary), 1)
}
.app {
    max-height: 100vh;
    background-color: rgb(232, 232, 232);
}
.vertical-navbar {
    width: 260px;
    background-color: rgba(var(--v-theme-on-primary), 1);
}
.organization-content {
    height: 64px;
    margin-top: 10px;
    margin-bottom: 10px;
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
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    height: 64px;
    border-radius: 5px;
    box-shadow: inset;
}
.main-content {
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>