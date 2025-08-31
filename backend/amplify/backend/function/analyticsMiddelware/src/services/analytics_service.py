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
        """
        Initialize analytics service with both GraphQL and DynamoDB access
        """
        self.appsync_client = AppSyncClient()
        self.dynamodb = boto3.resource('dynamodb')
        
        # Get DynamoDB table names for count operations
        self.survey_table = os.environ.get('API_APINISABA_SURVEYTABLE_NAME')
    
    def get_total_number_of_surveys(self):
        """
        Get total count of surveys using DynamoDB (more efficient than GraphQL for count)
        """
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
        """
        Get a specific survey by ID using GraphQL
        """
        res = self.appsync_client.execute(
            query=getSurveyBySurveyID["query"],
            operation_name=getSurveyBySurveyID["operationName"],
            variables={"surveyID": survey_id},
        )
        return res["data"]["getSurvey"]
    
    def get_executed_surveys_by_survey_id(self, survey_id):
        """
        Get executed surveys by survey ID including context using GraphQL
        """
        print('Getting executed surveys by survey id including context')
        res = self.appsync_client.execute(
            query=getExecutedSurveyDataBySurveyIDInclContext["query"],
            operation_name=getExecutedSurveyDataBySurveyIDInclContext["operationName"],
            variables={"surveyID": survey_id},
        )
        print('Returned first batch of executed surveys')
        
        to_return_executed_surveys = res["data"]["listExecutedSurveys"]["items"]
        next_token = res["data"]["listExecutedSurveys"].get("nextToken", None)

        # Handle pagination
        while next_token:
            print('Getting next batch of executed surveys')
            print(next_token)
            
            res = self.appsync_client.execute(
                query=getExecutedSurveyDataBySurveyIDInclContextFromNextToken["query"],
                operation_name=getExecutedSurveyDataBySurveyIDInclContextFromNextToken["operationName"],
                variables={"surveyID": survey_id, "nextToken": next_token},
            )
            
            items = res["data"]["listExecutedSurveys"]["items"]
            to_return_executed_surveys.extend(items)
            
            next_token = res["data"]["listExecutedSurveys"].get("nextToken", None)
            
            print('Number of Items with next token: ' + str(len(items)))

        return to_return_executed_surveys
    
    def get_entities_by_ids(self, entity_ids):
        """
        Get entities by list of IDs using GraphQL
        """
        # Remove duplicates from entity_ids
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
        """
        Get all levels using GraphQL
        """
        res = self.appsync_client.execute(
            query=listLevels["query"],
            operation_name=listLevels["operationName"],
            variables={},
        )
        return res["data"]["listLevels"]["items"]
    
    def get_all_entities(self):
        """
        Get all entities with pagination using GraphQL
        """
        res = self.appsync_client.execute(
            query=listEntities["query"],
            operation_name=listEntities["operationName"],
            variables={},
        )

        to_return_entities = res["data"]["listEntities"]["items"]
        next_token = res["data"]["listEntities"].get("nextToken", None)

        # Handle pagination
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