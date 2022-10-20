import os
import json

from AppSyncClient import GraphqlClient

from queries import listInterventionTypes
from queries import listSurveys
from queries import getSurveyByID
from queries import getExecutedSurveysBySurveyID
from queries import listExecutedSurveys


from collections import defaultdict

gql_client = GraphqlClient(
    endpoint= os.getenv('APPSYNC_ENDPOINT'),
    headers={'x-api-key': os.getenv('X_API_KEY')}
)

def get_intervention_types():
    result = gql_client.execute(
        query=listInterventionTypes["query"], 
        operation_name=listInterventionTypes["operationName"],
        variables={}
    )
    result_list = result["data"]["listInterventions"]["items"]

    # create new dict 
    unique_interventions = []

    for item in result_list:
        interventionType = item["interventionType"]
        if interventionType in unique_interventions:
            break
        else:
            unique_interventions.append(interventionType)
    
    return unique_interventions

def get_interventions():

    result = gql_client.execute(
        query=listInterventionTypes["query"], 
        operation_name=listInterventionTypes["operationName"],
        variables={}
    )
    interventions = result["data"]["listInterventions"]["items"]

    language_keys = interventions[0]["name"]["languageKeys"]

    for intervention in interventions:
        intervention_name = {}
        for language in language_keys:
            index = intervention["name"]["languageKeys"].index(language)
            specific_language_name = intervention["name"]["languageTexts"][index]
            intervention_name[language] = specific_language_name
        intervention["name"] = intervention_name 

    return interventions

def get_surveys():
    result = gql_client.execute(
        query=listSurveys["query"], 
        operation_name=listSurveys["operationName"],
        variables={}
    )
    surveys = result["data"]["listSurveys"]["items"]

    language_keys = surveys[0]["name"]["languageKeys"]

    for survey in surveys:
        survey_name = {}
        for language in language_keys:
            index = survey["name"]["languageKeys"].index(language)
            specific_language_name = survey["name"]["languageTexts"][index]
            survey_name[language] = specific_language_name
        survey["name"] = survey_name 

    return surveys

# NEU

def get_executed_surveys_by_surveyID(surveyID):

    surveys = gql_client.execute(
        query=getExecutedSurveysBySurveyID["query"],
        operation_name=getExecutedSurveysBySurveyID["operationName"],
        variables={
            "surveyID": surveyID
        }
    )
    result_list = surveys["data"]["executedSurveyBySurveyID"]

    return result_list

def get_survey_by_ID(surveyID):

    surveys = gql_client.execute(
        query=getSurveyByID["query"],
        operation_name=getSurveyByID["operationName"],
        variables={
            "id": surveyID
        }
    )
    result_list = surveys["data"]["getSurvey"]

    return result_list


def list_executed_surveys():

    surveys = gql_client.execute(
        query=listExecutedSurveys["query"],
        operation_name=listExecutedSurveys["operationName"],
        variables={
        }
    )
    result_list = surveys["data"][listExecutedSurveys["operationName"]]

    return result_list

def filter_executed_surveys_by_ID(surveyID, surveys):

    filtered_executed_surveys = list()

    for item in surveys["items"]:
        if item["executedSurveySurveyId"] == surveyID:
            filtered_executed_surveys.append(item)

    return filtered_executed_surveys

def aggregate_survey_data(surveyID):

    data = []

    survey = get_survey_by_ID(surveyID)

    unfiltered_executed_surveys = list_executed_surveys()

    executed_surveys = filter_executed_surveys_by_ID(surveyID, unfiltered_executed_surveys)

    # get avaliable Langauge Keys
    languageKeys = survey["questions"][0]["text"]["languageKeys"]

    for question in survey["questions"]:

        # Set the Name of the Question
        question_name = {}

        for language in languageKeys:
            index = question["text"]["languageKeys"].index(language)
            question_text = question["text"]["languageTexts"][index]
            question_name[language] = question_text

        # Set the answer options
        answer_options = {}

        if question["questionOptions"] is not None:
            for language in languageKeys:
                options = []
                for item in question["questionOptions"]:
                    index = item["text"]["languageKeys"].index(language)
                    options.append(item["text"]["languageTexts"][index])
                answer_options[language] = options

        question_data = {
            "question_id": question["id"],
            "question_name": question_name,
            "question_type": question["type"],
            "answer_options": answer_options,
        }

        # Get all answers
        answers = []

        for executed_survey in executed_surveys:
            for answer in executed_survey["answers"]:
                if answer["questionID"] == question["id"]:
                    q_types = list(answer.keys())
                    q_types.remove("questionID")
                    q_types.remove("date")
                    for q_type in q_types:
                        if answer[q_type] is not None:
                            if q_type == "questionOptions":
                                answer_array = [0] * len(answer_options[list(answer_options.keys())[0]])

                                specific_answer = dict()
                                
                                for language in languageKeys:
                                    index = answer[q_type][0]["text"]["languageKeys"].index(language)
                                    language_answer = answer[q_type][0]["text"]["languageTexts"][index]

                                    specific_answer[language] = language_answer

                                for language in languageKeys:
                                    if specific_answer[language] != "":
                                        index = answer_options[language].index(specific_answer[language])
                                        answer_array[index] = 1

                                        break

                                answers.append(answer_array)

                            else:
                                answers.append(answer[q_type])

        question_data["answers"] = answers

        data.append(question_data)

    return data