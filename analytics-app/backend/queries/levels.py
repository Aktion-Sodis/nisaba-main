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
  """,
}

listEntities = {
    "operationName": "listEntities",
    "query": """query listEntities {
        listEntities {
            nextToken
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
    }""",
}

listEntitiesFromNextToken = {
    "operationName": "listEntities",
    "query": """query listEntities($nextToken: String!) {
        listEntities(nextToken: $nextToken) {
            nextToken
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
    }""",
}

getEntityByID = {
    "operationName": "getEntity",
    "query": """query getEntity($entityID: ID!) {
      getEntity(id: $entityID) {
        id
        name {
          languageKeys
          languageTexts
        }
        level {
          name {
            languageKeys
            languageTexts
          }
        }
      }
    }"""
}
