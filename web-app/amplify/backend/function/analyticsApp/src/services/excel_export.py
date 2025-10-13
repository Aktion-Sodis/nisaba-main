import io
import pandas as pd
import xlsxwriter
from datetime import datetime

class ExcelExportService:
    def __init__(self, analytics_service):
        """
        Initialize Excel export service with analytics service
        """
        self.analytics_service = analytics_service

    def get_excel_workbook_for_survey_id(self, survey_id):
        """
        Generate Excel workbook for a specific survey ID
        """
        # Get data from analytics service
        survey = self.analytics_service.get_survey_by_id(survey_id)
        executed_surveys = self.analytics_service.get_executed_surveys_by_survey_id(survey_id)
        
        # Get entity IDs from surveys
        entity_ids = self.get_entity_ids_from_surveys(executed_surveys)
        entities = self.analytics_service.get_entities_by_ids(entity_ids)

        print("Got data from analytics service, now building xlsx")

        return self.create_pandas_frames_for_export(survey, executed_surveys, entities)

    def get_entity_ids_from_surveys(self, executed_surveys):
        """
        Extract entity IDs from executed surveys
        """
        entity_ids = []
        for executed_survey in executed_surveys:
            if executed_survey.get("appliedIntervention") and executed_survey["appliedIntervention"].get("entityAppliedInterventionsId"):
                entity_ids.append(executed_survey["appliedIntervention"]["entityAppliedInterventionsId"])
        return entity_ids

    def string_from_question_option_answers(self, question_options):
        """
        Convert question options to string
        """
        string = ""
        for question_option in question_options:
            # Get first language text which is not "" from array
            non_empty_language_text = [
                language_text
                for language_text in question_option["text"]["languageTexts"]
                if language_text != ""
            ]
            if non_empty_language_text:
                string += non_empty_language_text[0] + ", "

        return string[:-2] if string else ""

    def create_pandas_frames_for_export(self, survey, executed_surveys, entities):
        """
        Create pandas DataFrames for Excel export
        """
        executed_survey_ids = [esurvey["id"] for esurvey in executed_surveys]

        executed_survey_executor = [
            esurvey["whoExecutedIt"]["firstName"] + " " + esurvey["whoExecutedIt"]["lastName"]
            for esurvey in executed_surveys
        ]

        executed_survey_entity = []
        for esurvey in executed_surveys:
            to_append = None
            for entity in entities:
                if entity["id"] == esurvey["appliedIntervention"]["entityAppliedInterventionsId"]:
                    to_append_from_lang = None
                    for lang_option in entity["name"]["languageTexts"]:
                        if lang_option != "":
                            to_append_from_lang = lang_option
                            break
                    to_append = to_append_from_lang
                    break
            executed_survey_entity.append(to_append)

        executed_survey_frame = pd.DataFrame(
            {"executor": executed_survey_executor, "entity": executed_survey_entity}, 
            index=executed_survey_ids
        )

        executed_survey_date = [esurvey["date"] for esurvey in executed_surveys]

        executed_survey_latitude = []
        for esurvey in executed_surveys:
            if not esurvey.get("location", None) is None:
                executed_survey_latitude.append(esurvey["location"].get("latitude", None))
            else:
                executed_survey_latitude.append(None)

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
            question_text = self.get_first_non_empty_text(question["text"]["languageTexts"])
            
            for executed_survey in executed_surveys:
                answer_found = False
                if executed_survey.get("answers"):
                    for answer in executed_survey["answers"]:
                        if answer["questionID"] == question["id"]:
                            answer_value = self.get_answer_value(answer)
                            question_answers.append(answer_value)
                            answer_found = True
                            break
                
                if not answer_found:
                    question_answers.append("")
            
            questions_for_table[question_text] = question_answers
            question_answer_lists[question["id"]] = question_answers

        # Create survey questions DataFrame
        survey_question_frame = pd.DataFrame(questions_for_table, index=executed_survey_ids)

        # Create Excel file in memory
        output = io.BytesIO()
        writer = pd.ExcelWriter(output, engine='xlsxwriter')

        survey_question_frame.to_excel(writer, sheet_name='survey')
        executed_survey_frame.to_excel(writer, sheet_name='answers')

        writer.close()
        output.seek(0)

        return output.getvalue()

    def get_first_non_empty_text(self, language_texts):
        """
        Get the first non-empty text from language texts array
        """
        for text in language_texts:
            if text and text.strip():
                return text
        return ""

    def get_answer_value(self, answer):
        """
        Extract answer value based on answer type
        """
        answer_type = answer.get("type", "")
        
        if answer_type == "TEXT":
            return answer.get("text", "")
        elif answer_type == "INT":
            return answer.get("intValue")
        elif answer_type == "DOUBLE":
            return answer.get("doubleValue")
        elif answer_type == "DATE":
            return answer.get("date")
        elif answer_type == "RATING":
            return answer.get("rating")
        elif answer_type == "QUESTION_OPTION":
            return self.string_from_question_option_answers(answer.get("questionOptions", []))
        else:
            return "" 