const entitiesModule = {
  namespaced: true,
  state: () => ({
    technologies: [
      { technologyId: 0, description: "Some description", name: "Kitchen" },
      { technologyId: 1, description: "Some description", name: "Toilet" },
      { technologyId: 2, description: "Some description", name: "Plantation" },
    ],
    levelStructure: [
      {
        description: "Some description",
        name: "Gemeinde",
        levelId: 0,
        upperLevel: null,
        allowedTechnologies: [],
      },
      {
        description: "Some description",
        name: "Dorf",
        levelId: 1,
        upperLevel: 0,
        allowedTechnologies: [2],
      },
      {
        description: "Some description",
        name: "Family",
        levelId: 2,
        upperLevel: 1,
        allowedTechnologies: [0, 1, 2],
      },
    ],
    levelData: [
      {
        entityId: 0,
        levelId: 0,
        upperEntityId: null,
        description: "Some description",
        name: "Aachen",
      },
      {
        entityId: 4,
        levelId: 0,
        upperEntityId: null,
        description: "Some description",
        name: "Sinop",
      },
      {
        entityId: 2,
        levelId: 1,
        upperEntityId: 0,
        description: "Some description",
        name: "Nizzaallee",
      },
      {
        entityId: 1,
        levelId: 1,
        upperEntityId: 0,
        description: "Some description",
        name: "Mies van der Rohe Straße",
      },
      {
        entityId: 5,
        levelId: 1,
        upperEntityId: 4,
        description: "Some description",
        name: "Atatürk Mahallesi",
      },
      {
        entityId: 3,
        levelId: 2,
        upperEntityId: 2,
        description: "Some description",
        name: "Eine 4er WG",
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
    getTechnologies: (state) => state.technologies,
    getTechnologyById: (state, getters) => (technologyId) =>
      getters.getTechnologies.find((e) => e.technologyId === technologyId),
    getLevelData: (state) => state.levelData,
    getLevelStructure: (state) =>
      state.levelStructure.sort((a, b) => a.levelId - b.levelId),
    getEntityById: (state, getters) => (entityId) =>
      getters.getLevelData.find((e) => e.entityId === entityId),
    getAllEntitiesOfLevelByHid: (state) => (hid) =>
      state.levelData
        .filter((e) => e.levelId === hid)
        .sort((a, b) => a.entityId - b.entityId), // sort by entityId ascending

    /* VERTICAL CALCULATIONS */
    getVerticalOrderByEntityId: (state, getters) => (entityId, hid) =>
      getters
        .getAllEntitiesOfLevelByHid(hid)
        .sort((a, b) => a.entityId - b.entityId)
        .findIndex((e) => e.entityId === entityId),
    getParentIsAboveEntity:
      (state, getters) => (entityId, upperEntityId, hid) =>
        !!(
          getters.getVerticalOrderByEntityId(upperEntityId, hid - 1) <
            getters.getVerticalOrderByEntityId(entityId, hid) &&
          upperEntityId !== null &&
          hid !== 0
        ),
    getMaxVerticalOrderOfChildren:
      (state, getters) => (entityId, levelIndex) => {
        const lowerLevelContainsChildren = getters
          .getAllEntitiesOfLevelByHid(levelIndex + 1)
          .some((e) => e.upperEntityId === entityId);

        return lowerLevelContainsChildren
          ? getters.getAllEntitiesOfLevelByHid(levelIndex + 1).length -
              getters
                .getAllEntitiesOfLevelByHid(levelIndex + 1)
                .sort((a, b) => b.entityId - a.entityId) // desc
                .findIndex((e) => e.upperEntityId === entityId) -
              1
          : -1;
      },
    getMinVerticalOrderOfChildren:
      (state, getters) => (entityId, levelIndex) => {
        const lowerLevelContainsChildren = getters
          .getAllEntitiesOfLevelByHid(levelIndex + 1)
          .some((e) => e.upperEntityId === entityId);

        return lowerLevelContainsChildren
          ? getters
              .getAllEntitiesOfLevelByHid(levelIndex + 1)
              .sort((a, b) => a.entityId - b.entityId) // asc
              .findIndex((e) => e.upperEntityId === entityId)
          : -1;
      },

    getHasDescendants: (state, getters) => (entityId) =>
      getters.getLevelData.some((e) => e.upperEntityId === entityId),
    getEntityHasParent: (state, getters) => (upperEntityId) => {
      return getters.getLevelData.some((e) => e.entityId === upperEntityId);
    },

    /* returns "lines" with the schema {levelId, entityId, indentation, y0, y1} */
    getCalculatedLines: (state, getters) => {
      let lines = [];
      getters.getLevelStructure.forEach((h) => {
        const allParentsInLevel = getters
          .getAllEntitiesOfLevelByHid(h.levelId)
          .filter((e) => getters.getHasDescendants(e.entityId));
        allParentsInLevel.forEach((p, index) => {
          const parentVerticalOrder = getters.getVerticalOrderByEntityId(
            p.entityId,
            p.levelId
          );
          lines.push({
            levelId: h.levelId,
            entityId: p.entityId,
            indentation: index,
            y0: Math.min(
              getters.getMinVerticalOrderOfChildren(p.entityId, h.levelId),
              parentVerticalOrder
            ),
            y1: Math.max(
              getters.getMaxVerticalOrderOfChildren(p.entityId, h.levelId),
              parentVerticalOrder
            ),
          });
        });
      });
      return lines;
    },

    getCalculatedLinesByLevelId: (state, getters) => (levelId) =>
      getters.getCalculatedLines.filter((l) => l.levelId + 1 === levelId),
    getLineByEntityId: (state, getters) => (entityId) =>
      getters.getCalculatedLines.find((l) => l.entityId === entityId) || {
        indentation: 0,
      },

    getEntityModalIsEdit: (state) =>
      state.entityIdCurrentlyBeingEdited !== null,
    getLevelModalIsEdit: (state) => state.levelIdCurrentlyBeingEdited !== null,
    getEntityCurrentlyBeingEdited: (state, getters) =>
      getters.getEntityById(state.entityIdCurrentlyBeingEdited) || null,
    getEntityModalIsDisplayed: (state) => state.entityModalIsDisplayed,
    getLevelIdOfEntityBeingCreated: (state) =>
      state.levelIdOfEntityBeingCreated,
  },
  mutations: {
    addLevel: (state, payload) => {
      state.levelStructure = state.levelStructure.concat(payload);
    },
    injectNewLevel: (state, newLevelId, upperLevelIdOfNewLevel) => {
      state.levelStructure = state.levelStructure.map((e) =>
        e.upperLevel === upperLevelIdOfNewLevel
          ? { ...e, upperLevel: newLevelId }
          : e
      );
    },
    injectNewEntity: (
      state,
      { entityName, entityDescription, entityLevelId, entityUpperEntityId }
    ) => {
      state.levelData = state.levelData.concat({
        entityId: Math.random() * 100,
        levelId: entityLevelId,
        upperEntityId: entityUpperEntityId,
        description: entityDescription,
        name: entityName,
      });
    },
    replaceEntity: (
      state,
      {
        entityId,
        entityName,
        entityDescription,
        entityLevelId,
        entityUpperEntityId,
      }
    ) => {
      console.log("hey");
      state.levelData = state.levelData.map((e) =>
        e.entityId === entityId
          ? {
              entityId,
              levelId: entityLevelId,
              upperEntityId: entityUpperEntityId,
              description: entityDescription,
              name: entityName,
            }
          : e
      );
    },
    setEntityIdCurrentlyBeingEdited: (state, entityId) => {
      state.entityIdCurrentlyBeingEdited = entityId;
    },
    setEntityModalIsDisplayed: (state, payload) => {
      state.entityModalIsDisplayed = payload;
    },
    setLevelIdOfEntityBeingCreated: (state, payload) => {
      state.levelIdOfEntityBeingCreated = payload;
    },
  },
  actions: {
    clickOnEditEntity: ({ commit, dispatch }, payload) => {
      commit("setEntityIdCurrentlyBeingEdited", payload);
      dispatch("showEntityModal");
    },
    clickOnAddNewEntity: ({ commit, dispatch }, payload) => {
      console.log(payload);
      commit("setEntityIdCurrentlyBeingEdited", null);
      commit("setLevelIdOfEntityBeingCreated", payload);
      dispatch("showEntityModal");
    },
    saveNewLevel: (
      { commit },
      { levelName, levelDescription, upperLevel, technologies }
    ) => {
      commit("injectNewLevel", upperLevel + 0.1, upperLevel);
      commit("addLevel", {
        name: levelName,
        description: levelDescription,
        levelId: upperLevel + 0.1,
        upperLevel,
        allowedTechnologies: technologies,
      });
    },
    saveEntity: (
      { commit },
      {
        entityId,
        entityName,
        entityDescription,
        entityLevelId,
        entityUpperEntityId,
      }
    ) => {
      console.log({ entityId });
      if (entityId === null)
        commit("injectNewEntity", {
          entityName,
          entityDescription,
          entityLevelId,
          entityUpperEntityId,
        });
      else
        commit("replaceEntity", {
          entityId,
          entityName,
          entityDescription,
          entityLevelId,
          entityUpperEntityId,
        });
    },
    showEntityModal: ({ commit }) => {
      commit("setEntityModalIsDisplayed", true);
    },
    closeEntityModal: ({ commit }) => {
      commit("setEntityIdCurrentlyBeingEdited", null);
      commit("setEntityModalIsDisplayed", false);
    },
  },
};

export default entitiesModule;
