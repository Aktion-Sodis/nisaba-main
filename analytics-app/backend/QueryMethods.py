import os
import json

from AppSyncClient import GraphqlClient

from queries import listInterventionTypes, listSurveys
from collections import defaultdict

gql_client = GraphqlClient(
    endpoint= os.getenv('APPSYNC_ENDPOINT'),
    headers={'x-api-key': os.getenv('X_API_KEY')}
)

# def get_intervention_types():
#     result = gql_client.execute(
#         query=listInterventionTypes["query"], 
#         operation_name=listInterventionTypes["operationName"],
#         variables={}
#     )
#     result_list = result["data"]["listInterventions"]["items"]
#     for item in result_list:
#         item.pop("name")

#     print(result_list)

#     uniqueInterventionsList = list(set(result_list.values()))
#     for item in uniqueInterventionsList:
#         print(item)

#     uniqueInterventions = json.dumps(uniqueInterventionsList)

#     return uniqueInterventions

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



def get_intervention_categories():
    result = gql_client.execute(
        query=listInterventionTypes["query"], 
        operation_name=listInterventionTypes["operationName"],
        variables={}
    )
    result_list = result["data"]

    # print(result_list)

    # create new dict 
    unique_interventions = []
    new_dict = defaultdict(lambda: defaultdict(list))

    for item in result_list:
        interventionType = item["interventionType"]
        if interventionType in unique_interventions:
            break
        else:
            unique_interventions.append(interventionType)
            new_dict["interventions"][interventionType]

    for item in result_list:
        languageKeys = item["name"]["languageKeys"]
        languageTexts = item["name"]["languageTexts"]

        name_dict = dict(zip(languageKeys, languageTexts))
        interventionType = item["interventionType"]
        new_dict["interventions"][interventionType].append(name_dict)

    final_dict = dict(new_dict["interventions"])

    return final_dict



def get_interventions():

    result = gql_client.execute(
        query=listInterventionTypes["query"], 
        operation_name=listInterventionTypes["operationName"],
        variables={}
    )
    result_list = result["data"]["listInterventions"]["items"]

    return result_list



def get_surveys():
    result = gql_client.execute(
        query=listSurveys["query"], 
        operation_name=listSurveys["operationName"],
        variables={}
    )
    result_list = result["data"]

    # print(result_list)

    return result_list


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
                                    # print(language)
                                    index = answer[q_type][0]["text"]["languageKeys"].index(language)
                                    language_answer = answer[q_type][0]["text"]["languageTexts"][index]
                                    # print(index)
                                    # print(language_answer)

                                    specific_answer[language] = language_answer

                                for language in languageKeys:
                                    if specific_answer[language] != "":
                                        # print(specific_answer[language])
                                        index = answer_options[language].index(specific_answer[language])
                                        # print(index)
                                        answer_array[index] = 1
                                        # print(answer_array)

                                        break

                                answers.append(answer_array)

                                # specific_answer = {}
                                # print(answer[q_type])
                                # for language in languageKeys:
                                #     print(language)
                                #     specific_options = []
                                    
                                #     # index = answer[q_type][0]["text"]["languageKeys"].index(language)
                                #     # specific_options.append(answer[q_type][0]["text"]["languageTexts"][index])
                                #     # specific_answer[language] = options
                                #     print(index)

                                # print(specific_answer)

                                # # print(answer_options)
                                # print(answer_array)
                            else:
                                answers.append(answer[q_type])

        question_data["answers"] = answers

        # print(question_data["answer_options"])
        # print(answers)
        

        # for answer in executed_surveys:
        #     # if answer["answers"]["questionID"] == question["id"]:
        #     #     print(answer["questionID"], question["id"])
        #     # print(answer)
        #     print(answer["answers"])

        data.append(question_data)

    return data