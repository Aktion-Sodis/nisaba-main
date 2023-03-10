import { DataStore, Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { I18nString, Question, QuestionOption, Survey } from '../../../models';
import { emptyQuestion, emptyQuestionOption } from '../../../lib/classes';
import { dataTypesDict, modalModesDict, vuexModulesDict } from '../../../lib/constants';

/** @type {import("vuex").ActionTree<import("./survey.module").SurveyState>} */
const actions = {
  APIpost: async ({ commit, dispatch, rootGetters }) => {
    let success = true;
    commit('setLoading', { newValue: true });

    const questionsWithUnnecessaryLastOne =
      rootGetters[`${vuexModulesDict.question}/getQuestionDrafts`];
    const questions = questionsWithUnnecessaryLastOne.slice(0, -1);
    const rawOptions = rootGetters[`${vuexModulesDict.question}/getOptionDrafts`];
    const options = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const rawOption of rawOptions) {
      options.push(rawOption.filter((o) => !o.text.languageTexts.every((t) => t === '')));
    }

    const surveyDraft = rootGetters[`${vuexModulesDict.dataModal}/getDataDraft`];

    const survey = new Survey({
      name: new I18nString(surveyDraft.name),
      description: new I18nString(surveyDraft.description),
      interventionSurveysId: surveyDraft.interventionSurveysId,
      questions: questions.map(
        (q, i) =>
          new Question({
            ...q,
            questionOptions: options[i].map(
              (o) => new QuestionOption({ ...o, id: uuidv4(), followUpQuestionID: null })
            ),
          })
      ),
      tags: [],
      surveyType: surveyDraft.surveyType,
    });
    try {
      const postResponse = await DataStore.save(survey);
      // const tagIds = surveyDraft.tags;
      // // eslint-disable-next-line no-restricted-syntax
      // for (const tagId of tagIds) {
      //   const localTag = getters.tagById({ id: tagId });
      //   // eslint-disable-next-line no-await-in-loop
      //   await DataStore.save(
      //     new SurveySurveyTagRelation({
      //       survey: postResponse,
      //       surveyTag: localTag,
      //     }),
      //   );
      // }

      if (rootGetters[`${vuexModulesDict.dataModal}/getImageFile`]) {
        await Storage.put(
          rootGetters.callDeriveFilePathWithOrganizationId('interventionSurveyPicPath', {
            interventionID: survey.interventionSurveysId,
            surveyId: postResponse.id,
          }),
          rootGetters[`${vuexModulesDict.dataModal}/getImageFile`]
        );
      }

      rootGetters[`${vuexModulesDict.question}/getQuestionImages`].forEach(
        async (questionImg, index) => {
          if (questionImg) {
            await Storage.put(
              rootGetters.callDeriveFilePathWithOrganizationId('questionPicPath', {
                interventionID: survey.interventionSurveysId,
                surveyId: postResponse.id,
                questionId: survey.questions[index].id,
              }),
              questionImg
            );
          }
        }
      );

      commit('addSurvey', postResponse);
      dispatch(
        `${vuexModulesDict.dataModal}/readData`,
        {
          dataId: postResponse.id,
          dataType: dataTypesDict.survey,
        },
        {
          root: true,
        }
      );
    } catch {
      success = false;
    }

    commit('setLoading', { newValue: false });
    dispatch(
      `${vuexModulesDict.dataModal}/abortCreateData`,
      { dataType: dataTypesDict.survey },
      { root: true }
    );
    commit('setSurveyModalCompletionIndex', { newValue: 1 }, { root: true });
    commit(
      `${vuexModulesDict.question}/setQuestions`,
      { payload: [emptyQuestion()] },
      { root: true }
    );
    commit(
      `${vuexModulesDict.question}/setOptions`,
      { payload: [emptyQuestionOption()] },
      { root: true }
    );
    commit(`${vuexModulesDict.question}/setQuestionImages`, [], { root: true });
    return success;
  },
  APIput: async ({ commit, dispatch, getters, rootGetters }, { newData, originalId }) => {
    let success = true;
    commit('setLoading', { newValue: true });
    const original = getters.SURVEYById({ id: originalId });

    try {
      const res = await DataStore.save(
        Survey.copyOf(original, (updated) => {
          updated.name = newData.name;
          updated.description = newData.description;
          // updated.questions = newData.questions;
          updated.surveyType = newData.surveyType;
          updated.intervention = newData.intervention;
          updated.archived = newData.archived;
        })
      );

      if (rootGetters[`${vuexModulesDict.dataModal}/getImageFile`]) {
        await Storage.put(
          rootGetters.callDeriveFilePathWithOrganizationId('interventionSurveyPicPath', {
            interventionID: res.intervention.id,
            surveyId: res.id,
          }),
          rootGetters[`${vuexModulesDict.dataModal}/getImageFile`]
        );
      }

      dispatch(
        `${vuexModulesDict.dataModal}/readData`,
        {
          dataId: originalId,
          dataType: dataTypesDict.survey,
        },
        {
          root: true,
        }
      );
    } catch {
      success = false;
    }
    commit('setLoading', { newValue: false });
    return success;
  },
  APIdelete: async ({ commit, dispatch, getters, rootGetters }, { id, _version }) => {
    let success = true;
    commit('setLoading', { newValue: true });

    try {
      const toDelete = await DataStore.query(Survey, id);
      await DataStore.delete(toDelete);
    } catch {
      success = false;
    }

    if (success) {
      const survey = getters.SURVEYById({ id });
      commit('deleteSurvey', {
        id,
      });

      Storage.remove(
        rootGetters.callDeriveFilePathWithOrganizationId('interventionSurveyPicPath', {
          interventionID: survey.intervention.id,
          surveyId: survey.id,
        })
      );

      commit(`${vuexModulesDict.dataModal}/setDataIdInFocus`, { newValue: null }, { root: true });
      commit(
        `${vuexModulesDict.dataModal}/setMode`,
        { newValue: modalModesDict.read },
        { root: true }
      );
      dispatch(
        `${vuexModulesDict.dataModal}/abortReadData`,
        {},
        {
          root: true,
        }
      );
    }

    commit('setLoading', { newValue: false });
    return success;
  },
  APIgetAll: async () => {
    try {
      return await DataStore.query(Survey);
    } catch {
      return [];
    }
  },
};

export default actions;
