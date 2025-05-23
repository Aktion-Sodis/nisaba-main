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

import router from './router';

import BlankLayout from '@/layouts/BlankLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { AuthenticationState, useAuthStore } from '@/stores/auth';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { useUserStore } from '@/stores/user';

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
  authStore.checkAuth().then(async (_) => {
    if (authStore.authenticationState === AuthenticationState.LoggedIn) {
      if (authStore.user?.userId) {
        try {
          const userData = await userStore.getUserAsync(authStore.user.userId);
          if (userData === null) {
            // User is authenticated but doesn't have a profile
            authStore.authenticationState =
              AuthenticationState.ProfileSetupRequired;
            router.push('/login');
          } else {
            // User exists and is authenticated
            router.push('/');
          }
        } catch (error) {
          console.error('Error checking user profile:', error);
          authStore.authenticationState = AuthenticationState.LoggedOut;
          router.push('/login');
        }
      }
    } else {
      router.push('/login');
    }
  });
});

watch(
  () => authStore.authenticationState,
  (newState, oldState) => {
    if (
      newState === AuthenticationState.LoggedOut ||
      newState === AuthenticationState.PasswordResetRequired ||
      newState === AuthenticationState.ProfileSetupRequired
    ) {
      router.push('/login');
      if (newState === AuthenticationState.LoggedOut) {
        userStore.clear();
        projectConfigStore.clear();
      }
    } else if (
      newState === AuthenticationState.LoggedIn &&
      oldState !== AuthenticationState.LoggedIn
    ) {
      if (authStore.user?.userId) {
        userStore.initialize(authStore.user.userId);
        projectConfigStore.initialize();
      }
    }
  }
);
</script>
