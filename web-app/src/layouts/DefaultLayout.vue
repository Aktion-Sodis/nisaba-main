<template>
  <div class="flex h-screen w-full">
    <div class="relative flex flex-col w-full max-w-full">
      <navbar
        v-if="showNavigation"
        class="sticky top-0 z-50 px-4 transition-all duration-300 ease-in-out"
        @show-configurator="configuratorVisible = true"
      />
      <div ref="scrollContainer" class="flex-grow px-4 overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>

  <sodis-toast />

  <sodis-confirm-dialog />

  <Drawer v-model:visible="configuratorVisible" position="right">
    <template #header>
      <h3
        class="flex items-center gap-2 text-xl font-bold mb-0 text-gray-700 dark:text-gray-200"
      >
        <i class="pi pi-cog" />
        <span>{{ $t('configurator.title') }}</span>
      </h3>
    </template>
    <configurator />
  </Drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import Configurator from '@/components/Configurator.vue';
import Navbar from '@/components/layout/Navbar.vue';
import SodisConfirmDialog from '@/components/SodisConfirmDialog.vue';
import SodisToast from '@/components/SodisToast.vue';

/**
 * Initialize Utilities
 */
const route = useRoute();

const configuratorVisible = ref(false);

/**
 * Computed Properties
 */
const showNavigation = computed(() => route.name !== 'Login');
</script>
