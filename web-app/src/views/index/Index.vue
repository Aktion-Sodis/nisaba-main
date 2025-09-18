<!-- src/views/NotFound.vue -->
<template>
  <div class="flex w-full items-center justify-center pb-6">
    <div class="flex flex-col gap-7 xl:mx-32 2xl:mx-80">
      <div v-if="hasAdminRights" class="w-full flex flex-col">
        <div class="flex mb-3">
          <h3>
            {{ $t('apps.categories.admin') }}
          </h3>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 h-full gap-4"
        >
          <menu-card
            v-if="hasAdminRights"
            :title="$t('apps.apps.surveys.title')"
            :subtitle="$t('apps.apps.surveys.description')"
            bg-color="bg-secondary-700"
            @click="$router.push('/surveys/overview')"
          >
            <template #icon>
              <i class="pi pi-clipboard text-surface-0 text-5xl md:text-6xl" />
            </template>
          </menu-card>
          <menu-card
            v-if="hasAdminRights"
            :title="$t('apps.apps.interventions.title')"
            :subtitle="$t('apps.apps.interventions.description')"
            bg-color="bg-secondary-700"
            @click="$router.push('/interventions')"
          >
            <template #icon>
              <i class="pi pi-clipboard text-surface-0 text-5xl md:text-6xl" />
            </template>
          </menu-card>

          <!--
                  <menu-card
                    :title="$t('apps.apps.data_explorer.title')"
                    :subtitle="$t('apps.apps.data_explorer.description')"
                    bg-color="bg-secondary-800"
                    @click=""
                  >
                    <template #icon>
                    <scatter-plot-svg class="text-surface-0 max-w-12 xl:max-w-14" />
                    </template>
                  </menu-card>
                  <menu-card
                    
                    :title="$t('apps.apps.deep_fmea.title')"
                    :subtitle="$t('apps.apps.deep_fmea.description')"
                    bg-color="bg-secondary-700"
                    
                    @click=""
                  >
                    <template #icon>
                    <i class="pi pi-sitemap text-surface-0 max-w-12 xl:max-w-14" />
                    </template>
                  </menu-card>
                  <menu-card
                    
                    :title="$t('apps.apps.rules_and_alarms.title')"
                    :subtitle="$t('apps.apps.rules_and_alarms.description')"
                    bg-color="bg-secondary-600"
                    
                    @click=""
                  >
                    <template #icon>
                    <warning-svg class="text-surface-0 max-w-12 xl:max-w-14" />
                    </template>
                  </menu-card>
            -->
        </div>
      </div>
      <div v-if="hasAnalyticsRights" class="w-full flex flex-col">
        <div class="flex mb-3">
          <h3>
            {{ $t('apps.categories.analytics') }}
          </h3>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 h-full gap-4"
        >
          <menu-card
            v-if="hasAnalyticsRights"
            :title="$t('apps.apps.analytics.title')"
            :subtitle="$t('apps.apps.analytics.description')"
            bg-color="bg-secondary-800"
            @click="$router.push('/analytics/survey-overview')"
          >
            <template #icon>
              <i class="pi pi-chart-bar text-surface-0 text-5xl md:text-6xl" />
            </template>
          </menu-card>
        </div>
      </div>
      <div v-if="hasAdminRights" class="w-full flex flex-col">
        <div class="flex mb-3">
          <h3>
            {{ $t('apps.categories.settings') }}
          </h3>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 h-full gap-4"
        >
          <menu-card
            v-if="hasAdminRights"
            :title="$t('apps.apps.users.title')"
            :subtitle="$t('apps.apps.users.description')"
            bg-color="bg-surface-400"
            @click="$router.push('/users')"
          >
            <template #icon>
              <i class="pi pi-users text-surface-0 text-5xl md:text-6xl" />
            </template>
          </menu-card>

          <!--
                  <menu-card
                    :title="$t('apps.apps.data_explorer.title')"
                    :subtitle="$t('apps.apps.data_explorer.description')"
                    bg-color="bg-secondary-800"
                    @click=""
                  >
                    <template #icon>
                    <scatter-plot-svg class="text-surface-0 max-w-12 xl:max-w-14" />
                    </template>
                  </menu-card>
                  <menu-card
                    
                    :title="$t('apps.apps.deep_fmea.title')"
                    :subtitle="$t('apps.apps.deep_fmea.description')"
                    bg-color="bg-secondary-700"
                    
                    @click=""
                  >
                    <template #icon>
                    <i class="pi pi-sitemap text-surface-0 max-w-12 xl:max-w-14" />
                    </template>
                  </menu-card>
                  <menu-card
                    
                    :title="$t('apps.apps.rules_and_alarms.title')"
                    :subtitle="$t('apps.apps.rules_and_alarms.description')"
                    bg-color="bg-secondary-600"
                    
                    @click=""
                  >
                    <template #icon>
                    <warning-svg class="text-surface-0 max-w-12 xl:max-w-14" />
                    </template>
                  </menu-card>
            -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import MenuCard from '@/components/cards/MenuCard.vue';
import { useAuthStore } from '@/stores/auth';
import { UserGroup, hasRights } from '@/types/UserGroup';

const authStore = useAuthStore();

const hasAdminRights = computed(() => {
  return (
    authStore.highestRole && hasRights(authStore.highestRole, UserGroup.ADMIN)
  );
});

const hasAnalyticsRights = computed(() => {
  return (
    authStore.highestRole &&
    hasRights(authStore.highestRole, UserGroup.ANALYTICS)
  );
});
</script>
