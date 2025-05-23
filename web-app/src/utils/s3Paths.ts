import { useAuthStore } from '@/stores/auth';

export const S3_PATHS = {
  userPicPath: {
    path: 'userFiles/userID/pic.png',
    toBeReplaced: ['userID'],
  },
  levelPicPath: {
    path: 'levelFiles/levelID/pic.png',
    toBeReplaced: ['levelID'],
  },
  levelCustomDataPicPath: {
    path: 'levelFiles/levelID/customDataFiles/customDataID/pic.png',
    toBeReplaced: ['levelID', 'customDataID'],
  },
  interventionPicPath: {
    path: 'interventionFiles/interventionID/pic.png',
    toBeReplaced: ['interventionID'],
  },
  docPdfPath: {
    path: 'documentFiles/documentID/pdf.pdf',
    toBeReplaced: ['documentID'],
  },
  docPicPath: {
    path: 'documentFiles/documentID/pic.png',
    toBeReplaced: ['documentID'],
  },
  surveyPicPath: {
    path: 'surveyFiles/surveyID/pic.png',
    toBeReplaced: ['surveyID'],
  },
  questionPicPath: {
    path: 'surveyFiles/surveyID/questionFiles/questionID/pic.png',
    toBeReplaced: ['surveyID', 'questionID'],
  },
  questionOptionPicPath: {
    path: 'surveyFiles/surveyID/questionFiles/questionID/optionFiles/optionID/pic.png',
    toBeReplaced: ['surveyID', 'questionID', 'optionID'],
  },
  questionPicAnswerPath: {
    path: 'appliedInterventionFiles/appliedInterventionID/executedSurveyFiles/executedSurveyID/questionFiles/questionID/pic.png',
    toBeReplaced: ['appliedInterventionID', 'executedSurveyID', 'questionID'],
  },
  questionAudioAnswerPath: {
    path: 'appliedInterventionFiles/appliedInterventionID/executedSurveyFiles/executedSurveyID/questionFiles/questionID/audio.mp3',
    toBeReplaced: ['appliedInterventionID', 'executedSurveyID', 'questionID'],
  },
  appliedInterventionPicPath: {
    path: 'appliedInterventionFiles/appliedInterventionID/pic.png',
    toBeReplaced: ['appliedInterventionID'],
  },
  entityPicPath: {
    path: 'entityFiles/entityID/pic.png',
    toBeReplaced: ['entityID'],
  },
  taskPicPath: {
    path: 'taskFiles/taskID/pic.png',
    toBeReplaced: ['taskID'],
  },
  taskAudioPath: {
    path: 'taskFiles/taskID/audio.mp3',
    toBeReplaced: ['taskID'],
  },
} as const;

export type S3PathKey = keyof typeof S3_PATHS;
export type S3PathValue = (typeof S3_PATHS)[S3PathKey]['path'];

export function deriveS3Path(
  pathKey: S3PathKey,
  replacements: Record<string, string>
): string {
  const authStore = useAuthStore();
  let path = S3_PATHS[pathKey].path as string;

  for (const [key, value] of Object.entries(replacements)) {
    path = path.replace(key, value);
  }

  if (!authStore.organizationId) {
    throw new Error('Organization ID is required to create a path');
  }

  return `organization/${authStore.organizationId}/${path}`;
}
