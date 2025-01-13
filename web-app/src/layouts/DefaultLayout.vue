<template>
  <div class="flex h-screen w-full">
    <div
      class="relative flex flex-col flex-grow px-4 transition-all duration-300 ease-in-out"
      @click="handlePageClick"
      @touchstart="handlePageClick"
    >
      <navbar
        v-if="showNavigation"
        @show-configurator="configuratorVisible = true"
      />
      <loading-spinner
        v-if="isGlobalLoading"
        :is-loading="isGlobalLoading"
        :size="globalLoadingSize"
        :height="globalLoadingHeight"
      />
      <div v-else ref="scrollContainer" class="flex-grow">
        <router-view @is-global-loading="setGlobalLoading" />
      </div>
    </div>
  </div>

  <alpamayo-toast />

  <alpamayo-confirm-dialog />

  <Drawer v-model:visible="configuratorVisible" position="right">
    <template #header>
      <h3
        class="flex items-center gap-2 text-xl font-bold mb-0 text-gray-700 dark:text-gray-200"
      >
        <i class="pi pi-cog" />
        <span>{{ $t('heading.setting.title') }}</span>
      </h3>
    </template>
    <configurator />
  </Drawer>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AlpamayoConfirmDialog from '@/components/AlpamayoConfirmDialog.vue';
import AlpamayoToast from '@/components/AlpamayoToast.vue';
import Configurator from '@/components/Configurator.vue';
import Navbar from '@/components/Navbar.vue';
import { useSettingsStore } from '@/store/settings';

/**
 * Initialize Utilities
 * Sets up utility functions and services for use throughout the component.
 */
const route = useRoute();

/**
 * Initialize Stores
 * Initializes state management stores to handle and share data across components.
 */
const settingsStore = useSettingsStore();

/**
 * Reactive States
 * Defines reactive data that automatically triggers UI updates when changed.
 */
const isGlobalLoading = ref(false);
const globalLoadingSize = ref<string | undefined>(undefined);
const globalLoadingHeight = ref<number | undefined>(undefined);
const configuratorVisible = ref(false);
const sidebar = ref<InstanceType<typeof Sidebar> | null>(null);

/**
 * Computed Properties
 * Defines properties that derive values from reactive state, updated automatically when dependencies change.
 */
const sidebarFixed = computed(() => settingsStore.sidebarFixed);
const showNavigation = computed(() => route.name !== 'Start');

/**
 * Define Methods
 * Defines functions that perform specific actions or handle events within the component.
 */
const setGlobalLoading = ({
  isLoading,
  size,
  height,
}: {
  isLoading: boolean;
  size?: string;
  height?: number;
}) => {
  isGlobalLoading.value = isLoading;
  if (size) globalLoadingSize.value = size;
  if (height) globalLoadingHeight.value = height;
};

const handlePageClick = () => {
  if (sidebar.value) {
    sidebar.value.handlePageClick(); // Call a method on the Sidebar component
  }
};

onMounted(() => {
  settingsStore.isMobile = window.innerWidth < 768;
  settingsStore.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  settingsStore.isDesktop = window.innerWidth >= 1024;

  const onResize = () => {
    settingsStore.isMobile = window.innerWidth < 768;
    settingsStore.isTablet =
      window.innerWidth >= 768 && window.innerWidth < 1024;
    settingsStore.isDesktop = window.innerWidth >= 1024;
  };
  window.addEventListener('resize', onResize);
  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });
});
</script>
