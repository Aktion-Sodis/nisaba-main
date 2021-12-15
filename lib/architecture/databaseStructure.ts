import {
  DocTagsEnum,
  Geoloc,
  SurveyTypesEnum,
  QuestionTypesEnum,
  Marking,
  ID,
} from "./utils";

interface Config {
  ID: ID /* primary key */;
  name: string;
  verboseName: string;
  bannerPath: string;
  iconPath: string;
  locales: string[];
  colors: {
    primary: string;
    secondary: number;
    white: number;
    black: number;
    gray: number;
    lightGray: number;
  };
  databaseDerivableTemplates: {
    userImgPath: string;
    levelImgPath: string;
    levelMasterDataImgPath: string;
    entityAppliedMasterDataImgPath: string;
    technologyImgPath: string;
    technologyDocMdPath: string;
    appliedTechnologyImgPath: string;
    surveyImgPath: string;
    questionImgPath: string;
    questionOptionImgPath: string;
    entityImgPath: string;
    executedSurveyAnswerAudioPath: string;
    executedSurveyAnswerImgPath: string;
    taskImgPath: string;
    taskAudioPath: string;
  };
  creationDate: number;
  lastEditDate: number;
}

interface User {
  ID: ID /* primary key */;
  firstName: string;
  lastName: string;
  permissions: {
    read: ID[];
    createSubentities: ID[];
  };
  creationDate: number;
  lastEditDate: number;
}

interface Level {
  ID: ID /* primary key */;
  name: string;
  upperLevelID: ID /* foreign key */;
  customData: [{ ID: ID /* primary key */; name: string }];
  creationDate: number;
  lastEditDate: number;
}

interface Technology {
  ID: ID /* primary key */;
  description: string;
  docs: [
    {
      ID: ID /* primary key */;
      name: string;
      description: string;
      tags: DocTagsEnum;
    }
  ];
  surveys: [{ surveyID: ID /* foreign key */ }];
  creationDate: number;
  lastEditDate: number;
}

interface Entity {
  ID: ID /* primary key */;
  parentEntityID: ID /* foreign key */;
  name: string;
  geolocation: Geoloc;
  levelID: ID /* foreign key */;
  appliedCustomData: [
    {
      ID: ID /* foreign key */;
      customDataID: ID /* foreign key */;
      name: string;
      value: number;
    }
  ];
  appliedTecnologies: [
    {
      ID: ID /* primary key */;
      applierUserID: ID /* foreign key */;
      technologyID: ID /* foreign key */;
      geolocation: Geoloc;
      executedSurveys: ID[];
    }
  ];
  creationDate: number;
  lastEditDate: number;
}

interface Question {
  ID: ID /* primary key */;
  text: string;
  type: QuestionTypesEnum;
  questionOptions: [{ ID: ID; /* primary key */ text: string }];
  followingQuestion: string;
}

interface Survey {
  ID: ID /* primary key */;
  description: string;
  type: SurveyTypesEnum;
  questionIDs: ID[];
  creationDate: number;
  lastEditDate: number;
}

interface executedSurvey {
  ID: ID /* primary key */;
  surveyID: ID /* foreign key */;
  executorUserID: ID /* foreign key */;
  executionDate: number;
  geolocation: Geoloc;
  answers: [
    {
      ID: ID /* primary key */;
      questionID: ID /* foreign key */;
      answerTime: number;
      text: string;
      markings: Marking[];
    }
  ];
  creationDate: number;
  lastEditDate: number;
}

interface Task {
  ID: ID /* primary key */;
  title: string;
  text: string;
  dueDate: number;
  finishedDate: number | null /* if null, not finished */;
  geolocation: Geoloc;
  executorUserID: ID /* foreign key */;
  entityID: ID /* foreign key */;
  appliedTechnologyID: ID /* foreign key */;
  executedSurveyID: ID /* foreign key */;
  creationDate: number;
  lastEditDate: number;
}
