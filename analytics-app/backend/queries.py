ListLevels = {
    "operationName": "listLevels",
    "query": """query listLevels { 
      listLevels { 
        items { 
          name { 
            languageKeys 
            languageTexts 
          } 
        } 
      }
    }
  """
}

listInterventionTypes = {
    "operationName": "listInterventionTypes",
    "query": """query listInterventionTypes {
      listInterventions {
        items {
          name {
            languageKeys
            languageTexts
          }
          interventionType
          id
        }
      }
    }
  """
}

listSurveys = {
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


listExecutedSurveys = {
  "operationName": "listExecutedSurveys",
  "query": """query listExecutedSurveys {
    listExecutedSurveys {
      items {
        executedSurveySurveyId
        answers {
          doubleValue
          intValue
          questionID
          rating
          text
          date
          questionOptions {
            text {
              languageKeys
              languageTexts
            }
            id
          }
        }
        date
      }
    }
  }"""
}


getExecutedSurveysBySurveyID = {
    "operationName": "executedSurveyBySurveyID",
    "query": """query executedSurveyBySurveyID($surveyID: String!) {
      executedSurveyBySurveyID(surveyID: $surveyID) {
        items {
            date
        }
    }
    }
  """
}

getSurveyByID = {
    "operationName": "getSurvey",
    "query": """query getSurvey($id: ID!) {
      getSurvey(id: $id) {
        id
        interventionSurveysId
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        questions {
          text {
            languageKeys
            languageTexts
          }
          questionOptions {
            text {
              languageKeys
              languageTexts
            }
          }
          type
          id
        }
        createdAt
      }
    }
  """
}