import json
import base64
from datetime import datetime

def create_response(status_code, body, headers=None):
    """
    Create a standardized Lambda response
    """
    if headers is None:
        headers = {}
    
    # Add CORS headers
    headers.update({
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    })
    
    # Handle binary responses (like Excel files)
    if isinstance(body, bytes):
        return {
            'statusCode': status_code,
            'headers': headers,
            'body': base64.b64encode(body).decode('utf-8'),
            'isBase64Encoded': True
        }
    
    # Handle regular JSON responses
    return {
        'statusCode': status_code,
        'headers': headers,
        'body': json.dumps(body, default=json_serializer)
    }

def create_error_response(status_code, message, details=None):
    """
    Create a standardized error response
    """
    error_body = {
        'error': message,
        'timestamp': datetime.utcnow().isoformat() + 'Z'
    }
    
    if details:
        error_body['details'] = details
    
    return create_response(status_code, error_body)

def json_serializer(obj):
    """
    Custom JSON serializer for datetime objects
    """
    if isinstance(obj, datetime):
        return obj.isoformat() + 'Z'
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable") 