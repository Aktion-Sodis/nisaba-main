import os
import json
import asyncio
from datetime import datetime

import aiohttp
import boto3
from botocore.auth import SigV4Auth
from botocore.awsrequest import AWSRequest

class AsyncAppSyncClient:
    def __init__(self):
        """
        Initialize async AppSync client for Lambda environment using IAM role
        """
        # Get AppSync endpoint from environment variables
        self.endpoint = os.environ.get('API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT')
        if not self.endpoint:
            raise ValueError("AppSync endpoint not found in environment variables")
        
        # Get AWS region
        self.region = os.environ.get('AWS_REGION', 'us-east-1')
        
        # Initialize boto3 session for credentials
        self.session = boto3.Session()
        self.credentials = self.session.get_credentials()
    
    def serialization_helper(self, obj):
        """
        Helper for JSON serialization of datetime objects
        """
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%dT%H:%M:%S.000Z')
        return obj
    
    
    def _sign_request(self, method, url, headers, data, credentials):
        """
        Sign the request using AWS Signature Version 4
        """
        # Create AWS request
        request = AWSRequest(
            method=method,
            url=url,
            data=data,
            headers=headers
        )
        
        # Sign the request
        SigV4Auth(credentials, 'appsync', self.region).add_auth(request)
        
        # Return the signed headers
        return dict(request.headers)
    
    async def execute(self, query, operation_name, variables):
        """
        Execute GraphQL query against AppSync using Lambda's IAM role with SigV4
        """
        # Prepare the request payload
        payload = {
            "query": query,
            "variables": variables,
            "operationName": operation_name
        }
        
        # Convert payload to JSON
        data = json.dumps(payload)
        
        # Prepare headers
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        try:
            # Sign the request
            signed_headers = self._sign_request('POST', self.endpoint, headers, data, self.credentials)
            
            # Make the signed request to AppSync
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    self.endpoint,
                    headers=signed_headers,
                    data=data,
                    timeout=aiohttp.ClientTimeout(total=30)
                ) as response:
                    # Check if request was successful
                    response.raise_for_status()
                    
                    # Parse and return the response
                    result = await response.json()
                    
                    # Check for GraphQL errors
                    if 'errors' in result:
                        error_messages = [error.get('message', 'Unknown error') for error in result['errors']]
                        raise Exception(f"GraphQL errors: {', '.join(error_messages)}")
                    
                    return result
                    
        except aiohttp.ClientError as e:
            print(f"Request error: {str(e)}")
            raise Exception(f"Failed to execute GraphQL query: {str(e)}")
        except json.JSONDecodeError as e:
            print(f"JSON decode error: {str(e)}")
            raise Exception(f"Invalid JSON response from AppSync: {str(e)}")
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            raise
    
    async def execute_batch(self, queries):
        """
        Execute multiple GraphQL queries in parallel
        """
        tasks = []
        for query_info in queries:
            task = self.execute(
                query_info['query'],
                query_info['operation_name'],
                query_info['variables']
            )
            tasks.append(task)
        
        return await asyncio.gather(*tasks, return_exceptions=True)
