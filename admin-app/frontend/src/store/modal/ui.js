import Vue from 'vue';
import { API } from 'aws-amplify';
import { dataTypesDict, modalModesDict } from '../constants';
import { Survey } from '../../models';

import { EmptyEntity } from '../entities/utils';
// import { EmptyIntervention } from '../interventions/utils';
import { emptyLevel } from '../levels/utils';
import { EmptySurvey } from '../survey/utils';
import { emptyIntervention } from '../classes';
import * as mutations from '../../graphql/mutations';

const dataModal = {
  namespaced: true,
  state: () => ({
    dataType: dataTypesDict.entity,
    mode: modalModesDict.read,
    isDisplayed: false,
    dataIdInFocus: null,
    dataDraft: null,
  }),
  getters: {
    /* READ */
    getDataType: ({ dataType }) => dataType,
    getMode: ({ mode }) => mode,
    getIsDisplayed: ({ isDisplayed }) => isDisplayed,
    getDataIdInFocus: ({ dataIdInFocus }) => dataIdInFocus,
    getDataDraft: ({ dataDraft }) => dataDraft,
  },
  mutations: {
    /* UPDATE, DELETE */
    setDataIdInFocus: (state, { newValue }) => {
      state.dataIdInFocus = newValue;
    },
    setIsDisplayed: (state, { newValue }) => {
      state.isDisplayed = newValue;
    },
    setMode: (state, { newValue }) => {
      state.mode = newValue;
    },
    setDataType: (state, { newValue }) => {
      state.dataType = newValue;
    },

    /* ENTITY DRAFT: SET & RESET */
    setENTITYDraft: (state, draft) => {
      state.dataDraft = draft;
    },
    resetENTITYDraft: (state) => {
      state.dataDraft = new EmptyEntity();
    },

    setDraft: (state, draft) => {
      state.dataDraft = draft;
    },
    resetLEVELDraft: (state) => {
      state.dataDraft = emptyLevel();
    },
<<<<<<< Updated upstream

    /* INTERVENTION DRAFT: SET & RESET */
    setINTERVENTIONDraft: (state, data) => {
      state.dataDraft = data;
    },
=======
>>>>>>> Stashed changes
    resetINTERVENTIONDraft: (state) => {
      state.dataDraft = emptyIntervention();
    },
    /* SURVEY DRAFT: SET & RESET */
    setSURVEYDraft: (
      state,
      {
        id, name, description, tags, type, questionIds, creationDate, lastEditDate, _version,
      },
    ) => {
      state.dataDraft = new Survey({
        id,
        name,
        description,
        tags,
        type,
        questionIds,
        creationDate,
        lastEditDate,
        _version,
      });
    },
    resetSURVEYDraft: (state) => {
      state.dataDraft = new EmptySurvey();
    },
  },
  actions: {
    readData: ({ commit }, { dataId, dataType }) => {
      commit('setDataType', { newValue: dataType });
      commit('setMode', { newValue: modalModesDict.read });
      commit('setDataIdInFocus', { newValue: dataId });
      commit('setIsDisplayed', { newValue: true });
    },
    abortReadData: async ({ commit }) => {
      commit('setIsDisplayed', { newValue: false });
      await Vue.nextTick();
      commit('setDataIdInFocus', { newValue: null });
    },
    createData: ({ commit }, { dataType }) => {
      commit('setMode', { newValue: modalModesDict.create });
      commit('setDataIdInFocus', { newValue: null });
      commit('setDataType', { newValue: dataType });
      commit(`reset${dataType}Draft`);
      commit('setIsDisplayed', { newValue: true });
    },
    abortCreateData: async ({ commit }, { dataType }) => {
      commit('setIsDisplayed', { newValue: false });
      await Vue.nextTick();
      commit(`reset${dataType}Draft`);
      commit('setMode', { newValue: modalModesDict.read });
    },
    editData: ({ commit, rootGetters }, { dataId, dataType }) => {
      commit('setMode', { newValue: modalModesDict.edit });
      commit('setDataIdInFocus', { newValue: dataId });
      commit('setDataType', { newValue: dataType });
      const data = rootGetters[`${dataType}_Data/${dataType}ById`]({ id: dataId });
      commit(`set${dataType}Draft`, data);
      // commit('setIsDisplayed', { newValue: true });
    },
    updateData: async ({ commit }, { data, dataType }) => {
      console.log(data);
      console.log(dataType);
      commit('setMode', { newValue: modalModesDict.edit });
      // rootGetters[`${dataType}_Data/APIput`]({ entityDraft: data });
      const updateEntity = await API.graphql({
        query: mutations.updateEntity,
        variables: { input: data },
      });
      console.log(updateEntity);
    },
    abortEditData: async ({ commit }, { dataType }) => {
      commit(`reset${dataType}Draft`);
      await Vue.nextTick();
      commit('setMode', { newValue: modalModesDict.read });
    },

    saveData: async ({ dispatch, getters }, { dataType }) => {
      if (getters.getMode === modalModesDict.read) return;
      const draft = getters.getDataDraft;
      console.log({ draft });
      if (getters.getMode === modalModesDict.create) {
        await dispatch(`${dataType}_Data/APIpost`, draft, { root: true });
        return;
      }
      if (getters.getMode === modalModesDict.edit) {
        await dispatch(`${dataType}_Data/APIput`, draft, { root: true });
      }
    },
    deleteData: async ({ dispatch, getters }, { dataType }) => {
      if (getters.getEntityModalMode === modalModesDict.read) return;
      if (getters.getEntityModalMode === modalModesDict.create) return;
      await dispatch(`${dataType}_Data/APIdelete`, getters.getDataDraft, { root: true });
    },
  },
};

export default dataModal;
