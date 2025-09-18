<template>
  <div class="h-full pb-4">
    <Card class="h-full">
      <template #title>
        <div class="flex justify-between items-center w-full">
          <span class="text-screen-title">
            {{ $t('apps.apps.analytics_aggregated.title') }}
          </span>
        </div>
      </template>

      <template #subtitle>
        <span class="text-oneliner-light">
          {{ $t('apps.apps.analytics_aggregated.description') }}
        </span>
      </template>

      <template #content>
        <div
          class="flex flex-col items-center justify-center gap-4 p-8 text-center"
        >
          <i class="pi pi-chart-bar text-[3rem] text-surface-400"></i>
          <p class="text-oneliner-light text-surface-500">
            {{ $t('analytics_aggregated.coming_soon') }}
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup></script>
