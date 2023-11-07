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
  """,
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
  """,
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
  """,
}


getExecutedSurveyDataBySurveyID = {
    "operationName": "listExecutedSurveys",
    "query": """ query listExecutedSurveys($surveyID: ID!) {
    listExecutedSurveys(filter: {executedSurveySurveyId: {eq: $surveyID}}) {
      items {
        executedSurveySurveyId
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
  """,
}

getExecutedSurveyDataBySurveyIDInclContext = {
"operationName": "listExecutedSurveys",
"query": """
query listExecutedSurveys($surveyID: ID!) {
  listExecutedSurveys(filter: {executedSurveySurveyId: {eq: $surveyID}}) {
    items {
      id
      _deleted
      answers {
        date
        doubleValue
        id
        intValue
        markings {
          rx
          ry
          text
          x
          y
        }
        questionID
        questionOptions {
          followUpQuestionIDs
          id
          text {
            languageKeys
            languageTexts
          }
        }
        rating
        text
        type
      }
      appliedIntervention {
        entityAppliedInterventionsId
      }
      updatedAt
      location {
        latitude
        longitude
      }
      date
      whoExecutedIt {
        firstName
        lastName
      }
    }
  }
}
"""
}
