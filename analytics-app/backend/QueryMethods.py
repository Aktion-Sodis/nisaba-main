import os
import json

from AppSyncClient import GraphqlClient

from queries.surveys import listTotalNumberOfSurveys, listAllSurveys, getSurveyBySurveyID, getExecutedSurveyDataBySurveyID

from queries.levels import listLevels, listEntities


gql_client = GraphqlClient()

class QueryMethods:

    def __init__(self):

        self.selected_survey = None
        self.executed_surveys = None


    # TODO: done
    def get_total_number_of_surveys(self):
        res = gql_client.execute(
            query = listTotalNumberOfSurveys["query"], 
            operation_name = listTotalNumberOfSurveys["operationName"],
            variables = {}
        )

        items = res["data"]["listSurveys"]["items"]
        # return the number of entries
        return len(items)


    def get_all_surveys(self):
        res = gql_client.execute(
            query = listAllSurveys["query"], 
            operation_name = listAllSurveys["operationName"],
            variables = {}
        )

        items = res["data"]["listSurveys"]["items"]
        return items


    def get_survey_by_surveyID(self, survey_id):
        res = gql_client.execute(
            query = getSurveyBySurveyID["query"],
            operation_name = getSurveyBySurveyID["operationName"],
            variables= {"surveyID": survey_id}
        )
        self.selected_survey = res["data"]["getSurvey"]

        return self.selected_survey


    def get_executed_surveys_by_surveyID(self, survey_id):
        res = gql_client.execute(
            query = getExecutedSurveyDataBySurveyID["query"],
            operation_name = getExecutedSurveyDataBySurveyID["operationName"],
            variables= {"surveyID": survey_id}
        )
        self.executed_surveys = res["data"]["listExecutedSurveys"]["items"]

        return self.executed_surveys


    def get_survey_data_by_surveyID(self, survey_id):

        self.get_executed_surveys_by_surveyID(survey_id)

        survey_data = self.generate_dataset(self.selected_survey, self.executed_surveys)

        return survey_data


    def generate_dataset(self, survey, executed_surveys):

        question_types = {
            'TEXT': 'text',
            'INT': 'intValue',
            'DOUBLE': 'doubleValue',
            'RATING': 'rating',
            'SINGLECHOICE': 'questionOptions',
            'MULTIPLECHOICE': 'questionOptions',
        }

        new_dataset = []

        # print(survey['questions'])

        # print('----')

        # print(executed_surveys)

        survey_name = survey['name']
        survey_description = survey['description']

        # print(len(survey['questions']))

        for question in survey['questions']:
            question_id = question['id']
            question_type = question['type']

            question_text = question['text']
            question_options = question['questionOptions']


            # Initialize answer array for each question
            answer_array = []

            for executed_survey in executed_surveys:
                for answer in executed_survey['answers']:
                    if answer['questionID'] == question_id:
                        answer_date = answer['date']
                        answer_id = executed_survey['id']

                        if question_type in ['TEXT', 'DOUBLE', 'INT', 'RATING']:
                            value = question_types.get(question_type)
                            answer_value = answer[value]

                        elif question_type in ['SINGLECHOICE', 'MULTIPLECHOICE']:
                            answer_value = [0]*len(question['questionOptions'])
                            
                            # Getting the first available text for each option
                            answer_option_texts = [next((text for text in option['text']['languageTexts'] if text), None) for option in question['questionOptions']]
                            for option in answer['questionOptions']:
                                option_text = next((text for text in option['text']['languageTexts'] if text), None)
                                if option_text in answer_option_texts:
                                    index = answer_option_texts.index(option_text)
                                    answer_value[index] = 1
                                
                        # Add each answer to the answer array for the question
                        answer_array.append({
                            'answer_date': answer_date,
                            'answer_id': answer_id,
                            'answer_value': answer_value
                        })

            # Add question with its answer array to the dataset
            new_dataset.append({
                'question_id': question_id,
                'question_text': question_text,
                'question_options': question_options,
                'question_type': question_type,
                'answers': answer_array
            })
        

        return new_dataset



    def get_levels(self):
        res = gql_client.execute(
            query = listLevels["query"], 
            operation_name = listLevels["operationName"],
            variables = {}
        )

        items = res["data"]
        print(items)
        return items


    def get_entities(self):
        print("Entities are fetched")
        res = gql_client.execute(
            query = listEntities["query"], 
            operation_name = listEntities["operationName"],
            variables = {}
        )

        items = res["data"]
        print(items)
        return items