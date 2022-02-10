import { v4 as uuidv4 } from 'uuid';

export class EmptyEntity {
  constructor() {
    this.entityId = uuidv4();
    this.name = '';
    this.description = '';
    this.levelId = '';
    this.upperEntityId = null;
    this.tagIds = [];
  }
}

export class Entity {
  constructor({
    entityId, name, description, levelId, upperEntityId, tagIds,
  }) {
    this.entityId = entityId ?? uuidv4();
    this.name = name;
    this.description = description;
    this.levelId = levelId;
    this.upperEntityId = upperEntityId;
    this.tagIds = tagIds;
  }
}

// Mock API calls
export const postNewEntity = async (levelDraft) => levelDraft;
export const putEntity = async (levelDraft) => levelDraft;
export const deleteEntity = async () => ({ errors: [] });
