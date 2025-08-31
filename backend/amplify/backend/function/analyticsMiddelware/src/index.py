import json
from handlers.analytics_handler import AnalyticsHandler
from utils.response_utils import create_response, create_error_response

def handler(event, context):
    """
    Main Lambda handler for analytics middleware
    """
    print('Received event:')
    print(json.dumps(event, indent=2))
    
    try:
        # Only allow GET requests
        http_method = event.get('httpMethod', 'GET')
        if http_method != 'GET':
            return create_error_response(405, f"Method {http_method} not allowed. Only GET is supported.")
        
        # Parse query parameters
        query_params = event.get('queryStringParameters') or {}
        
        # Initialize analytics handler
        analytics_handler = AnalyticsHandler()
        
        # Determine relative path under /analytics for routing (proxy-only)
        path_parameters = event.get('pathParameters') or {}
        proxy_tail = path_parameters.get('proxy')
        relative_path = f'/{proxy_tail}' if proxy_tail else ''

        # Route the request based on relative path and method
        if relative_path in ['', '/']:
            return create_response(200, {"message": "Analytics Middleware is running"})

        elif relative_path == '/getTotalNumberOfSurveys':
            return analytics_handler.get_total_number_of_surveys()

        elif relative_path == '/getAggregatedSurveyDataById':
            survey_id = query_params.get('SurveyID')
            if not survey_id:
                return create_error_response(400, "SurveyID parameter is required")
            return analytics_handler.get_aggregated_survey_data_by_id(survey_id)

        elif relative_path == '/getSurveyResultsAsXLSX':
            survey_id = query_params.get('SurveyID')
            if not survey_id:
                return create_error_response(400, "SurveyID parameter is required")
            return analytics_handler.get_survey_results_as_xlsx(survey_id)

        else:
            return create_error_response(404, f"Endpoint {relative_path} with method {http_method} not found")
    
    except Exception as e:
        print(f"Error in handler: {str(e)}")
        return create_error_response(500, f"Internal server error: {str(e)}")