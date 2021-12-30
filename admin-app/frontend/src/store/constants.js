/* Resolve the following "path"s by replacing the substrings with the strings given in the array "replace" in the back-end.
If cannot be resolved, use default values for images, and show an error message for audio, markdown etc.
The dollar signs are put so that it is more legible for the development. They are thought be replaced with the empty string
before replacing the other substrings.

TODO: don't deploy the dollar signs to production! */

const databaseOntologies = Object.freeze({
  userImgPath: { path: "userFiles/$userID/img.png", replace: ["userID"] },
  levelImgPath: { path: "levelFiles/$levelID/img.png", replace: ["levelID"] },
  levelCustomDataImgPath: {
    path: "levelFiles/$levelID/customDataFiles/$customDataID/img.png",
    replace: ["levelID", "customDataID"],
  },
  interventionImgPath: {
    path: "interventionFiles/$interventionID/img.png",
    replace: ["interventionID"],
  },
  interventionDocMdPath: {
    path: "interventionFiles/$interventionID/documentFiles/$documentID.md",
    replace: ["interventionID", "documentID"],
  },
  interventionSurveyImgPath: {
    path: "interventionFiles/$interventionID/surveyFiles/$surveyID/img.png",
    replace: ["interventionID", "surveyID"],
  },
  questionImgPath: {
    path: "interventionFiles/$interventionID/surveyFiles/$surveyID/questionFiles/$questionID/img.png",
    replace: ["interventionID", "surveyID", "questionID"],
  },
  questionOptionImgPath: {
    path: "interventionFiles/$interventionID/surveyFiles/$surveyID/questionFiles/$questionID/optionFiles/$optionID/img.png",
    replace: ["interventionID", "surveyID", "questionID", "optionID"],
  },
  entityImgPath: {
    path: "entityFiles/$entityID/img.png",
    replace: ["entityID"],
  },
  taskImgPath: { path: "taskFiles/$taskID/img.png", replace: ["taskID"] },
  taskImgPath: { path: "taskFiles/$taskID/audio.mp3", replace: ["taskID"] },
});
