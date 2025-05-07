import { v4 as uuidv4 } from 'uuid';

import {
  Question,
  QuestionOption,
  QuestionType,
  Survey,
  SurveyStatus,
  SurveyType,
} from '@/models/index';

const createEmptyI18nString = (languageKeys: string[]) => ({
  languageKeys,
  languageTexts: Array(languageKeys.length).fill(''),
});

export const createNewSurvey = (languageKeys: string[]): Survey => {
  return {
    id: uuidv4(),
    name: createEmptyI18nString(languageKeys),
    description: createEmptyI18nString(languageKeys),
    questions: [],
    surveyType: SurveyType.DEFAULT,
    status: SurveyStatus.DRAFT,
    schemeVersion: 0,
    archived: false,
    tags: [],
    interventionSurveysId: null,
  };
};

export const createNewTextQuestion = (languageKeys: string[]): Question => {
  return {
    id: uuidv4(),
    text: createEmptyI18nString(languageKeys),
    type: QuestionType.TEXT,
    isFollowUpQuestion: false,
  };
};

export const createNewQuestionOption = (
  languageKeys: string[]
): QuestionOption => {
  return {
    id: uuidv4(),
    text: createEmptyI18nString(languageKeys),
    followUpQuestionIDs: [],
  };
};
