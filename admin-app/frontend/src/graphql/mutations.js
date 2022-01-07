/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createConfig = /* GraphQL */ `
  mutation CreateConfig(
    $input: CreateConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    createConfig(input: $input, condition: $condition) {
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
export const updateConfig = /* GraphQL */ `
  mutation UpdateConfig(
    $input: UpdateConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    updateConfig(input: $input, condition: $condition) {
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
export const deleteConfig = /* GraphQL */ `
  mutation DeleteConfig(
    $input: DeleteConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    deleteConfig(input: $input, condition: $condition) {
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
export const createLevel = /* GraphQL */ `
  mutation CreateLevel(
    $input: CreateLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    createLevel(input: $input, condition: $condition) {
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
export const updateLevel = /* GraphQL */ `
  mutation UpdateLevel(
    $input: UpdateLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    updateLevel(input: $input, condition: $condition) {
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
export const deleteLevel = /* GraphQL */ `
  mutation DeleteLevel(
    $input: DeleteLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    deleteLevel(input: $input, condition: $condition) {
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
export const createIntervention = /* GraphQL */ `
  mutation CreateIntervention(
    $input: CreateInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    createIntervention(input: $input, condition: $condition) {
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
export const updateIntervention = /* GraphQL */ `
  mutation UpdateIntervention(
    $input: UpdateInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    updateIntervention(input: $input, condition: $condition) {
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
export const deleteIntervention = /* GraphQL */ `
  mutation DeleteIntervention(
    $input: DeleteInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    deleteIntervention(input: $input, condition: $condition) {
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
export const createContent = /* GraphQL */ `
  mutation CreateContent(
    $input: CreateContentInput!
    $condition: ModelContentConditionInput
  ) {
    createContent(input: $input, condition: $condition) {
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
export const updateContent = /* GraphQL */ `
  mutation UpdateContent(
    $input: UpdateContentInput!
    $condition: ModelContentConditionInput
  ) {
    updateContent(input: $input, condition: $condition) {
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
export const deleteContent = /* GraphQL */ `
  mutation DeleteContent(
    $input: DeleteContentInput!
    $condition: ModelContentConditionInput
  ) {
    deleteContent(input: $input, condition: $condition) {
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
export const createSurvey = /* GraphQL */ `
  mutation CreateSurvey(
    $input: CreateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    createSurvey(input: $input, condition: $condition) {
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
export const updateSurvey = /* GraphQL */ `
  mutation UpdateSurvey(
    $input: UpdateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    updateSurvey(input: $input, condition: $condition) {
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
export const deleteSurvey = /* GraphQL */ `
  mutation DeleteSurvey(
    $input: DeleteSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    deleteSurvey(input: $input, condition: $condition) {
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
export const createEntity = /* GraphQL */ `
  mutation CreateEntity(
    $input: CreateEntityInput!
    $condition: ModelEntityConditionInput
  ) {
    createEntity(input: $input, condition: $condition) {
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
export const updateEntity = /* GraphQL */ `
  mutation UpdateEntity(
    $input: UpdateEntityInput!
    $condition: ModelEntityConditionInput
  ) {
    updateEntity(input: $input, condition: $condition) {
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
export const deleteEntity = /* GraphQL */ `
  mutation DeleteEntity(
    $input: DeleteEntityInput!
    $condition: ModelEntityConditionInput
  ) {
    deleteEntity(input: $input, condition: $condition) {
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
export const createAppliedIntervention = /* GraphQL */ `
  mutation CreateAppliedIntervention(
    $input: CreateAppliedInterventionInput!
    $condition: ModelAppliedInterventionConditionInput
  ) {
    createAppliedIntervention(input: $input, condition: $condition) {
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
export const updateAppliedIntervention = /* GraphQL */ `
  mutation UpdateAppliedIntervention(
    $input: UpdateAppliedInterventionInput!
    $condition: ModelAppliedInterventionConditionInput
  ) {
    updateAppliedIntervention(input: $input, condition: $condition) {
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
export const deleteAppliedIntervention = /* GraphQL */ `
  mutation DeleteAppliedIntervention(
    $input: DeleteAppliedInterventionInput!
    $condition: ModelAppliedInterventionConditionInput
  ) {
    deleteAppliedIntervention(input: $input, condition: $condition) {
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
export const createExecutedSurvey = /* GraphQL */ `
  mutation CreateExecutedSurvey(
    $input: CreateExecutedSurveyInput!
    $condition: ModelExecutedSurveyConditionInput
  ) {
    createExecutedSurvey(input: $input, condition: $condition) {
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
export const updateExecutedSurvey = /* GraphQL */ `
  mutation UpdateExecutedSurvey(
    $input: UpdateExecutedSurveyInput!
    $condition: ModelExecutedSurveyConditionInput
  ) {
    updateExecutedSurvey(input: $input, condition: $condition) {
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
export const deleteExecutedSurvey = /* GraphQL */ `
  mutation DeleteExecutedSurvey(
    $input: DeleteExecutedSurveyInput!
    $condition: ModelExecutedSurveyConditionInput
  ) {
    deleteExecutedSurvey(input: $input, condition: $condition) {
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
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
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
