import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import {
  LazyLoading,
  LazyLoadingDisabled,
  AsyncCollection,
  AsyncItem,
} from "@aws-amplify/datastore";

export enum PermissionType {
  READ = "READ",
  CHANGEMASTERDATA = "CHANGEMASTERDATA",
  CREATEINTERVENTIONS = "CREATEINTERVENTIONS",
  EXECUTESURVEYS = "EXECUTESURVEYS",
  CREATESUBENTITIES = "CREATESUBENTITIES",
  ADMIN = "ADMIN",
}

export enum InterventionType {
  TECHNOLOGY = "TECHNOLOGY",
  EDUCATION = "EDUCATION",
}

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

export enum SurveyType {
  INITIAL = "INITIAL",
  DEFAULT = "DEFAULT",
}

export enum Type {
  INT = "INT",
  STRING = "STRING",
}

type EagerI18nString = {
  readonly languageKeys: string[];
  readonly languageTexts: string[];
};

type LazyI18nString = {
  readonly languageKeys: string[];
  readonly languageTexts: string[];
};

export declare type I18nString = LazyLoading extends LazyLoadingDisabled
  ? EagerI18nString
  : LazyI18nString;

export declare const I18nString: new (init: ModelInit<I18nString>) => I18nString;

type EagerPermission = {
  readonly permissionType: PermissionType | keyof typeof PermissionType;
  readonly allowedEntities: string[];
};

type LazyPermission = {
  readonly permissionType: PermissionType | keyof typeof PermissionType;
  readonly allowedEntities: string[];
};

export declare type Permission = LazyLoading extends LazyLoadingDisabled
  ? EagerPermission
  : LazyPermission;

export declare const Permission: new (init: ModelInit<Permission>) => Permission;

type EagerColorTheme = {
  readonly highlight?: string | null;
  readonly secondaryHighlight?: string | null;
  readonly backgroundOneLight?: string | null;
  readonly backgroundTwoLight?: string | null;
  readonly backgroundOneDark?: string | null;
  readonly backgroundTwoDark?: string | null;
};

type LazyColorTheme = {
  readonly highlight?: string | null;
  readonly secondaryHighlight?: string | null;
  readonly backgroundOneLight?: string | null;
  readonly backgroundTwoLight?: string | null;
  readonly backgroundOneDark?: string | null;
  readonly backgroundTwoDark?: string | null;
};

export declare type ColorTheme = LazyLoading extends LazyLoadingDisabled
  ? EagerColorTheme
  : LazyColorTheme;

export declare const ColorTheme: new (init: ModelInit<ColorTheme>) => ColorTheme;

type EagerQuestion = {
  readonly id: string;
  readonly text: I18nString;
  readonly type: QuestionType | keyof typeof QuestionType;
  readonly questionOptions?: QuestionOption[] | null;
  readonly isFollowUpQuestion: boolean;
};

type LazyQuestion = {
  readonly id: string;
  readonly text: I18nString;
  readonly type: QuestionType | keyof typeof QuestionType;
  readonly questionOptions?: QuestionOption[] | null;
  readonly isFollowUpQuestion: boolean;
};

export declare type Question = LazyLoading extends LazyLoadingDisabled
  ? EagerQuestion
  : LazyQuestion;

export declare const Question: new (init: ModelInit<Question>) => Question;

type EagerQuestionOption = {
  readonly id: string;
  readonly text: I18nString;
  readonly followUpQuestionIDs?: string[] | null;
};

type LazyQuestionOption = {
  readonly id: string;
  readonly text: I18nString;
  readonly followUpQuestionIDs?: string[] | null;
};

export declare type QuestionOption = LazyLoading extends LazyLoadingDisabled
  ? EagerQuestionOption
  : LazyQuestionOption;

export declare const QuestionOption: new (init: ModelInit<QuestionOption>) => QuestionOption;

type EagerCustomData = {
  readonly id: string;
  readonly name: I18nString;
  readonly type: Type | keyof typeof Type;
};

type LazyCustomData = {
  readonly id: string;
  readonly name: I18nString;
  readonly type: Type | keyof typeof Type;
};

export declare type CustomData = LazyLoading extends LazyLoadingDisabled
  ? EagerCustomData
  : LazyCustomData;

export declare const CustomData: new (init: ModelInit<CustomData>) => CustomData;

type EagerLocation = {
  readonly latitude?: number | null;
  readonly longitude?: number | null;
};

type LazyLocation = {
  readonly latitude?: number | null;
  readonly longitude?: number | null;
};

export declare type Location = LazyLoading extends LazyLoadingDisabled
  ? EagerLocation
  : LazyLocation;

export declare const Location: new (init: ModelInit<Location>) => Location;

type EagerAppliedCustomData = {
  readonly customDataID: string;
  readonly type: Type | keyof typeof Type;
  readonly name: I18nString;
  readonly intValue?: number | null;
  readonly stringValue?: string | null;
};

type LazyAppliedCustomData = {
  readonly customDataID: string;
  readonly type: Type | keyof typeof Type;
  readonly name: I18nString;
  readonly intValue?: number | null;
  readonly stringValue?: string | null;
};

export declare type AppliedCustomData = LazyLoading extends LazyLoadingDisabled
  ? EagerAppliedCustomData
  : LazyAppliedCustomData;

export declare const AppliedCustomData: new (
  init: ModelInit<AppliedCustomData>
) => AppliedCustomData;

type EagerQuestionAnswer = {
  readonly id: string;
  readonly questionID: string;
  readonly date: string;
  readonly type: QuestionType | keyof typeof QuestionType;
  readonly text?: string | null;
  readonly intValue?: number | null;
  readonly doubleValue?: number | null;
  readonly rating?: number | null;
  readonly questionOptions?: QuestionOption[] | null;
  readonly markings?: Marking[] | null;
};

type LazyQuestionAnswer = {
  readonly id: string;
  readonly questionID: string;
  readonly date: string;
  readonly type: QuestionType | keyof typeof QuestionType;
  readonly text?: string | null;
  readonly intValue?: number | null;
  readonly doubleValue?: number | null;
  readonly rating?: number | null;
  readonly questionOptions?: QuestionOption[] | null;
  readonly markings?: Marking[] | null;
};

export declare type QuestionAnswer = LazyLoading extends LazyLoadingDisabled
  ? EagerQuestionAnswer
  : LazyQuestionAnswer;

export declare const QuestionAnswer: new (init: ModelInit<QuestionAnswer>) => QuestionAnswer;

type EagerMarking = {
  readonly x: number;
  readonly y: number;
  readonly rx: number;
  readonly ry: number;
  readonly text: string;
};

type LazyMarking = {
  readonly x: number;
  readonly y: number;
  readonly rx: number;
  readonly ry: number;
  readonly text: string;
};

export declare type Marking = LazyLoading extends LazyLoadingDisabled ? EagerMarking : LazyMarking;

export declare const Marking: new (init: ModelInit<Marking>) => Marking;

type EagerOrganization = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Organization, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly nameCamelCase: string;
  readonly nameKebabCase: string;
  readonly nameVerbose: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyOrganization = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Organization, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly nameCamelCase: string;
  readonly nameKebabCase: string;
  readonly nameVerbose: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Organization = LazyLoading extends LazyLoadingDisabled
  ? EagerOrganization
  : LazyOrganization;

export declare const Organization: (new (init: ModelInit<Organization>) => Organization) & {
  copyOf(
    source: Organization,
    mutator: (draft: MutableModel<Organization>) => MutableModel<Organization> | void
  ): Organization;
};

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly bio?: string | null;
  readonly permissions: Permission[];
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly bio?: string | null;
  readonly permissions: Permission[];
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser;

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
};

type EagerConfig = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Config, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: string;
  readonly colorTheme?: ColorTheme | null;
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyConfig = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Config, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: string;
  readonly colorTheme?: ColorTheme | null;
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Config = LazyLoading extends LazyLoadingDisabled ? EagerConfig : LazyConfig;

export declare const Config: (new (init: ModelInit<Config>) => Config) & {
  copyOf(
    source: Config,
    mutator: (draft: MutableModel<Config>) => MutableModel<Config> | void
  ): Config;
};

type EagerLevel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Level, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: I18nString;
  readonly description: I18nString;
  readonly parentLevelID?: string | null;
  readonly interventionsAreAllowed: boolean;
  readonly allowedInterventions?: LevelInterventionRelation[] | null;
  readonly customData: CustomData[];
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyLevel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Level, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: I18nString;
  readonly description: I18nString;
  readonly parentLevelID?: string | null;
  readonly interventionsAreAllowed: boolean;
  readonly allowedInterventions: AsyncCollection<LevelInterventionRelation>;
  readonly customData: CustomData[];
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Level = LazyLoading extends LazyLoadingDisabled ? EagerLevel : LazyLevel;

export declare const Level: (new (init: ModelInit<Level>) => Level) & {
  copyOf(source: Level, mutator: (draft: MutableModel<Level>) => MutableModel<Level> | void): Level;
};

type EagerIntervention = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Intervention, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: I18nString;
  readonly description: I18nString;
  readonly interventionType: InterventionType | keyof typeof InterventionType;
  readonly contents: InterventionContentRelation[];
  readonly surveys: Survey[];
  readonly tags: InterventionInterventionTagRelation[];
  readonly schemeVersion?: number | null;
  readonly levels: LevelInterventionRelation[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyIntervention = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Intervention, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: I18nString;
  readonly description: I18nString;
  readonly interventionType: InterventionType | keyof typeof InterventionType;
  readonly contents: AsyncCollection<InterventionContentRelation>;
  readonly surveys: AsyncCollection<Survey>;
  readonly tags: AsyncCollection<InterventionInterventionTagRelation>;
  readonly schemeVersion?: number | null;
  readonly levels: AsyncCollection<LevelInterventionRelation>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Intervention = LazyLoading extends LazyLoadingDisabled
  ? EagerIntervention
  : LazyIntervention;

export declare const Intervention: (new (init: ModelInit<Intervention>) => Intervention) & {
  copyOf(
    source: Intervention,
    mutator: (draft: MutableModel<Intervention>) => MutableModel<Intervention> | void
  ): Intervention;
};

type EagerContent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Content, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: I18nString;
  readonly description: I18nString;
  readonly interventions: InterventionContentRelation[];
  readonly tags: ContentContentTagRelation[];
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyContent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Content, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: I18nString;
  readonly description: I18nString;
  readonly interventions: AsyncCollection<InterventionContentRelation>;
  readonly tags: AsyncCollection<ContentContentTagRelation>;
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Content = LazyLoading extends LazyLoadingDisabled ? EagerContent : LazyContent;

export declare const Content: (new (init: ModelInit<Content>) => Content) & {
  copyOf(
    source: Content,
    mutator: (draft: MutableModel<Content>) => MutableModel<Content> | void
  ): Content;
};

type EagerContentTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContentTag, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly text: I18nString;
  readonly schemeVersion?: number | null;
  readonly contents: ContentContentTagRelation[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyContentTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContentTag, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly text: I18nString;
  readonly schemeVersion?: number | null;
  readonly contents: AsyncCollection<ContentContentTagRelation>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type ContentTag = LazyLoading extends LazyLoadingDisabled
  ? EagerContentTag
  : LazyContentTag;

export declare const ContentTag: (new (init: ModelInit<ContentTag>) => ContentTag) & {
  copyOf(
    source: ContentTag,
    mutator: (draft: MutableModel<ContentTag>) => MutableModel<ContentTag> | void
  ): ContentTag;
};

type EagerSurvey = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Survey, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: I18nString;
  readonly description: I18nString;
  readonly intervention?: Intervention | null;
  readonly questions: Question[];
  readonly tags: SurveySurveyTagRelation[];
  readonly surveyType: SurveyType | keyof typeof SurveyType;
  readonly schemeVersion?: number | null;
  readonly archived?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly interventionSurveysId?: string | null;
};

type LazySurvey = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Survey, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: I18nString;
  readonly description: I18nString;
  readonly intervention: AsyncItem<Intervention | undefined>;
  readonly questions: Question[];
  readonly tags: AsyncCollection<SurveySurveyTagRelation>;
  readonly surveyType: SurveyType | keyof typeof SurveyType;
  readonly schemeVersion?: number | null;
  readonly archived?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly interventionSurveysId?: string | null;
};

export declare type Survey = LazyLoading extends LazyLoadingDisabled ? EagerSurvey : LazySurvey;

export declare const Survey: (new (init: ModelInit<Survey>) => Survey) & {
  copyOf(
    source: Survey,
    mutator: (draft: MutableModel<Survey>) => MutableModel<Survey> | void
  ): Survey;
};

type EagerSurveyTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SurveyTag, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly text: I18nString;
  readonly schemeVersion?: number | null;
  readonly surveys: SurveySurveyTagRelation[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazySurveyTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SurveyTag, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly text: I18nString;
  readonly schemeVersion?: number | null;
  readonly surveys: AsyncCollection<SurveySurveyTagRelation>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type SurveyTag = LazyLoading extends LazyLoadingDisabled
  ? EagerSurveyTag
  : LazySurveyTag;

export declare const SurveyTag: (new (init: ModelInit<SurveyTag>) => SurveyTag) & {
  copyOf(
    source: SurveyTag,
    mutator: (draft: MutableModel<SurveyTag>) => MutableModel<SurveyTag> | void
  ): SurveyTag;
};

type EagerInterventionTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InterventionTag, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly text: I18nString;
  readonly schemeVersion?: number | null;
  readonly interventions: InterventionInterventionTagRelation[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyInterventionTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InterventionTag, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly text: I18nString;
  readonly schemeVersion?: number | null;
  readonly interventions: AsyncCollection<InterventionInterventionTagRelation>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type InterventionTag = LazyLoading extends LazyLoadingDisabled
  ? EagerInterventionTag
  : LazyInterventionTag;

export declare const InterventionTag: (new (
  init: ModelInit<InterventionTag>
) => InterventionTag) & {
  copyOf(
    source: InterventionTag,
    mutator: (draft: MutableModel<InterventionTag>) => MutableModel<InterventionTag> | void
  ): InterventionTag;
};

type EagerEntity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Entity, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: I18nString;
  readonly description: I18nString;
  readonly parentEntityID?: string | null;
  readonly level: Level;
  readonly location?: Location | null;
  readonly customData: (AppliedCustomData | null)[];
  readonly appliedInterventions: AppliedIntervention[];
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly entityLevelId: string;
};

type LazyEntity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Entity, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: I18nString;
  readonly description: I18nString;
  readonly parentEntityID?: string | null;
  readonly level: AsyncItem<Level>;
  readonly location?: Location | null;
  readonly customData: (AppliedCustomData | null)[];
  readonly appliedInterventions: AsyncCollection<AppliedIntervention>;
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly entityLevelId: string;
};

export declare type Entity = LazyLoading extends LazyLoadingDisabled ? EagerEntity : LazyEntity;

export declare const Entity: (new (init: ModelInit<Entity>) => Entity) & {
  copyOf(
    source: Entity,
    mutator: (draft: MutableModel<Entity>) => MutableModel<Entity> | void
  ): Entity;
};

type EagerAppliedIntervention = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AppliedIntervention, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly whoDidIt: User;
  readonly intervention: Intervention;
  readonly location?: Location | null;
  readonly isOkay: boolean;
  readonly executedSurveys: ExecutedSurvey[];
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly entityAppliedInterventionsId?: string | null;
  readonly appliedInterventionWhoDidItId: string;
  readonly appliedInterventionInterventionId: string;
};

type LazyAppliedIntervention = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AppliedIntervention, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly whoDidIt: AsyncItem<User>;
  readonly intervention: AsyncItem<Intervention>;
  readonly location?: Location | null;
  readonly isOkay: boolean;
  readonly executedSurveys: AsyncCollection<ExecutedSurvey>;
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly entityAppliedInterventionsId?: string | null;
  readonly appliedInterventionWhoDidItId: string;
  readonly appliedInterventionInterventionId: string;
};

export declare type AppliedIntervention = LazyLoading extends LazyLoadingDisabled
  ? EagerAppliedIntervention
  : LazyAppliedIntervention;

export declare const AppliedIntervention: (new (
  init: ModelInit<AppliedIntervention>
) => AppliedIntervention) & {
  copyOf(
    source: AppliedIntervention,
    mutator: (draft: MutableModel<AppliedIntervention>) => MutableModel<AppliedIntervention> | void
  ): AppliedIntervention;
};

type EagerExecutedSurvey = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ExecutedSurvey, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly appliedIntervention: AppliedIntervention;
  readonly survey: Survey;
  readonly surveyID?: string | null;
  readonly whoExecutedIt: User;
  readonly date: string;
  readonly location?: Location | null;
  readonly answers: QuestionAnswer[];
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly appliedInterventionExecutedSurveysId?: string | null;
  readonly executedSurveySurveyId: string;
  readonly executedSurveyWhoExecutedItId: string;
};

type LazyExecutedSurvey = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ExecutedSurvey, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly appliedIntervention: AsyncItem<AppliedIntervention>;
  readonly survey: AsyncItem<Survey>;
  readonly surveyID?: string | null;
  readonly whoExecutedIt: AsyncItem<User>;
  readonly date: string;
  readonly location?: Location | null;
  readonly answers: QuestionAnswer[];
  readonly schemeVersion?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly appliedInterventionExecutedSurveysId?: string | null;
  readonly executedSurveySurveyId: string;
  readonly executedSurveyWhoExecutedItId: string;
};

export declare type ExecutedSurvey = LazyLoading extends LazyLoadingDisabled
  ? EagerExecutedSurvey
  : LazyExecutedSurvey;

export declare const ExecutedSurvey: (new (init: ModelInit<ExecutedSurvey>) => ExecutedSurvey) & {
  copyOf(
    source: ExecutedSurvey,
    mutator: (draft: MutableModel<ExecutedSurvey>) => MutableModel<ExecutedSurvey> | void
  ): ExecutedSurvey;
};

type EagerTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly title: string;
  readonly text?: string | null;
  readonly dueDate?: string | null;
  readonly finishedDate?: string | null;
  readonly location?: Location | null;
  readonly user: User;
  readonly userID: string;
  readonly entity?: Entity | null;
  readonly appliedIntervention?: AppliedIntervention | null;
  readonly executedSurvey?: ExecutedSurvey | null;
  readonly schemeVersion?: number | null;
  readonly picIDs: number[];
  readonly audioIDs: number[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly taskUserId: string;
  readonly taskEntityId?: string | null;
  readonly taskAppliedInterventionId?: string | null;
  readonly taskExecutedSurveyId?: string | null;
};

type LazyTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly title: string;
  readonly text?: string | null;
  readonly dueDate?: string | null;
  readonly finishedDate?: string | null;
  readonly location?: Location | null;
  readonly user: AsyncItem<User>;
  readonly userID: string;
  readonly entity: AsyncItem<Entity | undefined>;
  readonly appliedIntervention: AsyncItem<AppliedIntervention | undefined>;
  readonly executedSurvey: AsyncItem<ExecutedSurvey | undefined>;
  readonly schemeVersion?: number | null;
  readonly picIDs: number[];
  readonly audioIDs: number[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly taskUserId: string;
  readonly taskEntityId?: string | null;
  readonly taskAppliedInterventionId?: string | null;
  readonly taskExecutedSurveyId?: string | null;
};

export declare type Task = LazyLoading extends LazyLoadingDisabled ? EagerTask : LazyTask;

export declare const Task: (new (init: ModelInit<Task>) => Task) & {
  copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
};

type EagerSessionData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SessionData, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly date: string;
  readonly userID?: string | null;
  readonly app?: string | null;
  readonly version?: string | null;
  readonly buildNumber?: string | null;
  readonly remoteConfig?: string | null;
  readonly platform?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazySessionData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SessionData, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly date: string;
  readonly userID?: string | null;
  readonly app?: string | null;
  readonly version?: string | null;
  readonly buildNumber?: string | null;
  readonly remoteConfig?: string | null;
  readonly platform?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type SessionData = LazyLoading extends LazyLoadingDisabled
  ? EagerSessionData
  : LazySessionData;

export declare const SessionData: (new (init: ModelInit<SessionData>) => SessionData) & {
  copyOf(
    source: SessionData,
    mutator: (draft: MutableModel<SessionData>) => MutableModel<SessionData> | void
  ): SessionData;
};

type EagerLevelInterventionRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LevelInterventionRelation, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly levelId?: string | null;
  readonly interventionId?: string | null;
  readonly level: Level;
  readonly intervention: Intervention;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyLevelInterventionRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LevelInterventionRelation, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly levelId?: string | null;
  readonly interventionId?: string | null;
  readonly level: AsyncItem<Level>;
  readonly intervention: AsyncItem<Intervention>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type LevelInterventionRelation = LazyLoading extends LazyLoadingDisabled
  ? EagerLevelInterventionRelation
  : LazyLevelInterventionRelation;

export declare const LevelInterventionRelation: (new (
  init: ModelInit<LevelInterventionRelation>
) => LevelInterventionRelation) & {
  copyOf(
    source: LevelInterventionRelation,
    mutator: (
      draft: MutableModel<LevelInterventionRelation>
    ) => MutableModel<LevelInterventionRelation> | void
  ): LevelInterventionRelation;
};

type EagerInterventionContentRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InterventionContentRelation, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly interventionId?: string | null;
  readonly contentId?: string | null;
  readonly intervention: Intervention;
  readonly content: Content;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyInterventionContentRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InterventionContentRelation, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly interventionId?: string | null;
  readonly contentId?: string | null;
  readonly intervention: AsyncItem<Intervention>;
  readonly content: AsyncItem<Content>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type InterventionContentRelation = LazyLoading extends LazyLoadingDisabled
  ? EagerInterventionContentRelation
  : LazyInterventionContentRelation;

export declare const InterventionContentRelation: (new (
  init: ModelInit<InterventionContentRelation>
) => InterventionContentRelation) & {
  copyOf(
    source: InterventionContentRelation,
    mutator: (
      draft: MutableModel<InterventionContentRelation>
    ) => MutableModel<InterventionContentRelation> | void
  ): InterventionContentRelation;
};

type EagerInterventionInterventionTagRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InterventionInterventionTagRelation, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly interventionId?: string | null;
  readonly interventionTagId?: string | null;
  readonly intervention: Intervention;
  readonly interventionTag: InterventionTag;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyInterventionInterventionTagRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InterventionInterventionTagRelation, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly interventionId?: string | null;
  readonly interventionTagId?: string | null;
  readonly intervention: AsyncItem<Intervention>;
  readonly interventionTag: AsyncItem<InterventionTag>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type InterventionInterventionTagRelation = LazyLoading extends LazyLoadingDisabled
  ? EagerInterventionInterventionTagRelation
  : LazyInterventionInterventionTagRelation;

export declare const InterventionInterventionTagRelation: (new (
  init: ModelInit<InterventionInterventionTagRelation>
) => InterventionInterventionTagRelation) & {
  copyOf(
    source: InterventionInterventionTagRelation,
    mutator: (
      draft: MutableModel<InterventionInterventionTagRelation>
    ) => MutableModel<InterventionInterventionTagRelation> | void
  ): InterventionInterventionTagRelation;
};

type EagerContentContentTagRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContentContentTagRelation, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly contentId?: string | null;
  readonly contentTagId?: string | null;
  readonly content: Content;
  readonly contentTag: ContentTag;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyContentContentTagRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContentContentTagRelation, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly contentId?: string | null;
  readonly contentTagId?: string | null;
  readonly content: AsyncItem<Content>;
  readonly contentTag: AsyncItem<ContentTag>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type ContentContentTagRelation = LazyLoading extends LazyLoadingDisabled
  ? EagerContentContentTagRelation
  : LazyContentContentTagRelation;

export declare const ContentContentTagRelation: (new (
  init: ModelInit<ContentContentTagRelation>
) => ContentContentTagRelation) & {
  copyOf(
    source: ContentContentTagRelation,
    mutator: (
      draft: MutableModel<ContentContentTagRelation>
    ) => MutableModel<ContentContentTagRelation> | void
  ): ContentContentTagRelation;
};

type EagerSurveySurveyTagRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SurveySurveyTagRelation, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly surveyId?: string | null;
  readonly surveyTagId?: string | null;
  readonly survey: Survey;
  readonly surveyTag: SurveyTag;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazySurveySurveyTagRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SurveySurveyTagRelation, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly surveyId?: string | null;
  readonly surveyTagId?: string | null;
  readonly survey: AsyncItem<Survey>;
  readonly surveyTag: AsyncItem<SurveyTag>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type SurveySurveyTagRelation = LazyLoading extends LazyLoadingDisabled
  ? EagerSurveySurveyTagRelation
  : LazySurveySurveyTagRelation;

export declare const SurveySurveyTagRelation: (new (
  init: ModelInit<SurveySurveyTagRelation>
) => SurveySurveyTagRelation) & {
  copyOf(
    source: SurveySurveyTagRelation,
    mutator: (
      draft: MutableModel<SurveySurveyTagRelation>
    ) => MutableModel<SurveySurveyTagRelation> | void
  ): SurveySurveyTagRelation;
};
