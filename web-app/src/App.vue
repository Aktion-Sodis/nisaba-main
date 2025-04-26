<!-- src/App.vue -->
<template>
  <div id="app" class="bg-surface-100">
    <component :is="layoutComponent">
      <router-view />
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { AuthenticationState, useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { useProjectConfigStore } from '@/stores/projectConfigStore';

import BlankLayout from '@/layouts/BlankLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import router from './router';

const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();
const projectConfigStore = useProjectConfigStore();

const layoutComponent = computed(() => {
  if (route.meta.layout === 'BlankLayout') {
    return BlankLayout;
  }
  return DefaultLayout;
});

onMounted(() => {
  authStore.checkAuth().then((_) => {
    if(authStore.authenticationState === AuthenticationState.LoggedIn) {
      if (authStore.user?.userId) {
        userStore.initialize(authStore.user.userId);
      }
      router.push('/');
    }
    else {
      router.push('/login');
    }
  });
});

watch(() => authStore.authenticationState, (newState, oldState) => {
  if(newState === AuthenticationState.LoggedOut || newState === AuthenticationState.PasswordResetRequired) {
    router.push('/login');
    userStore.clear();
    projectConfigStore.clear();
  }
  else if(newState === AuthenticationState.LoggedIn && oldState !== AuthenticationState.LoggedIn) {
    if(authStore.user?.userId) {
      userStore.initialize(authStore.user.userId);
      projectConfigStore.initialize();
    }
  }
});
</script>