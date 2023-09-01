import os
import json

from AppSyncClient import GraphqlClient

from queries.surveys import (
    listTotalNumberOfSurveys,
    listAllSurveys,
    getSurveyBySurveyID,
    getExecutedSurveyDataBySurveyID,
)

from queries.levels import listLevels, listEntities


gql_client = GraphqlClient()


class QueryMethods:
    def __init__(self):
        self.selected_survey = None
        self.executed_surveys = None
        self.all_entities = None

    # TODO: done
    def get_total_number_of_surveys(self):
        res = gql_client.execute(
            query=listTotalNumberOfSurveys["query"],
            operation_name=listTotalNumberOfSurveys["operationName"],
            variables={},
        )

        items = res["data"]["listSurveys"]["items"]
        # return the number of entries
        return len(items)

    def get_all_surveys(self):
        res = gql_client.execute(
            query=listAllSurveys["query"],
            operation_name=listAllSurveys["operationName"],
            variables={},
        )

        items = res["data"]["listSurveys"]["items"]
        return items

    def get_survey_by_surveyID(self, survey_id):
        res = gql_client.execute(
            query=getSurveyBySurveyID["query"],
            operation_name=getSurveyBySurveyID["operationName"],
            variables={"surveyID": survey_id},
        )
        self.selected_survey = res["data"]["getSurvey"]

        return self.selected_survey

    def get_executed_surveys_by_surveyID(self, survey_id):
        res = gql_client.execute(
            query=getExecutedSurveyDataBySurveyID["query"],
            operation_name=getExecutedSurveyDataBySurveyID["operationName"],
            variables={"surveyID": survey_id},
        )
        self.executed_surveys = res["data"]["listExecutedSurveys"]["items"]

        return self.executed_surveys

    def get_survey_data_by_surveyID(self, survey_id):
        self.get_survey_by_surveyID(survey_id)
        self.get_executed_surveys_by_surveyID(survey_id)

        self.all_entities = self.get_entities_v2()

        dataset = self.generate_dataset(
            self.selected_survey, self.executed_surveys, self.all_entities
        )

        executed_survey_ids = self.get_unique_executed_survey_ids(dataset)

        filtered_entities = self.filter_entities_by_executed_survey_id(
            self.all_entities, executed_survey_ids
        )

        entities = self.filter_parent_entities(filtered_entities, self.all_entities)

        levels = self.get_levels_v2()

        survey_data = {"dataset": dataset, "entities": entities, "levels": levels}

        print(dataset[1])

        return survey_data

    def get_unique_executed_survey_ids(self, dataset):
        unique_ids = set()

        for question in dataset:
            answers = question.get("answers", [])
            for answer in answers:
                executed_survey_id = answer.get("executed_survey_id")
                if executed_survey_id:
                    unique_ids.add(executed_survey_id)

        return list(unique_ids)

    def get_levels_v2(self):
        res = gql_client.execute(
            query=listLevels["query"],
            operation_name=listLevels["operationName"],
            variables={},
        )

        items = res["data"]["listLevels"]["items"]

        sorted_levels = self.sort_levels_by_parent_level_id(items)
        # print(sorted_levels)
        return sorted_levels

    def get_entities_v2(self):
        res = gql_client.execute(
            query=listEntities["query"],
            operation_name=listEntities["operationName"],
            variables={},
        )

        items = res["data"]["listEntities"]["items"]
        return items

    def filter_entities_by_executed_survey_id(self, entities, survey_ids):
        result_entities = []

        # Create a set of IDs from array2 for faster lookup
        id_set = set(survey_ids)

        # Iterate through entities in array1
        for entity in entities:
            applied_interventions = entity.get("appliedInterventions", {}).get(
                "items", []
            )

            # Iterate through applied interventions of the entity
            for intervention in applied_interventions:
                executed_surveys = intervention.get("executedSurveys", {}).get(
                    "items", []
                )

                # Iterate through executed surveys of the intervention
                for survey in executed_surveys:
                    executed_survey_id = survey.get("id")

                    # Check if the survey ID is in the set of IDs from array2
                    if executed_survey_id in id_set:
                        filtered_entity = entity.copy()
                        filtered_entity["executedSurveyID"] = executed_survey_id
                        filtered_entity.pop("appliedInterventions")
                        result_entities.append(filtered_entity)
                        break  # Break out of the inner loop since one match is enough

        return result_entities

    def filter_parent_entities(self, filtered_entities, all_entities):
        unique_parent_ids = set(
            entity["parentEntityID"] for entity in filtered_entities
        )
        remaining_entities = all_entities.copy()

        while unique_parent_ids:
            new_filtered_entities = []
            new_remaining_entities = []

            for entity in remaining_entities:
                entity_id = entity["id"]
                if entity_id in unique_parent_ids:
                    entity_copy = entity.copy()
                    entity_copy.pop("appliedInterventions")
                    new_filtered_entities.append(entity_copy)
                else:
                    new_remaining_entities.append(entity)

            filtered_entities.extend(new_filtered_entities)
            remaining_entities = new_remaining_entities
            unique_parent_ids = set(
                entity["parentEntityID"] for entity in new_filtered_entities
            )

        return filtered_entities

    def find_entity_by_executed_survey_id(self, entities, executed_survey_id):
        for entity in entities:
            for intervention in entity["appliedInterventions"]["items"]:
                for survey in intervention["executedSurveys"]["items"]:
                    if survey["id"] == executed_survey_id:
                        return entity["id"]

        return None

    def generate_dataset(self, survey, executed_surveys, entities):
        question_types = {
            "TEXT": "text",
            "INT": "intValue",
            "DOUBLE": "doubleValue",
            "RATING": "rating",
            "SINGLECHOICE": "questionOptions",
            "MULTIPLECHOICE": "questionOptions",
        }

        new_dataset = []

        # print(survey['questions'])

        # print('----')

        # print(executed_surveys)

        survey_name = survey["name"]
        survey_description = survey["description"]

        # print(len(survey['questions']))

        for question in survey["questions"]:
            question_id = question["id"]
            question_type = question["type"]

            question_text = question["text"]
            question_options = question["questionOptions"]

            # Initialize answer array for each question
            answer_array = []

            for executed_survey in executed_surveys:
                for answer in executed_survey["answers"]:
                    if answer["questionID"] == question_id:
                        answer_date = answer["date"]
                        executed_survey_id = executed_survey["id"]

                        if question_type in ["TEXT", "DOUBLE", "INT", "RATING"]:
                            value = question_types.get(question_type)
                            answer_value = answer[value]

                        elif question_type in ["SINGLECHOICE", "MULTIPLECHOICE"]:
                            answer_value = [0] * len(question["questionOptions"])

                            # Getting the first available text for each option
                            answer_option_texts = [
                                next(
                                    (
                                        text
                                        for text in option["text"]["languageTexts"]
                                        if text
                                    ),
                                    None,
                                )
                                for option in question["questionOptions"]
                            ]
                            for option in answer["questionOptions"]:
                                option_text = next(
                                    (
                                        text
                                        for text in option["text"]["languageTexts"]
                                        if text
                                    ),
                                    None,
                                )
                                if option_text in answer_option_texts:
                                    index = answer_option_texts.index(option_text)
                                    answer_value[index] = 1

                        entity_id = self.find_entity_by_executed_survey_id(
                            entities, executed_survey_id
                        )

                        # Add each answer to the answer array for the question
                        answer_array.append(
                            {
                                "answer_date": answer_date,
                                "executed_survey_id": executed_survey_id,
                                "answer_value": answer_value,
                                "entity_id": entity_id,
                            }
                        )

            # Add question with its answer array to the dataset
            new_dataset.append(
                {
                    "question_id": question_id,
                    "question_text": question_text,
                    "question_options": question_options,
                    "question_type": question_type,
                    "answers": answer_array,
                }
            )

        return new_dataset

    def get_entities(self):
        print("Entities are fetched")
        res = gql_client.execute(
            query=listEntities["query"],
            operation_name=listEntities["operationName"],
            variables={},
        )

        items = res["data"]["listEntities"]["items"]
        # print(items)
        return items

    def get_levels(self):
        res = gql_client.execute(
            query=listLevels["query"],
            operation_name=listLevels["operationName"],
            variables={},
        )

        items = res["data"]["listLevels"]["items"]

        sorted_levels = self.sort_levels_by_parent_level_id(items)
        # print(sorted_levels)
        return sorted_levels

    def sort_levels_by_parent_level_id(self, levels):
        level_dict = {level["id"]: level for level in levels}
        sorted_levels = []

        current_level_id = None

        while len(level_dict) > 0:
            for level_id in level_dict:
                parent_level_id = level_dict[level_id]["parentLevelID"]

                if parent_level_id == current_level_id:
                    sorted_levels.append(level_dict[level_id])
                    level_dict.pop(level_id)
                    current_level_id = level_id
                    break

        return sorted_levels
