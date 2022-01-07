/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      bio
      permissions {
        permissionType
        allowedEntities
      }
      schemeVersion
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        bio
        permissions {
          permissionType
          allowedEntities
        }
        schemeVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        firstName
        lastName
        bio
        permissions {
          permissionType
          allowedEntities
        }
        schemeVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getConfig = /* GraphQL */ `
  query GetConfig($id: ID!) {
    getConfig(id: $id) {
      id
      schemeVersion
      name
      colorTheme {
        highlight
        secundaryHighlight
        backgroundOneLight
        backgroundTwoLight
        backgroundOneDark
        backgroundTwoDark
      }
      storagePaths {
        ownerPic
        ownerIcon
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listConfigs = /* GraphQL */ `
  query ListConfigs(
    $filter: ModelConfigFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConfigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        schemeVersion
        name
        colorTheme {
          highlight
          secundaryHighlight
          backgroundOneLight
          backgroundTwoLight
          backgroundOneDark
          backgroundTwoDark
        }
        storagePaths {
          ownerPic
          ownerIcon
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncConfigs = /* GraphQL */ `
  query SyncConfigs(
    $filter: ModelConfigFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncConfigs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        schemeVersion
        name
        colorTheme {
          highlight
          secundaryHighlight
          backgroundOneLight
          backgroundTwoLight
          backgroundOneDark
          backgroundTwoDark
        }
        storagePaths {
          ownerPic
          ownerIcon
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLevel = /* GraphQL */ `
  query GetLevel($id: ID!) {
    getLevel(id: $id) {
      id
      name
      description
      parentLevelID
      parentLevel {
        id
        name
        description
        parentLevelID
        parentLevel {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        childLevel {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        interventionsAllowed
        allowedInterventionIDs
        allowedInterventions {
          nextToken
          startedAt
        }
        customDatas {
          id
          name
          type
        }
        schemeVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelParentLevelId
        levelChildLevelId
      }
      childLevel {
        id
        name
        description
        parentLevelID
        parentLevel {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        childLevel {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        interventionsAllowed
        allowedInterventionIDs
        allowedInterventions {
          nextToken
          startedAt
        }
        customDatas {
          id
          name
          type
        }
        schemeVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelParentLevelId
        levelChildLevelId
      }
      interventionsAllowed
      allowedInterventionIDs
      allowedInterventions {
        items {
          id
          schemeVersion
          name
          description
          interventionType
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        nextToken
        startedAt
      }
      customDatas {
        id
        name
        type
      }
      schemeVersion
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      levelParentLevelId
      levelChildLevelId
    }
  }
`;
export const listLevels = /* GraphQL */ `
  query ListLevels(
    $filter: ModelLevelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        parentLevelID
        parentLevel {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        childLevel {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        interventionsAllowed
        allowedInterventionIDs
        allowedInterventions {
          nextToken
          startedAt
        }
        customDatas {
          id
          name
          type
        }
        schemeVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelParentLevelId
        levelChildLevelId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLevels = /* GraphQL */ `
  query SyncLevels(
    $filter: ModelLevelFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLevels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        parentLevelID
        parentLevel {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        childLevel {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        interventionsAllowed
        allowedInterventionIDs
        allowedInterventions {
          nextToken
          startedAt
        }
        customDatas {
          id
          name
          type
        }
        schemeVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelParentLevelId
        levelChildLevelId
      }
      nextToken
      startedAt
    }
  }
`;
export const getIntervention = /* GraphQL */ `
  query GetIntervention($id: ID!) {
    getIntervention(id: $id) {
      id
      schemeVersion
      name
      description
      interventionType
      contents {
        items {
          id
          schemeVersion
          name
          tags
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          interventionContentsId
        }
        nextToken
        startedAt
      }
      surveys {
        items {
          id
          schemeVersion
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          interventionSurveysId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      levelAllowedInterventionsId
    }
  }
`;
export const listInterventions = /* GraphQL */ `
  query ListInterventions(
    $filter: ModelInterventionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterventions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        schemeVersion
        name
        description
        interventionType
        contents {
          nextToken
          startedAt
        }
        surveys {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelAllowedInterventionsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncInterventions = /* GraphQL */ `
  query SyncInterventions(
    $filter: ModelInterventionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInterventions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        schemeVersion
        name
        description
        interventionType
        contents {
          nextToken
          startedAt
        }
        surveys {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelAllowedInterventionsId
      }
      nextToken
      startedAt
    }
  }
`;
export const getContent = /* GraphQL */ `
  query GetContent($id: ID!) {
    getContent(id: $id) {
      id
      schemeVersion
      intervention {
        id
        schemeVersion
        name
        description
        interventionType
        contents {
          nextToken
          startedAt
        }
        surveys {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelAllowedInterventionsId
      }
      name
      tags
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      interventionContentsId
    }
  }
`;
export const listContents = /* GraphQL */ `
  query ListContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        schemeVersion
        intervention {
          id
          schemeVersion
          name
          description
          interventionType
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        name
        tags
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionContentsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncContents = /* GraphQL */ `
  query SyncContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncContents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        schemeVersion
        intervention {
          id
          schemeVersion
          name
          description
          interventionType
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        name
        tags
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionContentsId
      }
      nextToken
      startedAt
    }
  }
`;
export const getSurvey = /* GraphQL */ `
  query GetSurvey($id: ID!) {
    getSurvey(id: $id) {
      id
      schemeVersion
      intervention {
        id
        schemeVersion
        name
        description
        interventionType
        contents {
          nextToken
          startedAt
        }
        surveys {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelAllowedInterventionsId
      }
      name
      description
      questions {
        id
        text
        type
        questionOptions {
          id
          text
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      interventionSurveysId
    }
  }
`;
export const listSurveys = /* GraphQL */ `
  query ListSurveys(
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        schemeVersion
        intervention {
          id
          schemeVersion
          name
          description
          interventionType
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        name
        description
        questions {
          id
          text
          type
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSurveys = /* GraphQL */ `
  query SyncSurveys(
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSurveys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        schemeVersion
        intervention {
          id
          schemeVersion
          name
          description
          interventionType
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        name
        description
        questions {
          id
          text
          type
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
      }
      nextToken
      startedAt
    }
  }
`;
export const getEntity = /* GraphQL */ `
  query GetEntity($id: ID!) {
    getEntity(id: $id) {
      id
      schemeVersion
      parentEntity {
        id
        schemeVersion
        parentEntity {
          id
          schemeVersion
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityChildEntitiesId
          entityLevelId
        }
        childEntities {
          nextToken
          startedAt
        }
        level {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        location {
          latitude
          longitude
        }
        name
        customDatas {
          customDataID
          type
          name
          intValue
          stringValue
        }
        appliedInterventions {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityChildEntitiesId
        entityLevelId
      }
      childEntities {
        items {
          id
          schemeVersion
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityChildEntitiesId
          entityLevelId
        }
        nextToken
        startedAt
      }
      level {
        id
        name
        description
        parentLevelID
        parentLevel {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        childLevel {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        interventionsAllowed
        allowedInterventionIDs
        allowedInterventions {
          nextToken
          startedAt
        }
        customDatas {
          id
          name
          type
        }
        schemeVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelParentLevelId
        levelChildLevelId
      }
      location {
        latitude
        longitude
      }
      name
      customDatas {
        customDataID
        type
        name
        intValue
        stringValue
      }
      appliedInterventions {
        items {
          id
          schemeVersion
          userID
          interventionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityAppliedInterventionsId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      entityChildEntitiesId
      entityLevelId
    }
  }
`;
export const listEntities = /* GraphQL */ `
  query ListEntities(
    $filter: ModelEntityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        schemeVersion
        parentEntity {
          id
          schemeVersion
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityChildEntitiesId
          entityLevelId
        }
        childEntities {
          nextToken
          startedAt
        }
        level {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        location {
          latitude
          longitude
        }
        name
        customDatas {
          customDataID
          type
          name
          intValue
          stringValue
        }
        appliedInterventions {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityChildEntitiesId
        entityLevelId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEntities = /* GraphQL */ `
  query SyncEntities(
    $filter: ModelEntityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEntities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        schemeVersion
        parentEntity {
          id
          schemeVersion
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityChildEntitiesId
          entityLevelId
        }
        childEntities {
          nextToken
          startedAt
        }
        level {
          id
          name
          description
          parentLevelID
          interventionsAllowed
          allowedInterventionIDs
          schemeVersion
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
          levelChildLevelId
        }
        location {
          latitude
          longitude
        }
        name
        customDatas {
          customDataID
          type
          name
          intValue
          stringValue
        }
        appliedInterventions {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityChildEntitiesId
        entityLevelId
      }
      nextToken
      startedAt
    }
  }
`;
export const getAppliedIntervention = /* GraphQL */ `
  query GetAppliedIntervention($id: ID!) {
    getAppliedIntervention(id: $id) {
      id
      schemeVersion
      userID
      interventionID
      location {
        latitude
        longitude
      }
      executedSurveys {
        items {
          id
          schemeVersion
          userID
          date
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          appliedInterventionExecutedSurveysId
          executedSurveySurveyId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      entityAppliedInterventionsId
    }
  }
`;
export const listAppliedInterventions = /* GraphQL */ `
  query ListAppliedInterventions(
    $filter: ModelAppliedInterventionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppliedInterventions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        schemeVersion
        userID
        interventionID
        location {
          latitude
          longitude
        }
        executedSurveys {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityAppliedInterventionsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAppliedInterventions = /* GraphQL */ `
  query SyncAppliedInterventions(
    $filter: ModelAppliedInterventionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAppliedInterventions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        schemeVersion
        userID
        interventionID
        location {
          latitude
          longitude
        }
        executedSurveys {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityAppliedInterventionsId
      }
      nextToken
      startedAt
    }
  }
`;
export const getExecutedSurvey = /* GraphQL */ `
  query GetExecutedSurvey($id: ID!) {
    getExecutedSurvey(id: $id) {
      id
      schemeVersion
      appliedIntervention {
        id
        schemeVersion
        userID
        interventionID
        location {
          latitude
          longitude
        }
        executedSurveys {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityAppliedInterventionsId
      }
      survey {
        id
        schemeVersion
        intervention {
          id
          schemeVersion
          name
          description
          interventionType
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        name
        description
        questions {
          id
          text
          type
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
      }
      userID
      date
      location {
        latitude
        longitude
      }
      answers {
        id
        questionID
        date
        type
        text
        questionOptions {
          id
          text
        }
        markings {
          height
          width
          description
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      appliedInterventionExecutedSurveysId
      executedSurveySurveyId
    }
  }
`;
export const listExecutedSurveys = /* GraphQL */ `
  query ListExecutedSurveys(
    $filter: ModelExecutedSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExecutedSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        schemeVersion
        appliedIntervention {
          id
          schemeVersion
          userID
          interventionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityAppliedInterventionsId
        }
        survey {
          id
          schemeVersion
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          interventionSurveysId
        }
        userID
        date
        location {
          latitude
          longitude
        }
        answers {
          id
          questionID
          date
          type
          text
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        appliedInterventionExecutedSurveysId
        executedSurveySurveyId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncExecutedSurveys = /* GraphQL */ `
  query SyncExecutedSurveys(
    $filter: ModelExecutedSurveyFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncExecutedSurveys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        schemeVersion
        appliedIntervention {
          id
          schemeVersion
          userID
          interventionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityAppliedInterventionsId
        }
        survey {
          id
          schemeVersion
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          interventionSurveysId
        }
        userID
        date
        location {
          latitude
          longitude
        }
        answers {
          id
          questionID
          date
          type
          text
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        appliedInterventionExecutedSurveysId
        executedSurveySurveyId
      }
      nextToken
      startedAt
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      title
      text
      dueDate
      finishedDate
      location {
        latitude
        longitude
      }
      userID
      entityID
      appliedInterventionID
      executedSurveyID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        text
        dueDate
        finishedDate
        location {
          latitude
          longitude
        }
        userID
        entityID
        appliedInterventionID
        executedSurveyID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTasks = /* GraphQL */ `
  query SyncTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        text
        dueDate
        finishedDate
        location {
          latitude
          longitude
        }
        userID
        entityID
        appliedInterventionID
        executedSurveyID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
