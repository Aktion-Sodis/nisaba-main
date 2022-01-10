/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      firstName
      lastName
      bio
      permissions {
        permissionType
        allowedEntities
      }
      schemeVersion
      id
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
        firstName
        lastName
        bio
        permissions {
          permissionType
          allowedEntities
        }
        schemeVersion
        id
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
        firstName
        lastName
        bio
        permissions {
          permissionType
          allowedEntities
        }
        schemeVersion
        id
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
      schemeVersion
      id
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
        schemeVersion
        id
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
        schemeVersion
        id
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
      name
      description
      parentLevel {
        name
        description
        parentLevel {
          name
          description
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
        }
        interventionsAreAllowed
        allowedInterventions {
          nextToken
          startedAt
        }
        customData {
          id
          name
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelParentLevelId
      }
      interventionsAreAllowed
      allowedInterventions {
        items {
          name
          description
          interventionType
          tags
          schemeVersion
          id
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
      customData {
        id
        name
        type
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      levelParentLevelId
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
        name
        description
        parentLevel {
          name
          description
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
        }
        interventionsAreAllowed
        allowedInterventions {
          nextToken
          startedAt
        }
        customData {
          id
          name
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelParentLevelId
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
        name
        description
        parentLevel {
          name
          description
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
        }
        interventionsAreAllowed
        allowedInterventions {
          nextToken
          startedAt
        }
        customData {
          id
          name
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelParentLevelId
      }
      nextToken
      startedAt
    }
  }
`;
export const getIntervention = /* GraphQL */ `
  query GetIntervention($id: ID!) {
    getIntervention(id: $id) {
      name
      description
      interventionType
      contents {
        items {
          name
          description
          tags
          schemeVersion
          id
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
          name
          description
          schemeVersion
          id
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
      tags
      schemeVersion
      id
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
        tags
        schemeVersion
        id
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
        tags
        schemeVersion
        id
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
      name
      description
      intervention {
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
        tags
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelAllowedInterventionsId
      }
      tags
      schemeVersion
      id
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
        name
        description
        intervention {
          name
          description
          interventionType
          tags
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        tags
        schemeVersion
        id
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
        name
        description
        intervention {
          name
          description
          interventionType
          tags
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        tags
        schemeVersion
        id
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
      name
      description
      intervention {
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
        tags
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelAllowedInterventionsId
      }
      questions {
        id
        text
        type
        questionOptions {
          id
          text
        }
      }
      schemeVersion
      id
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
        name
        description
        intervention {
          name
          description
          interventionType
          tags
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        questions {
          id
          text
          type
        }
        schemeVersion
        id
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
        name
        description
        intervention {
          name
          description
          interventionType
          tags
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        questions {
          id
          text
          type
        }
        schemeVersion
        id
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
      name
      description
      parentEntity {
        name
        description
        parentEntity {
          name
          description
          schemeVersion
          id
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
          name
          description
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
        }
        location {
          latitude
          longitude
        }
        customData {
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
        schemeVersion
        id
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
          name
          description
          schemeVersion
          id
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
        name
        description
        parentLevel {
          name
          description
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
        }
        interventionsAreAllowed
        allowedInterventions {
          nextToken
          startedAt
        }
        customData {
          id
          name
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelParentLevelId
      }
      location {
        latitude
        longitude
      }
      customData {
        customDataID
        type
        name
        intValue
        stringValue
      }
      appliedInterventions {
        items {
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
        }
        nextToken
        startedAt
      }
      schemeVersion
      id
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
        name
        description
        parentEntity {
          name
          description
          schemeVersion
          id
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
          name
          description
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
        }
        location {
          latitude
          longitude
        }
        customData {
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
        schemeVersion
        id
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
        name
        description
        parentEntity {
          name
          description
          schemeVersion
          id
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
          name
          description
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
        }
        location {
          latitude
          longitude
        }
        customData {
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
        schemeVersion
        id
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
      whoDidIt {
        firstName
        lastName
        bio
        permissions {
          permissionType
          allowedEntities
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      intervention {
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
        tags
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        levelAllowedInterventionsId
      }
      location {
        latitude
        longitude
      }
      executedSurveys {
        items {
          date
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          appliedInterventionExecutedSurveysId
          executedSurveySurveyId
          executedSurveyWhoExecutedItId
        }
        nextToken
        startedAt
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      entityAppliedInterventionsId
      appliedInterventionWhoDidItId
      appliedInterventionInterventionId
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
        whoDidIt {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        intervention {
          name
          description
          interventionType
          tags
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        location {
          latitude
          longitude
        }
        executedSurveys {
          nextToken
          startedAt
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityAppliedInterventionsId
        appliedInterventionWhoDidItId
        appliedInterventionInterventionId
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
        whoDidIt {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        intervention {
          name
          description
          interventionType
          tags
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        location {
          latitude
          longitude
        }
        executedSurveys {
          nextToken
          startedAt
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityAppliedInterventionsId
        appliedInterventionWhoDidItId
        appliedInterventionInterventionId
      }
      nextToken
      startedAt
    }
  }
`;
export const getExecutedSurvey = /* GraphQL */ `
  query GetExecutedSurvey($id: ID!) {
    getExecutedSurvey(id: $id) {
      appliedIntervention {
        whoDidIt {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        intervention {
          name
          description
          interventionType
          tags
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        location {
          latitude
          longitude
        }
        executedSurveys {
          nextToken
          startedAt
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityAppliedInterventionsId
        appliedInterventionWhoDidItId
        appliedInterventionInterventionId
      }
      survey {
        name
        description
        intervention {
          name
          description
          interventionType
          tags
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        questions {
          id
          text
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
      }
      whoExecutedIt {
        firstName
        lastName
        bio
        permissions {
          permissionType
          allowedEntities
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
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
          x
          y
          description
        }
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      appliedInterventionExecutedSurveysId
      executedSurveySurveyId
      executedSurveyWhoExecutedItId
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
        appliedIntervention {
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
        }
        survey {
          name
          description
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          interventionSurveysId
        }
        whoExecutedIt {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        appliedInterventionExecutedSurveysId
        executedSurveySurveyId
        executedSurveyWhoExecutedItId
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
        appliedIntervention {
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
        }
        survey {
          name
          description
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          interventionSurveysId
        }
        whoExecutedIt {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        appliedInterventionExecutedSurveysId
        executedSurveySurveyId
        executedSurveyWhoExecutedItId
      }
      nextToken
      startedAt
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      title
      text
      dueDate
      finishedDate
      location {
        latitude
        longitude
      }
      user {
        firstName
        lastName
        bio
        permissions {
          permissionType
          allowedEntities
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      entity {
        name
        description
        parentEntity {
          name
          description
          schemeVersion
          id
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
          name
          description
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelParentLevelId
        }
        location {
          latitude
          longitude
        }
        customData {
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
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityChildEntitiesId
        entityLevelId
      }
      appliedIntervention {
        whoDidIt {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        intervention {
          name
          description
          interventionType
          tags
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          levelAllowedInterventionsId
        }
        location {
          latitude
          longitude
        }
        executedSurveys {
          nextToken
          startedAt
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        entityAppliedInterventionsId
        appliedInterventionWhoDidItId
        appliedInterventionInterventionId
      }
      executedSurvey {
        appliedIntervention {
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
        }
        survey {
          name
          description
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          interventionSurveysId
        }
        whoExecutedIt {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        appliedInterventionExecutedSurveysId
        executedSurveySurveyId
        executedSurveyWhoExecutedItId
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      taskUserId
      taskEntityId
      taskAppliedInterventionId
      taskExecutedSurveyId
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
        title
        text
        dueDate
        finishedDate
        location {
          latitude
          longitude
        }
        user {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        entity {
          name
          description
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityChildEntitiesId
          entityLevelId
        }
        appliedIntervention {
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
        }
        executedSurvey {
          date
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          appliedInterventionExecutedSurveysId
          executedSurveySurveyId
          executedSurveyWhoExecutedItId
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        taskUserId
        taskEntityId
        taskAppliedInterventionId
        taskExecutedSurveyId
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
        title
        text
        dueDate
        finishedDate
        location {
          latitude
          longitude
        }
        user {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        entity {
          name
          description
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityChildEntitiesId
          entityLevelId
        }
        appliedIntervention {
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
        }
        executedSurvey {
          date
          schemeVersion
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          appliedInterventionExecutedSurveysId
          executedSurveySurveyId
          executedSurveyWhoExecutedItId
        }
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        taskUserId
        taskEntityId
        taskAppliedInterventionId
        taskExecutedSurveyId
      }
      nextToken
      startedAt
    }
  }
`;
