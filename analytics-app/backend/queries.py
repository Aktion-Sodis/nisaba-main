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
