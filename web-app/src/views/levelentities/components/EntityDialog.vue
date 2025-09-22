<template>
  <div class="entity-dialog">
    <div class="flex flex-col gap-4">
      <div class="text-center py-8">
        <i class="pi pi-building text-4xl text-surface-400 mb-3"></i>
        <h3 class="text-lg font-medium text-surface-700 m-0 mb-2">
          {{ $t('level_entities.entityDialog.placeholder.title') }}
        </h3>
        <p class="text-sm text-surface-500 m-0">
          {{ $t('level_entities.entityDialog.placeholder.description') }}
        </p>
      </div>

      <div class="flex justify-end gap-2">
        <Button
          :label="$t('common.cancel')"
          severity="secondary"
          @click="levelEntityStore.closeEntityDialog"
        />
        <Button :label="$t('common.save')" @click="handleSave" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLevelEntityStore } from '../levelEntityStore';

import type { StoreEntity } from '@/stores/projectConfigStore';

interface Props {
  entity: StoreEntity | null;
  isEditMode: boolean;
}

defineProps<Props>();

const levelEntityStore = useLevelEntityStore();

const handleSave = () => {
  // Placeholder implementation
  const mockEntity = {
    id: 'mock-entity-id',
    name: {
      languageKeys: ['en-US'],
      languageTexts: ['Mock Entity'],
      __typename: 'I18nString',
    },
    description: {
      languageKeys: ['en-US'],
      languageTexts: ['Mock entity description'],
      __typename: 'I18nString',
    },
    parentEntityID: null,
    location: 'Mock Location',
    customData: null,
    schemeVersion: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _version: 1,
    _deleted: false,
    _lastChangedAt: Date.now(),
    organization_id: 'mock-org-id',
    entityLevelId: 'mock-level-id',
    __typename: 'Entity',
  } as unknown as StoreEntity;

  console.log('Entity saved:', mockEntity);
  levelEntityStore.closeEntityDialog();
};
</script>
