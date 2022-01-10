/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateConfig = /* GraphQL */ `
  subscription OnCreateConfig {
    onCreateConfig {
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
export const onUpdateConfig = /* GraphQL */ `
  subscription OnUpdateConfig {
    onUpdateConfig {
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
export const onDeleteConfig = /* GraphQL */ `
  subscription OnDeleteConfig {
    onDeleteConfig {
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
export const onCreateLevel = /* GraphQL */ `
  subscription OnCreateLevel {
    onCreateLevel {
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
export const onUpdateLevel = /* GraphQL */ `
  subscription OnUpdateLevel {
    onUpdateLevel {
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
export const onDeleteLevel = /* GraphQL */ `
  subscription OnDeleteLevel {
    onDeleteLevel {
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
export const onCreateIntervention = /* GraphQL */ `
  subscription OnCreateIntervention {
    onCreateIntervention {
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
export const onUpdateIntervention = /* GraphQL */ `
  subscription OnUpdateIntervention {
    onUpdateIntervention {
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
export const onDeleteIntervention = /* GraphQL */ `
  subscription OnDeleteIntervention {
    onDeleteIntervention {
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
export const onCreateContent = /* GraphQL */ `
  subscription OnCreateContent {
    onCreateContent {
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
export const onUpdateContent = /* GraphQL */ `
  subscription OnUpdateContent {
    onUpdateContent {
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
export const onDeleteContent = /* GraphQL */ `
  subscription OnDeleteContent {
    onDeleteContent {
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
export const onCreateSurvey = /* GraphQL */ `
  subscription OnCreateSurvey {
    onCreateSurvey {
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
export const onUpdateSurvey = /* GraphQL */ `
  subscription OnUpdateSurvey {
    onUpdateSurvey {
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
export const onDeleteSurvey = /* GraphQL */ `
  subscription OnDeleteSurvey {
    onDeleteSurvey {
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
export const onCreateEntity = /* GraphQL */ `
  subscription OnCreateEntity {
    onCreateEntity {
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
export const onUpdateEntity = /* GraphQL */ `
  subscription OnUpdateEntity {
    onUpdateEntity {
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
export const onDeleteEntity = /* GraphQL */ `
  subscription OnDeleteEntity {
    onDeleteEntity {
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
export const onCreateAppliedIntervention = /* GraphQL */ `
  subscription OnCreateAppliedIntervention {
    onCreateAppliedIntervention {
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
export const onUpdateAppliedIntervention = /* GraphQL */ `
  subscription OnUpdateAppliedIntervention {
    onUpdateAppliedIntervention {
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
export const onDeleteAppliedIntervention = /* GraphQL */ `
  subscription OnDeleteAppliedIntervention {
    onDeleteAppliedIntervention {
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
export const onCreateExecutedSurvey = /* GraphQL */ `
  subscription OnCreateExecutedSurvey {
    onCreateExecutedSurvey {
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
export const onUpdateExecutedSurvey = /* GraphQL */ `
  subscription OnUpdateExecutedSurvey {
    onUpdateExecutedSurvey {
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
export const onDeleteExecutedSurvey = /* GraphQL */ `
  subscription OnDeleteExecutedSurvey {
    onDeleteExecutedSurvey {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
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
