# save current pwd as variable
CWD=$(pwd)

set -e
IFS='|'

VUECONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"dist\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script serve\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"$2\",\
\"secretAccessKey\":\"$3\",\
\"region\":\"$4\"\
}"
AMPLIFY="{\
\"projectName\":\"nisaba\",\
\"appId\":\"d26pqqtndacxsh\",\
\"envName\":\"$1\",\
\"defaultEditor\":\"vscode\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"vue\",\
\"config\":$VUECONFIG\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

CODEGEN="{\
\"generateCode\":true,\
\"codeLanguage\":\"javascript\",\
\"fileNamePattern\":\"src/graphql/**/*.js\",\
\"generatedFileName\":\"API\",\
\"generateDocs\":true\
}"

if [ "$5" = "admin-app" ] || [ "$6" = "admin-app" ]; then
  echo "Deploying admin-app"
  cd admin-app
  cd frontend
  amplify pull \
  --amplify $AMPLIFY \
  --frontend $FRONTEND \
  --providers $PROVIDERS \
  --yes

  amplify publish \
  --codegen $CODEGEN \
  --amplify $AMPLIFY \
  --frontend $FRONTEND \
  --providers $PROVIDERS \
  --yes --force
fi

if [ "$5" = "analytics-app" ] || [ "$6" = "analytics-app" ]; then
  cd $CWD
  echo "Deploying analytics-app is not yet supported."
  cd analytics-app
  cd frontend
fi