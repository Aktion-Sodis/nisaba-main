/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateConfig = /* GraphQL */ `
  subscription OnCreateConfig {
    onCreateConfig {
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
export const onUpdateConfig = /* GraphQL */ `
  subscription OnUpdateConfig {
    onUpdateConfig {
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
export const onDeleteConfig = /* GraphQL */ `
  subscription OnDeleteConfig {
    onDeleteConfig {
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
export const onCreateLevel = /* GraphQL */ `
  subscription OnCreateLevel {
    onCreateLevel {
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
export const onUpdateLevel = /* GraphQL */ `
  subscription OnUpdateLevel {
    onUpdateLevel {
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
export const onDeleteLevel = /* GraphQL */ `
  subscription OnDeleteLevel {
    onDeleteLevel {
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
export const onCreateIntervention = /* GraphQL */ `
  subscription OnCreateIntervention {
    onCreateIntervention {
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
export const onUpdateIntervention = /* GraphQL */ `
  subscription OnUpdateIntervention {
    onUpdateIntervention {
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
export const onDeleteIntervention = /* GraphQL */ `
  subscription OnDeleteIntervention {
    onDeleteIntervention {
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
export const onCreateContent = /* GraphQL */ `
  subscription OnCreateContent {
    onCreateContent {
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
export const onUpdateContent = /* GraphQL */ `
  subscription OnUpdateContent {
    onUpdateContent {
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
export const onDeleteContent = /* GraphQL */ `
  subscription OnDeleteContent {
    onDeleteContent {
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
export const onCreateSurvey = /* GraphQL */ `
  subscription OnCreateSurvey {
    onCreateSurvey {
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
export const onUpdateSurvey = /* GraphQL */ `
  subscription OnUpdateSurvey {
    onUpdateSurvey {
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
export const onDeleteSurvey = /* GraphQL */ `
  subscription OnDeleteSurvey {
    onDeleteSurvey {
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
export const onCreateEntity = /* GraphQL */ `
  subscription OnCreateEntity {
    onCreateEntity {
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
export const onUpdateEntity = /* GraphQL */ `
  subscription OnUpdateEntity {
    onUpdateEntity {
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
export const onDeleteEntity = /* GraphQL */ `
  subscription OnDeleteEntity {
    onDeleteEntity {
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
export const onCreateAppliedIntervention = /* GraphQL */ `
  subscription OnCreateAppliedIntervention {
    onCreateAppliedIntervention {
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
export const onUpdateAppliedIntervention = /* GraphQL */ `
  subscription OnUpdateAppliedIntervention {
    onUpdateAppliedIntervention {
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
export const onDeleteAppliedIntervention = /* GraphQL */ `
  subscription OnDeleteAppliedIntervention {
    onDeleteAppliedIntervention {
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
export const onCreateExecutedSurvey = /* GraphQL */ `
  subscription OnCreateExecutedSurvey {
    onCreateExecutedSurvey {
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
export const onUpdateExecutedSurvey = /* GraphQL */ `
  subscription OnUpdateExecutedSurvey {
    onUpdateExecutedSurvey {
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
export const onDeleteExecutedSurvey = /* GraphQL */ `
  subscription OnDeleteExecutedSurvey {
    onDeleteExecutedSurvey {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
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
