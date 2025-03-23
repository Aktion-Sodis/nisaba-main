/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateOrganizationInput = {
  nameCamelCase: string,
  nameKebabCase: string,
  nameVerbose: string,
  id?: string | null,
  _version?: number | null,
};

export type ModelOrganizationConditionInput = {
  nameCamelCase?: ModelStringInput | null,
  nameKebabCase?: ModelStringInput | null,
  nameVerbose?: ModelStringInput | null,
  and?: Array< ModelOrganizationConditionInput | null > | null,
  or?: Array< ModelOrganizationConditionInput | null > | null,
  not?: ModelOrganizationConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Organization = {
  __typename: "Organization",
  nameCamelCase: string,
  nameKebabCase: string,
  nameVerbose: string,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateOrganizationInput = {
  nameCamelCase?: string | null,
  nameKebabCase?: string | null,
  nameVerbose?: string | null,
  id: string,
  _version?: number | null,
};

export type DeleteOrganizationInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  firstName: string,
  lastName: string,
  bio?: string | null,
  permissions: Array< PermissionInput >,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
};

export type PermissionInput = {
  permissionType: PermissionType,
  allowedEntities: Array< string >,
};

export enum PermissionType {
  READ = "READ",
  CHANGEMASTERDATA = "CHANGEMASTERDATA",
  CREATEINTERVENTIONS = "CREATEINTERVENTIONS",
  EXECUTESURVEYS = "EXECUTESURVEYS",
  CREATESUBENTITIES = "CREATESUBENTITIES",
  ADMIN = "ADMIN",
}


export type ModelUserConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  firstName: string,
  lastName: string,
  bio?: string | null,
  permissions:  Array<Permission >,
  schemeVersion?: number | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type Permission = {
  __typename: "Permission",
  permissionType: PermissionType,
  allowedEntities: Array< string >,
};

export type UpdateUserInput = {
  firstName?: string | null,
  lastName?: string | null,
  bio?: string | null,
  permissions?: Array< PermissionInput > | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateConfigInput = {
  name: string,
  colorTheme?: ColorThemeInput | null,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
};

export type ColorThemeInput = {
  highlight?: string | null,
  secondaryHighlight?: string | null,
  backgroundOneLight?: string | null,
  backgroundTwoLight?: string | null,
  backgroundOneDark?: string | null,
  backgroundTwoDark?: string | null,
};

export type ModelConfigConditionInput = {
  name?: ModelStringInput | null,
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelConfigConditionInput | null > | null,
  or?: Array< ModelConfigConditionInput | null > | null,
  not?: ModelConfigConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type Config = {
  __typename: "Config",
  name: string,
  colorTheme?: ColorTheme | null,
  schemeVersion?: number | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type ColorTheme = {
  __typename: "ColorTheme",
  highlight?: string | null,
  secondaryHighlight?: string | null,
  backgroundOneLight?: string | null,
  backgroundTwoLight?: string | null,
  backgroundOneDark?: string | null,
  backgroundTwoDark?: string | null,
};

export type UpdateConfigInput = {
  name?: string | null,
  colorTheme?: ColorThemeInput | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
};

export type DeleteConfigInput = {
  id: string,
  _version?: number | null,
};

export type CreateLevelInput = {
  name: I18nStringInput,
  description: I18nStringInput,
  parentLevelID?: string | null,
  interventionsAreAllowed: boolean,
  customData: Array< CustomDataInput >,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
};

export type I18nStringInput = {
  languageKeys: Array< string >,
  languageTexts: Array< string >,
};

export type CustomDataInput = {
  id: string,
  name: I18nStringInput,
  type: Type,
};

export enum Type {
  INT = "INT",
  STRING = "STRING",
}


export type ModelLevelConditionInput = {
  parentLevelID?: ModelIDInput | null,
  interventionsAreAllowed?: ModelBooleanInput | null,
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelLevelConditionInput | null > | null,
  or?: Array< ModelLevelConditionInput | null > | null,
  not?: ModelLevelConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Level = {
  __typename: "Level",
  name: I18nString,
  description: I18nString,
  parentLevelID?: string | null,
  interventionsAreAllowed: boolean,
  allowedInterventions?: ModelLevelInterventionRelationConnection | null,
  customData:  Array<CustomData >,
  schemeVersion?: number | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type I18nString = {
  __typename: "I18nString",
  languageKeys: Array< string >,
  languageTexts: Array< string >,
};

export type ModelLevelInterventionRelationConnection = {
  __typename: "ModelLevelInterventionRelationConnection",
  items:  Array<LevelInterventionRelation | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type LevelInterventionRelation = {
  __typename: "LevelInterventionRelation",
  id: string,
  levelId: string,
  interventionId: string,
  level: Level,
  intervention: Intervention,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type Intervention = {
  __typename: "Intervention",
  name: I18nString,
  description: I18nString,
  interventionType: InterventionType,
  contents?: ModelInterventionContentRelationConnection | null,
  surveys?: ModelSurveyConnection | null,
  tags?: ModelInterventionInterventionTagRelationConnection | null,
  schemeVersion?: number | null,
  levels?: ModelLevelInterventionRelationConnection | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export enum InterventionType {
  TECHNOLOGY = "TECHNOLOGY",
  EDUCATION = "EDUCATION",
}


export type ModelInterventionContentRelationConnection = {
  __typename: "ModelInterventionContentRelationConnection",
  items:  Array<InterventionContentRelation | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type InterventionContentRelation = {
  __typename: "InterventionContentRelation",
  id: string,
  interventionId: string,
  contentId: string,
  intervention: Intervention,
  content: Content,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type Content = {
  __typename: "Content",
  name: I18nString,
  description: I18nString,
  interventions?: ModelInterventionContentRelationConnection | null,
  tags?: ModelContentContentTagRelationConnection | null,
  schemeVersion?: number | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type ModelContentContentTagRelationConnection = {
  __typename: "ModelContentContentTagRelationConnection",
  items:  Array<ContentContentTagRelation | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ContentContentTagRelation = {
  __typename: "ContentContentTagRelation",
  id: string,
  contentId: string,
  contentTagId: string,
  content: Content,
  contentTag: ContentTag,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type ContentTag = {
  __typename: "ContentTag",
  text: I18nString,
  schemeVersion?: number | null,
  contents?: ModelContentContentTagRelationConnection | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type ModelSurveyConnection = {
  __typename: "ModelSurveyConnection",
  items:  Array<Survey | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Survey = {
  __typename: "Survey",
  name: I18nString,
  description: I18nString,
  intervention?: Intervention | null,
  questions:  Array<Question >,
  tags?: ModelSurveySurveyTagRelationConnection | null,
  surveyType: SurveyType,
  schemeVersion?: number | null,
  archived?: boolean | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  interventionSurveysId: string,
  organization_id?: string | null,
};

export type Question = {
  __typename: "Question",
  id: string,
  text: I18nString,
  type: QuestionType,
  questionOptions?:  Array<QuestionOption > | null,
  isFollowUpQuestion: boolean,
};

export enum QuestionType {
  TEXT = "TEXT",
  SINGLECHOICE = "SINGLECHOICE",
  MULTIPLECHOICE = "MULTIPLECHOICE",
  PICTURE = "PICTURE",
  PICTUREWITHTAGS = "PICTUREWITHTAGS",
  AUDIO = "AUDIO",
  INT = "INT",
  DOUBLE = "DOUBLE",
  RATING = "RATING",
}


export type QuestionOption = {
  __typename: "QuestionOption",
  id: string,
  text: I18nString,
  followUpQuestionIDs?: Array< string > | null,
};

export type ModelSurveySurveyTagRelationConnection = {
  __typename: "ModelSurveySurveyTagRelationConnection",
  items:  Array<SurveySurveyTagRelation | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type SurveySurveyTagRelation = {
  __typename: "SurveySurveyTagRelation",
  id: string,
  surveyId: string,
  surveyTagId: string,
  survey: Survey,
  surveyTag: SurveyTag,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type SurveyTag = {
  __typename: "SurveyTag",
  text: I18nString,
  schemeVersion?: number | null,
  surveys?: ModelSurveySurveyTagRelationConnection | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export enum SurveyType {
  INITIAL = "INITIAL",
  DEFAULT = "DEFAULT",
}


export type ModelInterventionInterventionTagRelationConnection = {
  __typename: "ModelInterventionInterventionTagRelationConnection",
  items:  Array<InterventionInterventionTagRelation | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type InterventionInterventionTagRelation = {
  __typename: "InterventionInterventionTagRelation",
  id: string,
  interventionId: string,
  interventionTagId: string,
  intervention: Intervention,
  interventionTag: InterventionTag,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type InterventionTag = {
  __typename: "InterventionTag",
  text: I18nString,
  schemeVersion?: number | null,
  interventions?: ModelInterventionInterventionTagRelationConnection | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type CustomData = {
  __typename: "CustomData",
  id: string,
  name: I18nString,
  type: Type,
};

export type UpdateLevelInput = {
  name?: I18nStringInput | null,
  description?: I18nStringInput | null,
  parentLevelID?: string | null,
  interventionsAreAllowed?: boolean | null,
  customData?: Array< CustomDataInput > | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
};

export type DeleteLevelInput = {
  id: string,
  _version?: number | null,
};

export type CreateInterventionInput = {
  name: I18nStringInput,
  description: I18nStringInput,
  interventionType: InterventionType,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
};

export type ModelInterventionConditionInput = {
  interventionType?: ModelInterventionTypeInput | null,
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelInterventionConditionInput | null > | null,
  or?: Array< ModelInterventionConditionInput | null > | null,
  not?: ModelInterventionConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelInterventionTypeInput = {
  eq?: InterventionType | null,
  ne?: InterventionType | null,
};

export type UpdateInterventionInput = {
  name?: I18nStringInput | null,
  description?: I18nStringInput | null,
  interventionType?: InterventionType | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
};

export type DeleteInterventionInput = {
  id: string,
  _version?: number | null,
};

export type CreateContentInput = {
  name: I18nStringInput,
  description: I18nStringInput,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
};

export type ModelContentConditionInput = {
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelContentConditionInput | null > | null,
  or?: Array< ModelContentConditionInput | null > | null,
  not?: ModelContentConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateContentInput = {
  name?: I18nStringInput | null,
  description?: I18nStringInput | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
};

export type DeleteContentInput = {
  id: string,
  _version?: number | null,
};

export type CreateSurveyInput = {
  name: I18nStringInput,
  description: I18nStringInput,
  questions: Array< QuestionInput >,
  surveyType: SurveyType,
  schemeVersion?: number | null,
  archived?: boolean | null,
  id?: string | null,
  _version?: number | null,
  interventionSurveysId: string,
};

export type QuestionInput = {
  id: string,
  text: I18nStringInput,
  type: QuestionType,
  questionOptions?: Array< QuestionOptionInput > | null,
  isFollowUpQuestion: boolean,
};

export type QuestionOptionInput = {
  id: string,
  text: I18nStringInput,
  followUpQuestionIDs?: Array< string > | null,
};

export type ModelSurveyConditionInput = {
  surveyType?: ModelSurveyTypeInput | null,
  schemeVersion?: ModelIntInput | null,
  archived?: ModelBooleanInput | null,
  and?: Array< ModelSurveyConditionInput | null > | null,
  or?: Array< ModelSurveyConditionInput | null > | null,
  not?: ModelSurveyConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  interventionSurveysId?: ModelIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSurveyTypeInput = {
  eq?: SurveyType | null,
  ne?: SurveyType | null,
};

export type UpdateSurveyInput = {
  name?: I18nStringInput | null,
  description?: I18nStringInput | null,
  questions?: Array< QuestionInput > | null,
  surveyType?: SurveyType | null,
  schemeVersion?: number | null,
  archived?: boolean | null,
  id: string,
  _version?: number | null,
  interventionSurveysId?: string | null,
};

export type DeleteSurveyInput = {
  id: string,
  _version?: number | null,
};

export type CreateEntityInput = {
  name: I18nStringInput,
  description: I18nStringInput,
  parentEntityID?: string | null,
  location?: LocationInput | null,
  customData: Array< AppliedCustomDataInput | null >,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
  entityLevelId: string,
};

export type LocationInput = {
  latitude?: number | null,
  longitude?: number | null,
};

export type AppliedCustomDataInput = {
  customDataID: string,
  type: Type,
  name: I18nStringInput,
  intValue?: number | null,
  stringValue?: string | null,
};

export type ModelEntityConditionInput = {
  parentEntityID?: ModelIDInput | null,
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelEntityConditionInput | null > | null,
  or?: Array< ModelEntityConditionInput | null > | null,
  not?: ModelEntityConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  entityLevelId?: ModelIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type Entity = {
  __typename: "Entity",
  name: I18nString,
  description: I18nString,
  parentEntityID?: string | null,
  level: Level,
  location?: Location | null,
  customData:  Array<AppliedCustomData | null >,
  appliedInterventions?: ModelAppliedInterventionConnection | null,
  schemeVersion?: number | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  entityLevelId: string,
  organization_id?: string | null,
};

export type Location = {
  __typename: "Location",
  latitude?: number | null,
  longitude?: number | null,
};

export type AppliedCustomData = {
  __typename: "AppliedCustomData",
  customDataID: string,
  type: Type,
  name: I18nString,
  intValue?: number | null,
  stringValue?: string | null,
};

export type ModelAppliedInterventionConnection = {
  __typename: "ModelAppliedInterventionConnection",
  items:  Array<AppliedIntervention | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type AppliedIntervention = {
  __typename: "AppliedIntervention",
  whoDidIt: User,
  intervention: Intervention,
  location?: Location | null,
  isOkay: boolean,
  executedSurveys?: ModelExecutedSurveyConnection | null,
  schemeVersion?: number | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  entityAppliedInterventionsId: string,
  appliedInterventionWhoDidItId: string,
  appliedInterventionInterventionId: string,
  organization_id?: string | null,
};

export type ModelExecutedSurveyConnection = {
  __typename: "ModelExecutedSurveyConnection",
  items:  Array<ExecutedSurvey | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ExecutedSurvey = {
  __typename: "ExecutedSurvey",
  appliedIntervention: AppliedIntervention,
  survey: Survey,
  surveyID?: string | null,
  whoExecutedIt: User,
  date: string,
  location?: Location | null,
  answers:  Array<QuestionAnswer >,
  schemeVersion?: number | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  appliedInterventionExecutedSurveysId: string,
  executedSurveySurveyId: string,
  executedSurveyWhoExecutedItId: string,
  organization_id?: string | null,
};

export type QuestionAnswer = {
  __typename: "QuestionAnswer",
  id: string,
  questionID: string,
  date: string,
  type: QuestionType,
  text?: string | null,
  intValue?: number | null,
  doubleValue?: number | null,
  rating?: number | null,
  questionOptions?:  Array<QuestionOption > | null,
  markings?:  Array<Marking > | null,
};

export type Marking = {
  __typename: "Marking",
  x: number,
  y: number,
  rx: number,
  ry: number,
  text: string,
};

export type UpdateEntityInput = {
  name?: I18nStringInput | null,
  description?: I18nStringInput | null,
  parentEntityID?: string | null,
  location?: LocationInput | null,
  customData?: Array< AppliedCustomDataInput | null > | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
  entityLevelId?: string | null,
};

export type DeleteEntityInput = {
  id: string,
  _version?: number | null,
};

export type CreateAppliedInterventionInput = {
  location?: LocationInput | null,
  isOkay: boolean,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
  entityAppliedInterventionsId: string,
  appliedInterventionWhoDidItId: string,
  appliedInterventionInterventionId: string,
};

export type ModelAppliedInterventionConditionInput = {
  isOkay?: ModelBooleanInput | null,
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelAppliedInterventionConditionInput | null > | null,
  or?: Array< ModelAppliedInterventionConditionInput | null > | null,
  not?: ModelAppliedInterventionConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  entityAppliedInterventionsId?: ModelIDInput | null,
  appliedInterventionWhoDidItId?: ModelIDInput | null,
  appliedInterventionInterventionId?: ModelIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateAppliedInterventionInput = {
  location?: LocationInput | null,
  isOkay?: boolean | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
  entityAppliedInterventionsId?: string | null,
  appliedInterventionWhoDidItId?: string | null,
  appliedInterventionInterventionId?: string | null,
};

export type DeleteAppliedInterventionInput = {
  id: string,
  _version?: number | null,
};

export type CreateExecutedSurveyInput = {
  surveyID?: string | null,
  date: string,
  location?: LocationInput | null,
  answers: Array< QuestionAnswerInput >,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
  appliedInterventionExecutedSurveysId: string,
  executedSurveySurveyId: string,
  executedSurveyWhoExecutedItId: string,
};

export type QuestionAnswerInput = {
  id: string,
  questionID: string,
  date: string,
  type: QuestionType,
  text?: string | null,
  intValue?: number | null,
  doubleValue?: number | null,
  rating?: number | null,
  questionOptions?: Array< QuestionOptionInput > | null,
  markings?: Array< MarkingInput > | null,
};

export type MarkingInput = {
  x: number,
  y: number,
  rx: number,
  ry: number,
  text: string,
};

export type ModelExecutedSurveyConditionInput = {
  surveyID?: ModelStringInput | null,
  date?: ModelStringInput | null,
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelExecutedSurveyConditionInput | null > | null,
  or?: Array< ModelExecutedSurveyConditionInput | null > | null,
  not?: ModelExecutedSurveyConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  appliedInterventionExecutedSurveysId?: ModelIDInput | null,
  executedSurveySurveyId?: ModelIDInput | null,
  executedSurveyWhoExecutedItId?: ModelIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateExecutedSurveyInput = {
  surveyID?: string | null,
  date?: string | null,
  location?: LocationInput | null,
  answers?: Array< QuestionAnswerInput > | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
  appliedInterventionExecutedSurveysId?: string | null,
  executedSurveySurveyId?: string | null,
  executedSurveyWhoExecutedItId?: string | null,
};

export type DeleteExecutedSurveyInput = {
  id: string,
  _version?: number | null,
};

export type CreateTaskInput = {
  title: string,
  text?: string | null,
  dueDate?: string | null,
  finishedDate?: string | null,
  location?: LocationInput | null,
  userID: string,
  schemeVersion?: number | null,
  picIDs: Array< number >,
  audioIDs: Array< number >,
  id?: string | null,
  _version?: number | null,
  taskUserId: string,
  taskEntityId?: string | null,
  taskAppliedInterventionId?: string | null,
  taskExecutedSurveyId?: string | null,
};

export type ModelTaskConditionInput = {
  title?: ModelStringInput | null,
  text?: ModelStringInput | null,
  dueDate?: ModelStringInput | null,
  finishedDate?: ModelStringInput | null,
  userID?: ModelStringInput | null,
  schemeVersion?: ModelIntInput | null,
  picIDs?: ModelIntInput | null,
  audioIDs?: ModelIntInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  taskUserId?: ModelIDInput | null,
  taskEntityId?: ModelIDInput | null,
  taskAppliedInterventionId?: ModelIDInput | null,
  taskExecutedSurveyId?: ModelIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type Task = {
  __typename: "Task",
  title: string,
  text?: string | null,
  dueDate?: string | null,
  finishedDate?: string | null,
  location?: Location | null,
  user: User,
  userID: string,
  entity?: Entity | null,
  appliedIntervention?: AppliedIntervention | null,
  executedSurvey?: ExecutedSurvey | null,
  schemeVersion?: number | null,
  picIDs: Array< number >,
  audioIDs: Array< number >,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  taskUserId: string,
  taskEntityId?: string | null,
  taskAppliedInterventionId?: string | null,
  taskExecutedSurveyId?: string | null,
  organization_id?: string | null,
};

export type UpdateTaskInput = {
  title?: string | null,
  text?: string | null,
  dueDate?: string | null,
  finishedDate?: string | null,
  location?: LocationInput | null,
  userID?: string | null,
  schemeVersion?: number | null,
  picIDs?: Array< number > | null,
  audioIDs?: Array< number > | null,
  id: string,
  _version?: number | null,
  taskUserId?: string | null,
  taskEntityId?: string | null,
  taskAppliedInterventionId?: string | null,
  taskExecutedSurveyId?: string | null,
};

export type DeleteTaskInput = {
  id: string,
  _version?: number | null,
};

export type CreateContentTagInput = {
  text: I18nStringInput,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
};

export type ModelContentTagConditionInput = {
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelContentTagConditionInput | null > | null,
  or?: Array< ModelContentTagConditionInput | null > | null,
  not?: ModelContentTagConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateContentTagInput = {
  text?: I18nStringInput | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
};

export type DeleteContentTagInput = {
  id: string,
  _version?: number | null,
};

export type CreateInterventionTagInput = {
  text: I18nStringInput,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
};

export type ModelInterventionTagConditionInput = {
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelInterventionTagConditionInput | null > | null,
  or?: Array< ModelInterventionTagConditionInput | null > | null,
  not?: ModelInterventionTagConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateInterventionTagInput = {
  text?: I18nStringInput | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
};

export type DeleteInterventionTagInput = {
  id: string,
  _version?: number | null,
};

export type CreateSurveyTagInput = {
  text: I18nStringInput,
  schemeVersion?: number | null,
  id?: string | null,
  _version?: number | null,
};

export type ModelSurveyTagConditionInput = {
  schemeVersion?: ModelIntInput | null,
  and?: Array< ModelSurveyTagConditionInput | null > | null,
  or?: Array< ModelSurveyTagConditionInput | null > | null,
  not?: ModelSurveyTagConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateSurveyTagInput = {
  text?: I18nStringInput | null,
  schemeVersion?: number | null,
  id: string,
  _version?: number | null,
};

export type DeleteSurveyTagInput = {
  id: string,
  _version?: number | null,
};

export type CreateSessionDataInput = {
  date: string,
  userID?: string | null,
  app?: string | null,
  version?: string | null,
  buildNumber?: string | null,
  remoteConfig?: string | null,
  platform?: string | null,
  id?: string | null,
  _version?: number | null,
};

export type ModelSessionDataConditionInput = {
  date?: ModelStringInput | null,
  userID?: ModelStringInput | null,
  app?: ModelStringInput | null,
  version?: ModelStringInput | null,
  buildNumber?: ModelStringInput | null,
  remoteConfig?: ModelStringInput | null,
  platform?: ModelStringInput | null,
  and?: Array< ModelSessionDataConditionInput | null > | null,
  or?: Array< ModelSessionDataConditionInput | null > | null,
  not?: ModelSessionDataConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type SessionData = {
  __typename: "SessionData",
  date: string,
  userID?: string | null,
  app?: string | null,
  version?: string | null,
  buildNumber?: string | null,
  remoteConfig?: string | null,
  platform?: string | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type UpdateSessionDataInput = {
  date?: string | null,
  userID?: string | null,
  app?: string | null,
  version?: string | null,
  buildNumber?: string | null,
  remoteConfig?: string | null,
  platform?: string | null,
  id: string,
  _version?: number | null,
};

export type DeleteSessionDataInput = {
  id: string,
  _version?: number | null,
};

export type CreateTestObjectInput = {
  name?: string | null,
  age: number,
  id?: string | null,
  _version?: number | null,
};

export type ModelTestObjectConditionInput = {
  name?: ModelStringInput | null,
  age?: ModelIntInput | null,
  and?: Array< ModelTestObjectConditionInput | null > | null,
  or?: Array< ModelTestObjectConditionInput | null > | null,
  not?: ModelTestObjectConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type TestObject = {
  __typename: "TestObject",
  name?: string | null,
  age: number,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  organization_id?: string | null,
};

export type UpdateTestObjectInput = {
  name?: string | null,
  age?: number | null,
  id: string,
  _version?: number | null,
};

export type DeleteTestObjectInput = {
  id: string,
  _version?: number | null,
};

export type CreateLevelInterventionRelationInput = {
  id?: string | null,
  levelId: string,
  interventionId: string,
  _version?: number | null,
};

export type ModelLevelInterventionRelationConditionInput = {
  levelId?: ModelIDInput | null,
  interventionId?: ModelIDInput | null,
  and?: Array< ModelLevelInterventionRelationConditionInput | null > | null,
  or?: Array< ModelLevelInterventionRelationConditionInput | null > | null,
  not?: ModelLevelInterventionRelationConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateLevelInterventionRelationInput = {
  id: string,
  levelId?: string | null,
  interventionId?: string | null,
  _version?: number | null,
};

export type DeleteLevelInterventionRelationInput = {
  id: string,
  _version?: number | null,
};

export type CreateInterventionContentRelationInput = {
  id?: string | null,
  interventionId: string,
  contentId: string,
  _version?: number | null,
};

export type ModelInterventionContentRelationConditionInput = {
  interventionId?: ModelIDInput | null,
  contentId?: ModelIDInput | null,
  and?: Array< ModelInterventionContentRelationConditionInput | null > | null,
  or?: Array< ModelInterventionContentRelationConditionInput | null > | null,
  not?: ModelInterventionContentRelationConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateInterventionContentRelationInput = {
  id: string,
  interventionId?: string | null,
  contentId?: string | null,
  _version?: number | null,
};

export type DeleteInterventionContentRelationInput = {
  id: string,
  _version?: number | null,
};

export type CreateInterventionInterventionTagRelationInput = {
  id?: string | null,
  interventionId: string,
  interventionTagId: string,
  _version?: number | null,
};

export type ModelInterventionInterventionTagRelationConditionInput = {
  interventionId?: ModelIDInput | null,
  interventionTagId?: ModelIDInput | null,
  and?: Array< ModelInterventionInterventionTagRelationConditionInput | null > | null,
  or?: Array< ModelInterventionInterventionTagRelationConditionInput | null > | null,
  not?: ModelInterventionInterventionTagRelationConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateInterventionInterventionTagRelationInput = {
  id: string,
  interventionId?: string | null,
  interventionTagId?: string | null,
  _version?: number | null,
};

export type DeleteInterventionInterventionTagRelationInput = {
  id: string,
  _version?: number | null,
};

export type CreateContentContentTagRelationInput = {
  id?: string | null,
  contentId: string,
  contentTagId: string,
  _version?: number | null,
};

export type ModelContentContentTagRelationConditionInput = {
  contentId?: ModelIDInput | null,
  contentTagId?: ModelIDInput | null,
  and?: Array< ModelContentContentTagRelationConditionInput | null > | null,
  or?: Array< ModelContentContentTagRelationConditionInput | null > | null,
  not?: ModelContentContentTagRelationConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateContentContentTagRelationInput = {
  id: string,
  contentId?: string | null,
  contentTagId?: string | null,
  _version?: number | null,
};

export type DeleteContentContentTagRelationInput = {
  id: string,
  _version?: number | null,
};

export type CreateSurveySurveyTagRelationInput = {
  id?: string | null,
  surveyId: string,
  surveyTagId: string,
  _version?: number | null,
};

export type ModelSurveySurveyTagRelationConditionInput = {
  surveyId?: ModelIDInput | null,
  surveyTagId?: ModelIDInput | null,
  and?: Array< ModelSurveySurveyTagRelationConditionInput | null > | null,
  or?: Array< ModelSurveySurveyTagRelationConditionInput | null > | null,
  not?: ModelSurveySurveyTagRelationConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  organization_id?: ModelStringInput | null,
};

export type UpdateSurveySurveyTagRelationInput = {
  id: string,
  surveyId?: string | null,
  surveyTagId?: string | null,
  _version?: number | null,
};

export type DeleteSurveySurveyTagRelationInput = {
  id: string,
  _version?: number | null,
};

export type ModelOrganizationFilterInput = {
  nameCamelCase?: ModelStringInput | null,
  nameKebabCase?: ModelStringInput | null,
  nameVerbose?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelOrganizationFilterInput | null > | null,
  or?: Array< ModelOrganizationFilterInput | null > | null,
  not?: ModelOrganizationFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelOrganizationConnection = {
  __typename: "ModelOrganizationConnection",
  items:  Array<Organization | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUserFilterInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelConfigFilterInput = {
  name?: ModelStringInput | null,
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelConfigFilterInput | null > | null,
  or?: Array< ModelConfigFilterInput | null > | null,
  not?: ModelConfigFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelConfigConnection = {
  __typename: "ModelConfigConnection",
  items:  Array<Config | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelLevelFilterInput = {
  parentLevelID?: ModelIDInput | null,
  interventionsAreAllowed?: ModelBooleanInput | null,
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelLevelFilterInput | null > | null,
  or?: Array< ModelLevelFilterInput | null > | null,
  not?: ModelLevelFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelLevelConnection = {
  __typename: "ModelLevelConnection",
  items:  Array<Level | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelInterventionFilterInput = {
  interventionType?: ModelInterventionTypeInput | null,
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelInterventionFilterInput | null > | null,
  or?: Array< ModelInterventionFilterInput | null > | null,
  not?: ModelInterventionFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelInterventionConnection = {
  __typename: "ModelInterventionConnection",
  items:  Array<Intervention | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelContentFilterInput = {
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelContentFilterInput | null > | null,
  or?: Array< ModelContentFilterInput | null > | null,
  not?: ModelContentFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelContentConnection = {
  __typename: "ModelContentConnection",
  items:  Array<Content | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSurveyFilterInput = {
  surveyType?: ModelSurveyTypeInput | null,
  schemeVersion?: ModelIntInput | null,
  archived?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSurveyFilterInput | null > | null,
  or?: Array< ModelSurveyFilterInput | null > | null,
  not?: ModelSurveyFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  interventionSurveysId?: ModelIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelEntityFilterInput = {
  parentEntityID?: ModelIDInput | null,
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelEntityFilterInput | null > | null,
  or?: Array< ModelEntityFilterInput | null > | null,
  not?: ModelEntityFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  entityLevelId?: ModelIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelEntityConnection = {
  __typename: "ModelEntityConnection",
  items:  Array<Entity | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelAppliedInterventionFilterInput = {
  isOkay?: ModelBooleanInput | null,
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAppliedInterventionFilterInput | null > | null,
  or?: Array< ModelAppliedInterventionFilterInput | null > | null,
  not?: ModelAppliedInterventionFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  entityAppliedInterventionsId?: ModelIDInput | null,
  appliedInterventionWhoDidItId?: ModelIDInput | null,
  appliedInterventionInterventionId?: ModelIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelExecutedSurveyFilterInput = {
  surveyID?: ModelStringInput | null,
  date?: ModelStringInput | null,
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelExecutedSurveyFilterInput | null > | null,
  or?: Array< ModelExecutedSurveyFilterInput | null > | null,
  not?: ModelExecutedSurveyFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  appliedInterventionExecutedSurveysId?: ModelIDInput | null,
  executedSurveySurveyId?: ModelIDInput | null,
  executedSurveyWhoExecutedItId?: ModelIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelTaskFilterInput = {
  title?: ModelStringInput | null,
  text?: ModelStringInput | null,
  dueDate?: ModelStringInput | null,
  finishedDate?: ModelStringInput | null,
  userID?: ModelStringInput | null,
  schemeVersion?: ModelIntInput | null,
  picIDs?: ModelIntInput | null,
  audioIDs?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  taskUserId?: ModelIDInput | null,
  taskEntityId?: ModelIDInput | null,
  taskAppliedInterventionId?: ModelIDInput | null,
  taskExecutedSurveyId?: ModelIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelTaskConnection = {
  __typename: "ModelTaskConnection",
  items:  Array<Task | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelContentTagFilterInput = {
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelContentTagFilterInput | null > | null,
  or?: Array< ModelContentTagFilterInput | null > | null,
  not?: ModelContentTagFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelContentTagConnection = {
  __typename: "ModelContentTagConnection",
  items:  Array<ContentTag | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelInterventionTagFilterInput = {
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelInterventionTagFilterInput | null > | null,
  or?: Array< ModelInterventionTagFilterInput | null > | null,
  not?: ModelInterventionTagFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelInterventionTagConnection = {
  __typename: "ModelInterventionTagConnection",
  items:  Array<InterventionTag | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSurveyTagFilterInput = {
  schemeVersion?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSurveyTagFilterInput | null > | null,
  or?: Array< ModelSurveyTagFilterInput | null > | null,
  not?: ModelSurveyTagFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSurveyTagConnection = {
  __typename: "ModelSurveyTagConnection",
  items:  Array<SurveyTag | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSessionDataFilterInput = {
  date?: ModelStringInput | null,
  userID?: ModelStringInput | null,
  app?: ModelStringInput | null,
  version?: ModelStringInput | null,
  buildNumber?: ModelStringInput | null,
  remoteConfig?: ModelStringInput | null,
  platform?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSessionDataFilterInput | null > | null,
  or?: Array< ModelSessionDataFilterInput | null > | null,
  not?: ModelSessionDataFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSessionDataConnection = {
  __typename: "ModelSessionDataConnection",
  items:  Array<SessionData | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelTestObjectFilterInput = {
  name?: ModelStringInput | null,
  age?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTestObjectFilterInput | null > | null,
  or?: Array< ModelTestObjectFilterInput | null > | null,
  not?: ModelTestObjectFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelTestObjectConnection = {
  __typename: "ModelTestObjectConnection",
  items:  Array<TestObject | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelLevelInterventionRelationFilterInput = {
  id?: ModelIDInput | null,
  levelId?: ModelIDInput | null,
  interventionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelLevelInterventionRelationFilterInput | null > | null,
  or?: Array< ModelLevelInterventionRelationFilterInput | null > | null,
  not?: ModelLevelInterventionRelationFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelInterventionContentRelationFilterInput = {
  id?: ModelIDInput | null,
  interventionId?: ModelIDInput | null,
  contentId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelInterventionContentRelationFilterInput | null > | null,
  or?: Array< ModelInterventionContentRelationFilterInput | null > | null,
  not?: ModelInterventionContentRelationFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelInterventionInterventionTagRelationFilterInput = {
  id?: ModelIDInput | null,
  interventionId?: ModelIDInput | null,
  interventionTagId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelInterventionInterventionTagRelationFilterInput | null > | null,
  or?: Array< ModelInterventionInterventionTagRelationFilterInput | null > | null,
  not?: ModelInterventionInterventionTagRelationFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelContentContentTagRelationFilterInput = {
  id?: ModelIDInput | null,
  contentId?: ModelIDInput | null,
  contentTagId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelContentContentTagRelationFilterInput | null > | null,
  or?: Array< ModelContentContentTagRelationFilterInput | null > | null,
  not?: ModelContentContentTagRelationFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSurveySurveyTagRelationFilterInput = {
  id?: ModelIDInput | null,
  surveyId?: ModelIDInput | null,
  surveyTagId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSurveySurveyTagRelationFilterInput | null > | null,
  or?: Array< ModelSurveySurveyTagRelationFilterInput | null > | null,
  not?: ModelSurveySurveyTagRelationFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionOrganizationFilterInput = {
  nameCamelCase?: ModelSubscriptionStringInput | null,
  nameKebabCase?: ModelSubscriptionStringInput | null,
  nameVerbose?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionOrganizationFilterInput | null > | null,
  or?: Array< ModelSubscriptionOrganizationFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionConfigFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionConfigFilterInput | null > | null,
  or?: Array< ModelSubscriptionConfigFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionLevelFilterInput = {
  parentLevelID?: ModelSubscriptionIDInput | null,
  interventionsAreAllowed?: ModelSubscriptionBooleanInput | null,
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLevelFilterInput | null > | null,
  or?: Array< ModelSubscriptionLevelFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionInterventionFilterInput = {
  interventionType?: ModelSubscriptionStringInput | null,
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInterventionFilterInput | null > | null,
  or?: Array< ModelSubscriptionInterventionFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  interventionSurveysId?: ModelSubscriptionIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionContentFilterInput = {
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionContentFilterInput | null > | null,
  or?: Array< ModelSubscriptionContentFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionSurveyFilterInput = {
  surveyType?: ModelSubscriptionStringInput | null,
  schemeVersion?: ModelSubscriptionIntInput | null,
  archived?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSurveyFilterInput | null > | null,
  or?: Array< ModelSubscriptionSurveyFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionEntityFilterInput = {
  parentEntityID?: ModelSubscriptionIDInput | null,
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEntityFilterInput | null > | null,
  or?: Array< ModelSubscriptionEntityFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  entityAppliedInterventionsId?: ModelSubscriptionIDInput | null,
  entityLevelId?: ModelSubscriptionIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionAppliedInterventionFilterInput = {
  isOkay?: ModelSubscriptionBooleanInput | null,
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAppliedInterventionFilterInput | null > | null,
  or?: Array< ModelSubscriptionAppliedInterventionFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  appliedInterventionExecutedSurveysId?: ModelSubscriptionIDInput | null,
  appliedInterventionWhoDidItId?: ModelSubscriptionIDInput | null,
  appliedInterventionInterventionId?: ModelSubscriptionIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionExecutedSurveyFilterInput = {
  surveyID?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionExecutedSurveyFilterInput | null > | null,
  or?: Array< ModelSubscriptionExecutedSurveyFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  executedSurveySurveyId?: ModelSubscriptionIDInput | null,
  executedSurveyWhoExecutedItId?: ModelSubscriptionIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionTaskFilterInput = {
  title?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  dueDate?: ModelSubscriptionStringInput | null,
  finishedDate?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionStringInput | null,
  schemeVersion?: ModelSubscriptionIntInput | null,
  picIDs?: ModelSubscriptionIntInput | null,
  audioIDs?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTaskFilterInput | null > | null,
  or?: Array< ModelSubscriptionTaskFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  taskUserId?: ModelSubscriptionIDInput | null,
  taskEntityId?: ModelSubscriptionIDInput | null,
  taskAppliedInterventionId?: ModelSubscriptionIDInput | null,
  taskExecutedSurveyId?: ModelSubscriptionIDInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionContentTagFilterInput = {
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionContentTagFilterInput | null > | null,
  or?: Array< ModelSubscriptionContentTagFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionInterventionTagFilterInput = {
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInterventionTagFilterInput | null > | null,
  or?: Array< ModelSubscriptionInterventionTagFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionSurveyTagFilterInput = {
  schemeVersion?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSurveyTagFilterInput | null > | null,
  or?: Array< ModelSubscriptionSurveyTagFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionSessionDataFilterInput = {
  date?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionStringInput | null,
  app?: ModelSubscriptionStringInput | null,
  version?: ModelSubscriptionStringInput | null,
  buildNumber?: ModelSubscriptionStringInput | null,
  remoteConfig?: ModelSubscriptionStringInput | null,
  platform?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSessionDataFilterInput | null > | null,
  or?: Array< ModelSubscriptionSessionDataFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionTestObjectFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  age?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTestObjectFilterInput | null > | null,
  or?: Array< ModelSubscriptionTestObjectFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionLevelInterventionRelationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  levelId?: ModelSubscriptionIDInput | null,
  interventionId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLevelInterventionRelationFilterInput | null > | null,
  or?: Array< ModelSubscriptionLevelInterventionRelationFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionInterventionContentRelationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  interventionId?: ModelSubscriptionIDInput | null,
  contentId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInterventionContentRelationFilterInput | null > | null,
  or?: Array< ModelSubscriptionInterventionContentRelationFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionInterventionInterventionTagRelationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  interventionId?: ModelSubscriptionIDInput | null,
  interventionTagId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInterventionInterventionTagRelationFilterInput | null > | null,
  or?: Array< ModelSubscriptionInterventionInterventionTagRelationFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionContentContentTagRelationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  contentId?: ModelSubscriptionIDInput | null,
  contentTagId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionContentContentTagRelationFilterInput | null > | null,
  or?: Array< ModelSubscriptionContentContentTagRelationFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type ModelSubscriptionSurveySurveyTagRelationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  surveyId?: ModelSubscriptionIDInput | null,
  surveyTagId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSurveySurveyTagRelationFilterInput | null > | null,
  or?: Array< ModelSubscriptionSurveySurveyTagRelationFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  organization_id?: ModelStringInput | null,
};

export type CreateOrganizationMutationVariables = {
  input: CreateOrganizationInput,
  condition?: ModelOrganizationConditionInput | null,
};

export type CreateOrganizationMutation = {
  createOrganization?:  {
    __typename: "Organization",
    nameCamelCase: string,
    nameKebabCase: string,
    nameVerbose: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateOrganizationMutationVariables = {
  input: UpdateOrganizationInput,
  condition?: ModelOrganizationConditionInput | null,
};

export type UpdateOrganizationMutation = {
  updateOrganization?:  {
    __typename: "Organization",
    nameCamelCase: string,
    nameKebabCase: string,
    nameVerbose: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteOrganizationMutationVariables = {
  input: DeleteOrganizationInput,
  condition?: ModelOrganizationConditionInput | null,
};

export type DeleteOrganizationMutation = {
  deleteOrganization?:  {
    __typename: "Organization",
    nameCamelCase: string,
    nameKebabCase: string,
    nameVerbose: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    firstName: string,
    lastName: string,
    bio?: string | null,
    permissions:  Array< {
      __typename: "Permission",
      permissionType: PermissionType,
      allowedEntities: Array< string >,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    firstName: string,
    lastName: string,
    bio?: string | null,
    permissions:  Array< {
      __typename: "Permission",
      permissionType: PermissionType,
      allowedEntities: Array< string >,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    firstName: string,
    lastName: string,
    bio?: string | null,
    permissions:  Array< {
      __typename: "Permission",
      permissionType: PermissionType,
      allowedEntities: Array< string >,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateConfigMutationVariables = {
  input: CreateConfigInput,
  condition?: ModelConfigConditionInput | null,
};

export type CreateConfigMutation = {
  createConfig?:  {
    __typename: "Config",
    name: string,
    colorTheme?:  {
      __typename: "ColorTheme",
      highlight?: string | null,
      secondaryHighlight?: string | null,
      backgroundOneLight?: string | null,
      backgroundTwoLight?: string | null,
      backgroundOneDark?: string | null,
      backgroundTwoDark?: string | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateConfigMutationVariables = {
  input: UpdateConfigInput,
  condition?: ModelConfigConditionInput | null,
};

export type UpdateConfigMutation = {
  updateConfig?:  {
    __typename: "Config",
    name: string,
    colorTheme?:  {
      __typename: "ColorTheme",
      highlight?: string | null,
      secondaryHighlight?: string | null,
      backgroundOneLight?: string | null,
      backgroundTwoLight?: string | null,
      backgroundOneDark?: string | null,
      backgroundTwoDark?: string | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteConfigMutationVariables = {
  input: DeleteConfigInput,
  condition?: ModelConfigConditionInput | null,
};

export type DeleteConfigMutation = {
  deleteConfig?:  {
    __typename: "Config",
    name: string,
    colorTheme?:  {
      __typename: "ColorTheme",
      highlight?: string | null,
      secondaryHighlight?: string | null,
      backgroundOneLight?: string | null,
      backgroundTwoLight?: string | null,
      backgroundOneDark?: string | null,
      backgroundTwoDark?: string | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateLevelMutationVariables = {
  input: CreateLevelInput,
  condition?: ModelLevelConditionInput | null,
};

export type CreateLevelMutation = {
  createLevel?:  {
    __typename: "Level",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentLevelID?: string | null,
    interventionsAreAllowed: boolean,
    allowedInterventions?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    customData:  Array< {
      __typename: "CustomData",
      id: string,
      type: Type,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateLevelMutationVariables = {
  input: UpdateLevelInput,
  condition?: ModelLevelConditionInput | null,
};

export type UpdateLevelMutation = {
  updateLevel?:  {
    __typename: "Level",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentLevelID?: string | null,
    interventionsAreAllowed: boolean,
    allowedInterventions?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    customData:  Array< {
      __typename: "CustomData",
      id: string,
      type: Type,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteLevelMutationVariables = {
  input: DeleteLevelInput,
  condition?: ModelLevelConditionInput | null,
};

export type DeleteLevelMutation = {
  deleteLevel?:  {
    __typename: "Level",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentLevelID?: string | null,
    interventionsAreAllowed: boolean,
    allowedInterventions?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    customData:  Array< {
      __typename: "CustomData",
      id: string,
      type: Type,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateInterventionMutationVariables = {
  input: CreateInterventionInput,
  condition?: ModelInterventionConditionInput | null,
};

export type CreateInterventionMutation = {
  createIntervention?:  {
    __typename: "Intervention",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventionType: InterventionType,
    contents?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveys?:  {
      __typename: "ModelSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    levels?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateInterventionMutationVariables = {
  input: UpdateInterventionInput,
  condition?: ModelInterventionConditionInput | null,
};

export type UpdateInterventionMutation = {
  updateIntervention?:  {
    __typename: "Intervention",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventionType: InterventionType,
    contents?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveys?:  {
      __typename: "ModelSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    levels?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteInterventionMutationVariables = {
  input: DeleteInterventionInput,
  condition?: ModelInterventionConditionInput | null,
};

export type DeleteInterventionMutation = {
  deleteIntervention?:  {
    __typename: "Intervention",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventionType: InterventionType,
    contents?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveys?:  {
      __typename: "ModelSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    levels?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateContentMutationVariables = {
  input: CreateContentInput,
  condition?: ModelContentConditionInput | null,
};

export type CreateContentMutation = {
  createContent?:  {
    __typename: "Content",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventions?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateContentMutationVariables = {
  input: UpdateContentInput,
  condition?: ModelContentConditionInput | null,
};

export type UpdateContentMutation = {
  updateContent?:  {
    __typename: "Content",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventions?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteContentMutationVariables = {
  input: DeleteContentInput,
  condition?: ModelContentConditionInput | null,
};

export type DeleteContentMutation = {
  deleteContent?:  {
    __typename: "Content",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventions?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateSurveyMutationVariables = {
  input: CreateSurveyInput,
  condition?: ModelSurveyConditionInput | null,
};

export type CreateSurveyMutation = {
  createSurvey?:  {
    __typename: "Survey",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    intervention?:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null,
    questions:  Array< {
      __typename: "Question",
      id: string,
      type: QuestionType,
      isFollowUpQuestion: boolean,
    } >,
    tags?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveyType: SurveyType,
    schemeVersion?: number | null,
    archived?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    interventionSurveysId: string,
    organization_id?: string | null,
  } | null,
};

export type UpdateSurveyMutationVariables = {
  input: UpdateSurveyInput,
  condition?: ModelSurveyConditionInput | null,
};

export type UpdateSurveyMutation = {
  updateSurvey?:  {
    __typename: "Survey",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    intervention?:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null,
    questions:  Array< {
      __typename: "Question",
      id: string,
      type: QuestionType,
      isFollowUpQuestion: boolean,
    } >,
    tags?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveyType: SurveyType,
    schemeVersion?: number | null,
    archived?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    interventionSurveysId: string,
    organization_id?: string | null,
  } | null,
};

export type DeleteSurveyMutationVariables = {
  input: DeleteSurveyInput,
  condition?: ModelSurveyConditionInput | null,
};

export type DeleteSurveyMutation = {
  deleteSurvey?:  {
    __typename: "Survey",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    intervention?:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null,
    questions:  Array< {
      __typename: "Question",
      id: string,
      type: QuestionType,
      isFollowUpQuestion: boolean,
    } >,
    tags?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveyType: SurveyType,
    schemeVersion?: number | null,
    archived?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    interventionSurveysId: string,
    organization_id?: string | null,
  } | null,
};

export type CreateEntityMutationVariables = {
  input: CreateEntityInput,
  condition?: ModelEntityConditionInput | null,
};

export type CreateEntityMutation = {
  createEntity?:  {
    __typename: "Entity",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentEntityID?: string | null,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    customData:  Array< {
      __typename: "AppliedCustomData",
      customDataID: string,
      type: Type,
      intValue?: number | null,
      stringValue?: string | null,
    } | null >,
    appliedInterventions?:  {
      __typename: "ModelAppliedInterventionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityLevelId: string,
    organization_id?: string | null,
  } | null,
};

export type UpdateEntityMutationVariables = {
  input: UpdateEntityInput,
  condition?: ModelEntityConditionInput | null,
};

export type UpdateEntityMutation = {
  updateEntity?:  {
    __typename: "Entity",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentEntityID?: string | null,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    customData:  Array< {
      __typename: "AppliedCustomData",
      customDataID: string,
      type: Type,
      intValue?: number | null,
      stringValue?: string | null,
    } | null >,
    appliedInterventions?:  {
      __typename: "ModelAppliedInterventionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityLevelId: string,
    organization_id?: string | null,
  } | null,
};

export type DeleteEntityMutationVariables = {
  input: DeleteEntityInput,
  condition?: ModelEntityConditionInput | null,
};

export type DeleteEntityMutation = {
  deleteEntity?:  {
    __typename: "Entity",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentEntityID?: string | null,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    customData:  Array< {
      __typename: "AppliedCustomData",
      customDataID: string,
      type: Type,
      intValue?: number | null,
      stringValue?: string | null,
    } | null >,
    appliedInterventions?:  {
      __typename: "ModelAppliedInterventionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityLevelId: string,
    organization_id?: string | null,
  } | null,
};

export type CreateAppliedInterventionMutationVariables = {
  input: CreateAppliedInterventionInput,
  condition?: ModelAppliedInterventionConditionInput | null,
};

export type CreateAppliedInterventionMutation = {
  createAppliedIntervention?:  {
    __typename: "AppliedIntervention",
    whoDidIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    isOkay: boolean,
    executedSurveys?:  {
      __typename: "ModelExecutedSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityAppliedInterventionsId: string,
    appliedInterventionWhoDidItId: string,
    appliedInterventionInterventionId: string,
    organization_id?: string | null,
  } | null,
};

export type UpdateAppliedInterventionMutationVariables = {
  input: UpdateAppliedInterventionInput,
  condition?: ModelAppliedInterventionConditionInput | null,
};

export type UpdateAppliedInterventionMutation = {
  updateAppliedIntervention?:  {
    __typename: "AppliedIntervention",
    whoDidIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    isOkay: boolean,
    executedSurveys?:  {
      __typename: "ModelExecutedSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityAppliedInterventionsId: string,
    appliedInterventionWhoDidItId: string,
    appliedInterventionInterventionId: string,
    organization_id?: string | null,
  } | null,
};

export type DeleteAppliedInterventionMutationVariables = {
  input: DeleteAppliedInterventionInput,
  condition?: ModelAppliedInterventionConditionInput | null,
};

export type DeleteAppliedInterventionMutation = {
  deleteAppliedIntervention?:  {
    __typename: "AppliedIntervention",
    whoDidIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    isOkay: boolean,
    executedSurveys?:  {
      __typename: "ModelExecutedSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityAppliedInterventionsId: string,
    appliedInterventionWhoDidItId: string,
    appliedInterventionInterventionId: string,
    organization_id?: string | null,
  } | null,
};

export type CreateExecutedSurveyMutationVariables = {
  input: CreateExecutedSurveyInput,
  condition?: ModelExecutedSurveyConditionInput | null,
};

export type CreateExecutedSurveyMutation = {
  createExecutedSurvey?:  {
    __typename: "ExecutedSurvey",
    appliedIntervention:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    },
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyID?: string | null,
    whoExecutedIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    date: string,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    answers:  Array< {
      __typename: "QuestionAnswer",
      id: string,
      questionID: string,
      date: string,
      type: QuestionType,
      text?: string | null,
      intValue?: number | null,
      doubleValue?: number | null,
      rating?: number | null,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    appliedInterventionExecutedSurveysId: string,
    executedSurveySurveyId: string,
    executedSurveyWhoExecutedItId: string,
    organization_id?: string | null,
  } | null,
};

export type UpdateExecutedSurveyMutationVariables = {
  input: UpdateExecutedSurveyInput,
  condition?: ModelExecutedSurveyConditionInput | null,
};

export type UpdateExecutedSurveyMutation = {
  updateExecutedSurvey?:  {
    __typename: "ExecutedSurvey",
    appliedIntervention:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    },
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyID?: string | null,
    whoExecutedIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    date: string,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    answers:  Array< {
      __typename: "QuestionAnswer",
      id: string,
      questionID: string,
      date: string,
      type: QuestionType,
      text?: string | null,
      intValue?: number | null,
      doubleValue?: number | null,
      rating?: number | null,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    appliedInterventionExecutedSurveysId: string,
    executedSurveySurveyId: string,
    executedSurveyWhoExecutedItId: string,
    organization_id?: string | null,
  } | null,
};

export type DeleteExecutedSurveyMutationVariables = {
  input: DeleteExecutedSurveyInput,
  condition?: ModelExecutedSurveyConditionInput | null,
};

export type DeleteExecutedSurveyMutation = {
  deleteExecutedSurvey?:  {
    __typename: "ExecutedSurvey",
    appliedIntervention:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    },
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyID?: string | null,
    whoExecutedIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    date: string,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    answers:  Array< {
      __typename: "QuestionAnswer",
      id: string,
      questionID: string,
      date: string,
      type: QuestionType,
      text?: string | null,
      intValue?: number | null,
      doubleValue?: number | null,
      rating?: number | null,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    appliedInterventionExecutedSurveysId: string,
    executedSurveySurveyId: string,
    executedSurveyWhoExecutedItId: string,
    organization_id?: string | null,
  } | null,
};

export type CreateTaskMutationVariables = {
  input: CreateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type CreateTaskMutation = {
  createTask?:  {
    __typename: "Task",
    title: string,
    text?: string | null,
    dueDate?: string | null,
    finishedDate?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    user:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    userID: string,
    entity?:  {
      __typename: "Entity",
      parentEntityID?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityLevelId: string,
      organization_id?: string | null,
    } | null,
    appliedIntervention?:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    } | null,
    executedSurvey?:  {
      __typename: "ExecutedSurvey",
      surveyID?: string | null,
      date: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      appliedInterventionExecutedSurveysId: string,
      executedSurveySurveyId: string,
      executedSurveyWhoExecutedItId: string,
      organization_id?: string | null,
    } | null,
    schemeVersion?: number | null,
    picIDs: Array< number >,
    audioIDs: Array< number >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    taskUserId: string,
    taskEntityId?: string | null,
    taskAppliedInterventionId?: string | null,
    taskExecutedSurveyId?: string | null,
    organization_id?: string | null,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type UpdateTaskMutation = {
  updateTask?:  {
    __typename: "Task",
    title: string,
    text?: string | null,
    dueDate?: string | null,
    finishedDate?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    user:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    userID: string,
    entity?:  {
      __typename: "Entity",
      parentEntityID?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityLevelId: string,
      organization_id?: string | null,
    } | null,
    appliedIntervention?:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    } | null,
    executedSurvey?:  {
      __typename: "ExecutedSurvey",
      surveyID?: string | null,
      date: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      appliedInterventionExecutedSurveysId: string,
      executedSurveySurveyId: string,
      executedSurveyWhoExecutedItId: string,
      organization_id?: string | null,
    } | null,
    schemeVersion?: number | null,
    picIDs: Array< number >,
    audioIDs: Array< number >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    taskUserId: string,
    taskEntityId?: string | null,
    taskAppliedInterventionId?: string | null,
    taskExecutedSurveyId?: string | null,
    organization_id?: string | null,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input: DeleteTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type DeleteTaskMutation = {
  deleteTask?:  {
    __typename: "Task",
    title: string,
    text?: string | null,
    dueDate?: string | null,
    finishedDate?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    user:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    userID: string,
    entity?:  {
      __typename: "Entity",
      parentEntityID?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityLevelId: string,
      organization_id?: string | null,
    } | null,
    appliedIntervention?:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    } | null,
    executedSurvey?:  {
      __typename: "ExecutedSurvey",
      surveyID?: string | null,
      date: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      appliedInterventionExecutedSurveysId: string,
      executedSurveySurveyId: string,
      executedSurveyWhoExecutedItId: string,
      organization_id?: string | null,
    } | null,
    schemeVersion?: number | null,
    picIDs: Array< number >,
    audioIDs: Array< number >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    taskUserId: string,
    taskEntityId?: string | null,
    taskAppliedInterventionId?: string | null,
    taskExecutedSurveyId?: string | null,
    organization_id?: string | null,
  } | null,
};

export type CreateContentTagMutationVariables = {
  input: CreateContentTagInput,
  condition?: ModelContentTagConditionInput | null,
};

export type CreateContentTagMutation = {
  createContentTag?:  {
    __typename: "ContentTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    contents?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateContentTagMutationVariables = {
  input: UpdateContentTagInput,
  condition?: ModelContentTagConditionInput | null,
};

export type UpdateContentTagMutation = {
  updateContentTag?:  {
    __typename: "ContentTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    contents?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteContentTagMutationVariables = {
  input: DeleteContentTagInput,
  condition?: ModelContentTagConditionInput | null,
};

export type DeleteContentTagMutation = {
  deleteContentTag?:  {
    __typename: "ContentTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    contents?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateInterventionTagMutationVariables = {
  input: CreateInterventionTagInput,
  condition?: ModelInterventionTagConditionInput | null,
};

export type CreateInterventionTagMutation = {
  createInterventionTag?:  {
    __typename: "InterventionTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    interventions?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateInterventionTagMutationVariables = {
  input: UpdateInterventionTagInput,
  condition?: ModelInterventionTagConditionInput | null,
};

export type UpdateInterventionTagMutation = {
  updateInterventionTag?:  {
    __typename: "InterventionTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    interventions?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteInterventionTagMutationVariables = {
  input: DeleteInterventionTagInput,
  condition?: ModelInterventionTagConditionInput | null,
};

export type DeleteInterventionTagMutation = {
  deleteInterventionTag?:  {
    __typename: "InterventionTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    interventions?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateSurveyTagMutationVariables = {
  input: CreateSurveyTagInput,
  condition?: ModelSurveyTagConditionInput | null,
};

export type CreateSurveyTagMutation = {
  createSurveyTag?:  {
    __typename: "SurveyTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    surveys?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateSurveyTagMutationVariables = {
  input: UpdateSurveyTagInput,
  condition?: ModelSurveyTagConditionInput | null,
};

export type UpdateSurveyTagMutation = {
  updateSurveyTag?:  {
    __typename: "SurveyTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    surveys?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteSurveyTagMutationVariables = {
  input: DeleteSurveyTagInput,
  condition?: ModelSurveyTagConditionInput | null,
};

export type DeleteSurveyTagMutation = {
  deleteSurveyTag?:  {
    __typename: "SurveyTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    surveys?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateSessionDataMutationVariables = {
  input: CreateSessionDataInput,
  condition?: ModelSessionDataConditionInput | null,
};

export type CreateSessionDataMutation = {
  createSessionData?:  {
    __typename: "SessionData",
    date: string,
    userID?: string | null,
    app?: string | null,
    version?: string | null,
    buildNumber?: string | null,
    remoteConfig?: string | null,
    platform?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateSessionDataMutationVariables = {
  input: UpdateSessionDataInput,
  condition?: ModelSessionDataConditionInput | null,
};

export type UpdateSessionDataMutation = {
  updateSessionData?:  {
    __typename: "SessionData",
    date: string,
    userID?: string | null,
    app?: string | null,
    version?: string | null,
    buildNumber?: string | null,
    remoteConfig?: string | null,
    platform?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteSessionDataMutationVariables = {
  input: DeleteSessionDataInput,
  condition?: ModelSessionDataConditionInput | null,
};

export type DeleteSessionDataMutation = {
  deleteSessionData?:  {
    __typename: "SessionData",
    date: string,
    userID?: string | null,
    app?: string | null,
    version?: string | null,
    buildNumber?: string | null,
    remoteConfig?: string | null,
    platform?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateTestObjectMutationVariables = {
  input: CreateTestObjectInput,
  condition?: ModelTestObjectConditionInput | null,
};

export type CreateTestObjectMutation = {
  createTestObject?:  {
    __typename: "TestObject",
    name?: string | null,
    age: number,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateTestObjectMutationVariables = {
  input: UpdateTestObjectInput,
  condition?: ModelTestObjectConditionInput | null,
};

export type UpdateTestObjectMutation = {
  updateTestObject?:  {
    __typename: "TestObject",
    name?: string | null,
    age: number,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteTestObjectMutationVariables = {
  input: DeleteTestObjectInput,
  condition?: ModelTestObjectConditionInput | null,
};

export type DeleteTestObjectMutation = {
  deleteTestObject?:  {
    __typename: "TestObject",
    name?: string | null,
    age: number,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateLevelInterventionRelationMutationVariables = {
  input: CreateLevelInterventionRelationInput,
  condition?: ModelLevelInterventionRelationConditionInput | null,
};

export type CreateLevelInterventionRelationMutation = {
  createLevelInterventionRelation?:  {
    __typename: "LevelInterventionRelation",
    id: string,
    levelId: string,
    interventionId: string,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateLevelInterventionRelationMutationVariables = {
  input: UpdateLevelInterventionRelationInput,
  condition?: ModelLevelInterventionRelationConditionInput | null,
};

export type UpdateLevelInterventionRelationMutation = {
  updateLevelInterventionRelation?:  {
    __typename: "LevelInterventionRelation",
    id: string,
    levelId: string,
    interventionId: string,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteLevelInterventionRelationMutationVariables = {
  input: DeleteLevelInterventionRelationInput,
  condition?: ModelLevelInterventionRelationConditionInput | null,
};

export type DeleteLevelInterventionRelationMutation = {
  deleteLevelInterventionRelation?:  {
    __typename: "LevelInterventionRelation",
    id: string,
    levelId: string,
    interventionId: string,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateInterventionContentRelationMutationVariables = {
  input: CreateInterventionContentRelationInput,
  condition?: ModelInterventionContentRelationConditionInput | null,
};

export type CreateInterventionContentRelationMutation = {
  createInterventionContentRelation?:  {
    __typename: "InterventionContentRelation",
    id: string,
    interventionId: string,
    contentId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateInterventionContentRelationMutationVariables = {
  input: UpdateInterventionContentRelationInput,
  condition?: ModelInterventionContentRelationConditionInput | null,
};

export type UpdateInterventionContentRelationMutation = {
  updateInterventionContentRelation?:  {
    __typename: "InterventionContentRelation",
    id: string,
    interventionId: string,
    contentId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteInterventionContentRelationMutationVariables = {
  input: DeleteInterventionContentRelationInput,
  condition?: ModelInterventionContentRelationConditionInput | null,
};

export type DeleteInterventionContentRelationMutation = {
  deleteInterventionContentRelation?:  {
    __typename: "InterventionContentRelation",
    id: string,
    interventionId: string,
    contentId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateInterventionInterventionTagRelationMutationVariables = {
  input: CreateInterventionInterventionTagRelationInput,
  condition?: ModelInterventionInterventionTagRelationConditionInput | null,
};

export type CreateInterventionInterventionTagRelationMutation = {
  createInterventionInterventionTagRelation?:  {
    __typename: "InterventionInterventionTagRelation",
    id: string,
    interventionId: string,
    interventionTagId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    interventionTag:  {
      __typename: "InterventionTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateInterventionInterventionTagRelationMutationVariables = {
  input: UpdateInterventionInterventionTagRelationInput,
  condition?: ModelInterventionInterventionTagRelationConditionInput | null,
};

export type UpdateInterventionInterventionTagRelationMutation = {
  updateInterventionInterventionTagRelation?:  {
    __typename: "InterventionInterventionTagRelation",
    id: string,
    interventionId: string,
    interventionTagId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    interventionTag:  {
      __typename: "InterventionTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteInterventionInterventionTagRelationMutationVariables = {
  input: DeleteInterventionInterventionTagRelationInput,
  condition?: ModelInterventionInterventionTagRelationConditionInput | null,
};

export type DeleteInterventionInterventionTagRelationMutation = {
  deleteInterventionInterventionTagRelation?:  {
    __typename: "InterventionInterventionTagRelation",
    id: string,
    interventionId: string,
    interventionTagId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    interventionTag:  {
      __typename: "InterventionTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateContentContentTagRelationMutationVariables = {
  input: CreateContentContentTagRelationInput,
  condition?: ModelContentContentTagRelationConditionInput | null,
};

export type CreateContentContentTagRelationMutation = {
  createContentContentTagRelation?:  {
    __typename: "ContentContentTagRelation",
    id: string,
    contentId: string,
    contentTagId: string,
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    contentTag:  {
      __typename: "ContentTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateContentContentTagRelationMutationVariables = {
  input: UpdateContentContentTagRelationInput,
  condition?: ModelContentContentTagRelationConditionInput | null,
};

export type UpdateContentContentTagRelationMutation = {
  updateContentContentTagRelation?:  {
    __typename: "ContentContentTagRelation",
    id: string,
    contentId: string,
    contentTagId: string,
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    contentTag:  {
      __typename: "ContentTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteContentContentTagRelationMutationVariables = {
  input: DeleteContentContentTagRelationInput,
  condition?: ModelContentContentTagRelationConditionInput | null,
};

export type DeleteContentContentTagRelationMutation = {
  deleteContentContentTagRelation?:  {
    __typename: "ContentContentTagRelation",
    id: string,
    contentId: string,
    contentTagId: string,
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    contentTag:  {
      __typename: "ContentTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type CreateSurveySurveyTagRelationMutationVariables = {
  input: CreateSurveySurveyTagRelationInput,
  condition?: ModelSurveySurveyTagRelationConditionInput | null,
};

export type CreateSurveySurveyTagRelationMutation = {
  createSurveySurveyTagRelation?:  {
    __typename: "SurveySurveyTagRelation",
    id: string,
    surveyId: string,
    surveyTagId: string,
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyTag:  {
      __typename: "SurveyTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type UpdateSurveySurveyTagRelationMutationVariables = {
  input: UpdateSurveySurveyTagRelationInput,
  condition?: ModelSurveySurveyTagRelationConditionInput | null,
};

export type UpdateSurveySurveyTagRelationMutation = {
  updateSurveySurveyTagRelation?:  {
    __typename: "SurveySurveyTagRelation",
    id: string,
    surveyId: string,
    surveyTagId: string,
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyTag:  {
      __typename: "SurveyTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type DeleteSurveySurveyTagRelationMutationVariables = {
  input: DeleteSurveySurveyTagRelationInput,
  condition?: ModelSurveySurveyTagRelationConditionInput | null,
};

export type DeleteSurveySurveyTagRelationMutation = {
  deleteSurveySurveyTagRelation?:  {
    __typename: "SurveySurveyTagRelation",
    id: string,
    surveyId: string,
    surveyTagId: string,
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyTag:  {
      __typename: "SurveyTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type GetOrganizationQueryVariables = {
  id: string,
};

export type GetOrganizationQuery = {
  getOrganization?:  {
    __typename: "Organization",
    nameCamelCase: string,
    nameKebabCase: string,
    nameVerbose: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListOrganizationsQueryVariables = {
  filter?: ModelOrganizationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrganizationsQuery = {
  listOrganizations?:  {
    __typename: "ModelOrganizationConnection",
    items:  Array< {
      __typename: "Organization",
      nameCamelCase: string,
      nameKebabCase: string,
      nameVerbose: string,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncOrganizationsQueryVariables = {
  filter?: ModelOrganizationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncOrganizationsQuery = {
  syncOrganizations?:  {
    __typename: "ModelOrganizationConnection",
    items:  Array< {
      __typename: "Organization",
      nameCamelCase: string,
      nameKebabCase: string,
      nameVerbose: string,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    firstName: string,
    lastName: string,
    bio?: string | null,
    permissions:  Array< {
      __typename: "Permission",
      permissionType: PermissionType,
      allowedEntities: Array< string >,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetConfigQueryVariables = {
  id: string,
};

export type GetConfigQuery = {
  getConfig?:  {
    __typename: "Config",
    name: string,
    colorTheme?:  {
      __typename: "ColorTheme",
      highlight?: string | null,
      secondaryHighlight?: string | null,
      backgroundOneLight?: string | null,
      backgroundTwoLight?: string | null,
      backgroundOneDark?: string | null,
      backgroundTwoDark?: string | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListConfigsQueryVariables = {
  filter?: ModelConfigFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConfigsQuery = {
  listConfigs?:  {
    __typename: "ModelConfigConnection",
    items:  Array< {
      __typename: "Config",
      name: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncConfigsQueryVariables = {
  filter?: ModelConfigFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncConfigsQuery = {
  syncConfigs?:  {
    __typename: "ModelConfigConnection",
    items:  Array< {
      __typename: "Config",
      name: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetLevelQueryVariables = {
  id: string,
};

export type GetLevelQuery = {
  getLevel?:  {
    __typename: "Level",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentLevelID?: string | null,
    interventionsAreAllowed: boolean,
    allowedInterventions?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    customData:  Array< {
      __typename: "CustomData",
      id: string,
      type: Type,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListLevelsQueryVariables = {
  filter?: ModelLevelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLevelsQuery = {
  listLevels?:  {
    __typename: "ModelLevelConnection",
    items:  Array< {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncLevelsQueryVariables = {
  filter?: ModelLevelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncLevelsQuery = {
  syncLevels?:  {
    __typename: "ModelLevelConnection",
    items:  Array< {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetInterventionQueryVariables = {
  id: string,
};

export type GetInterventionQuery = {
  getIntervention?:  {
    __typename: "Intervention",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventionType: InterventionType,
    contents?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveys?:  {
      __typename: "ModelSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    levels?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListInterventionsQueryVariables = {
  filter?: ModelInterventionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInterventionsQuery = {
  listInterventions?:  {
    __typename: "ModelInterventionConnection",
    items:  Array< {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncInterventionsQueryVariables = {
  filter?: ModelInterventionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncInterventionsQuery = {
  syncInterventions?:  {
    __typename: "ModelInterventionConnection",
    items:  Array< {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetContentQueryVariables = {
  id: string,
};

export type GetContentQuery = {
  getContent?:  {
    __typename: "Content",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventions?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListContentsQueryVariables = {
  filter?: ModelContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContentsQuery = {
  listContents?:  {
    __typename: "ModelContentConnection",
    items:  Array< {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncContentsQueryVariables = {
  filter?: ModelContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncContentsQuery = {
  syncContents?:  {
    __typename: "ModelContentConnection",
    items:  Array< {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetSurveyQueryVariables = {
  id: string,
};

export type GetSurveyQuery = {
  getSurvey?:  {
    __typename: "Survey",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    intervention?:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null,
    questions:  Array< {
      __typename: "Question",
      id: string,
      type: QuestionType,
      isFollowUpQuestion: boolean,
    } >,
    tags?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveyType: SurveyType,
    schemeVersion?: number | null,
    archived?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    interventionSurveysId: string,
    organization_id?: string | null,
  } | null,
};

export type ListSurveysQueryVariables = {
  filter?: ModelSurveyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSurveysQuery = {
  listSurveys?:  {
    __typename: "ModelSurveyConnection",
    items:  Array< {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSurveysQueryVariables = {
  filter?: ModelSurveyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSurveysQuery = {
  syncSurveys?:  {
    __typename: "ModelSurveyConnection",
    items:  Array< {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetEntityQueryVariables = {
  id: string,
};

export type GetEntityQuery = {
  getEntity?:  {
    __typename: "Entity",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentEntityID?: string | null,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    customData:  Array< {
      __typename: "AppliedCustomData",
      customDataID: string,
      type: Type,
      intValue?: number | null,
      stringValue?: string | null,
    } | null >,
    appliedInterventions?:  {
      __typename: "ModelAppliedInterventionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityLevelId: string,
    organization_id?: string | null,
  } | null,
};

export type ListEntitiesQueryVariables = {
  filter?: ModelEntityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEntitiesQuery = {
  listEntities?:  {
    __typename: "ModelEntityConnection",
    items:  Array< {
      __typename: "Entity",
      parentEntityID?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityLevelId: string,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncEntitiesQueryVariables = {
  filter?: ModelEntityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncEntitiesQuery = {
  syncEntities?:  {
    __typename: "ModelEntityConnection",
    items:  Array< {
      __typename: "Entity",
      parentEntityID?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityLevelId: string,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetAppliedInterventionQueryVariables = {
  id: string,
};

export type GetAppliedInterventionQuery = {
  getAppliedIntervention?:  {
    __typename: "AppliedIntervention",
    whoDidIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    isOkay: boolean,
    executedSurveys?:  {
      __typename: "ModelExecutedSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityAppliedInterventionsId: string,
    appliedInterventionWhoDidItId: string,
    appliedInterventionInterventionId: string,
    organization_id?: string | null,
  } | null,
};

export type ListAppliedInterventionsQueryVariables = {
  filter?: ModelAppliedInterventionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAppliedInterventionsQuery = {
  listAppliedInterventions?:  {
    __typename: "ModelAppliedInterventionConnection",
    items:  Array< {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAppliedInterventionsQueryVariables = {
  filter?: ModelAppliedInterventionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAppliedInterventionsQuery = {
  syncAppliedInterventions?:  {
    __typename: "ModelAppliedInterventionConnection",
    items:  Array< {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetExecutedSurveyQueryVariables = {
  id: string,
};

export type GetExecutedSurveyQuery = {
  getExecutedSurvey?:  {
    __typename: "ExecutedSurvey",
    appliedIntervention:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    },
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyID?: string | null,
    whoExecutedIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    date: string,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    answers:  Array< {
      __typename: "QuestionAnswer",
      id: string,
      questionID: string,
      date: string,
      type: QuestionType,
      text?: string | null,
      intValue?: number | null,
      doubleValue?: number | null,
      rating?: number | null,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    appliedInterventionExecutedSurveysId: string,
    executedSurveySurveyId: string,
    executedSurveyWhoExecutedItId: string,
    organization_id?: string | null,
  } | null,
};

export type ListExecutedSurveysQueryVariables = {
  filter?: ModelExecutedSurveyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExecutedSurveysQuery = {
  listExecutedSurveys?:  {
    __typename: "ModelExecutedSurveyConnection",
    items:  Array< {
      __typename: "ExecutedSurvey",
      surveyID?: string | null,
      date: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      appliedInterventionExecutedSurveysId: string,
      executedSurveySurveyId: string,
      executedSurveyWhoExecutedItId: string,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncExecutedSurveysQueryVariables = {
  filter?: ModelExecutedSurveyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncExecutedSurveysQuery = {
  syncExecutedSurveys?:  {
    __typename: "ModelExecutedSurveyConnection",
    items:  Array< {
      __typename: "ExecutedSurvey",
      surveyID?: string | null,
      date: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      appliedInterventionExecutedSurveysId: string,
      executedSurveySurveyId: string,
      executedSurveyWhoExecutedItId: string,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetTaskQueryVariables = {
  id: string,
};

export type GetTaskQuery = {
  getTask?:  {
    __typename: "Task",
    title: string,
    text?: string | null,
    dueDate?: string | null,
    finishedDate?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    user:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    userID: string,
    entity?:  {
      __typename: "Entity",
      parentEntityID?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityLevelId: string,
      organization_id?: string | null,
    } | null,
    appliedIntervention?:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    } | null,
    executedSurvey?:  {
      __typename: "ExecutedSurvey",
      surveyID?: string | null,
      date: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      appliedInterventionExecutedSurveysId: string,
      executedSurveySurveyId: string,
      executedSurveyWhoExecutedItId: string,
      organization_id?: string | null,
    } | null,
    schemeVersion?: number | null,
    picIDs: Array< number >,
    audioIDs: Array< number >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    taskUserId: string,
    taskEntityId?: string | null,
    taskAppliedInterventionId?: string | null,
    taskExecutedSurveyId?: string | null,
    organization_id?: string | null,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks?:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      title: string,
      text?: string | null,
      dueDate?: string | null,
      finishedDate?: string | null,
      userID: string,
      schemeVersion?: number | null,
      picIDs: Array< number >,
      audioIDs: Array< number >,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      taskUserId: string,
      taskEntityId?: string | null,
      taskAppliedInterventionId?: string | null,
      taskExecutedSurveyId?: string | null,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTasksQuery = {
  syncTasks?:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      title: string,
      text?: string | null,
      dueDate?: string | null,
      finishedDate?: string | null,
      userID: string,
      schemeVersion?: number | null,
      picIDs: Array< number >,
      audioIDs: Array< number >,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      taskUserId: string,
      taskEntityId?: string | null,
      taskAppliedInterventionId?: string | null,
      taskExecutedSurveyId?: string | null,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetContentTagQueryVariables = {
  id: string,
};

export type GetContentTagQuery = {
  getContentTag?:  {
    __typename: "ContentTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    contents?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListContentTagsQueryVariables = {
  filter?: ModelContentTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContentTagsQuery = {
  listContentTags?:  {
    __typename: "ModelContentTagConnection",
    items:  Array< {
      __typename: "ContentTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncContentTagsQueryVariables = {
  filter?: ModelContentTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncContentTagsQuery = {
  syncContentTags?:  {
    __typename: "ModelContentTagConnection",
    items:  Array< {
      __typename: "ContentTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetInterventionTagQueryVariables = {
  id: string,
};

export type GetInterventionTagQuery = {
  getInterventionTag?:  {
    __typename: "InterventionTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    interventions?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListInterventionTagsQueryVariables = {
  filter?: ModelInterventionTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInterventionTagsQuery = {
  listInterventionTags?:  {
    __typename: "ModelInterventionTagConnection",
    items:  Array< {
      __typename: "InterventionTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncInterventionTagsQueryVariables = {
  filter?: ModelInterventionTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncInterventionTagsQuery = {
  syncInterventionTags?:  {
    __typename: "ModelInterventionTagConnection",
    items:  Array< {
      __typename: "InterventionTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetSurveyTagQueryVariables = {
  id: string,
};

export type GetSurveyTagQuery = {
  getSurveyTag?:  {
    __typename: "SurveyTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    surveys?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListSurveyTagsQueryVariables = {
  filter?: ModelSurveyTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSurveyTagsQuery = {
  listSurveyTags?:  {
    __typename: "ModelSurveyTagConnection",
    items:  Array< {
      __typename: "SurveyTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSurveyTagsQueryVariables = {
  filter?: ModelSurveyTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSurveyTagsQuery = {
  syncSurveyTags?:  {
    __typename: "ModelSurveyTagConnection",
    items:  Array< {
      __typename: "SurveyTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetSessionDataQueryVariables = {
  id: string,
};

export type GetSessionDataQuery = {
  getSessionData?:  {
    __typename: "SessionData",
    date: string,
    userID?: string | null,
    app?: string | null,
    version?: string | null,
    buildNumber?: string | null,
    remoteConfig?: string | null,
    platform?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListSessionDataQueryVariables = {
  filter?: ModelSessionDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionDataQuery = {
  listSessionData?:  {
    __typename: "ModelSessionDataConnection",
    items:  Array< {
      __typename: "SessionData",
      date: string,
      userID?: string | null,
      app?: string | null,
      version?: string | null,
      buildNumber?: string | null,
      remoteConfig?: string | null,
      platform?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSessionDataQueryVariables = {
  filter?: ModelSessionDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSessionDataQuery = {
  syncSessionData?:  {
    __typename: "ModelSessionDataConnection",
    items:  Array< {
      __typename: "SessionData",
      date: string,
      userID?: string | null,
      app?: string | null,
      version?: string | null,
      buildNumber?: string | null,
      remoteConfig?: string | null,
      platform?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetTestObjectQueryVariables = {
  id: string,
};

export type GetTestObjectQuery = {
  getTestObject?:  {
    __typename: "TestObject",
    name?: string | null,
    age: number,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListTestObjectsQueryVariables = {
  filter?: ModelTestObjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTestObjectsQuery = {
  listTestObjects?:  {
    __typename: "ModelTestObjectConnection",
    items:  Array< {
      __typename: "TestObject",
      name?: string | null,
      age: number,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncTestObjectsQueryVariables = {
  filter?: ModelTestObjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTestObjectsQuery = {
  syncTestObjects?:  {
    __typename: "ModelTestObjectConnection",
    items:  Array< {
      __typename: "TestObject",
      name?: string | null,
      age: number,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetLevelInterventionRelationQueryVariables = {
  id: string,
};

export type GetLevelInterventionRelationQuery = {
  getLevelInterventionRelation?:  {
    __typename: "LevelInterventionRelation",
    id: string,
    levelId: string,
    interventionId: string,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListLevelInterventionRelationsQueryVariables = {
  filter?: ModelLevelInterventionRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLevelInterventionRelationsQuery = {
  listLevelInterventionRelations?:  {
    __typename: "ModelLevelInterventionRelationConnection",
    items:  Array< {
      __typename: "LevelInterventionRelation",
      id: string,
      levelId: string,
      interventionId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncLevelInterventionRelationsQueryVariables = {
  filter?: ModelLevelInterventionRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncLevelInterventionRelationsQuery = {
  syncLevelInterventionRelations?:  {
    __typename: "ModelLevelInterventionRelationConnection",
    items:  Array< {
      __typename: "LevelInterventionRelation",
      id: string,
      levelId: string,
      interventionId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetInterventionContentRelationQueryVariables = {
  id: string,
};

export type GetInterventionContentRelationQuery = {
  getInterventionContentRelation?:  {
    __typename: "InterventionContentRelation",
    id: string,
    interventionId: string,
    contentId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListInterventionContentRelationsQueryVariables = {
  filter?: ModelInterventionContentRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInterventionContentRelationsQuery = {
  listInterventionContentRelations?:  {
    __typename: "ModelInterventionContentRelationConnection",
    items:  Array< {
      __typename: "InterventionContentRelation",
      id: string,
      interventionId: string,
      contentId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncInterventionContentRelationsQueryVariables = {
  filter?: ModelInterventionContentRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncInterventionContentRelationsQuery = {
  syncInterventionContentRelations?:  {
    __typename: "ModelInterventionContentRelationConnection",
    items:  Array< {
      __typename: "InterventionContentRelation",
      id: string,
      interventionId: string,
      contentId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetInterventionInterventionTagRelationQueryVariables = {
  id: string,
};

export type GetInterventionInterventionTagRelationQuery = {
  getInterventionInterventionTagRelation?:  {
    __typename: "InterventionInterventionTagRelation",
    id: string,
    interventionId: string,
    interventionTagId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    interventionTag:  {
      __typename: "InterventionTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListInterventionInterventionTagRelationsQueryVariables = {
  filter?: ModelInterventionInterventionTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInterventionInterventionTagRelationsQuery = {
  listInterventionInterventionTagRelations?:  {
    __typename: "ModelInterventionInterventionTagRelationConnection",
    items:  Array< {
      __typename: "InterventionInterventionTagRelation",
      id: string,
      interventionId: string,
      interventionTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncInterventionInterventionTagRelationsQueryVariables = {
  filter?: ModelInterventionInterventionTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncInterventionInterventionTagRelationsQuery = {
  syncInterventionInterventionTagRelations?:  {
    __typename: "ModelInterventionInterventionTagRelationConnection",
    items:  Array< {
      __typename: "InterventionInterventionTagRelation",
      id: string,
      interventionId: string,
      interventionTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetContentContentTagRelationQueryVariables = {
  id: string,
};

export type GetContentContentTagRelationQuery = {
  getContentContentTagRelation?:  {
    __typename: "ContentContentTagRelation",
    id: string,
    contentId: string,
    contentTagId: string,
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    contentTag:  {
      __typename: "ContentTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListContentContentTagRelationsQueryVariables = {
  filter?: ModelContentContentTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContentContentTagRelationsQuery = {
  listContentContentTagRelations?:  {
    __typename: "ModelContentContentTagRelationConnection",
    items:  Array< {
      __typename: "ContentContentTagRelation",
      id: string,
      contentId: string,
      contentTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncContentContentTagRelationsQueryVariables = {
  filter?: ModelContentContentTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncContentContentTagRelationsQuery = {
  syncContentContentTagRelations?:  {
    __typename: "ModelContentContentTagRelationConnection",
    items:  Array< {
      __typename: "ContentContentTagRelation",
      id: string,
      contentId: string,
      contentTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetSurveySurveyTagRelationQueryVariables = {
  id: string,
};

export type GetSurveySurveyTagRelationQuery = {
  getSurveySurveyTagRelation?:  {
    __typename: "SurveySurveyTagRelation",
    id: string,
    surveyId: string,
    surveyTagId: string,
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyTag:  {
      __typename: "SurveyTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type ListSurveySurveyTagRelationsQueryVariables = {
  filter?: ModelSurveySurveyTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSurveySurveyTagRelationsQuery = {
  listSurveySurveyTagRelations?:  {
    __typename: "ModelSurveySurveyTagRelationConnection",
    items:  Array< {
      __typename: "SurveySurveyTagRelation",
      id: string,
      surveyId: string,
      surveyTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSurveySurveyTagRelationsQueryVariables = {
  filter?: ModelSurveySurveyTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSurveySurveyTagRelationsQuery = {
  syncSurveySurveyTagRelations?:  {
    __typename: "ModelSurveySurveyTagRelationConnection",
    items:  Array< {
      __typename: "SurveySurveyTagRelation",
      id: string,
      surveyId: string,
      surveyTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ExecutedSurveyBySurveyIDQueryVariables = {
  surveyID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelExecutedSurveyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ExecutedSurveyBySurveyIDQuery = {
  executedSurveyBySurveyID?:  {
    __typename: "ModelExecutedSurveyConnection",
    items:  Array< {
      __typename: "ExecutedSurvey",
      surveyID?: string | null,
      date: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      appliedInterventionExecutedSurveysId: string,
      executedSurveySurveyId: string,
      executedSurveyWhoExecutedItId: string,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type TaskByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TaskByUserIDQuery = {
  taskByUserID?:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      title: string,
      text?: string | null,
      dueDate?: string | null,
      finishedDate?: string | null,
      userID: string,
      schemeVersion?: number | null,
      picIDs: Array< number >,
      audioIDs: Array< number >,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      taskUserId: string,
      taskEntityId?: string | null,
      taskAppliedInterventionId?: string | null,
      taskExecutedSurveyId?: string | null,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type LevelInterventionRelationsByLevelIdQueryVariables = {
  levelId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLevelInterventionRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LevelInterventionRelationsByLevelIdQuery = {
  levelInterventionRelationsByLevelId?:  {
    __typename: "ModelLevelInterventionRelationConnection",
    items:  Array< {
      __typename: "LevelInterventionRelation",
      id: string,
      levelId: string,
      interventionId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type LevelInterventionRelationsByInterventionIdQueryVariables = {
  interventionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLevelInterventionRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LevelInterventionRelationsByInterventionIdQuery = {
  levelInterventionRelationsByInterventionId?:  {
    __typename: "ModelLevelInterventionRelationConnection",
    items:  Array< {
      __typename: "LevelInterventionRelation",
      id: string,
      levelId: string,
      interventionId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type InterventionContentRelationsByInterventionIdQueryVariables = {
  interventionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInterventionContentRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InterventionContentRelationsByInterventionIdQuery = {
  interventionContentRelationsByInterventionId?:  {
    __typename: "ModelInterventionContentRelationConnection",
    items:  Array< {
      __typename: "InterventionContentRelation",
      id: string,
      interventionId: string,
      contentId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type InterventionContentRelationsByContentIdQueryVariables = {
  contentId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInterventionContentRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InterventionContentRelationsByContentIdQuery = {
  interventionContentRelationsByContentId?:  {
    __typename: "ModelInterventionContentRelationConnection",
    items:  Array< {
      __typename: "InterventionContentRelation",
      id: string,
      interventionId: string,
      contentId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type InterventionInterventionTagRelationsByInterventionIdQueryVariables = {
  interventionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInterventionInterventionTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InterventionInterventionTagRelationsByInterventionIdQuery = {
  interventionInterventionTagRelationsByInterventionId?:  {
    __typename: "ModelInterventionInterventionTagRelationConnection",
    items:  Array< {
      __typename: "InterventionInterventionTagRelation",
      id: string,
      interventionId: string,
      interventionTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type InterventionInterventionTagRelationsByInterventionTagIdQueryVariables = {
  interventionTagId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInterventionInterventionTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InterventionInterventionTagRelationsByInterventionTagIdQuery = {
  interventionInterventionTagRelationsByInterventionTagId?:  {
    __typename: "ModelInterventionInterventionTagRelationConnection",
    items:  Array< {
      __typename: "InterventionInterventionTagRelation",
      id: string,
      interventionId: string,
      interventionTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ContentContentTagRelationsByContentIdQueryVariables = {
  contentId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelContentContentTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ContentContentTagRelationsByContentIdQuery = {
  contentContentTagRelationsByContentId?:  {
    __typename: "ModelContentContentTagRelationConnection",
    items:  Array< {
      __typename: "ContentContentTagRelation",
      id: string,
      contentId: string,
      contentTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ContentContentTagRelationsByContentTagIdQueryVariables = {
  contentTagId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelContentContentTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ContentContentTagRelationsByContentTagIdQuery = {
  contentContentTagRelationsByContentTagId?:  {
    __typename: "ModelContentContentTagRelationConnection",
    items:  Array< {
      __typename: "ContentContentTagRelation",
      id: string,
      contentId: string,
      contentTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SurveySurveyTagRelationsBySurveyIdQueryVariables = {
  surveyId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSurveySurveyTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SurveySurveyTagRelationsBySurveyIdQuery = {
  surveySurveyTagRelationsBySurveyId?:  {
    __typename: "ModelSurveySurveyTagRelationConnection",
    items:  Array< {
      __typename: "SurveySurveyTagRelation",
      id: string,
      surveyId: string,
      surveyTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SurveySurveyTagRelationsBySurveyTagIdQueryVariables = {
  surveyTagId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSurveySurveyTagRelationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SurveySurveyTagRelationsBySurveyTagIdQuery = {
  surveySurveyTagRelationsBySurveyTagId?:  {
    __typename: "ModelSurveySurveyTagRelationConnection",
    items:  Array< {
      __typename: "SurveySurveyTagRelation",
      id: string,
      surveyId: string,
      surveyTagId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionOrganizationFilterInput | null,
};

export type OnCreateOrganizationSubscription = {
  onCreateOrganization?:  {
    __typename: "Organization",
    nameCamelCase: string,
    nameKebabCase: string,
    nameVerbose: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionOrganizationFilterInput | null,
};

export type OnUpdateOrganizationSubscription = {
  onUpdateOrganization?:  {
    __typename: "Organization",
    nameCamelCase: string,
    nameKebabCase: string,
    nameVerbose: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionOrganizationFilterInput | null,
};

export type OnDeleteOrganizationSubscription = {
  onDeleteOrganization?:  {
    __typename: "Organization",
    nameCamelCase: string,
    nameKebabCase: string,
    nameVerbose: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    firstName: string,
    lastName: string,
    bio?: string | null,
    permissions:  Array< {
      __typename: "Permission",
      permissionType: PermissionType,
      allowedEntities: Array< string >,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    firstName: string,
    lastName: string,
    bio?: string | null,
    permissions:  Array< {
      __typename: "Permission",
      permissionType: PermissionType,
      allowedEntities: Array< string >,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    firstName: string,
    lastName: string,
    bio?: string | null,
    permissions:  Array< {
      __typename: "Permission",
      permissionType: PermissionType,
      allowedEntities: Array< string >,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateConfigSubscriptionVariables = {
  filter?: ModelSubscriptionConfigFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateConfigSubscription = {
  onCreateConfig?:  {
    __typename: "Config",
    name: string,
    colorTheme?:  {
      __typename: "ColorTheme",
      highlight?: string | null,
      secondaryHighlight?: string | null,
      backgroundOneLight?: string | null,
      backgroundTwoLight?: string | null,
      backgroundOneDark?: string | null,
      backgroundTwoDark?: string | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateConfigSubscriptionVariables = {
  filter?: ModelSubscriptionConfigFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateConfigSubscription = {
  onUpdateConfig?:  {
    __typename: "Config",
    name: string,
    colorTheme?:  {
      __typename: "ColorTheme",
      highlight?: string | null,
      secondaryHighlight?: string | null,
      backgroundOneLight?: string | null,
      backgroundTwoLight?: string | null,
      backgroundOneDark?: string | null,
      backgroundTwoDark?: string | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteConfigSubscriptionVariables = {
  filter?: ModelSubscriptionConfigFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteConfigSubscription = {
  onDeleteConfig?:  {
    __typename: "Config",
    name: string,
    colorTheme?:  {
      __typename: "ColorTheme",
      highlight?: string | null,
      secondaryHighlight?: string | null,
      backgroundOneLight?: string | null,
      backgroundTwoLight?: string | null,
      backgroundOneDark?: string | null,
      backgroundTwoDark?: string | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateLevelSubscriptionVariables = {
  filter?: ModelSubscriptionLevelFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateLevelSubscription = {
  onCreateLevel?:  {
    __typename: "Level",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentLevelID?: string | null,
    interventionsAreAllowed: boolean,
    allowedInterventions?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    customData:  Array< {
      __typename: "CustomData",
      id: string,
      type: Type,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateLevelSubscriptionVariables = {
  filter?: ModelSubscriptionLevelFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateLevelSubscription = {
  onUpdateLevel?:  {
    __typename: "Level",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentLevelID?: string | null,
    interventionsAreAllowed: boolean,
    allowedInterventions?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    customData:  Array< {
      __typename: "CustomData",
      id: string,
      type: Type,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteLevelSubscriptionVariables = {
  filter?: ModelSubscriptionLevelFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteLevelSubscription = {
  onDeleteLevel?:  {
    __typename: "Level",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentLevelID?: string | null,
    interventionsAreAllowed: boolean,
    allowedInterventions?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    customData:  Array< {
      __typename: "CustomData",
      id: string,
      type: Type,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateInterventionSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateInterventionSubscription = {
  onCreateIntervention?:  {
    __typename: "Intervention",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventionType: InterventionType,
    contents?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveys?:  {
      __typename: "ModelSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    levels?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateInterventionSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateInterventionSubscription = {
  onUpdateIntervention?:  {
    __typename: "Intervention",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventionType: InterventionType,
    contents?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveys?:  {
      __typename: "ModelSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    levels?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteInterventionSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteInterventionSubscription = {
  onDeleteIntervention?:  {
    __typename: "Intervention",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventionType: InterventionType,
    contents?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveys?:  {
      __typename: "ModelSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    levels?:  {
      __typename: "ModelLevelInterventionRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateContentSubscriptionVariables = {
  filter?: ModelSubscriptionContentFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateContentSubscription = {
  onCreateContent?:  {
    __typename: "Content",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventions?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateContentSubscriptionVariables = {
  filter?: ModelSubscriptionContentFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateContentSubscription = {
  onUpdateContent?:  {
    __typename: "Content",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventions?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteContentSubscriptionVariables = {
  filter?: ModelSubscriptionContentFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteContentSubscription = {
  onDeleteContent?:  {
    __typename: "Content",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    interventions?:  {
      __typename: "ModelInterventionContentRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    tags?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateSurveySubscriptionVariables = {
  filter?: ModelSubscriptionSurveyFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateSurveySubscription = {
  onCreateSurvey?:  {
    __typename: "Survey",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    intervention?:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null,
    questions:  Array< {
      __typename: "Question",
      id: string,
      type: QuestionType,
      isFollowUpQuestion: boolean,
    } >,
    tags?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveyType: SurveyType,
    schemeVersion?: number | null,
    archived?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    interventionSurveysId: string,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateSurveySubscriptionVariables = {
  filter?: ModelSubscriptionSurveyFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateSurveySubscription = {
  onUpdateSurvey?:  {
    __typename: "Survey",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    intervention?:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null,
    questions:  Array< {
      __typename: "Question",
      id: string,
      type: QuestionType,
      isFollowUpQuestion: boolean,
    } >,
    tags?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveyType: SurveyType,
    schemeVersion?: number | null,
    archived?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    interventionSurveysId: string,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteSurveySubscriptionVariables = {
  filter?: ModelSubscriptionSurveyFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteSurveySubscription = {
  onDeleteSurvey?:  {
    __typename: "Survey",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    intervention?:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    } | null,
    questions:  Array< {
      __typename: "Question",
      id: string,
      type: QuestionType,
      isFollowUpQuestion: boolean,
    } >,
    tags?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    surveyType: SurveyType,
    schemeVersion?: number | null,
    archived?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    interventionSurveysId: string,
    organization_id?: string | null,
  } | null,
};

export type OnCreateEntitySubscriptionVariables = {
  filter?: ModelSubscriptionEntityFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateEntitySubscription = {
  onCreateEntity?:  {
    __typename: "Entity",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentEntityID?: string | null,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    customData:  Array< {
      __typename: "AppliedCustomData",
      customDataID: string,
      type: Type,
      intValue?: number | null,
      stringValue?: string | null,
    } | null >,
    appliedInterventions?:  {
      __typename: "ModelAppliedInterventionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityLevelId: string,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateEntitySubscriptionVariables = {
  filter?: ModelSubscriptionEntityFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateEntitySubscription = {
  onUpdateEntity?:  {
    __typename: "Entity",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentEntityID?: string | null,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    customData:  Array< {
      __typename: "AppliedCustomData",
      customDataID: string,
      type: Type,
      intValue?: number | null,
      stringValue?: string | null,
    } | null >,
    appliedInterventions?:  {
      __typename: "ModelAppliedInterventionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityLevelId: string,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteEntitySubscriptionVariables = {
  filter?: ModelSubscriptionEntityFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteEntitySubscription = {
  onDeleteEntity?:  {
    __typename: "Entity",
    name:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    description:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    parentEntityID?: string | null,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    customData:  Array< {
      __typename: "AppliedCustomData",
      customDataID: string,
      type: Type,
      intValue?: number | null,
      stringValue?: string | null,
    } | null >,
    appliedInterventions?:  {
      __typename: "ModelAppliedInterventionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityLevelId: string,
    organization_id?: string | null,
  } | null,
};

export type OnCreateAppliedInterventionSubscriptionVariables = {
  filter?: ModelSubscriptionAppliedInterventionFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateAppliedInterventionSubscription = {
  onCreateAppliedIntervention?:  {
    __typename: "AppliedIntervention",
    whoDidIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    isOkay: boolean,
    executedSurveys?:  {
      __typename: "ModelExecutedSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityAppliedInterventionsId: string,
    appliedInterventionWhoDidItId: string,
    appliedInterventionInterventionId: string,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateAppliedInterventionSubscriptionVariables = {
  filter?: ModelSubscriptionAppliedInterventionFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateAppliedInterventionSubscription = {
  onUpdateAppliedIntervention?:  {
    __typename: "AppliedIntervention",
    whoDidIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    isOkay: boolean,
    executedSurveys?:  {
      __typename: "ModelExecutedSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityAppliedInterventionsId: string,
    appliedInterventionWhoDidItId: string,
    appliedInterventionInterventionId: string,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteAppliedInterventionSubscriptionVariables = {
  filter?: ModelSubscriptionAppliedInterventionFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteAppliedInterventionSubscription = {
  onDeleteAppliedIntervention?:  {
    __typename: "AppliedIntervention",
    whoDidIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    isOkay: boolean,
    executedSurveys?:  {
      __typename: "ModelExecutedSurveyConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    entityAppliedInterventionsId: string,
    appliedInterventionWhoDidItId: string,
    appliedInterventionInterventionId: string,
    organization_id?: string | null,
  } | null,
};

export type OnCreateExecutedSurveySubscriptionVariables = {
  filter?: ModelSubscriptionExecutedSurveyFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateExecutedSurveySubscription = {
  onCreateExecutedSurvey?:  {
    __typename: "ExecutedSurvey",
    appliedIntervention:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    },
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyID?: string | null,
    whoExecutedIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    date: string,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    answers:  Array< {
      __typename: "QuestionAnswer",
      id: string,
      questionID: string,
      date: string,
      type: QuestionType,
      text?: string | null,
      intValue?: number | null,
      doubleValue?: number | null,
      rating?: number | null,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    appliedInterventionExecutedSurveysId: string,
    executedSurveySurveyId: string,
    executedSurveyWhoExecutedItId: string,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateExecutedSurveySubscriptionVariables = {
  filter?: ModelSubscriptionExecutedSurveyFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateExecutedSurveySubscription = {
  onUpdateExecutedSurvey?:  {
    __typename: "ExecutedSurvey",
    appliedIntervention:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    },
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyID?: string | null,
    whoExecutedIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    date: string,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    answers:  Array< {
      __typename: "QuestionAnswer",
      id: string,
      questionID: string,
      date: string,
      type: QuestionType,
      text?: string | null,
      intValue?: number | null,
      doubleValue?: number | null,
      rating?: number | null,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    appliedInterventionExecutedSurveysId: string,
    executedSurveySurveyId: string,
    executedSurveyWhoExecutedItId: string,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteExecutedSurveySubscriptionVariables = {
  filter?: ModelSubscriptionExecutedSurveyFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteExecutedSurveySubscription = {
  onDeleteExecutedSurvey?:  {
    __typename: "ExecutedSurvey",
    appliedIntervention:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    },
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyID?: string | null,
    whoExecutedIt:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    date: string,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    answers:  Array< {
      __typename: "QuestionAnswer",
      id: string,
      questionID: string,
      date: string,
      type: QuestionType,
      text?: string | null,
      intValue?: number | null,
      doubleValue?: number | null,
      rating?: number | null,
    } >,
    schemeVersion?: number | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    appliedInterventionExecutedSurveysId: string,
    executedSurveySurveyId: string,
    executedSurveyWhoExecutedItId: string,
    organization_id?: string | null,
  } | null,
};

export type OnCreateTaskSubscriptionVariables = {
  filter?: ModelSubscriptionTaskFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateTaskSubscription = {
  onCreateTask?:  {
    __typename: "Task",
    title: string,
    text?: string | null,
    dueDate?: string | null,
    finishedDate?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    user:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    userID: string,
    entity?:  {
      __typename: "Entity",
      parentEntityID?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityLevelId: string,
      organization_id?: string | null,
    } | null,
    appliedIntervention?:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    } | null,
    executedSurvey?:  {
      __typename: "ExecutedSurvey",
      surveyID?: string | null,
      date: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      appliedInterventionExecutedSurveysId: string,
      executedSurveySurveyId: string,
      executedSurveyWhoExecutedItId: string,
      organization_id?: string | null,
    } | null,
    schemeVersion?: number | null,
    picIDs: Array< number >,
    audioIDs: Array< number >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    taskUserId: string,
    taskEntityId?: string | null,
    taskAppliedInterventionId?: string | null,
    taskExecutedSurveyId?: string | null,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateTaskSubscriptionVariables = {
  filter?: ModelSubscriptionTaskFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask?:  {
    __typename: "Task",
    title: string,
    text?: string | null,
    dueDate?: string | null,
    finishedDate?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    user:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    userID: string,
    entity?:  {
      __typename: "Entity",
      parentEntityID?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityLevelId: string,
      organization_id?: string | null,
    } | null,
    appliedIntervention?:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    } | null,
    executedSurvey?:  {
      __typename: "ExecutedSurvey",
      surveyID?: string | null,
      date: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      appliedInterventionExecutedSurveysId: string,
      executedSurveySurveyId: string,
      executedSurveyWhoExecutedItId: string,
      organization_id?: string | null,
    } | null,
    schemeVersion?: number | null,
    picIDs: Array< number >,
    audioIDs: Array< number >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    taskUserId: string,
    taskEntityId?: string | null,
    taskAppliedInterventionId?: string | null,
    taskExecutedSurveyId?: string | null,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteTaskSubscriptionVariables = {
  filter?: ModelSubscriptionTaskFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask?:  {
    __typename: "Task",
    title: string,
    text?: string | null,
    dueDate?: string | null,
    finishedDate?: string | null,
    location?:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
    user:  {
      __typename: "User",
      firstName: string,
      lastName: string,
      bio?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    userID: string,
    entity?:  {
      __typename: "Entity",
      parentEntityID?: string | null,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityLevelId: string,
      organization_id?: string | null,
    } | null,
    appliedIntervention?:  {
      __typename: "AppliedIntervention",
      isOkay: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      entityAppliedInterventionsId: string,
      appliedInterventionWhoDidItId: string,
      appliedInterventionInterventionId: string,
      organization_id?: string | null,
    } | null,
    executedSurvey?:  {
      __typename: "ExecutedSurvey",
      surveyID?: string | null,
      date: string,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      appliedInterventionExecutedSurveysId: string,
      executedSurveySurveyId: string,
      executedSurveyWhoExecutedItId: string,
      organization_id?: string | null,
    } | null,
    schemeVersion?: number | null,
    picIDs: Array< number >,
    audioIDs: Array< number >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    taskUserId: string,
    taskEntityId?: string | null,
    taskAppliedInterventionId?: string | null,
    taskExecutedSurveyId?: string | null,
    organization_id?: string | null,
  } | null,
};

export type OnCreateContentTagSubscriptionVariables = {
  filter?: ModelSubscriptionContentTagFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateContentTagSubscription = {
  onCreateContentTag?:  {
    __typename: "ContentTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    contents?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateContentTagSubscriptionVariables = {
  filter?: ModelSubscriptionContentTagFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateContentTagSubscription = {
  onUpdateContentTag?:  {
    __typename: "ContentTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    contents?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteContentTagSubscriptionVariables = {
  filter?: ModelSubscriptionContentTagFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteContentTagSubscription = {
  onDeleteContentTag?:  {
    __typename: "ContentTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    contents?:  {
      __typename: "ModelContentContentTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateInterventionTagSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionTagFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateInterventionTagSubscription = {
  onCreateInterventionTag?:  {
    __typename: "InterventionTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    interventions?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateInterventionTagSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionTagFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateInterventionTagSubscription = {
  onUpdateInterventionTag?:  {
    __typename: "InterventionTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    interventions?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteInterventionTagSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionTagFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteInterventionTagSubscription = {
  onDeleteInterventionTag?:  {
    __typename: "InterventionTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    interventions?:  {
      __typename: "ModelInterventionInterventionTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateSurveyTagSubscriptionVariables = {
  filter?: ModelSubscriptionSurveyTagFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateSurveyTagSubscription = {
  onCreateSurveyTag?:  {
    __typename: "SurveyTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    surveys?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateSurveyTagSubscriptionVariables = {
  filter?: ModelSubscriptionSurveyTagFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateSurveyTagSubscription = {
  onUpdateSurveyTag?:  {
    __typename: "SurveyTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    surveys?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteSurveyTagSubscriptionVariables = {
  filter?: ModelSubscriptionSurveyTagFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteSurveyTagSubscription = {
  onDeleteSurveyTag?:  {
    __typename: "SurveyTag",
    text:  {
      __typename: "I18nString",
      languageKeys: Array< string >,
      languageTexts: Array< string >,
    },
    schemeVersion?: number | null,
    surveys?:  {
      __typename: "ModelSurveySurveyTagRelationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateSessionDataSubscriptionVariables = {
  filter?: ModelSubscriptionSessionDataFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateSessionDataSubscription = {
  onCreateSessionData?:  {
    __typename: "SessionData",
    date: string,
    userID?: string | null,
    app?: string | null,
    version?: string | null,
    buildNumber?: string | null,
    remoteConfig?: string | null,
    platform?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateSessionDataSubscriptionVariables = {
  filter?: ModelSubscriptionSessionDataFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateSessionDataSubscription = {
  onUpdateSessionData?:  {
    __typename: "SessionData",
    date: string,
    userID?: string | null,
    app?: string | null,
    version?: string | null,
    buildNumber?: string | null,
    remoteConfig?: string | null,
    platform?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteSessionDataSubscriptionVariables = {
  filter?: ModelSubscriptionSessionDataFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteSessionDataSubscription = {
  onDeleteSessionData?:  {
    __typename: "SessionData",
    date: string,
    userID?: string | null,
    app?: string | null,
    version?: string | null,
    buildNumber?: string | null,
    remoteConfig?: string | null,
    platform?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateTestObjectSubscriptionVariables = {
  filter?: ModelSubscriptionTestObjectFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateTestObjectSubscription = {
  onCreateTestObject?:  {
    __typename: "TestObject",
    name?: string | null,
    age: number,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateTestObjectSubscriptionVariables = {
  filter?: ModelSubscriptionTestObjectFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateTestObjectSubscription = {
  onUpdateTestObject?:  {
    __typename: "TestObject",
    name?: string | null,
    age: number,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteTestObjectSubscriptionVariables = {
  filter?: ModelSubscriptionTestObjectFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteTestObjectSubscription = {
  onDeleteTestObject?:  {
    __typename: "TestObject",
    name?: string | null,
    age: number,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateLevelInterventionRelationSubscriptionVariables = {
  filter?: ModelSubscriptionLevelInterventionRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateLevelInterventionRelationSubscription = {
  onCreateLevelInterventionRelation?:  {
    __typename: "LevelInterventionRelation",
    id: string,
    levelId: string,
    interventionId: string,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateLevelInterventionRelationSubscriptionVariables = {
  filter?: ModelSubscriptionLevelInterventionRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateLevelInterventionRelationSubscription = {
  onUpdateLevelInterventionRelation?:  {
    __typename: "LevelInterventionRelation",
    id: string,
    levelId: string,
    interventionId: string,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteLevelInterventionRelationSubscriptionVariables = {
  filter?: ModelSubscriptionLevelInterventionRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteLevelInterventionRelationSubscription = {
  onDeleteLevelInterventionRelation?:  {
    __typename: "LevelInterventionRelation",
    id: string,
    levelId: string,
    interventionId: string,
    level:  {
      __typename: "Level",
      parentLevelID?: string | null,
      interventionsAreAllowed: boolean,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateInterventionContentRelationSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionContentRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateInterventionContentRelationSubscription = {
  onCreateInterventionContentRelation?:  {
    __typename: "InterventionContentRelation",
    id: string,
    interventionId: string,
    contentId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateInterventionContentRelationSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionContentRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateInterventionContentRelationSubscription = {
  onUpdateInterventionContentRelation?:  {
    __typename: "InterventionContentRelation",
    id: string,
    interventionId: string,
    contentId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteInterventionContentRelationSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionContentRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteInterventionContentRelationSubscription = {
  onDeleteInterventionContentRelation?:  {
    __typename: "InterventionContentRelation",
    id: string,
    interventionId: string,
    contentId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateInterventionInterventionTagRelationSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionInterventionTagRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateInterventionInterventionTagRelationSubscription = {
  onCreateInterventionInterventionTagRelation?:  {
    __typename: "InterventionInterventionTagRelation",
    id: string,
    interventionId: string,
    interventionTagId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    interventionTag:  {
      __typename: "InterventionTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateInterventionInterventionTagRelationSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionInterventionTagRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateInterventionInterventionTagRelationSubscription = {
  onUpdateInterventionInterventionTagRelation?:  {
    __typename: "InterventionInterventionTagRelation",
    id: string,
    interventionId: string,
    interventionTagId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    interventionTag:  {
      __typename: "InterventionTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteInterventionInterventionTagRelationSubscriptionVariables = {
  filter?: ModelSubscriptionInterventionInterventionTagRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteInterventionInterventionTagRelationSubscription = {
  onDeleteInterventionInterventionTagRelation?:  {
    __typename: "InterventionInterventionTagRelation",
    id: string,
    interventionId: string,
    interventionTagId: string,
    intervention:  {
      __typename: "Intervention",
      interventionType: InterventionType,
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    interventionTag:  {
      __typename: "InterventionTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateContentContentTagRelationSubscriptionVariables = {
  filter?: ModelSubscriptionContentContentTagRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateContentContentTagRelationSubscription = {
  onCreateContentContentTagRelation?:  {
    __typename: "ContentContentTagRelation",
    id: string,
    contentId: string,
    contentTagId: string,
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    contentTag:  {
      __typename: "ContentTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateContentContentTagRelationSubscriptionVariables = {
  filter?: ModelSubscriptionContentContentTagRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateContentContentTagRelationSubscription = {
  onUpdateContentContentTagRelation?:  {
    __typename: "ContentContentTagRelation",
    id: string,
    contentId: string,
    contentTagId: string,
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    contentTag:  {
      __typename: "ContentTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteContentContentTagRelationSubscriptionVariables = {
  filter?: ModelSubscriptionContentContentTagRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteContentContentTagRelationSubscription = {
  onDeleteContentContentTagRelation?:  {
    __typename: "ContentContentTagRelation",
    id: string,
    contentId: string,
    contentTagId: string,
    content:  {
      __typename: "Content",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    contentTag:  {
      __typename: "ContentTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnCreateSurveySurveyTagRelationSubscriptionVariables = {
  filter?: ModelSubscriptionSurveySurveyTagRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnCreateSurveySurveyTagRelationSubscription = {
  onCreateSurveySurveyTagRelation?:  {
    __typename: "SurveySurveyTagRelation",
    id: string,
    surveyId: string,
    surveyTagId: string,
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyTag:  {
      __typename: "SurveyTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnUpdateSurveySurveyTagRelationSubscriptionVariables = {
  filter?: ModelSubscriptionSurveySurveyTagRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnUpdateSurveySurveyTagRelationSubscription = {
  onUpdateSurveySurveyTagRelation?:  {
    __typename: "SurveySurveyTagRelation",
    id: string,
    surveyId: string,
    surveyTagId: string,
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyTag:  {
      __typename: "SurveyTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};

export type OnDeleteSurveySurveyTagRelationSubscriptionVariables = {
  filter?: ModelSubscriptionSurveySurveyTagRelationFilterInput | null,
  organization_id?: string | null,
};

export type OnDeleteSurveySurveyTagRelationSubscription = {
  onDeleteSurveySurveyTagRelation?:  {
    __typename: "SurveySurveyTagRelation",
    id: string,
    surveyId: string,
    surveyTagId: string,
    survey:  {
      __typename: "Survey",
      surveyType: SurveyType,
      schemeVersion?: number | null,
      archived?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      interventionSurveysId: string,
      organization_id?: string | null,
    },
    surveyTag:  {
      __typename: "SurveyTag",
      schemeVersion?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      organization_id?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    organization_id?: string | null,
  } | null,
};
