<template>
  <Card>
    <template #content>
      <div class="flex justify-between items-center gap-4">
        <!-- Label -->
        <h3 class="text-label">
          {{ $t('analytics_aggregated.filters.title') }}
        </h3>

        <!-- Filter Controls -->
        <div class="flex justify-end items-center gap-4">
          <!-- Entity MultiSelect -->
          <MultiSelect
            v-model="localFiltersEntitiesComputed"
            :options="groupedEntities"
            option-group-label="label"
            option-group-children="items"
            option-label="name"
            option-value="id"
            display="chip"
            filter
            :placeholder="$t('analytics_aggregated.filters.select_entities')"
          />

          <!-- Executor MultiSelect -->
          <MultiSelect
            v-model="localFiltersExecutorsComputed"
            :options="analyticsStore.executorOptions"
            option-label="displayName"
            option-value="id"
            display="chip"
            filter
            :placeholder="$t('analytics_aggregated.filters.select_executors')"
          />

          <!-- Date Range Picker -->
          <DatePicker
            v-model="localDateRange"
            selection-mode="range"
            :min-date="analyticsStore.dateRangeLimits.minDate"
            :max-date="analyticsStore.dateRangeLimits.maxDate"
            :placeholder="$t('analytics_aggregated.filters.select_date_range')"
          />

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <Button
              :label="$t('analytics_aggregated.filters.apply')"
              :disabled="!hasUnappliedChanges"
              @click="applyFilters"
            />
            <Button
              :label="$t('analytics_aggregated.filters.clear')"
              severity="secondary"
              variant="outlined"
              :disabled="!hasAnyFilters"
              @click="clearFilters"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAnalyticsStore } from '@/stores/analytics';
import { formatMLString } from '@/utils/formatStrings';

const { locale } = useI18n();
const analyticsStore = useAnalyticsStore();

// Local filter state (not applied until "Apply" is clicked) - using direct refs
const localFiltersEntities = ref<string[]>([]);
const localFiltersExecutors = ref<string[]>([]);
const localFiltersStartDate = ref<string | undefined>(undefined);
const localFiltersEndDate = ref<string | undefined>(undefined);

// Computed getters/setters that return null when empty (for PrimeVue placeholder detection)
const localFiltersEntitiesComputed = computed({
  get: () => {
    return localFiltersEntities.value.length > 0
      ? localFiltersEntities.value
      : null;
  },
  set: (value: string[] | null) => {
    localFiltersEntities.value = value || [];
  },
});

const localFiltersExecutorsComputed = computed({
  get: () => {
    return localFiltersExecutors.value.length > 0
      ? localFiltersExecutors.value
      : null;
  },
  set: (value: string[] | null) => {
    localFiltersExecutors.value = value || [];
  },
});

// Local date range (synced with localFilters, only applied to store on Apply)
const localDateRange = computed({
  get: () => {
    if (!localFiltersStartDate.value && !localFiltersEndDate.value) return null;
    const dates: (Date | null)[] = [
      localFiltersStartDate.value
        ? new Date(localFiltersStartDate.value)
        : null,
      localFiltersEndDate.value ? new Date(localFiltersEndDate.value) : null,
    ];
    return dates.filter(Boolean) as Date[];
  },
  set: (value: Date[] | null) => {
    if (!value || value.length === 0) {
      localFiltersStartDate.value = undefined;
      localFiltersEndDate.value = undefined;
    } else {
      localFiltersStartDate.value = value[0]?.toISOString().split('T')[0];
      localFiltersEndDate.value = value[1]?.toISOString().split('T')[0];
    }
  },
});

// Grouped entities by level
const groupedEntities = computed(() => {
  const entities = analyticsStore.availableEntities;
  const levelMap = new Map<
    string,
    { label: string; items: Array<{ id: string; name: string }> }
  >();

  entities.forEach((entity) => {
    const levelId = entity.level.id;
    const levelName = formatMLString(entity.level.name, locale.value);

    if (!levelMap.has(levelId)) {
      levelMap.set(levelId, {
        label: levelName,
        items: [],
      });
    }

    levelMap.get(levelId)!.items.push({
      id: entity.id,
      name: formatMLString(entity.name, locale.value),
    });
  });

  return Array.from(levelMap.values());
});

// Check if there are unapplied changes
const hasUnappliedChanges = computed(() => {
  const storeFilters = analyticsStore.filters;
  const localEntities = [...localFiltersEntities.value].sort();
  const storeEntities = [...(storeFilters.entities || [])].sort();
  const localExecutors = [...localFiltersExecutors.value].sort();
  const storeExecutors = [...(storeFilters.executors || [])].sort();

  return (
    JSON.stringify(localEntities) !== JSON.stringify(storeEntities) ||
    JSON.stringify(localExecutors) !== JSON.stringify(storeExecutors) ||
    localFiltersStartDate.value !== storeFilters.startDate ||
    localFiltersEndDate.value !== storeFilters.endDate
  );
});

// Check if any filters are set
const hasAnyFilters = computed(() => {
  return (
    localFiltersEntities.value.length > 0 ||
    localFiltersExecutors.value.length > 0 ||
    localFiltersStartDate.value !== undefined ||
    localFiltersEndDate.value !== undefined
  );
});

// Apply filters to store
const applyFilters = async () => {
  await analyticsStore.updateFilters({
    entities:
      localFiltersEntities.value.length > 0
        ? localFiltersEntities.value
        : undefined,
    executors:
      localFiltersExecutors.value.length > 0
        ? localFiltersExecutors.value
        : undefined,
    startDate: localFiltersStartDate.value,
    endDate: localFiltersEndDate.value,
  });
};

// Clear all filters
const clearFilters = async () => {
  localFiltersEntities.value = [];
  localFiltersExecutors.value = [];
  localFiltersStartDate.value = undefined;
  localFiltersEndDate.value = undefined;
  await analyticsStore.clearFilters();
};

// Sync local state when store filters change (e.g., on survey change)
watch(
  () => analyticsStore.filters,
  (newFilters) => {
    localFiltersEntities.value = newFilters.entities
      ? [...newFilters.entities]
      : [];
    localFiltersExecutors.value = newFilters.executors
      ? [...newFilters.executors]
      : [];
    localFiltersStartDate.value = newFilters.startDate;
    localFiltersEndDate.value = newFilters.endDate;
  },
  { deep: true, immediate: true }
);
</script>
