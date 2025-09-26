import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import { useProjectConfigStore } from '@/stores/projectConfigStore';
import type { StoreLevel, StoreEntity } from '@/stores/projectConfigStore';

export interface EntitySelectionPath {
  levelId: string;
  entityId: string;
}

export const useLevelEntityStore = defineStore('levelEntity', () => {
  const projectConfigStore = useProjectConfigStore();

  // State
  const selectedPath = reactive<EntitySelectionPath[]>([]);
  const isAddingNewLevel = ref(false);

  // Dialog state
  const showLevelDialog = ref(false);
  const showEntityDialog = ref(false);
  const selectedLevel = ref<StoreLevel | null>(null);
  const selectedEntity = ref<StoreEntity | null>(null);
  const isEditingLevel = ref(false);
  const isEditingEntity = ref(false);
  const isViewingLevel = ref(false);

  // Computed properties
  const levels = computed(() => projectConfigStore.levelsSortedByHierarchy);
  const entities = computed(() => projectConfigStore.entities);

  // Get entities for a specific level
  const getEntitiesForLevel = (levelId: string): StoreEntity[] => {
    return entities.value.filter((entity) => entity.entityLevelId === levelId);
  };

  // Get top-level entities (entities with no parent)
  const getTopLevelEntities = (): StoreEntity[] => {
    return entities.value.filter((entity) => !entity.parentEntityID);
  };

  // Get children of a specific entity
  const getEntityChildren = (entityId: string): StoreEntity[] => {
    return entities.value.filter(
      (entity) => entity.parentEntityID === entityId
    );
  };

  // Get entities to display in a specific column based on current selection path
  const getEntitiesForColumn = (columnIndex: number): StoreEntity[] => {
    if (columnIndex === 0) {
      // First column always shows top-level entities
      return getTopLevelEntities();
    }

    if (columnIndex > selectedPath.length) {
      // No selection for this column level yet
      return [];
    }

    // Get the selected entity for the previous column
    const previousSelection = selectedPath[columnIndex - 1];
    if (!previousSelection) {
      return [];
    }

    // Get children of the selected entity from the previous column
    return getEntityChildren(previousSelection.entityId);
  };

  // Get the level for a specific column
  const getLevelForColumn = (columnIndex: number): StoreLevel | null => {
    if (columnIndex >= levels.value.length) {
      return null; // This would be the "add new level" column
    }
    return levels.value[columnIndex];
  };

  // Check if an entity is selected
  const isEntitySelected = (entityId: string, columnIndex: number): boolean => {
    return selectedPath[columnIndex]?.entityId === entityId;
  };

  // Select an entity and update the path
  const selectEntity = (
    entityId: string,
    levelId: string,
    columnIndex: number
  ) => {
    // Truncate the path at this column index
    selectedPath.splice(columnIndex);

    // Add the new selection
    selectedPath.push({ entityId, levelId });
  };

  // Clear selection from a specific column onwards
  const clearSelectionFrom = (columnIndex: number) => {
    selectedPath.splice(columnIndex);
  };

  // Initialize with default selection (first top-level entity and its first child, etc.)
  const initializeDefaultSelection = () => {
    selectedPath.splice(0);

    const topLevelEntities = getTopLevelEntities();
    if (topLevelEntities.length === 0) return;

    let currentEntity = topLevelEntities[0];
    let currentLevelIndex = 0;

    // Find the level for the first entity
    const firstLevel = levels.value.find((level) =>
      getEntitiesForLevel(level.id).some(
        (entity) => entity.id === currentEntity.id
      )
    );

    if (firstLevel) {
      selectedPath.push({ entityId: currentEntity.id, levelId: firstLevel.id });
      currentLevelIndex++;
    }

    // Continue down the hierarchy
    while (currentLevelIndex < levels.value.length) {
      const children = getEntityChildren(currentEntity.id);
      if (children.length === 0) break;

      currentEntity = children[0];
      const level = levels.value[currentLevelIndex];
      if (level) {
        selectedPath.push({ entityId: currentEntity.id, levelId: level.id });
        currentLevelIndex++;
      } else {
        break;
      }
    }
  };

  // Get the currently selected entity for a column
  const getSelectedEntityForColumn = (
    columnIndex: number
  ): StoreEntity | null => {
    const selection = selectedPath[columnIndex];
    if (!selection) return null;

    return (
      entities.value.find((entity) => entity.id === selection.entityId) || null
    );
  };

  // Get the full selection path as entities
  const getFullSelectionPath = (): StoreEntity[] => {
    return selectedPath
      .map((selection) =>
        entities.value.find((entity) => entity.id === selection.entityId)
      )
      .filter((entity): entity is StoreEntity => entity !== undefined);
  };

  // Reset selection
  const resetSelection = () => {
    selectedPath.splice(0);
    initializeDefaultSelection();
  };

  // Dialog management methods
  const openLevelDialog = (
    level: StoreLevel | null = null,
    isEdit: boolean = false,
    isView: boolean = false
  ) => {
    selectedLevel.value = level;
    isEditingLevel.value = isEdit;
    isViewingLevel.value = isView;
    showLevelDialog.value = true;
  };

  const closeLevelDialog = () => {
    showLevelDialog.value = false;
    selectedLevel.value = null;
    isEditingLevel.value = false;
    isViewingLevel.value = false;
  };

  const openEntityDialog = (
    entity: StoreEntity | null = null,
    isEdit: boolean = false,
    level: StoreLevel | null = null
  ) => {
    selectedEntity.value = entity;
    selectedLevel.value = level;
    isEditingEntity.value = isEdit;
    showEntityDialog.value = true;
  };

  const closeEntityDialog = () => {
    showEntityDialog.value = false;
    selectedEntity.value = null;
    selectedLevel.value = null;
    isEditingEntity.value = false;
  };

  return {
    // State
    selectedPath,
    isAddingNewLevel,

    // Dialog state
    showLevelDialog,
    showEntityDialog,
    selectedLevel,
    selectedEntity,
    isEditingLevel,
    isEditingEntity,
    isViewingLevel,

    // Computed
    levels,
    entities,

    // Methods
    getEntitiesForLevel,
    getTopLevelEntities,
    getEntityChildren,
    getEntitiesForColumn,
    getLevelForColumn,
    isEntitySelected,
    selectEntity,
    clearSelectionFrom,
    initializeDefaultSelection,
    getSelectedEntityForColumn,
    getFullSelectionPath,
    resetSelection,

    // Dialog methods
    openLevelDialog,
    closeLevelDialog,
    openEntityDialog,
    closeEntityDialog,
  };
});
