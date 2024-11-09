// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PermissionType = {
  "READ": "READ",
  "CHANGEMASTERDATA": "CHANGEMASTERDATA",
  "CREATEINTERVENTIONS": "CREATEINTERVENTIONS",
  "EXECUTESURVEYS": "EXECUTESURVEYS",
  "CREATESUBENTITIES": "CREATESUBENTITIES",
  "ADMIN": "ADMIN"
};

const Type = {
  "INT": "INT",
  "STRING": "STRING"
};

const InterventionType = {
  "TECHNOLOGY": "TECHNOLOGY",
  "EDUCATION": "EDUCATION"
};

const SurveyType = {
  "INITIAL": "INITIAL",
  "DEFAULT": "DEFAULT"
};

const QuestionType = {
  "TEXT": "TEXT",
  "SINGLECHOICE": "SINGLECHOICE",
  "MULTIPLECHOICE": "MULTIPLECHOICE",
  "PICTURE": "PICTURE",
  "PICTUREWITHTAGS": "PICTUREWITHTAGS",
  "AUDIO": "AUDIO",
  "INT": "INT",
  "DOUBLE": "DOUBLE",
  "RATING": "RATING"
};

const { Organization, User, Config, Level, Intervention, Content, Survey, Entity, AppliedIntervention, ExecutedSurvey, Task, ContentTag, InterventionTag, SurveyTag, SessionData, TestObject, LevelInterventionRelation, InterventionContentRelation, InterventionInterventionTagRelation, ContentContentTagRelation, SurveySurveyTagRelation, I18nString, Permission, ColorTheme, CustomData, Question, QuestionOption, Location, AppliedCustomData, QuestionAnswer, Marking } = initSchema(schema);

export {
  Organization,
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
  ContentTag,
  InterventionTag,
  SurveyTag,
  SessionData,
  TestObject,
  LevelInterventionRelation,
  InterventionContentRelation,
  InterventionInterventionTagRelation,
  ContentContentTagRelation,
  SurveySurveyTagRelation,
  PermissionType,
  Type,
  InterventionType,
  SurveyType,
  QuestionType,
  I18nString,
  Permission,
  ColorTheme,
  CustomData,
  Question,
  QuestionOption,
  Location,
  AppliedCustomData,
  QuestionAnswer,
  Marking
};