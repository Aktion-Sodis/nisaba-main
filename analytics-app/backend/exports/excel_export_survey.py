def get_excel_workbook_for_survey_id(query_methods, survey_id):
    # get data from query methods

    # get survey
    survey = query_methods.get_survey_by_surveyID(survey_id)

    # get executed surveys
    executed_surveys = query_methods.get_executed_surveys_by_surveyID_including_context(
        survey_id
    )

    # get entities
    entity_ids = get_entity_ids_from_surveys(executed_surveys)
    entities = query_methods.get_entity_list_from_IDs(entity_ids)

    print("got data from queries, now building xlsx")

    return create_pandas_frames_for_export(survey, executed_surveys, entities)


def string_from_Question_Option_Answers(question_options):
    string = ""
    for question_option in question_options:
        # get first language text which is not "" from array
        non_empty_language_text = [
            language_text
            for language_text in question_option["text"]["languageTexts"]
            if language_text != ""
        ]
        if non_empty_language_text:
            string += non_empty_language_text[0] + ", "

    return string[:-2]


def create_pandas_frames_for_export(survey, executed_surveys, entities):
    import pandas as pd

    executed_survey_ids = [esurvey["id"] for esurvey in executed_surveys]

    executed_survey_executor = [
        esurvey["whoExecutedIt"]["firstName"]
        + " "
        + esurvey["whoExecutedIt"]["lastName"]
        for esurvey in executed_surveys
    ]

    executed_survey_frame = pd.DataFrame(
        {"executor": executed_survey_executor}, index=executed_survey_ids
    )

    executed_survey_date = [esurvey["date"] for esurvey in executed_surveys]
    # executed_survey_latitude = [esurvey['location']['latitude'] for esurvey in executed_surveys]

    executed_survey_latitude = []
    for esurvey in executed_surveys:
        if not esurvey.get("location", None) is None:
            executed_survey_latitude.append(esurvey["location"].get("latitude", None))
        else:
            executed_survey_latitude.append(None)

    # executed_survey_longitude = [
    #     esurvey["location"]["longitude"] for esurvey in executed_surveys
    # ]

    executed_survey_longitude = []
    for esurvey in executed_surveys:
        if not esurvey.get("location", None) is None:
            executed_survey_longitude.append(esurvey["location"].get("longitude", None))
        else:
            executed_survey_longitude.append(None)

    executed_survey_frame["date"] = executed_survey_date
    executed_survey_frame["latitude"] = executed_survey_latitude
    executed_survey_frame["longitude"] = executed_survey_longitude

    questions = survey["questions"]

    questions_for_table = {}

    question_answer_lists = {}

    for i, question in enumerate(questions):
        question_answers = []
        if question["type"] == "TEXT":
            questions_for_table[str(i) + " -- ID: " + question["id"]] = {
                "question": question["text"],
                "type": question["type"],
                "options": None,
            }

            question_answers = []
            for esurvey in executed_surveys:
                for answer in esurvey["answers"]:
                    if answer["questionID"] == question["id"]:
                        question_answers.append(answer.get("text", None))

        elif question["type"] == "INT":
            questions_for_table[str(i) + " -- ID: " + question["id"]] = {
                "question": question["text"],
                "type": question["type"],
                "options": None,
            }
            question_answers = []
            for esurvey in executed_surveys:
                for answer in esurvey["answers"]:
                    if answer["questionID"] == question["id"]:
                        question_answers.append(answer.get("intValue", None))

        elif question["type"] == "DOUBLE":
            questions_for_table[str(i) + " -- ID: " + question["id"]] = {
                "question": question["text"],
                "type": question["type"],
                "options": None,
            }
            question_answers = []
            for esurvey in executed_surveys:
                for answer in esurvey["answers"]:
                    if answer["questionID"] == question["id"]:
                        question_answers.append(answer.get("doubleValue", None))

        elif question["type"] == "PICTURE":
            questions_for_table[str(i) + " -- ID: " + question["id"]] = {
                "question": question["text"],
                "type": question["type"],
                "options": None,
            }
            question_answers = [""] * len(executed_surveys)

        elif question["type"] == "AUDIO":
            questions_for_table[str(i) + " -- ID: " + question["id"]] = {
                "question": question["text"],
                "type": question["type"],
                "options": None,
            }
            question_answers = [""] * len(executed_surveys)

        elif question["type"] == "RATING":
            questions_for_table[str(i) + " -- ID: " + question["id"]] = {
                "question": question["text"],
                "type": question["type"],
                "options": None,
            }
            question_answers = []
            for esurvey in executed_surveys:
                for answer in esurvey["answers"]:
                    if answer["questionID"] == question["id"]:
                        question_answers.append(answer.get("rating", None))

        elif question["type"] == "SINGLECHOICE":
            questions_for_table[str(i) + " -- ID: " + question["id"]] = {
                "question": question["text"],
                "type": question["type"],
                "options": question["questionOptions"],
            }
            question_answers = []
            for esurvey in executed_surveys:
                for answer in esurvey["answers"]:
                    if answer["questionID"] == question["id"]:
                        if answer.get("questionOptions", None) != None:
                            question_answers.append(
                                string_from_Question_Option_Answers(
                                    answer["questionOptions"]
                                )
                            )
                        else:
                            question_answers.append("")

        elif question["type"] == "MULTIPLECHOICE":
            questions_for_table[str(i) + " -- ID: " + question["id"]] = {
                "question": question["text"],
                "type": question["type"],
                "options": question["questionOptions"],
            }
            question_answers = []
            for esurvey in executed_surveys:
                for answer in esurvey["answers"]:
                    if answer["questionID"] == question["id"]:
                        if answer.get("questionOptions", None) != None:
                            question_answers.append(
                                string_from_Question_Option_Answers(
                                    answer["questionOptions"]
                                )
                            )
                        else:
                            question_answers.append("")

        question_answer_lists[str(i) + " -- ID: " + question["id"]] = question_answers

    for key, value in question_answer_lists.items():
        executed_survey_frame[key] = value

    survey_question_frame = pd.DataFrame(questions_for_table).T

    return survey_question_frame, executed_survey_frame


def get_entity_ids_from_surveys(executed_surveys):
    entities = []
    for executed_survey in executed_surveys:
        entities.append(
            executed_survey["appliedIntervention"]["entityAppliedInterventionsId"]
        )
    return entities
