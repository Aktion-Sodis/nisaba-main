from datetime import datetime
import asyncio
import time

from utils.response_utils import create_response, create_error_response
from services.async_analytics_service import AsyncAnalyticsService
from services.excel_export import ExcelExportService
from queries.data_store_paths import get_question_answer_audio_path, get_question_answer_pic_path

class AsyncAnalyticsHandler:
    def __init__(self):
        self.analytics_service = AsyncAnalyticsService()
        # Note: ExcelExportService is still synchronous, would need async version for full async support
        self.excel_export = ExcelExportService(self.analytics_service)
    
    def get_total_number_of_surveys(self):
        """Synchronous method for backward compatibility"""
        try:
            result = self.analytics_service.get_total_number_of_surveys()
            return create_response(200, {"res": result})
        except Exception as e:
            print(f"Error getting total number of surveys: {str(e)}")
            return create_error_response(500, f"Failed to get total number of surveys: {str(e)}")
    
    def get_executed_survey_count_by_survey_id(self, survey_id):
        """Synchronous method for backward compatibility"""
        try:
            result = self.analytics_service.get_executed_survey_count_by_survey_id(survey_id)
            return create_response(200, {"res": result})
        except Exception as e:
            print(f"Error getting executed survey count for survey {survey_id}: {str(e)}")
            return create_error_response(500, f"Failed to get executed survey count: {str(e)}")
    
    async def get_executed_survey_counts_for_organization(self, organization_id):
        try:
            result = await self.analytics_service.get_executed_survey_counts_for_organization(organization_id)
            return create_response(200, {"res": result})
        except Exception as e:
            print(f"Error getting executed survey counts for organization: {str(e)}")
            return create_error_response(500, f"Failed to get executed survey counts: {str(e)}")
    
    async def get_aggregated_survey_data_by_id(self, survey_id, organization_id,filters=None):
        start_time = time.time()
        try:

            # Parallel execution of ALL initial data fetching
            survey, executed_surveys, all_entities, levels = await asyncio.gather(
                self.analytics_service.get_survey_by_id(survey_id),
                self.analytics_service.get_executed_surveys_by_survey_id(survey_id),
                self.analytics_service.get_all_entities(organization_id),
                self.analytics_service.get_all_levels(organization_id)
            )
            elapsed = int(time.time() - start_time)
            print(f"[analytics] fetched survey + executed_surveys + all_entities + levels | t={elapsed}s | executed_surveys={len(executed_surveys)} | all_entities={len(all_entities)} | levels={len(levels)}")
            
            if filters:
                executed_surveys = self._apply_filters(executed_surveys, filters)
                elapsed = int(time.time() - start_time)
                print(f"[analytics] applied filters | t={elapsed}s | remaining_executed_surveys={len(executed_surveys)} | filters={list(filters.keys())}")
            
            # Extract entity IDs and filter to only needed entities
            entity_ids = self._get_entity_ids_from_surveys(executed_surveys)
            unique_entity_ids = set(entity_ids)
            entities = [entity for entity in all_entities if entity["id"] in unique_entity_ids]
            elapsed = int(time.time() - start_time)
            print(f"[analytics] filtered entities | t={elapsed}s | unique_entity_ids={len(unique_entity_ids)} | filtered_entities={len(entities)}")
            
            dataset = self._generate_question_centric_dataset(survey, executed_surveys, entities)
            elapsed = int(time.time() - start_time)
            print(f"[analytics] generated dataset | t={elapsed}s | questions={len(dataset)}")
            
            # Parallel execution of analytics generation for each question
            analytics_tasks = []
            raw_data_tasks = []
            
            for i, question_data in enumerate(dataset):
                # Create analytics task
                analytics_task = self._generate_question_analytics(
                    question_data, executed_surveys, entities
                )
                analytics_tasks.append((analytics_task, i))
                
                # Create raw data task if applicable
                if question_data["question_type"] in ["TEXT", "AUDIO", "PICTURE"]:
                    raw_data_task = self._generate_raw_data_for_question(
                        question_data, executed_surveys, entities
                    )
                    raw_data_tasks.append((raw_data_task, i))
            
            # Execute analytics tasks in parallel
            analytics_results = await asyncio.gather(*[task for task, _ in analytics_tasks])
            for (_, index), result in zip(analytics_tasks, analytics_results):
                dataset[index]["analytics"] = result
            elapsed = int(time.time() - start_time)
            print(f"[analytics] completed analytics generation | t={elapsed}s | questions={len(analytics_tasks)}")
            
            # Execute raw data tasks in parallel
            if raw_data_tasks:
                raw_data_results = await asyncio.gather(*[task for task, _ in raw_data_tasks])
                for (_, index), result in zip(raw_data_tasks, raw_data_results):
                    dataset[index]["raw_data"] = result
                elapsed = int(time.time() - start_time)
                print(f"[analytics] completed raw data generation | t={elapsed}s | questions={len(raw_data_tasks)}")
            
            return create_response(200, {
                "dataset": dataset,
                "entities": entities,
                "levels": levels
            })
            
        except Exception as e:
            print(f"Error getting aggregated survey data for ID {survey_id}: {str(e)}")
            return create_error_response(500, f"Failed to get aggregated survey data: {str(e)}")
    
    def get_survey_results_as_xlsx(self, survey_id):
        """Synchronous method for backward compatibility"""
        try:
            excel_data = self.excel_export.get_excel_workbook_for_survey_id(survey_id)
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f'results_{survey_id}_{timestamp}.xlsx'
            
            headers = {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': f'attachment; filename="{filename}"'
            }
            
            return create_response(200, excel_data, headers)
            
        except Exception as e:
            print(f"Error generating Excel file for survey ID {survey_id}: {str(e)}")
            return create_error_response(500, f"Failed to generate Excel file: {str(e)}")
    
    def _apply_filters(self, executed_surveys, filters):
        filtered_surveys = executed_surveys.copy()
        
        if filters.get("date_range"):
            start_date = filters["date_range"].get("start")
            end_date = filters["date_range"].get("end")
            
            if start_date or end_date:
                filtered_surveys = [
                    survey for survey in filtered_surveys
                    if self._is_survey_in_date_range(survey, start_date, end_date)
                ]
        
        if filters.get("entities"):
            entity_ids = set(filters["entities"])
            filtered_surveys = [
                survey for survey in filtered_surveys
                if self._is_survey_for_entities(survey, entity_ids)
            ]
        
        if filters.get("executors"):
            executor_ids = set(filters["executors"])
            filtered_surveys = [
                survey for survey in filtered_surveys
                if self._is_survey_by_executors(survey, executor_ids)
            ]
        
        if filters.get("location_bounds"):
            bounds = filters["location_bounds"]
            filtered_surveys = [
                survey for survey in filtered_surveys
                if self._is_survey_in_location_bounds(survey, bounds)
            ]
        
        return filtered_surveys
    
    def _is_survey_in_date_range(self, survey, start_date, end_date):
        survey_date = survey.get("date")
        if not survey_date:
            return False
        
        try:
            if start_date and survey_date < start_date:
                return False
            
            if end_date and survey_date > end_date:
                return False
        except (TypeError, ValueError):
            print(f"Warning: Invalid date comparison for survey {survey.get('id')}")
            return False
        
        return True
    
    def _is_survey_for_entities(self, survey, entity_ids):
        if not survey.get("appliedIntervention"):
            return False
        
        entity_id = survey["appliedIntervention"].get("entityAppliedInterventionsId")
        return entity_id in entity_ids if entity_id else False
    
    def _is_survey_by_executors(self, survey, executor_ids):
        if not survey.get("whoExecutedIt"):
            return False
        
        executor_id = survey["whoExecutedIt"].get("id")
        return executor_id in executor_ids if executor_id else False
    
    def _is_survey_in_location_bounds(self, survey, bounds):
        location = survey.get("location")
        if not location:
            return False
        
        lat = location.get("latitude")
        lng = location.get("longitude")
        
        if lat is None or lng is None:
            return False
        
        return (bounds.get("south", -90) <= lat <= bounds.get("north", 90) and
                bounds.get("west", -180) <= lng <= bounds.get("east", 180))
    
    def _get_entity_ids_from_surveys(self, executed_surveys):
        entity_ids = []
        for executed_survey in executed_surveys:
            if executed_survey.get("appliedIntervention") and executed_survey["appliedIntervention"].get("entityAppliedInterventionsId"):
                entity_ids.append(executed_survey["appliedIntervention"]["entityAppliedInterventionsId"])
        return entity_ids
    
    def _generate_question_centric_dataset(self, survey, executed_surveys, entities):
        dataset = []
        
        for question in survey["questions"]:
            question_id = question["id"]
            question_type = question["type"]
            question_text = question["text"]
            question_options = question.get("questionOptions", [])
            
            answers = []
            
            for executed_survey in executed_surveys:
                for answer in executed_survey["answers"]:
                    if answer["questionID"] == question_id:
                        entity = self._find_entity_by_applied_intervention(entities, executed_survey)
                        
                        answer_value = self._get_answer_value(
                            answer, 
                            question_type, 
                            survey.get("organization_id"),
                            executed_survey.get("appliedIntervention", {}).get("id"),
                            executed_survey["id"],
                            question_id
                        )
                        
                        answer_obj = {
                            "answer_date": answer.get("date"),
                            "executed_survey_id": executed_survey["id"],
                            "answer_value": answer_value,
                            "entity_id": entity["id"] if entity else None,
                            "entity_name": self._get_first_non_empty_text(entity["name"]["languageTexts"]) if entity and entity.get("name") else None,
                            "executor": self._get_executor_name(executed_survey),
                            "location": executed_survey.get("location"),
                            "metadata": {
                                "applied_intervention_id": executed_survey.get("appliedIntervention", {}).get("id"),
                                "organization_id": survey.get("organization_id")
                            }
                        }
                        
                        answers.append(answer_obj)
            
            question_data = {
                "question_id": question_id,
                "question_text": question_text,
                "question_type": question_type,
                "question_options": question_options,
                "answers": answers
            }
            
            dataset.append(question_data)
        
        return dataset
    
    def _get_answer_value(self, answer, question_type, organization_id, applied_intervention_id, executed_survey_id, question_id):
        if question_type == "TEXT":
            return answer.get("text", "")
        elif question_type == "INT":
            return answer.get("intValue")
        elif question_type == "DOUBLE":
            return answer.get("doubleValue")
        elif question_type == "DATE":
            return answer.get("date")
        elif question_type == "RATING":
            return answer.get("rating")
        elif question_type == "QUESTION_OPTION":
            return self._get_question_option_text(answer.get("questionOptions", []))
        elif question_type == "AUDIO":
            return self._get_audio_path(answer, organization_id, applied_intervention_id, executed_survey_id, question_id)
        elif question_type == "PICTURE":
            return self._get_picture_path(answer, organization_id, applied_intervention_id, executed_survey_id, question_id)
        else:
            return None
    
    def _get_audio_path(self, answer, organization_id, applied_intervention_id, executed_survey_id, question_id):
        return self._generate_file_path(None, organization_id, applied_intervention_id, executed_survey_id, question_id, "audio")
    
    def _get_picture_path(self, answer, organization_id, applied_intervention_id, executed_survey_id, question_id):
        return self._generate_file_path(None, organization_id, applied_intervention_id, executed_survey_id, question_id, "picture")
    
    def _generate_file_path(self, file_data, organization_id, applied_intervention_id, executed_survey_id, question_id, file_type):
        if not all([organization_id, applied_intervention_id, executed_survey_id, question_id]):
            missing_fields = []
            if not organization_id:
                missing_fields.append("organization_id")
            if not applied_intervention_id:
                missing_fields.append("applied_intervention_id")
            if not executed_survey_id:
                missing_fields.append("executed_survey_id")
            if not question_id:
                missing_fields.append("question_id")
            
            print(f"Warning: Missing required fields for {file_type} path generation: {missing_fields}")
            return None
        
        try:
            if file_type == "audio":
                return get_question_answer_audio_path(
                    organization_id, 
                    applied_intervention_id, 
                    executed_survey_id, 
                    question_id
                )
            elif file_type == "picture":
                return get_question_answer_pic_path(
                    organization_id, 
                    applied_intervention_id, 
                    executed_survey_id, 
                    question_id
                )
            else:
                print(f"Warning: Unknown file type: {file_type}")
                return None
        except Exception as e:
            print(f"Error generating {file_type} file path: {str(e)}")
            return None
    
    async def _generate_question_analytics(self, question_data, executed_surveys, entities):
        """Async version of question analytics generation"""
        question_type = question_data["question_type"]
        answers = question_data["answers"]
        
        analytics = {
            "total_answers": len(answers),
            "unique_entities": len(set(answer["entity_id"] for answer in answers if answer["entity_id"])),
            "date_range": self._get_date_range_from_answers(answers)
        }
        
        if question_type in ["INT", "DOUBLE", "RATING"]:
            analytics.update(self._generate_numerical_analytics(answers, question_type))
        elif question_type in ["SINGLECHOICE", "MULTIPLECHOICE"]:
            analytics.update(self._generate_choice_analytics(answers, question_data["question_options"]))
        elif question_type == "TEXT":
            analytics.update(self._generate_text_analytics(answers))
        elif question_type in ["AUDIO", "PICTURE"]:
            analytics.update(self._generate_file_analytics(answers, question_type))
        
        return analytics
    
    def _get_date_range_from_answers(self, answers):
        dates = [answer["answer_date"] for answer in answers if answer["answer_date"]]
        if not dates:
            return {"earliest": None, "latest": None}
        
        return {
            "earliest": min(dates),
            "latest": max(dates)
        }
    
    def _generate_numerical_analytics(self, answers, question_type):
        values = [answer["answer_value"] for answer in answers if answer["answer_value"] is not None]
        
        if not values:
            return {"statistics": {}, "chart_data": {}}
        
        sorted_values = sorted(values)
        n = len(values)
        
        stats = {
            "mean": sum(values) / n,
            "median": self._calculate_median(sorted_values),
            "min": min(values),
            "max": max(values),
            "range": max(values) - min(values)
        }
        
        if n > 1:
            variance = sum((x - stats["mean"]) ** 2 for x in values) / (n - 1)
            stats["std_deviation"] = variance ** 0.5
        else:
            stats["std_deviation"] = 0.0
        
        if question_type == "RATING":
            rating_counts = {}
            for value in values:
                rating_counts[value] = rating_counts.get(value, 0) + 1
            
            chart_data = {
                "histogram": {
                    "bins": list(rating_counts.keys()),
                    "counts": list(rating_counts.values())
                },
                "bar_chart": {
                    "x": [f"{k}★" for k in rating_counts.keys()],
                    "y": list(rating_counts.values())
                }
            }
        else:
            chart_data = {
                "histogram": {
                    "bins": [min(values), max(values)],
                    "counts": [len(values)]
                }
            }
        
        return {
            "statistics": stats,
            "chart_data": chart_data
        }
    
    def _calculate_median(self, sorted_values):
        n = len(sorted_values)
        if n == 0:
            return None
        if n % 2 == 1:
            return sorted_values[n // 2]
        else:
            return (sorted_values[n // 2 - 1] + sorted_values[n // 2]) / 2
    
    def _generate_choice_analytics(self, answers, question_options):
        if not question_options:
            return {"statistics": {}, "chart_data": {}}
        
        option_texts = [
            self._get_first_non_empty_text(option["text"]["languageTexts"])
            for option in question_options
        ]
        
        option_counts = {text: 0 for text in option_texts}
        
        for answer in answers:
            if answer["answer_value"]:
                if isinstance(answer["answer_value"], list):
                    for selected in answer["answer_value"]:
                        if selected in option_texts:
                            option_counts[selected] += 1
                else:
                    if answer["answer_value"] in option_texts:
                        option_counts[answer["answer_value"]] += 1
        
        chart_data = {
            "bar_chart": {
                "x": list(option_counts.keys()),
                "y": list(option_counts.values())
            }
        }
        
        if len(question_options) > 1:
            chart_data["pie_chart"] = {
                "labels": list(option_counts.keys()),
                "values": list(option_counts.values())
            }
        
        return {
            "chart_data": chart_data,
            "statistics": {
                "total_responses": len(answers),
                "option_counts": option_counts
            }
        }
    
    def _generate_text_analytics(self, answers):
        texts = [answer["answer_value"] for answer in answers if answer["answer_value"]]
        
        if not texts:
            return {"statistics": {}}
        
        text_lengths = [len(text) for text in texts]
        
        return {
            "statistics": {
                "total_responses": len(texts),
                "average_text_length": sum(text_lengths) / len(text_lengths),
                "longest_response": max(text_lengths),
                "shortest_response": min(text_lengths)
            }
        }
    
    def _generate_file_analytics(self, answers, question_type):
        files = [answer["answer_value"] for answer in answers if answer["answer_value"]]
        
        if not files:
            return {"statistics": {}}
        
        return {
            "statistics": {
                "total_files": len(files),
                "file_types": {
                    question_type.lower(): len(files)
                }
            }
        }
    
    async def _generate_raw_data_for_question(self, question_data, executed_surveys, entities):
        """Async version of raw data generation"""
        question_type = question_data["question_type"]
        answers = question_data["answers"]
        
        if question_type == "TEXT":
            return {
                "text_responses": [
                    {
                        "text": answer["answer_value"],
                        "date": answer["answer_date"],
                        "entity": answer["entity_name"],
                        "executor": answer["executor"],
                        "executed_survey_id": answer["executed_survey_id"],
                        "location": answer["location"]
                    }
                    for answer in answers if answer["answer_value"]
                ]
            }
        elif question_type in ["AUDIO", "PICTURE"]:
            return {
                "file_paths": [
                    {
                        "path": answer["answer_value"],
                        "date": answer["answer_date"],
                        "entity": answer["entity_name"],
                        "executor": answer["executor"],
                        "executed_survey_id": answer["executed_survey_id"],
                        "file_type": question_type.lower(),
                        "location": answer["location"]
                    }
                    for answer in answers if answer["answer_value"]
                ]
            }
        
        return {}
    
    def _find_entity_by_applied_intervention(self, entities, executed_survey):
        """Find entity by matching entityAppliedInterventionsId from executed survey's appliedIntervention"""
        if not executed_survey.get("appliedIntervention"):
            return None
        
        entity_id = executed_survey["appliedIntervention"].get("entityAppliedInterventionsId")
        if not entity_id:
            return None
        
        for entity in entities:
            if entity.get("id") == entity_id:
                return entity
        return None
    
    def _find_entity_by_executed_survey_id(self, entities, executed_survey_id):
        for entity in entities:
            if entity.get("appliedInterventions") and entity["appliedInterventions"].get("items"):
                for applied_intervention in entity["appliedInterventions"]["items"]:
                    if applied_intervention.get("executedSurveys") and applied_intervention["executedSurveys"].get("items"):
                        for executed_survey in applied_intervention["executedSurveys"]["items"]:
                            if executed_survey["id"] == executed_survey_id:
                                return entity
        return None
    
    def _get_first_non_empty_text(self, language_texts):
        for text in language_texts:
            if text and text.strip():
                return text
        return ""
    
    def _get_executor_name(self, executed_survey):
        if executed_survey.get("whoExecutedIt"):
            first_name = executed_survey["whoExecutedIt"].get("firstName", "")
            last_name = executed_survey["whoExecutedIt"].get("lastName", "")
            return f"{first_name} {last_name}".strip()
        return ""
    
    def _get_question_option_text(self, question_options):
        if not question_options:
            return ""
        
        texts = []
        for option in question_options:
            if option.get("text") and option["text"].get("languageTexts"):
                text = self._get_first_non_empty_text(option["text"]["languageTexts"])
                if text:
                    texts.append(text)
        
        return ", ".join(texts)
