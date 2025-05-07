<!-- src/views/NotFound.vue -->
<template>
  <div class="flex w-full items-center justify-center pb-6">
    <div class="flex flex-col gap-7 xl:mx-32 2xl:mx-80">
      <div class="w-full flex flex-col">
        <div class="flex mb-3">
          <h3>
            {{ $t('apps.categories.admin') }}
          </h3>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 h-full gap-4"
        >
          <menu-card
            :title="$t('navigation.menu.surveys.title')"
            :subtitle="$t('navigation.menu.surveys.subtitle')"
            bg-color="bg-secondary-700"
            @click="$router.push('/surveys/overview')"
          >
            <template #icon>
              <i class="pi pi-clipboard text-surface-0 text-5xl md:text-6xl" />
            </template>
          </menu-card>
          <menu-card
            :title="$t('navigation.menu.interventions.title')"
            :subtitle="$t('navigation.menu.interventions.subtitle')"
            bg-color="bg-secondary-700"
            @click="$router.push('/interventions')"
          >
            <template #icon>
              <i class="pi pi-clipboard text-surface-0 text-5xl md:text-6xl" />
            </template>
          </menu-card>

          <!--
                  <menu-card
                    :title="$t('navigation.menu.data_explorer.title')"
                    :subtitle="$t('navigation.menu.data_explorer.subtitle')"
                    bg-color="bg-secondary-800"
                    @click=""
                  >
                    <template #icon>
                    <scatter-plot-svg class="text-surface-0 max-w-12 xl:max-w-14" />
                    </template>
                  </menu-card>
                  <menu-card
                    
                    :title="$t('navigation.menu.deep_fmea.title')"
                    :subtitle="$t('navigation.menu.deep_fmea.subtitle')"
                    bg-color="bg-secondary-700"
                    
                    @click=""
                  >
                    <template #icon>
                    <i class="pi pi-sitemap text-surface-0 text-5xl md:text-6xl" />
                    </template>
                  </menu-card>
                  <menu-card
                    
                    :title="$t('navigation.menu.rules_and_alarms.title')"
                    :subtitle="$t('navigation.menu.rules_and_alarms.subtitle')"
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
import MenuCard from '@/components/cards/MenuCard.vue';
</script>
