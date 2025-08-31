import json
import os
import io
import base64
from datetime import datetime
from utils.response_utils import create_response, create_error_response
from services.analytics_service import AnalyticsService
from services.excel_export import ExcelExportService

class AnalyticsHandler:
    def __init__(self):
        """
        Initialize the analytics handler with hybrid analytics service
        """
        self.analytics_service = AnalyticsService()
        self.excel_export = ExcelExportService(self.analytics_service)
    
    def get_total_number_of_surveys(self):
        """
        Get the total number of surveys using DynamoDB for efficiency
        """
        try:
            result = self.analytics_service.get_total_number_of_surveys()
            return create_response(200, {"res": result})
        except Exception as e:
            print(f"Error getting total number of surveys: {str(e)}")
            return create_error_response(500, f"Failed to get total number of surveys: {str(e)}")
    
    def get_aggregated_survey_data_by_id(self, survey_id):
        """
        Get comprehensive aggregated survey data including survey, executed surveys, and entities
        """
        try:
            # Get survey using GraphQL
            survey = self.analytics_service.get_survey_by_id(survey_id)
            
            # Get executed surveys using GraphQL
            executed_surveys = self.analytics_service.get_executed_surveys_by_survey_id(survey_id)
            
            # Get unique entity IDs from executed surveys
            entity_ids = self._get_entity_ids_from_surveys(executed_surveys)
            
            # Get entities using GraphQL
            entities = self.analytics_service.get_entities_by_ids(entity_ids)
            
            # Generate aggregated dataset
            dataset = self._generate_aggregated_dataset(survey, executed_surveys, entities)
            
            return create_response(200, {"res": dataset})
        except Exception as e:
            print(f"Error getting aggregated survey data for ID {survey_id}: {str(e)}")
            return create_error_response(500, f"Failed to get aggregated survey data: {str(e)}")
    
    def get_survey_results_as_xlsx(self, survey_id):
        """
        Generate and return Excel file with survey results
        """
        try:
            # Generate the Excel file
            excel_data = self.excel_export.get_excel_workbook_for_survey_id(survey_id)
            
            # Create filename with timestamp
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f'results_{survey_id}_{timestamp}.xlsx'
            
            # Return the Excel file as a binary response
            headers = {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': f'attachment; filename="{filename}"'
            }
            
            return create_response(200, excel_data, headers)
            
        except Exception as e:
            print(f"Error generating Excel file for survey ID {survey_id}: {str(e)}")
            return create_error_response(500, f"Failed to generate Excel file: {str(e)}")
    
    def _get_entity_ids_from_surveys(self, executed_surveys):
        """
        Extract entity IDs from executed surveys
        """
        entity_ids = []
        for executed_survey in executed_surveys:
            if executed_survey.get("appliedIntervention") and executed_survey["appliedIntervention"].get("entityAppliedInterventionsId"):
                entity_ids.append(executed_survey["appliedIntervention"]["entityAppliedInterventionsId"])
        return entity_ids
    
    def _generate_aggregated_dataset(self, survey, executed_surveys, entities):
        """
        Generate comprehensive aggregated dataset from survey, executed surveys, and entities
        """
        dataset = []
        
        for executed_survey in executed_surveys:
            # Find corresponding entity
            entity = self._find_entity_by_executed_survey_id(entities, executed_survey["id"])
            
            # Process each answer in the executed survey
            if executed_survey.get("answers"):
                for answer in executed_survey["answers"]:
                    dataset_item = {
                        "surveyId": survey["id"],
                        "surveyName": self._get_first_non_empty_text(survey["name"]["languageTexts"]),
                        "executedSurveyId": executed_survey["id"],
                        "questionId": answer["questionID"],
                        "answerId": answer["id"],
                        "answerType": answer["type"],
                        "date": executed_survey.get("date"),
                        "executor": self._get_executor_name(executed_survey),
                        "entityId": entity["id"] if entity else None,
                        "entityName": self._get_first_non_empty_text(entity["name"]["languageTexts"]) if entity else None,
                        "latitude": executed_survey.get("location", {}).get("latitude") if executed_survey.get("location") else None,
                        "longitude": executed_survey.get("location", {}).get("longitude") if executed_survey.get("location") else None,
                    }
                    
                    # Add answer value based on type
                    if answer["type"] == "TEXT":
                        dataset_item["answerValue"] = answer.get("text", "")
                    elif answer["type"] == "INT":
                        dataset_item["answerValue"] = answer.get("intValue")
                    elif answer["type"] == "DOUBLE":
                        dataset_item["answerValue"] = answer.get("doubleValue")
                    elif answer["type"] == "DATE":
                        dataset_item["answerValue"] = answer.get("date")
                    elif answer["type"] == "RATING":
                        dataset_item["answerValue"] = answer.get("rating")
                    elif answer["type"] == "QUESTION_OPTION":
                        dataset_item["answerValue"] = self._get_question_option_text(answer.get("questionOptions", []))
                    else:
                        dataset_item["answerValue"] = None
                    
                    dataset.append(dataset_item)
        
        return dataset
    
    def _find_entity_by_executed_survey_id(self, entities, executed_survey_id):
        """
        Find entity by executed survey ID
        """
        for entity in entities:
            if entity.get("appliedInterventions") and entity["appliedInterventions"].get("items"):
                for applied_intervention in entity["appliedInterventions"]["items"]:
                    if applied_intervention.get("executedSurveys") and applied_intervention["executedSurveys"].get("items"):
                        for executed_survey in applied_intervention["executedSurveys"]["items"]:
                            if executed_survey["id"] == executed_survey_id:
                                return entity
        return None
    
    def _get_first_non_empty_text(self, language_texts):
        """
        Get the first non-empty text from language texts array
        """
        for text in language_texts:
            if text and text.strip():
                return text
        return ""
    
    def _get_executor_name(self, executed_survey):
        """
        Get executor name from executed survey
        """
        if executed_survey.get("whoExecutedIt"):
            first_name = executed_survey["whoExecutedIt"].get("firstName", "")
            last_name = executed_survey["whoExecutedIt"].get("lastName", "")
            return f"{first_name} {last_name}".strip()
        return ""
    
    def _get_question_option_text(self, question_options):
        """
        Get text from question options
        """
        if not question_options:
            return ""
        
        texts = []
        for option in question_options:
            if option.get("text") and option["text"].get("languageTexts"):
                text = self._get_first_non_empty_text(option["text"]["languageTexts"])
                if text:
                    texts.append(text)
        
        return ", ".join(texts) 