import { API, DataStore, Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { deleteSurvey } from '../../../graphql/mutations';
import { I18nString, Question, QuestionOption, Survey } from '../../../models';
import { emptyQuestion, emptyQuestionOption } from '../../../lib/classes';
import { dataTypesDict, modalModesDict, vuexModulesDict } from '../../../lib/constants';
import { deriveFilePath } from '../../../lib/utils';
import state from './survey.module.state';
import getters from './survey.module.getters';
import mutations from './survey.module.mutations';
import actions from './survey.module.actions';

/** @type {import("vuex").Module<import('./survey.module').SurveyState>} */
const survey = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default survey;
