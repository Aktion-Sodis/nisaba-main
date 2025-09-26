<template>
  <Card
    class="w-full cursor-pointer mb-3 group border border-surface-300 hover:bg-surface-100 hover:border-surface-400 transition duration-200 ease-in-out"
    :class="{
      '!border-primary-500 !bg-primary-50': isSelected,
    }"
    @click="handleClick"
  >
    <template #content>
      <div class="p-2 h-full relative flex flex-col">
        <div class="absolute z-10 top-0 right-0 -mt-1 -mr-3">
          <Button
            severity="light"
            :fluid="false"
            size="small"
            class="w-[2em] h-[2em]"
            aria-haspopup="true"
            :aria-controls="'overlay_menu_entity_' + entity.id"
            @click.stop="toggleEntityMenu($event, entity)"
          >
            <template #icon>
              <i class="pi pi-ellipsis-v"></i>
            </template>
          </Button>
        </div>
        <div class="flex-1 pr-8">
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <h4 class="text-section-inner-subtitle m-0 truncate">
                {{ formatMLString(entity.name, 'en-US') }}
              </h4>
              <i
                v-if="hasChildren"
                class="pi pi-chevron-right text-xs text-surface-400"
                :class="{ 'text-primary-600': isSelected }"
              ></i>
            </div>

            <p v-if="entity.description" class="text-oneliner-light-small m-0">
              {{ formatMLString(entity.description, 'en-US') }}
            </p>

            <div
              v-if="entity.location"
              class="flex items-center gap-1 text-oneliner-light-small"
            >
              <i class="pi pi-map-marker text-xs"></i>
              <span class="truncate">
                {{ formatLocation(entity.location) }}
              </span>
            </div>

            <div
              v-if="entity.customData"
              class="text-oneliner-light-small italic"
            >
              <small>{{ $t('level_entities.entityCard.customData') }}</small>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>

  <!-- Entity Menu -->
  <Menu ref="entityMenu" :model="entityMenuItems" :popup="true" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useLevelEntityStore } from '../levelEntityStore';

import type { StoreEntity } from '@/stores/projectConfigStore';
import { formatMLString, formatLocation } from '@/utils/formatStrings';

interface Props {
  entity: StoreEntity;
  columnIndex: number;
}

const props = defineProps<Props>();

const { t } = useI18n();
const levelEntityStore = useLevelEntityStore();
const entityMenu = ref();

const isSelected = computed(() =>
  levelEntityStore.isEntitySelected(props.entity.id, props.columnIndex)
);

const hasChildren = computed(() => {
  const children = levelEntityStore.getEntityChildren(props.entity.id);
  return children.length > 0;
});

const entityMenuItems = computed(() => [
  {
    label: t('level_entities.entityCard.menu.edit'),
    icon: 'pi pi-pencil',
    command: () => handleEdit(),
  },
  {
    label: t('level_entities.entityCard.menu.view'),
    icon: 'pi pi-eye',
    command: () => handleView(),
  },
]);

const handleClick = () => {
  // Find the level for this entity
  const level = levelEntityStore.levels.find(
    (l) => l.id === props.entity.entityLevelId
  );
  if (level) {
    levelEntityStore.selectEntity(props.entity.id, level.id, props.columnIndex);
  }
};

const toggleEntityMenu = (event: MouseEvent, _entity: StoreEntity) => {
  event.preventDefault();
  entityMenu.value.toggle(event);
};

const handleEdit = () => {
  const level = levelEntityStore.levels.find(
    (l) => l.id === props.entity.entityLevelId
  );
  if (level) {
    levelEntityStore.openEntityDialog(props.entity, true, level);
  }
};

const handleView = () => {
  const level = levelEntityStore.levels.find(
    (l) => l.id === props.entity.entityLevelId
  );
  if (level) {
    levelEntityStore.openEntityDialog(props.entity, false, level);
  }
};
</script>
