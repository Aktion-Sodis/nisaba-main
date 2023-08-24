listLevels = {
  "operationName": "listLevels",
  "query": """query listLevels {
    listLevels {
      items {
        description
        name
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
        level
        name
      }
    }
  }
  """
}