import os
import boto3
from botocore.exceptions import ClientError
from services.appsync_client import AppSyncClient
from queries.surveys import (
    listTotalNumberOfSurveys,
    listAllSurveys,
    listAllSurveysFromNextToken,
    getSurveyBySurveyID,
    getExecutedSurveyDataBySurveyIDInclContext,
    getExecutedSurveyDataBySurveyIDInclContextFromNextToken
)
from queries.levels import listLevels, listEntities, getEntityByID, listEntitiesFromNextToken

class AnalyticsService:
    def __init__(self):
        self.appsync_client = AppSyncClient()
        self.dynamodb = boto3.resource('dynamodb')
        self.survey_table = os.environ.get('API_APINISABA_SURVEYTABLE_NAME')
    
    def get_total_number_of_surveys(self):
        try:
            table = self.dynamodb.Table(self.survey_table)
            response = table.scan(
                Select='COUNT',
                FilterExpression='attribute_not_exists(_deleted) OR _deleted = :deleted',
                ExpressionAttributeValues={':deleted': False}
            )
            return response.get('Count', 0)
        except ClientError as e:
            print(f"Error getting survey count: {e}")
            raise
    
    def get_survey_by_id(self, survey_id):
        res = self.appsync_client.execute(
            query=getSurveyBySurveyID["query"],
            operation_name=getSurveyBySurveyID["operationName"],
            variables={"surveyID": survey_id},
        )
        return res["data"]["getSurvey"]
    
    def get_executed_surveys_by_survey_id(self, survey_id):
        res = self.appsync_client.execute(
            query=getExecutedSurveyDataBySurveyIDInclContext["query"],
            operation_name=getExecutedSurveyDataBySurveyIDInclContext["operationName"],
            variables={"surveyID": survey_id},
        )
        
        to_return_executed_surveys = res["data"]["listExecutedSurveys"]["items"]
        next_token = res["data"]["listExecutedSurveys"].get("nextToken", None)

        while next_token:
            res = self.appsync_client.execute(
                query=getExecutedSurveyDataBySurveyIDInclContextFromNextToken["query"],
                operation_name=getExecutedSurveyDataBySurveyIDInclContextFromNextToken["operationName"],
                variables={"surveyID": survey_id, "nextToken": next_token},
            )
            
            items = res["data"]["listExecutedSurveys"]["items"]
            to_return_executed_surveys.extend(items)
            next_token = res["data"]["listExecutedSurveys"].get("nextToken", None)

        return to_return_executed_surveys
    
    def get_entities_by_ids(self, entity_ids):
        unique_entity_ids = list(set(entity_ids))
        
        entities = []
        for entity_id in unique_entity_ids:
            try:
                res = self.appsync_client.execute(
                    query=getEntityByID["query"],
                    operation_name=getEntityByID["operationName"],
                    variables={"entityID": entity_id},
                )
                entities.append(res["data"]["getEntity"])
            except Exception as e:
                print(f"Error getting entity {entity_id}: {str(e)}")
                continue
        
        return entities
    
    def get_all_levels(self):
        res = self.appsync_client.execute(
            query=listLevels["query"],
            operation_name=listLevels["operationName"],
            variables={},
        )
        levels = res["data"]["listLevels"]["items"]
        return self._sort_levels_by_parent_level_id(levels)
    
    def get_all_entities(self):
        res = self.appsync_client.execute(
            query=listEntities["query"],
            operation_name=listEntities["operationName"],
            variables={},
        )

        to_return_entities = res["data"]["listEntities"]["items"]
        next_token = res["data"]["listEntities"].get("nextToken", None)

        while next_token:
            res = self.appsync_client.execute(
                query=listEntitiesFromNextToken["query"],
                operation_name=listEntitiesFromNextToken["operationName"],
                variables={"nextToken": next_token},
            )
            
            items = res["data"]["listEntities"]["items"]
            to_return_entities.extend(items)
            next_token = res["data"]["listEntities"].get("nextToken", None)

        return to_return_entities
    
    def _sort_levels_by_parent_level_id(self, levels):
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