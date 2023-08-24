# TODO: done
listTotalNumberOfSurveys = {
  "operationName": "listAllSurveys",
  "query": """query listAllSurveys {
    listSurveys {
      items {
        id
      }
    }
  }
  """
}


listAllSurveys = {
  "operationName": "listAllSurveys",
  "query": """query listAllSurveys {
    listSurveys {
      items {
        name {
          languageKeys
          languageTexts
        }
        interventionSurveysId
        createdAt
        id
      }
    }
  }
  """
}



# getSurveyBySurveyID = {
#   "operationName": "getSurvey",
#   "query": """query getSurvey($surveyID: String!) {
#     getSurvey(id: $surveyID) {
#       description {
#         languageKeys
#         languageTexts
#       }
#       name {
#         languageKeys
#         languageTexts
#       }
#       surveyType
#       questions {
#         id
#         questionOptions {
#           text {
#             languageKeys
#             languageTexts
#           }
#         }
#         text {
#           languageKeys
#           languageTexts
#         }
#       }
#     }
#   }
#   """
# }


getSurveyBySurveyID = {
  "operationName": "getSurvey",
  "query": """query getSurvey($surveyID: ID!) {
    getSurvey(id: $surveyID) {
      description {
        languageKeys
        languageTexts
      }
      name {
        languageKeys
        languageTexts
      }
      surveyType
      questions {
        id
        type
        questionOptions {
          text {
            languageKeys
            languageTexts
          }
        }
        text {
          languageKeys
          languageTexts
        }
      }
    }
  }
  """
}



getExecutedSurveyDataBySurveyID = {
  "operationName": "listExecutedSurveys",
  "query": """ query listExecutedSurveys($surveyID: ID!) {
    listExecutedSurveys(filter: {executedSurveySurveyId: {eq: $surveyID}}) {
      items {
        id
        answers {
          intValue
          date
          doubleValue
          id
          questionID
          rating
          text
          type
          questionOptions {
            text {
              languageKeys
              languageTexts
            }
          }
        }
      }
    }
  }
  """
}