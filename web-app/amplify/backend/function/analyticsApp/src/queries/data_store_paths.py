# Data store path utilities for file storage
# Note: Paths aligned with frontend - removed appliedInterventionID from path structure

question_answer_pic_path = {
    "path":
        "organization/organizationID/executedSurveyFiles/executedSurveyID/questionFiles/questionID/pic.png",
    "toBeReplaced": ["organizationID", "executedSurveyID", "questionID"],
}

question_answer_audio_path = {
    "path":
        "organization/organizationID/executedSurveyFiles/executedSurveyID/questionFiles/questionID/audio.aac",
    "toBeReplaced": ["organizationID", "executedSurveyID", "questionID"],
}

def get_question_answer_audio_path(organizationID, appliedInterventionID, executedSurveyID, questionID):
    """
    Get the path for question answer audio file
    Note: appliedInterventionID parameter kept for backward compatibility but not used in path
    """
    path = question_answer_audio_path["path"]
    path = path.replace(question_answer_audio_path["toBeReplaced"][0], organizationID)
    path = path.replace(question_answer_audio_path["toBeReplaced"][1], executedSurveyID)
    path = path.replace(question_answer_audio_path["toBeReplaced"][2], questionID)
    return path

def get_question_answer_pic_path(organizationID, appliedInterventionID, executedSurveyID, questionID):
    """
    Get the path for question answer picture file
    Note: appliedInterventionID parameter kept for backward compatibility but not used in path
    """
    path = question_answer_pic_path["path"]
    path = path.replace(question_answer_pic_path["toBeReplaced"][0], organizationID)
    path = path.replace(question_answer_pic_path["toBeReplaced"][1], executedSurveyID)
    path = path.replace(question_answer_pic_path["toBeReplaced"][2], questionID)
    return path 