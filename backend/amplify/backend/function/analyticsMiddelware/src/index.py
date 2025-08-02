import json
import os
from urllib.parse import parse_qs, urlparse
from handlers.analytics_handler import AnalyticsHandler
from utils.response_utils import create_response, create_error_response

def handler(event, context):
    """
    Main Lambda handler for analytics middleware
    """
    print('Received event:')
    print(json.dumps(event, indent=2))
    
    try:
        # Parse the HTTP method and path
        http_method = event.get('httpMethod', 'GET')
        path = event.get('path', '/')
        
        # Parse query parameters
        query_params = {}
        if event.get('queryStringParameters'):
            query_params = event.get('queryStringParameters')
        
        # Parse body for POST requests
        body = {}
        if event.get('body') and http_method in ['POST', 'PUT']:
            try:
                body = json.loads(event.get('body'))
            except json.JSONDecodeError:
                return create_error_response(400, "Invalid JSON in request body")
        
        # Initialize analytics handler
        analytics_handler = AnalyticsHandler()
        
        # Route the request based on path and method
        if path == '/' and http_method == 'GET':
            return create_response(200, {"message": "Analytics Middleware is running"})
        
        elif path == '/getTotalNumberOfSurveys' and http_method == 'GET':
            return analytics_handler.get_total_number_of_surveys()
        
        elif path == '/getAggregatedSurveyDataById' and http_method in ['GET', 'POST']:
            survey_id = query_params.get('SurveyID') or body.get('SurveyID')
            if not survey_id:
                return create_error_response(400, "SurveyID parameter is required")
            return analytics_handler.get_aggregated_survey_data_by_id(survey_id)
        
        elif path == '/getSurveyResultsAsXLSX' and http_method in ['GET', 'POST']:
            survey_id = query_params.get('SurveyID') or body.get('SurveyID')
            if not survey_id:
                return create_error_response(400, "SurveyID parameter is required")
            return analytics_handler.get_survey_results_as_xlsx(survey_id)
        
        else:
            return create_error_response(404, f"Endpoint {path} with method {http_method} not found")
    
    except Exception as e:
        print(f"Error in handler: {str(e)}")
        return create_error_response(500, f"Internal server error: {str(e)}")