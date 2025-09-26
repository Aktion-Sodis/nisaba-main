import { v4 as uuidv4 } from 'uuid';

import {
  InterventionType,
  Question,
  QuestionOption,
  QuestionType,
  Survey,
  SurveyStatus,
  SurveyType,
} from '@/models/index';
import {
  StoreIntervention,
  StoreLevel,
  StoreEntity,
} from '@/stores/projectConfigStore';

export const createEmptyI18nString = (languageKeys: string[]) => ({
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
export const createNewIntervention = (
  languageKeys: string[]
): StoreIntervention => {
  return {
    id: uuidv4(),
    //@ts-expect-error /db autogeneration
    name: createEmptyI18nString(languageKeys),
    //@ts-expect-error /db autogeneration
    description: createEmptyI18nString(languageKeys),
    interventionType: InterventionType.TECHNOLOGY,
  };
};

export const createNewLevel = (
  languageKeys: string[],
  parentLevelId: string | null = null
): StoreLevel => {
  return {
    id: uuidv4(),
    //@ts-expect-error /db autogeneration
    name: createEmptyI18nString(languageKeys),
    //@ts-expect-error /db autogeneration
    description: createEmptyI18nString(languageKeys),
    parentLevelID: parentLevelId,
    interventionsAreAllowed: true,
    customData: [],
    schemeVersion: 1,
  };
};

export const createNewEntity = (
  languageKeys: string[],
  levelId: string,
  parentEntityId: string | null = null,
  levelCustomData: any[] = []
): StoreEntity => {
  // Create custom data items based on the level's custom data schema
  const entityCustomData = levelCustomData.map((levelCustomDataItem) => ({
    customDataID: levelCustomDataItem.id,
    type: levelCustomDataItem.type,
    name: createEmptyI18nString(languageKeys),
    intValue: levelCustomDataItem.type === 'INT' ? 0 : null,
    stringValue: levelCustomDataItem.type === 'STRING' ? '' : null,
  }));

  return {
    id: uuidv4(),
    //@ts-expect-error /db autogeneration
    name: createEmptyI18nString(languageKeys),
    //@ts-expect-error /db autogeneration
    description: createEmptyI18nString(languageKeys),
    parentEntityID: parentEntityId,
    entityLevelId: levelId,
    //@ts-expect-error /db autogeneration
    customData: entityCustomData,
    schemeVersion: 1,
  };
};
