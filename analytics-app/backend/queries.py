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
          interventionType
          name {
            languageKeys
            languageTexts
          }
        }
      }
    }
  """
}
