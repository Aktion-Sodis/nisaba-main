import os
import asyncio
import time
import boto3
from botocore.exceptions import ClientError
from services.async_appsync_client import AsyncAppSyncClient
from queries.surveys import (
    listTotalNumberOfSurveys,
    listAllSurveys,
    listAllSurveysFromNextToken,
    getSurveyBySurveyID,
    getExecutedSurveyDataBySurveyIDInclContext,
    getExecutedSurveyDataBySurveyIDInclContextFromNextToken
)
from queries.levels import listLevels, listLevelsFromNextToken, listEntities, getEntityByID, listEntitiesFromNextToken

class AsyncAnalyticsService:
    def __init__(self):
        self.appsync_client = AsyncAppSyncClient()
        self.dynamodb = boto3.resource('dynamodb')
        self.survey_table = os.environ.get('API_APINISABA_SURVEYTABLE_NAME')
        self.executed_survey_table = os.environ.get('API_APINISABA_EXECUTEDSURVEYTABLE_NAME')
    
    def get_total_number_of_surveys(self):
        """Synchronous method for backward compatibility"""
        try:
            table = self.dynamodb.Table(self.survey_table)
            response = table.scan(
                Select='COUNT',
                FilterExpression='attribute_not_exists(#deleted) OR #deleted = :deleted',
                ExpressionAttributeNames={'#deleted': '_deleted'},
                ExpressionAttributeValues={':deleted': False}
            )
            return response.get('Count', 0)
        except ClientError as e:
            print(f"Error getting survey count: {e}")
            raise
    
    async def get_survey_by_id(self, survey_id):
        start_time = time.time()
        res = await self.appsync_client.execute(
            query=getSurveyBySurveyID["query"],
            operation_name=getSurveyBySurveyID["operationName"],
            variables={"surveyID": survey_id},
        )
        survey = res["data"]["getSurvey"]
        elapsed = int(time.time() - start_time)
        print(f"[service] get_survey_by_id | t={elapsed}s | survey_id={survey_id} | ok={survey is not None}")
        return survey
    
    async def get_executed_surveys_by_survey_id(self, survey_id):
        start_time = time.time()
        res = await self.appsync_client.execute(
            query=getExecutedSurveyDataBySurveyIDInclContext["query"],
            operation_name=getExecutedSurveyDataBySurveyIDInclContext["operationName"],
            variables={"surveyID": survey_id},
        )
        
        to_return_executed_surveys = res["data"]["listExecutedSurveys"]["items"]
        next_token = res["data"]["listExecutedSurveys"].get("nextToken", None)
        elapsed = int(time.time() - start_time)
        print(f"[service] executed_surveys page | t={elapsed}s | count={len(to_return_executed_surveys)} | nextToken={bool(next_token)}")

        while next_token:
            res = await self.appsync_client.execute(
                query=getExecutedSurveyDataBySurveyIDInclContextFromNextToken["query"],
                operation_name=getExecutedSurveyDataBySurveyIDInclContextFromNextToken["operationName"],
                variables={"surveyID": survey_id, "nextToken": next_token},
            )
            
            items = res["data"]["listExecutedSurveys"]["items"]
            to_return_executed_surveys.extend(items)
            next_token = res["data"]["listExecutedSurveys"].get("nextToken", None)
            elapsed = int(time.time() - start_time)
            print(f"[service] executed_surveys page | t={elapsed}s | added={len(items)} | total={len(to_return_executed_surveys)} | hasNext={bool(next_token)}")

        # Filter by useForAnalytics: include if null (backwards compatibility) or true, exclude if false
        filtered_surveys = [
            survey for survey in to_return_executed_surveys
            if survey.get("useForAnalytics") is None or survey.get("useForAnalytics") is True
        ]
        elapsed = int(time.time() - start_time)
        print(f"[service] filtered by useForAnalytics | t={elapsed}s | original={len(to_return_executed_surveys)} | filtered={len(filtered_surveys)}")
        
        return filtered_surveys
    
    def get_executed_survey_count_by_survey_id(self, survey_id):
        """Synchronous method for backward compatibility"""
        try:
            table = self.dynamodb.Table(self.executed_survey_table)
            response = table.query(
                IndexName='bySurveyID',
                KeyConditionExpression='surveyID = :survey_id',
                FilterExpression='attribute_not_exists(#deleted) OR #deleted = :deleted',
                ExpressionAttributeNames={'#deleted': '_deleted'},
                ExpressionAttributeValues={
                    ':survey_id': survey_id,
                    ':deleted': False
                },
                Select='COUNT'
            )
            return response.get('Count', 0)
        except ClientError as e:
            print(f"Error getting executed survey count for survey {survey_id}: {e}")
            raise
    
    async def get_all_surveys_for_organization(self, organization_id):
        """Get all surveys for the organization using AppSync"""
        try:
            res = await self.appsync_client.execute(
                query=listAllSurveys["query"],
                operation_name=listAllSurveys["operationName"],
                variables={"organization_id": organization_id},
            )
            
            surveys = res["data"]["listSurveys"]["items"]
            next_token = res["data"]["listSurveys"].get("nextToken", None)
            print(f"[service] listSurveys page | count={len(surveys)} | nextToken={bool(next_token)}")

            while next_token:
                res = await self.appsync_client.execute(
                    query=listAllSurveysFromNextToken["query"],
                    operation_name=listAllSurveysFromNextToken["operationName"],
                    variables={"nextToken": next_token, "organization_id": organization_id},
                )
                
                items = res["data"]["listSurveys"]["items"]
                surveys.extend(items)
                next_token = res["data"]["listSurveys"].get("nextToken", None)
                print(f"[service] listSurveys page | added={len(items)} | total={len(surveys)} | hasNext={bool(next_token)}")

            return surveys
        except Exception as e:
            print(f"Error getting all surveys: {e}")
            raise
    
    async def get_executed_survey_counts_for_organization(self, organization_id):
        """Get executed survey counts for all surveys in the organization"""
        try:
            # Get all surveys for the organization
            surveys = await self.get_all_surveys_for_organization(organization_id)
            
            if not surveys:
                return {}
            
            # Create tasks for parallel execution
            tasks = []
            for survey in surveys:
                # Note: This is still synchronous DynamoDB call
                # In a full async implementation, you'd use aioboto3
                task = asyncio.get_event_loop().run_in_executor(
                    None, self.get_executed_survey_count_by_survey_id, survey["id"]
                )
                tasks.append((task, survey["id"]))
            
            # Execute all tasks in parallel
            counts = {}
            for task, survey_id in tasks:
                try:
                    count = await task
                    counts[survey_id] = count
                except Exception as e:
                    print(f"Error getting count for survey {survey_id}: {e}")
                    counts[survey_id] = 0
            print(f"[service] executed_survey_counts | surveys={len(surveys)}")
            
            return counts
        except Exception as e:
            print(f"Error getting executed survey counts for organization: {e}")
            raise
    
    async def get_entities_by_ids(self, entity_ids):
        start_time = time.time()
        unique_entity_ids = list(set(entity_ids))
        
        if not unique_entity_ids:
            return []
        
        # Create batch queries for parallel execution
        queries = []
        for entity_id in unique_entity_ids:
            queries.append({
                'query': getEntityByID["query"],
                'operation_name': getEntityByID["operationName"],
                'variables': {"entityID": entity_id}
            })
        
        # Execute all entity queries in parallel
        results = await self.appsync_client.execute_batch(queries)
        
        entities = []
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                print(f"Error getting entity {unique_entity_ids[i]}: {str(result)}")
                continue
            
            if result and "data" in result and result["data"]["getEntity"]:
                entities.append(result["data"]["getEntity"])
        
        elapsed = int(time.time() - start_time)
        print(f"[service] get_entities_by_ids | t={elapsed}s | requested={len(unique_entity_ids)} | returned={len(entities)}")
        return entities
    
    async def get_all_levels(self, organization_id):
        start_time = time.time()
        res = await self.appsync_client.execute(
            query=listLevels["query"],
            operation_name=listLevels["operationName"],
            variables={"organization_id": organization_id},
        )
        levels = res["data"]["listLevels"]["items"]
        next_token = res["data"]["listLevels"].get("nextToken", None)
        elapsed = int(time.time() - start_time)
        print(f"[service] listLevels page | t={elapsed}s | count={len(levels)} | nextToken={bool(next_token)}")

        while next_token:
            res = await self.appsync_client.execute(
                query=listLevelsFromNextToken["query"],
                operation_name=listLevelsFromNextToken["operationName"],
                variables={"nextToken": next_token, "organization_id": organization_id},
            )
            items = res["data"]["listLevels"]["items"]
            levels.extend(items)
            next_token = res["data"]["listLevels"].get("nextToken", None)
            elapsed = int(time.time() - start_time)
            print(f"[service] listLevels page | t={elapsed}s | added={len(items)} | total={len(levels)} | hasNext={bool(next_token)}")

        return self._sort_levels_by_parent_level_id(levels)
    
    async def get_all_entities(self, organization_id):
        res = await self.appsync_client.execute(
            query=listEntities["query"],
            operation_name=listEntities["operationName"],
            variables={"organization_id": organization_id},
        )

        to_return_entities = res["data"]["listEntities"]["items"]
        next_token = res["data"]["listEntities"].get("nextToken", None)

        while next_token:
            res = await self.appsync_client.execute(
                query=listEntitiesFromNextToken["query"],
                operation_name=listEntitiesFromNextToken["operationName"],
                variables={"nextToken": next_token, "organization_id": organization_id},
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
