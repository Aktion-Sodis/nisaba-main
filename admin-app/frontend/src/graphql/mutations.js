/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createConfig = /* GraphQL */ `
  mutation CreateConfig(
    $input: CreateConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    createConfig(input: $input, condition: $condition) {
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
export const updateConfig = /* GraphQL */ `
  mutation UpdateConfig(
    $input: UpdateConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    updateConfig(input: $input, condition: $condition) {
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
export const deleteConfig = /* GraphQL */ `
  mutation DeleteConfig(
    $input: DeleteConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    deleteConfig(input: $input, condition: $condition) {
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
export const createLevel = /* GraphQL */ `
  mutation CreateLevel(
    $input: CreateLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    createLevel(input: $input, condition: $condition) {
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
export const updateLevel = /* GraphQL */ `
  mutation UpdateLevel(
    $input: UpdateLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    updateLevel(input: $input, condition: $condition) {
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
export const deleteLevel = /* GraphQL */ `
  mutation DeleteLevel(
    $input: DeleteLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    deleteLevel(input: $input, condition: $condition) {
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
export const createIntervention = /* GraphQL */ `
  mutation CreateIntervention(
    $input: CreateInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    createIntervention(input: $input, condition: $condition) {
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
export const updateIntervention = /* GraphQL */ `
  mutation UpdateIntervention(
    $input: UpdateInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    updateIntervention(input: $input, condition: $condition) {
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
export const deleteIntervention = /* GraphQL */ `
  mutation DeleteIntervention(
    $input: DeleteInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    deleteIntervention(input: $input, condition: $condition) {
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
export const createContent = /* GraphQL */ `
  mutation CreateContent(
    $input: CreateContentInput!
    $condition: ModelContentConditionInput
  ) {
    createContent(input: $input, condition: $condition) {
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
export const updateContent = /* GraphQL */ `
  mutation UpdateContent(
    $input: UpdateContentInput!
    $condition: ModelContentConditionInput
  ) {
    updateContent(input: $input, condition: $condition) {
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
export const deleteContent = /* GraphQL */ `
  mutation DeleteContent(
    $input: DeleteContentInput!
    $condition: ModelContentConditionInput
  ) {
    deleteContent(input: $input, condition: $condition) {
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
export const createSurvey = /* GraphQL */ `
  mutation CreateSurvey(
    $input: CreateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    createSurvey(input: $input, condition: $condition) {
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
export const updateSurvey = /* GraphQL */ `
  mutation UpdateSurvey(
    $input: UpdateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    updateSurvey(input: $input, condition: $condition) {
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
export const deleteSurvey = /* GraphQL */ `
  mutation DeleteSurvey(
    $input: DeleteSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    deleteSurvey(input: $input, condition: $condition) {
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
export const createEntity = /* GraphQL */ `
  mutation CreateEntity(
    $input: CreateEntityInput!
    $condition: ModelEntityConditionInput
  ) {
    createEntity(input: $input, condition: $condition) {
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
export const updateEntity = /* GraphQL */ `
  mutation UpdateEntity(
    $input: UpdateEntityInput!
    $condition: ModelEntityConditionInput
  ) {
    updateEntity(input: $input, condition: $condition) {
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
export const deleteEntity = /* GraphQL */ `
  mutation DeleteEntity(
    $input: DeleteEntityInput!
    $condition: ModelEntityConditionInput
  ) {
    deleteEntity(input: $input, condition: $condition) {
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
export const createAppliedIntervention = /* GraphQL */ `
  mutation CreateAppliedIntervention(
    $input: CreateAppliedInterventionInput!
    $condition: ModelAppliedInterventionConditionInput
  ) {
    createAppliedIntervention(input: $input, condition: $condition) {
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
export const updateAppliedIntervention = /* GraphQL */ `
  mutation UpdateAppliedIntervention(
    $input: UpdateAppliedInterventionInput!
    $condition: ModelAppliedInterventionConditionInput
  ) {
    updateAppliedIntervention(input: $input, condition: $condition) {
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
export const deleteAppliedIntervention = /* GraphQL */ `
  mutation DeleteAppliedIntervention(
    $input: DeleteAppliedInterventionInput!
    $condition: ModelAppliedInterventionConditionInput
  ) {
    deleteAppliedIntervention(input: $input, condition: $condition) {
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
export const createExecutedSurvey = /* GraphQL */ `
  mutation CreateExecutedSurvey(
    $input: CreateExecutedSurveyInput!
    $condition: ModelExecutedSurveyConditionInput
  ) {
    createExecutedSurvey(input: $input, condition: $condition) {
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
export const updateExecutedSurvey = /* GraphQL */ `
  mutation UpdateExecutedSurvey(
    $input: UpdateExecutedSurveyInput!
    $condition: ModelExecutedSurveyConditionInput
  ) {
    updateExecutedSurvey(input: $input, condition: $condition) {
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
export const deleteExecutedSurvey = /* GraphQL */ `
  mutation DeleteExecutedSurvey(
    $input: DeleteExecutedSurveyInput!
    $condition: ModelExecutedSurveyConditionInput
  ) {
    deleteExecutedSurvey(input: $input, condition: $condition) {
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
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
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
