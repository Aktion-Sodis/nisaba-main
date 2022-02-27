import { API, graphqlOperation } from 'aws-amplify';
import { createIntervention } from '../../graphql/mutations';
import { syncStatusDict } from '../constants';
import { waitForMilliseconds } from '../../lib/utils';

const SYNC_UI = {
  namespaced: true,
  state: () => ({
    status: syncStatusDict.synched,
    isStatusLocked: false,
  }),
  getters: {
    getStatus: ({ status }) => status,
    syncActionIcon: (_, { getState }) => getState,
  },
  mutations: {
    setStatus: (state, { newStatus }) => {
      if (!state.isStatusLocked) state.status = newStatus;
    },
    setIsStatusLocked: (state, { newValue }) => {
      state.isStatusLocked = newValue;
    },
  },
  actions: {
    refreshHandler: async ({ commit, dispatch }, { routeName }) => {
      commit('setStatus', { newStatus: syncStatusDict.synchronizing });
      if (routeName === 'Interventions') {
        await dispatch('INTERVENTION_Data/sync', null, { root: true });
      } else if (routeName === 'OrganizationStructure') {
        await dispatch('LEVEL_Data/sync', null, { root: true });
      }
      commit('setStatus', { newStatus: syncStatusDict.synched });
      commit('setIsStatusLocked', { newValue: true });
      await waitForMilliseconds(5000);
      commit('setIsStatusLocked', { newValue: false });
      commit('setStatus', { newStatus: syncStatusDict.inSync });
    },
    createDummyIntervention: async () => {
      const lvl = await API.graphql(
        graphqlOperation(createIntervention, {
          input: {
            name: 'Toilet',
            description:
              'A toilet is a piece of sanitary hardware that collects human urine and feces, and sometimes toilet paper, usually for disposal.',
            interventionType: 'TECHNOLOGY',
            tags: [],
          },
        }),
      );
      console.log(JSON.stringify(lvl));
    },
  },
};

export default SYNC_UI;
