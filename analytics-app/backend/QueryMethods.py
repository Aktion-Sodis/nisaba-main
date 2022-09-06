import os
import json

from AppSyncClient import GraphqlClient

from queries import listInterventionTypes
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

def get_interventions():
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
    result_list = result["data"]["listInterventions"]["items"]

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

        print(unique_interventions)

    for item in result_list:
        languageKeys = item["name"]["languageKeys"]
        languageTexts = item["name"]["languageTexts"]

        name_dict = dict(zip(languageKeys, languageTexts))
        interventionType = item["interventionType"]
        new_dict["interventions"][interventionType].append(name_dict)

    final_dict = dict(new_dict["interventions"])

    return final_dict