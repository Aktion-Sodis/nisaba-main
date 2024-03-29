import { v4 as uuidv4 } from 'uuid';
import {
  I18nString,
  Intervention,
  InterventionType,
  Level,
  Question,
  QuestionOption,
  QuestionType,
  Survey,
  SurveyType,
  Entity,
  Type,
} from '../models';
import i18n from '../i18n';

const emptyMutableI18nString = () => ({
  languageKeys: i18n.availableLocales,
  languageTexts: Array(i18n.availableLocales.length).fill(''),
});

const emptyI18nString = () => new I18nString(emptyMutableI18nString());

const emptyIntervention = () =>
  new Intervention({
    name: emptyMutableI18nString(),
    description: emptyMutableI18nString(),
    tags: [],
    type: InterventionType.TECHNOLOGY,
    questionIds: [],
    contents: [],
  });

const emptySurvey = () =>
  new Survey({
    name: emptyMutableI18nString(),
    description: emptyMutableI18nString(),
    questions: [],
    surveyType: SurveyType.DEFAULT,
  });

const emptyQuestion = () =>
  new Question({
    id: uuidv4(),
    text: emptyMutableI18nString(),
    type: QuestionType.TEXT,
    questionOptions: [],
    isFollowUpQuestion: false,
  });

const emptyQuestionOption = () =>
  new QuestionOption({
    id: uuidv4(),
    text: emptyMutableI18nString(),
    followUpQuestionIDs: null,
  });

const emptyLevel = () => {
  const level = new Level({
    name: emptyI18nString(),
    description: emptyI18nString(),
    parentLevelID: null,
    allowedInterventions: [],
  });
  return level;
};

const emptyEntity = () =>
  new Entity({
    name: emptyI18nString(),
    description: emptyI18nString(),
    parentEntityID: null,
    customData: [],
    appliedInterventions: [],
    entityLevelId: '',
  });

const mutableI18nString = ({ languageTexts }) => ({
  languageKeys: i18n.availableLocales,
  languageTexts: Array.from(languageTexts),
});

const mutableQuestionOption = ({ text }) => ({
  text: mutableI18nString({ languageTexts: text.languageTexts }),
});

const emptyMutableCustomData = () => ({
  id: uuidv4(),
  name: emptyMutableI18nString(),
  type: Type.INT,
});

const emptyMutableQuestionOption = () => mutableQuestionOption({ text: emptyMutableI18nString() });

export {
  emptyIntervention,
  emptyMutableI18nString,
  emptyI18nString,
  emptySurvey,
  emptyQuestion,
  emptyQuestionOption,
  emptyLevel,
  emptyEntity,
  mutableI18nString,
  mutableQuestionOption,
  emptyMutableQuestionOption,
  emptyMutableCustomData,
};
