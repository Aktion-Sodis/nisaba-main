listLevels = {
  "operationName": "listLevels",
  "query": """query listLevels {
    listLevels {
      items {
        parentLevelID
        name {
          languageKeys
          languageTexts
        }
        id
      }
    }
  }
  """
}


listEntities = {
  "operationName": "listEntities",
  "query": """query listEntities {
    listEntities {
      items {
        id
        name {
          languageKeys
          languageTexts
        }
        appliedInterventions {
          items {
            executedSurveys {
              items {
                executedSurveySurveyId
                id
                surveyID
              }
            }
          }
        }
        parentEntityID
        level {
          id
        }
      }
    }
  }
  """
}