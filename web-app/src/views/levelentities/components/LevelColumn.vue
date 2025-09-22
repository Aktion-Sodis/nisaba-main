<template>
  <div class="flex flex-col h-full w-80">
    <!-- Level Header -->
    <Card v-if="level" class="border border-secondary-200 group">
      <template #content>
        <div class="p-2 h-full relative flex flex-col">
          <div class="absolute z-10 top-0 right-0 -mt-1 -mr-3">
            <Button
              severity="light"
              :fluid="false"
              size="small"
              class="w-[2em] h-[2em]"
              aria-haspopup="true"
              :aria-controls="'overlay_menu_level_' + level.id"
              @click.stop="toggleLevelMenu($event, level)"
            >
              <template #icon>
                <i class="pi pi-ellipsis-v"></i>
              </template>
            </Button>
          </div>
          <div class="flex-1 pr-8">
            <h3 class="text-section-inner-title m-0 mb-1 text-secondary-800">
              {{ formatMLString(level.name, 'en-US') }}
            </h3>
            <p
              v-if="level.description"
              class="text-oneliner-light-small m-0 text-surface-600"
            >
              {{ formatMLString(level.description, 'en-US') }}
            </p>
          </div>
        </div>
      </template>
    </Card>

    <!-- Add New Level Column -->
    <Card v-else class="mb-4 border-dashed border-surface-300">
      <template #content>
        <div class="flex flex-col items-center justify-center py-8 text-center">
          <i class="pi pi-plus-circle text-4xl text-surface-400 mb-3"></i>
          <h3 class="text-section-inner-title m-0 mb-2 text-surface-700">
            {{ $t('level_entities.levelColumn.addNewLevel') }}
          </h3>
          <p class="text-oneliner-light-small m-0 mb-4 text-surface-500">
            {{ $t('level_entities.levelColumn.addNewLevelDescription') }}
          </p>
          <Button
            :label="$t('level_entities.levelColumn.addLevel')"
            icon="pi pi-plus"
            size="small"
            @click="levelEntityStore.openLevelDialog(null, false)"
          />
        </div>
      </template>
    </Card>

    <!-- Divider (only for level columns, not add column) -->
    <Divider v-if="level" class="my-4" />

    <!-- Add Entity Button (only for level columns where appropriate) -->
    <div
      v-if="level && shouldShowAddEntityButton"
      class="mb-3 flex items-center justify-between"
    >
      <span class="text-oneliner-light-small text-surface-500">
        {{ $t('level_entities.levelColumn.addEntity') }}
      </span>
      <Button
        :label="$t('level_entities.levelColumn.addEntity')"
        icon="pi pi-plus"
        size="small"
        @click="levelEntityStore.openEntityDialog(null, false)"
      />
    </div>

    <!-- Entities List -->
    <div class="flex-1 overflow-hidden">
      <div
        v-if="level && entities.length === 0"
        class="flex flex-col items-center justify-center h-full text-center py-8"
      >
        <i class="pi pi-inbox text-4xl text-surface-400 mb-3"></i>
        <p class="text-oneliner-light-small m-0 text-surface-500">
          {{ $t('level_entities.levelColumn.noEntities') }}
        </p>
      </div>

      <div v-else-if="level" class="h-full overflow-y-auto">
        <entity-card
          v-for="entity in entities"
          :key="entity.id"
          :entity="entity"
          :column-index="columnIndex"
        />
      </div>
    </div>

    <!-- Level Menu -->
    <Menu ref="levelMenu" :model="levelMenuItems" :popup="true" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useLevelEntityStore } from '../levelEntityStore';
import EntityCard from './EntityCard.vue';

import type { StoreLevel } from '@/stores/projectConfigStore';
import { formatMLString } from '@/utils/formatStrings';

interface Props {
  level: StoreLevel | null;
  columnIndex: number;
}

const props = defineProps<Props>();

const { t } = useI18n();
const levelEntityStore = useLevelEntityStore();
const levelMenu = ref();
const selectedLevelForMenu = ref<StoreLevel | null>(null);

const entities = computed(() => {
  return levelEntityStore.getEntitiesForColumn(props.columnIndex);
});

const shouldShowAddEntityButton = computed(() => {
  // Always show for top level (first column)
  if (props.columnIndex === 0) {
    return true;
  }

  // For other levels, only show if there's a selection in the level below
  // (i.e., if there's a selection for the previous column)
  return props.columnIndex <= levelEntityStore.selectedPath.length;
});

const levelMenuItems = computed(() => {
  if (!selectedLevelForMenu.value) {
    return [];
  }

  return [
    {
      label: t('level_entities.levelMenu.view'),
      icon: 'pi pi-fw pi-eye',
      command: () => {
        if (selectedLevelForMenu.value) {
          levelEntityStore.openLevelDialog(
            selectedLevelForMenu.value,
            false,
            true
          );
        }
      },
    },
    {
      label: t('level_entities.levelMenu.edit'),
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        if (selectedLevelForMenu.value) {
          levelEntityStore.openLevelDialog(
            selectedLevelForMenu.value,
            true,
            false
          );
        }
      },
    },
  ];
});

const toggleLevelMenu = (event: Event, level: StoreLevel) => {
  selectedLevelForMenu.value = level;
  levelMenu.value.toggle(event);
};
</script>
