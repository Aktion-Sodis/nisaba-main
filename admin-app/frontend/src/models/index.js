// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PermissionType = {
  READ: 'READ',
  CHANGEMASTERDATA: 'CHANGEMASTERDATA',
  CREATEINTERVENTIONS: 'CREATEINTERVENTIONS',
  EXECUTESURVEYS: 'EXECUTESURVEYS',
  CREATESUBENTITIES: 'CREATESUBENTITIES',
  ADMIN: 'ADMIN',
};

const InterventionType = {
  TECHNOLOGY: 'TECHNOLOGY',
  EDUCATION: 'EDUCATION',
};

const QuestionType = {
  TEXT: 'TEXT',
  SINGLECHOICE: 'SINGLECHOICE',
  MULTIPLECHOICE: 'MULTIPLECHOICE',
  PICTURE: 'PICTURE',
  PICTUREWITHTAGS: 'PICTUREWITHTAGS',
  AUDIO: 'AUDIO',
};

const Type = {
  INT: 'INT',
  STRING: 'STRING',
};

const SurveyType = {
  INITIAL: 'INITIAL',
  DEFAULT: 'DEFAULT',
};

const {
  User, Config, Level, Intervention, Content, Survey, Entity, AppliedIntervention, ExecutedSurvey, Task, InterventionContentRelation, Permission, ColorTheme, StoragePaths, Question, QuestionOption, CustomData, Location, AppliedCustomData, QuestionAnswer, Marking,
} = initSchema(schema);

export {
  User,
  Config,
  Level,
  Intervention,
  Content,
  Survey,
  Entity,
  AppliedIntervention,
  ExecutedSurvey,
  Task,
  InterventionContentRelation,
  PermissionType,
  InterventionType,
  QuestionType,
  Type,
  SurveyType,
  Permission,
  ColorTheme,
  StoragePaths,
  Question,
  QuestionOption,
  CustomData,
  Location,
  AppliedCustomData,
  QuestionAnswer,
  Marking,
};
