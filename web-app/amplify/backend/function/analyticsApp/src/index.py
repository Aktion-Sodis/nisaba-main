import json

from handlers.analytics_handler import AnalyticsHandler
from utils.response_utils import create_response, create_error_response

def handler(event, context):
    print('Received event:')
    print(json.dumps(event, indent=2))
    
    try:
        http_method = event.get('httpMethod', 'GET')
        if http_method != 'GET':
            return create_error_response(405, f"Method {http_method} not allowed. Only GET is supported.")
        
        query_params = event.get('queryStringParameters') or {}
        analytics_handler = AnalyticsHandler()
        
        path_parameters = event.get('pathParameters') or {}
        proxy_tail = path_parameters.get('proxy')
        relative_path = f'/{proxy_tail}' if proxy_tail else ''

        if relative_path in ['', '/']:
            return create_response(200, {"message": "Analytics Middleware is running"})

        elif relative_path == '/getExecutedSurveyCountsForOrganization':
            return analytics_handler.get_executed_survey_counts_for_organization()

        elif relative_path == '/getAggregatedSurveyDataById':
            survey_id = query_params.get('SurveyID')
            if not survey_id:
                return create_error_response(400, "SurveyID parameter is required")
            
            filters = parse_filters_from_query_params(query_params)
            return analytics_handler.get_aggregated_survey_data_by_id(survey_id, filters)

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

def parse_filters_from_query_params(query_params):
    filters = {}
    
    if query_params.get('startDate') or query_params.get('endDate'):
        filters['date_range'] = {
            'start': query_params.get('startDate'),
            'end': query_params.get('endDate')
        }
    
    if query_params.get('entities'):
        entities = query_params['entities'].split(',')
        filters['entities'] = [entity.strip() for entity in entities if entity.strip()]
    
    if query_params.get('executors'):
        executors = query_params['executors'].split(',')
        filters['executors'] = [executor.strip() for executor in executors if executor.strip()]
    
    if any(key in query_params for key in ['north', 'south', 'east', 'west']):
        try:
            filters['location_bounds'] = {
                'north': float(query_params.get('north', 90)),
                'south': float(query_params.get('south', -90)),
                'east': float(query_params.get('east', 180)),
                'west': float(query_params.get('west', -180))
            }
        except (ValueError, TypeError):
            print("Warning: Invalid location bounds parameters, ignoring location filter")
    
    return filters if filters else None