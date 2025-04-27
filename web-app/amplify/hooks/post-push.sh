 #!/bin/bash
echo "Running survey status migration..."

# Get the environment name from AWS Amplify environment variable
ENV_NAME=$AWS_BRANCH

# Get the function name for this specific environment
FUNCTION_NAME=$(aws lambda list-functions --query "Functions[?contains(FunctionName, 'migrateSurveyStatus-${ENV_NAME}')].FunctionName" --output text)

if [ -z "$FUNCTION_NAME" ]; then
    echo "No migration function found for environment ${ENV_NAME}. Please check if the function was deployed correctly."
    exit 1
fi

echo "Found migration function for environment ${ENV_NAME}: $FUNCTION_NAME"
echo "Invoking migration function..."
aws lambda invoke --function-name "$FUNCTION_NAME" response.json
cat response.json
rm -f response.json