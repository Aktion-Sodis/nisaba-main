import os
import json

from AppSyncClient import GraphqlClient

from queries.surveys import (
    listTotalNumberOfSurveys,
    listAllSurveys,
    listAllSurveysFromNextToken,
    getSurveyBySurveyID,
    getExecutedSurveyDataBySurveyID,
    getExecutedSurveyDataBySurveyIDInclContext,
    getExecutedSurveyDataBySurveyIDInclContextFromNextToken
)

from queries.data_store_paths import (
    get_question_answer_audio_path,
    get_question_answer_pic_path
)

from queries.levels import listLevels, listEntities, getEntityByID, listEntitiesFromNextToken


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
        print('Getting all surveys')
        
        # Initial request
        res = gql_client.execute(
            query=listAllSurveys["query"],
            operation_name=listAllSurveys["operationName"],
            variables={},
        )

        to_return_surveys = res["data"]["listSurveys"]["items"]
        next_token = res["data"]["listSurveys"].get("nextToken", None)

        print('Got first batch of surveys')
        print('Next Token: ' + str(next_token))

        # Handle pagination if there is a next token
        while next_token:
            print('Getting next batch of surveys')
            print(next_token)
            
            res = gql_client.execute(
                query=listAllSurveysFromNextToken["query"],
                operation_name=listAllSurveysFromNextToken["operationName"],
                variables={"nextToken": next_token},
            )
            
            # Add the new batch of items to the existing list
            items = res["data"]["listSurveys"]["items"]
            to_return_surveys.extend(items)
            
            # Update the next token
            next_token = res["data"]["listSurveys"].get("nextToken", None)
            
            print('Number of Items with next token: ' + str(len(items)))

        return to_return_surveys

    def get_survey_by_surveyID(self, survey_id):
        res = gql_client.execute(
            query=getSurveyBySurveyID["query"],
            operation_name=getSurveyBySurveyID["operationName"],
            variables={"surveyID": survey_id},
        )
        self.selected_survey = res["data"]["getSurvey"]

        return self.selected_survey

    def get_executed_surveys_by_surveyID_including_context(self, survey_id):
        print('getting executed surveys by survey id including context')
        res = gql_client.execute(
            query=getExecutedSurveyDataBySurveyIDInclContext["query"],
            operation_name=getExecutedSurveyDataBySurveyIDInclContext["operationName"],
            variables={"surveyID": survey_id},
        )
        print('returned first batch of executed surveys')
        to_return_surveys = res["data"]["listExecutedSurveys"]["items"]

        next_token = res["data"]["listExecutedSurveys"].get("nextToken", None)

        print('got first batch of executed surveys')

        while next_token:
            print('getting next batch of executed surveys')
            print(next_token)
            res = gql_client.execute(
            query=getExecutedSurveyDataBySurveyIDInclContextFromNextToken["query"],
            operation_name=getExecutedSurveyDataBySurveyIDInclContextFromNextToken["operationName"],
            variables={"surveyID": survey_id, "nextToken": next_token},
            )

            #items
            items = res["data"]["listExecutedSurveys"]["items"]

            #print item length
            print('Number of Items with next token: ' + str(len(items)))
            
            to_return_surveys.extend(items)

            next_token = res["data"]["listExecutedSurveys"].get("nextToken", None)
        
        return to_return_surveys
    
    def get_entity_list_from_IDs(self, entity_ids):
        #remove duplicates from entity_ids
        entity_ids = list(set(entity_ids))

        results = []

        for entity_id in entity_ids:
            res = gql_client.execute(
                query=getEntityByID["query"],
                operation_name=getEntityByID["operationName"],
                variables={"entityID": entity_id},
            )
            results.append(res["data"]["getEntity"])
        
        return results

    def get_survey_data_by_surveyID(self, survey_id):
        self.get_survey_by_surveyID(survey_id)
        self.executed_surveys = self.get_executed_surveys_by_surveyID_including_context(survey_id)

        #check if error here
        self.all_entities = self.get_entities_v2()
        
        #print elements
        print('survey dataset generation')
        print('Selected Survey:')
        print(self.selected_survey)
        print('Executed Surveys:')
        print(len(self.executed_surveys))


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
        print('Getting all entities')
        
        # Initial request
        res = gql_client.execute(
            query=listEntities["query"],
            operation_name=listEntities["operationName"],
            variables={},
        )

        to_return_entities = res["data"]["listEntities"]["items"]
        next_token = res["data"]["listEntities"].get("nextToken", None)

        print('Got first batch of entities')

        # Handle pagination if there is a next token
        while next_token:
            print('Getting next batch of entities')
            print(next_token)
            
            res = gql_client.execute(
                query=listEntitiesFromNextToken["query"],
                operation_name=listEntitiesFromNextToken["operationName"],
                variables={"nextToken": next_token},
            )
            
            # Add the new batch of items to the existing list
            items = res["data"]["listEntities"]["items"]
            to_return_entities.extend(items)
            
            # Update the next token
            next_token = res["data"]["listEntities"].get("nextToken", None)
            
            print('Number of Items with next token: ' + str(len(items)))

        # Filter out any None values, if necessary
        entities = list(filter(lambda x: x is not None, to_return_entities))
        return entities

    def filter_entities_by_executed_survey_id(self, entities, survey_ids):

        result_entities = []

        # Create a set of IDs from array2 for faster lookup
        id_set = set(survey_ids)

        # Iterate through entities in array1
        for entity in entities:
            # if entity is not None:
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

        organization_id = survey["organization_id"]

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

                        elif question_type == "AUDIO":
                            #todo: return audio path as answer_value
                            answer_value = get_question_answer_audio_path(
                                organization_id,
                                executed_survey["appliedIntervention"]["id"],
                                executed_survey["id"],
                                question_id
                            )

                        elif question_type == "PICTURE":
                            answer_value = get_question_answer_pic_path(
                                organization_id,
                                executed_survey["appliedIntervention"]["id"],
                                executed_survey["id"],
                                question_id
                            )

                        else:

                            #print unknown answer type
                            answer_value = None
                            #print question type
                            print('unknown question type in dataset generation: ' + question_type)

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
