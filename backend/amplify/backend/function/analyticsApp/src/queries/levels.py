# Levels and entities GraphQL queries

listLevels = {
    "operationName": "listLevels",
    "query": """query listLevels($organization_id: String!) {
    listLevels(filter: {organization_id: {eq: $organization_id}, _deleted: {ne: true}}) {
      nextToken
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

listLevelsFromNextToken = {
    "operationName": "listLevels",
    "query": """query listLevels($nextToken: String!, $organization_id: String!) {
    listLevels(filter: {organization_id: {eq: $organization_id}, _deleted: {ne: true}}, nextToken: $nextToken) {
      nextToken
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
    "query": """query listEntities($organization_id: String!) {
        listEntities(filter: {organization_id: {eq: $organization_id}, _deleted: {ne: true}}) {
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
    "query": """query listEntities($nextToken: String!, $organization_id: String!) {
        listEntities(filter: {organization_id: {eq: $organization_id}, _deleted: {ne: true}}, nextToken: $nextToken) {
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