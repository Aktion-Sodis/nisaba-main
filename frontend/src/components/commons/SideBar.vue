<template>
    <v-navigation-drawer permanent expand-on-hover class="primary-dark" width="17rem">
        <!-- expand-on-hover -->
        <div class="side-bar-inner-wrapper">
            <div>
                <v-list>
                    <v-list-item class="px-2">
                        <v-list-item-avatar>
                            <v-img src="../../static/aktionSodisSmall.png"></v-img>
                        </v-list-item-avatar>
                    </v-list-item>
                </v-list>

                <v-list nav dense class="mt-12">
                    <v-list-item-group v-model="model" active-class="primary darken-3">
                        <v-list-item :to="{ name: 'Home' }">
                            <v-list-item-icon>
                                <v-icon color="white">mdi-home-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="white--text text-body-1">Home</v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon color="white">mdi-domain</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="white--text text-body-1">Base data</v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon color="white">mdi-clipboard-text-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title
                                class="white--text text-body-1"
                            >Organization structure</v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon color="white">mdi-wrench-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="white--text text-body-1">Technologies</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </div>

            <v-list dense>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon color="white">mdi-cog-outline</v-icon>
                    </v-list-item-icon>
                </v-list-item>
                <v-list-item class="px-2">
                    <v-list-item-avatar>
                        <v-img src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
                    </v-list-item-avatar>
                    <div class="next-to-avatar">
                        <v-list-item-content>
                            <v-list-item-title class="text-h6 white--text">Lorem ipsum</v-list-item-title>
                            <v-list-item-subtitle class="white--text">sandra_a88@gmail.com</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-icon color="white">mdi-exit-to-app</v-icon>
                    </div>
                </v-list-item>
            </v-list>
        </div>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "SideBar",
    data: () => ({}),
    computed: {
        ...mapGetters({
            isAuthenticated: "auth/getIsAuthenticated",
        })
    },
};
</script>

<style scoped>
.side-bar-inner-wrapper {
    height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.next-to-avatar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
</style>