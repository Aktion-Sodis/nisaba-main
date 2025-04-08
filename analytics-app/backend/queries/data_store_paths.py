

question_answer_pic_path = {
    "path":
        "organization/organizationID/appliedInterventionFiles/appliedInterventionID/executedSurveyFiles/executedSurveyID/questionFiles/questionID/pic.png",
    "toBeReplaced": ["organizationID", "appliedInterventionID", "executedSurveyID", "questionID"],
}

question_answer_audio_path = {
    "path":
        "organization/organizationID/appliedInterventionFiles/appliedInterventionID/executedSurveyFiles/executedSurveyID/questionFiles/questionID/audio.aac",
    "toBeReplaced": ["organizationID", "appliedInterventionID", "executedSurveyID", "questionID"],
}

#method to get the path for question_answer_audio_path
def get_question_answer_audio_path(organizationID, appliedInterventionID, executedSurveyID, questionID):
    path = question_answer_audio_path["path"]
    path = path.replace(question_answer_audio_path["toBeReplaced"][0], organizationID)
    path = path.replace(question_answer_audio_path["toBeReplaced"][1], appliedInterventionID)
    path = path.replace(question_answer_audio_path["toBeReplaced"][2], executedSurveyID)
    path = path.replace(question_answer_audio_path["toBeReplaced"][3], questionID)
    return path

#method to get the path for question_answer_pic_path
def get_question_answer_pic_path(organizationID, appliedInterventionID, executedSurveyID, questionID):
    path = question_answer_pic_path["path"]
    path = path.replace(question_answer_pic_path["toBeReplaced"][0], organizationID)
    path = path.replace(question_answer_pic_path["toBeReplaced"][1], appliedInterventionID)
    path = path.replace(question_answer_pic_path["toBeReplaced"][2], executedSurveyID)
    path = path.replace(question_answer_pic_path["toBeReplaced"][3], questionID)
    return path