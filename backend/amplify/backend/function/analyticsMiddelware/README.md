# Analytics Middleware Lambda Function

This Lambda function provides analytics capabilities for the Nisaba application, migrated from the original Flask-based middleware.

## Structure

```
src/
├── index.py                 # Main Lambda handler
├── handlers/
│   └── analytics_handler.py # Business logic handlers
├── services/
│   ├── analytics_service.py # Hybrid service (GraphQL + DynamoDB)
│   ├── appsync_client.py    # AppSync GraphQL client (IAM-based)
│   └── excel_export.py      # Excel file generation
├── queries/
│   ├── surveys.py           # Survey-related GraphQL queries
│   ├── levels.py            # Levels and entities GraphQL queries
│   └── data_store_paths.py  # File path utilities
└── utils/
    └── response_utils.py    # HTTP response utilities
```

## Endpoints

The Lambda function exposes the following essential endpoints:

- `GET /` - Health check
- `GET /getTotalNumberOfSurveys` - Get total number of surveys (DynamoDB optimized)
- `GET/POST /getAggregatedSurveyDataById` - Get comprehensive aggregated survey data
- `GET/POST /getSurveyResultsAsXLSX` - Generate Excel export

## Architecture

### Hybrid Data Access
- **GraphQL (AppSync)**: Used for data gathering (surveys, executed surveys, entities)
- **DynamoDB Direct**: Used only for count operations (more efficient)
- **Lambda IAM Role**: Handles authorization (no token forwarding needed)

### IAM Authentication for AppSync

The function uses **AWS Signature Version 4 (SigV4)** for authenticating requests to AppSync:

#### Implementation Details
```python
# AppSync client uses SigV4 signing
from botocore.auth import SigV4Auth
from botocore.awsrequest import AWSRequest

# Sign requests with Lambda's IAM credentials
SigV4Auth(credentials, 'appsync', region).add_auth(request)
```

#### IAM Permissions Required
The Lambda execution role includes:
```json
{
  "Effect": "Allow",
  "Action": ["appsync:GraphQL"],
  "Resource": ["arn:aws:appsync:${region}:${account}:apis/${apiId}/types/Query/*"]
}
```

#### Benefits of IAM Authentication
- ✅ **No user token handling** - Lambda operates with service-level permissions
- ✅ **Automatic credential rotation** - AWS handles credential management
- ✅ **Secure by design** - Uses AWS's standard authentication mechanism
- ✅ **Simplified code** - No complex token forwarding logic

## Dependencies

The function uses the following Python packages:
- `pandas==2.0.3` - Data manipulation
- `xlsxwriter==3.1.9` - Excel file generation
- `numpy==1.24.4` - Numerical operations
- `requests==2.31.0` - HTTP requests
- `simplejson==3.19.1` - JSON handling
- `boto3==1.34.0` - AWS SDK for DynamoDB access

## Environment Variables

The function requires the following environment variables:
- `API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT` - AppSync GraphQL endpoint
- `AWS_REGION` - AWS region (automatically set in Lambda)
- `API_APINISABA_SURVEYTABLE_NAME` - DynamoDB survey table name
- `API_APINISABA_EXECUTEDSURVEYTABLE_NAME` - DynamoDB executed survey table name
- `API_APINISABA_ENTITYTABLE_NAME` - DynamoDB entity table name
- `API_APINISABA_LEVELTABLE_NAME` - DynamoDB level table name

## Migration Notes

This Lambda function was migrated from the Flask-based analytics middleware located at `analytics-app/backend/`. The migration involved:

1. **Removing Flask dependencies** - Replaced Flask routing with Lambda event handling
2. **Implementing IAM authentication** - Using SigV4 for AppSync access
3. **Hybrid data access** - GraphQL for data gathering, DynamoDB for counts
4. **Removing unnecessary endpoints** - Kept only essential analytics operations
5. **Maintaining core functionality** - Preserved complex data aggregation and Excel export

## Benefits

- **Simplified security model** - IAM-based authentication, no token handling
- **Better performance** - Direct resource access where appropriate
- **Consistent with project** - Uses existing GraphQL schema
- **Reduced complexity** - Fewer endpoints, cleaner code
- **Easier maintenance** - Standard AWS patterns
- **Secure by default** - AWS best practices for service-to-service communication

## Deployment

The function is deployed using AWS Amplify CLI. Dependencies are managed through both `requirements.txt` and `Pipfile` for compatibility with different deployment methods.

### Prerequisites
- AppSync API configured with IAM authentication enabled
- Lambda execution role with appropriate AppSync and DynamoDB permissions
- Environment variables properly configured 