import { v4 as uuidv4 } from 'uuid';

const entitiesModule = {
  namespaced: true,
  state: () => ({
    levels: [
      {
        description: 'Some description',
        name: 'Gemeinde',
        levelId: '5a93459f-f23d-44e6-a112-c41e90473a2d',
        upperLevelId: null,
        allowedInterventions: [],
      },
      {
        description: 'Some description',
        name: 'Dorf',
        levelId: 'e7a03934-90b9-405b-807b-3f748b15ae69',
        upperLevelId: '5a93459f-f23d-44e6-a112-c41e90473a2d',
        allowedInterventions: ['bd5f6df6-a64c-4d60-9df2-8f29bb7944d5'],
      },
      {
        description: 'Some description',
        name: 'Family',
        levelId: 'd1faef12-cf15-4b5e-9637-b4ffbd156954',
        upperLevelId: 'e7a03934-90b9-405b-807b-3f748b15ae69',
        allowedInterventions: [
          'bd5f6df6-a64c-4d60-9df2-8f29bb7944d5',
          '59fe15e7-59ad-46bf-a196-cbab81885d5b',
          'c220fb83-a0e4-4463-a28a-f21b260e609a',
        ],
      },
    ],
    entities: [
      {
        entityId: 'f77a7d3f-fb7f-434e-8be3-32b74269083c',
        levelId: '5a93459f-f23d-44e6-a112-c41e90473a2d',
        upperEntityId: null,
        description: 'Some description',
        name: 'Aachen',
      },
      {
        entityId: 'afd8874d-ac52-4508-8351-f35f8f7e28a0',
        levelId: '5a93459f-f23d-44e6-a112-c41e90473a2d',
        upperEntityId: null,
        description: 'Some description',
        name: 'Sinop',
      },
      {
        entityId: '0b38df2a-84f5-4066-9c0c-f447b93e8278',
        levelId: 'e7a03934-90b9-405b-807b-3f748b15ae69',
        upperEntityId: 'f77a7d3f-fb7f-434e-8be3-32b74269083c',
        description: 'Some description',
        name: 'Nizzaallee',
      },
      {
        entityId: '3d29c7aa-f422-41bc-99ae-35480a1f415e',
        levelId: 'e7a03934-90b9-405b-807b-3f748b15ae69',
        upperEntityId: 'f77a7d3f-fb7f-434e-8be3-32b74269083c',
        description: 'Some description',
        name: 'Mies van der Rohe Straße',
      },
      {
        entityId: '327ac9b8-ab56-47e0-a1c5-bd4c978645a0',
        levelId: 'e7a03934-90b9-405b-807b-3f748b15ae69',
        upperEntityId: 'afd8874d-ac52-4508-8351-f35f8f7e28a0',
        description: 'Some description',
        name: 'Atatürk Mahallesi',
      },
      {
        entityId: 'b046cde7-4f18-4fc9-9b13-eb49c98f226c',
        levelId: 'd1faef12-cf15-4b5e-9637-b4ffbd156954',
        upperEntityId: '0b38df2a-84f5-4066-9c0c-f447b93e8278',
        description: 'Some description',
        name: 'Eine 4er WG',
      },
    ],
    entityIdCurrentlyBeingEdited: null,
    entityModalIsDisplayed: false,
    levelIdOfEntityBeingCreated: null,

    levelIdCurrentlyBeingEdited: null,
    levelModalIsDisplayed: false,
  }),
  getters: {
    /* GENERIC GETTERS */
    getEntities: ({ entities }) => entities,
    getLevels: ({ levels }) => levels, // not sorted. Use with care.
    sortedLevels: (_, getters) => getters.getLevels.sort((a, b) => getters.hierarchySort(a, b)),

    // used in the getter "sortedLevels". Don't use directly outside of Vuex environment.
    hierarchySort: (_, getters) => (a, b) => {
      if (a.upperLevelId === null) return -1;
      if (b.upperLevelId === null) return 1;
      if (a.levelId === b.upperLevelId) return -1;
      console.log('hey');
      return getters.hierarchySort(a, getters.levelById(b.upperLevelId));
    },

    entityById:
            (_, { getEntities }) => (entityId) => getEntities.find((e) => e.entityId === entityId),
    levelById:
            (_, { getLevels }) => (levelId) => getLevels?.find((l) => l.levelId === levelId) ?? null,
    allEntitiesOfLevelByHid:
            (_, { getEntities }) => (levelId) => getEntities
              .filter((e) => e.levelId === levelId)
              .sort((a, b) => a.entityId - b.entityId), // sort by entityId for consistency
    upperLevelById:
            (_, { getLevels }) => (levelId) => {
              const currentLevel = getLevels.find((l) => l.levelId === levelId);
              if (!currentLevel) return null;
              const upperLevel = getLevels.find((l) => l.levelId === currentLevel.upperLevelId);
              return upperLevel || null;
            },

    /* VERTICAL CALCULATIONS */
    verticalOrderByEntityId:
            (_, { allEntitiesOfLevelByHid }) => (entityId, levelId) => allEntitiesOfLevelByHid(levelId).findIndex((e) => e.entityId === entityId),

    maxVerticalOrderOfChildren:
            (_, { allEntitiesOfLevelByHid, getLevels }) => (entityId, levelId) => {
              const allEntitiesInLowerLevel = allEntitiesOfLevelByHid(
                getLevels.find((l) => l.upperLevelId === levelId).levelId,
              );
              const lowerLevelContainsChildren = allEntitiesInLowerLevel.some(
                (e) => e.upperEntityId === entityId,
              );
              return lowerLevelContainsChildren
                ? allEntitiesInLowerLevel.length
                          - allEntitiesInLowerLevel
                            .reverse()
                            .findIndex((e) => e.upperEntityId === entityId)
                          - 1
                : -1;
            },
    minVerticalOrderOfChildren:
            (_, { allEntitiesOfLevelByHid, getLevels }) => (entityId, levelId) => {
              const allEntitiesInLowerLevel = allEntitiesOfLevelByHid(
                getLevels.find((l) => l.upperLevelId === levelId).levelId,
              );
              const lowerLevelContainsChildren = allEntitiesInLowerLevel.some(
                (e) => e.upperEntityId === entityId,
              );
              return lowerLevelContainsChildren
                ? allEntitiesInLowerLevel.findIndex((e) => e.upperEntityId === entityId)
                : -1;
            },

    hasEntityDescendants:
            (_, { getEntities }) => (entityId) => getEntities.some((e) => e.upperEntityId === entityId),
    hasEntityParent:
            (_, { getEntities }) => (upperEntityId) => getEntities.some((e) => e.entityId === upperEntityId),

    /* returns "lines" with the schema {levelId, entityId, indentation, y0, y1} */
    calculatedLines: (
      _,
      {
        allEntitiesOfLevelByHid,
        sortedLevels,
        hasEntityDescendants,
        verticalOrderByEntityId,
        minVerticalOrderOfChildren,
        maxVerticalOrderOfChildren,
      },
    ) => {
      const lines = [];
      sortedLevels.forEach((h) => {
        const allParentsInLevel = allEntitiesOfLevelByHid(h.levelId).filter((e) => hasEntityDescendants(e.entityId));
        allParentsInLevel.forEach((p, index) => {
          const parentVerticalOrder = verticalOrderByEntityId(p.entityId, p.levelId);
          const newLine = {
            levelId: h.levelId,
            entityId: p.entityId,
            indentation: index,
            y0: Math.min(
              minVerticalOrderOfChildren(p.entityId, h.levelId),
              parentVerticalOrder,
            ),
            y1: Math.max(
              maxVerticalOrderOfChildren(p.entityId, h.levelId),
              parentVerticalOrder,
            ),
          };
          lines.push(newLine);
        });
      });
      return lines;
    },

    calculatedLinesByLevelId:
            (_, { calculatedLines, getLevels }) => (levelId) => calculatedLines.filter(
              (li) => getLevels.find((le) => le.upperLevelId === li.levelId).levelId === levelId,
            ),
    getLineByEntityId:
            (_, { calculatedLines }) => (entityId) => calculatedLines.find((l) => l.entityId === entityId) || {
              indentation: 0,
            },
  },
  mutations: {
    addLevel: (state, { newLevel }) => {
      state.levels = state.levels.concat(newLevel);
    },
    injectNewLevel: (state, { newLevel }) => {
      const levelId = uuidv4();
      state.levels = state.levels.map((l) => (l.upperLevelId === newLevel.upperLevelId ? { ...l, upperLevelId: levelId } : l));
      state.levels = state.levels.concat({
        levelId: newLevel.levelId,
        name: newLevel.name,
        description: newLevel.description,
        upperLevelId: newLevel.upperLevelId,
        allowedInterventions: newLevel.allowedInterventions,
      });
    },
    replaceLevel: (state, { newLevel }) => {
      state.levels = state.levels.map((l) => (l.levelId === newLevel.levelId
        ? {
          ...l,
          levelId: newLevel.levelId,
          name: newLevel.name,
          description: newLevel.description,
          upperLevelId: newLevel.upperLevelId,
          allowedInterventions: newLevel.allowedInterventions,
        }
        : l));
    },
    injectNewEntity: (state, { newEntity }) => {
      state.entities = state.entities.concat({
        entityId: uuidv4(),
        levelId: newEntity.entityLevelId,
        upperEntityId: newEntity.entityUpperEntityId,
        description: newEntity.entityDescription,
        name: newEntity.entityName,
      });
    },
    replaceEntity: (state, { newEntity }) => {
      state.entities = state.entities.map((e) => (e.entityId === newEntity.entityId
        ? {
          ...e,
          levelId: newEntity.entityLevelId,
          upperEntityId: newEntity.entityUpperEntityId,
          description: newEntity.entityDescription,
          name: newEntity.entityName,
        }
        : e));
    },
  },
};

export default entitiesModule;
