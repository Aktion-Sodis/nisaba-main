export type AmplifyDependentResourcesAttributes = {
    "api": {
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "apinisaba": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "nisabaUserManagementApi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "auth": {
        "authnisaba": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        },
        "userPoolGroups": {
            "superadminGroupRole": "string",
            "adminGroupRole": "string",
            "mobileGroupRole": "string",
            "analyticsGroupRole": "string"
        }
    },
    "function": {
        "AdminQueries8dc38185": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "LambdaExecutionRoleArn": "string"
        },
        "authnisabaPreTokenGeneration": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string",
            "LambdaExecutionRoleArn": "string"
        },
        "nisabaAdminSdkLayer": {
            "Arn": "string"
        },
        "nisabaUserManagement": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "LambdaExecutionRoleArn": "string"
        }
    },
    "storage": {
        "s3nisaba": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}