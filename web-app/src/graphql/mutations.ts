/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createOrganization = /* GraphQL */ `mutation CreateOrganization(
  $input: CreateOrganizationInput!
  $condition: ModelOrganizationConditionInput
) {
  createOrganization(input: $input, condition: $condition) {
    nameCamelCase
    nameKebabCase
    nameVerbose
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateOrganizationMutationVariables,
  APITypes.CreateOrganizationMutation
>;
export const updateOrganization = /* GraphQL */ `mutation UpdateOrganization(
  $input: UpdateOrganizationInput!
  $condition: ModelOrganizationConditionInput
) {
  updateOrganization(input: $input, condition: $condition) {
    nameCamelCase
    nameKebabCase
    nameVerbose
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateOrganizationMutationVariables,
  APITypes.UpdateOrganizationMutation
>;
export const deleteOrganization = /* GraphQL */ `mutation DeleteOrganization(
  $input: DeleteOrganizationInput!
  $condition: ModelOrganizationConditionInput
) {
  deleteOrganization(input: $input, condition: $condition) {
    nameCamelCase
    nameKebabCase
    nameVerbose
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteOrganizationMutationVariables,
  APITypes.DeleteOrganizationMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
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
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
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
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
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
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createConfig = /* GraphQL */ `mutation CreateConfig(
  $input: CreateConfigInput!
  $condition: ModelConfigConditionInput
) {
  createConfig(input: $input, condition: $condition) {
    name
    colorTheme {
      highlight
      secondaryHighlight
      backgroundOneLight
      backgroundTwoLight
      backgroundOneDark
      backgroundTwoDark
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateConfigMutationVariables,
  APITypes.CreateConfigMutation
>;
export const updateConfig = /* GraphQL */ `mutation UpdateConfig(
  $input: UpdateConfigInput!
  $condition: ModelConfigConditionInput
) {
  updateConfig(input: $input, condition: $condition) {
    name
    colorTheme {
      highlight
      secondaryHighlight
      backgroundOneLight
      backgroundTwoLight
      backgroundOneDark
      backgroundTwoDark
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateConfigMutationVariables,
  APITypes.UpdateConfigMutation
>;
export const deleteConfig = /* GraphQL */ `mutation DeleteConfig(
  $input: DeleteConfigInput!
  $condition: ModelConfigConditionInput
) {
  deleteConfig(input: $input, condition: $condition) {
    name
    colorTheme {
      highlight
      secondaryHighlight
      backgroundOneLight
      backgroundTwoLight
      backgroundOneDark
      backgroundTwoDark
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteConfigMutationVariables,
  APITypes.DeleteConfigMutation
>;
export const createLevel = /* GraphQL */ `mutation CreateLevel(
  $input: CreateLevelInput!
  $condition: ModelLevelConditionInput
) {
  createLevel(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    parentLevelID
    interventionsAreAllowed
    allowedInterventions {
      items {
        id
        levelId
        interventionId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    customData {
      id
      name {
        languageKeys
        languageTexts
        __typename
      }
      type
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLevelMutationVariables,
  APITypes.CreateLevelMutation
>;
export const updateLevel = /* GraphQL */ `mutation UpdateLevel(
  $input: UpdateLevelInput!
  $condition: ModelLevelConditionInput
) {
  updateLevel(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    parentLevelID
    interventionsAreAllowed
    allowedInterventions {
      items {
        id
        levelId
        interventionId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    customData {
      id
      name {
        languageKeys
        languageTexts
        __typename
      }
      type
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLevelMutationVariables,
  APITypes.UpdateLevelMutation
>;
export const deleteLevel = /* GraphQL */ `mutation DeleteLevel(
  $input: DeleteLevelInput!
  $condition: ModelLevelConditionInput
) {
  deleteLevel(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    parentLevelID
    interventionsAreAllowed
    allowedInterventions {
      items {
        id
        levelId
        interventionId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    customData {
      id
      name {
        languageKeys
        languageTexts
        __typename
      }
      type
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLevelMutationVariables,
  APITypes.DeleteLevelMutation
>;
export const createIntervention = /* GraphQL */ `mutation CreateIntervention(
  $input: CreateInterventionInput!
  $condition: ModelInterventionConditionInput
) {
  createIntervention(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    interventionType
    contents {
      items {
        id
        interventionId
        contentId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    surveys {
      items {
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    tags {
      items {
        id
        interventionId
        interventionTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    schemeVersion
    levels {
      items {
        id
        levelId
        interventionId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInterventionMutationVariables,
  APITypes.CreateInterventionMutation
>;
export const updateIntervention = /* GraphQL */ `mutation UpdateIntervention(
  $input: UpdateInterventionInput!
  $condition: ModelInterventionConditionInput
) {
  updateIntervention(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    interventionType
    contents {
      items {
        id
        interventionId
        contentId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    surveys {
      items {
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    tags {
      items {
        id
        interventionId
        interventionTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    schemeVersion
    levels {
      items {
        id
        levelId
        interventionId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInterventionMutationVariables,
  APITypes.UpdateInterventionMutation
>;
export const deleteIntervention = /* GraphQL */ `mutation DeleteIntervention(
  $input: DeleteInterventionInput!
  $condition: ModelInterventionConditionInput
) {
  deleteIntervention(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    interventionType
    contents {
      items {
        id
        interventionId
        contentId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    surveys {
      items {
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    tags {
      items {
        id
        interventionId
        interventionTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    schemeVersion
    levels {
      items {
        id
        levelId
        interventionId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInterventionMutationVariables,
  APITypes.DeleteInterventionMutation
>;
export const createContent = /* GraphQL */ `mutation CreateContent(
  $input: CreateContentInput!
  $condition: ModelContentConditionInput
) {
  createContent(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    interventions {
      items {
        id
        interventionId
        contentId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    tags {
      items {
        id
        contentId
        contentTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateContentMutationVariables,
  APITypes.CreateContentMutation
>;
export const updateContent = /* GraphQL */ `mutation UpdateContent(
  $input: UpdateContentInput!
  $condition: ModelContentConditionInput
) {
  updateContent(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    interventions {
      items {
        id
        interventionId
        contentId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    tags {
      items {
        id
        contentId
        contentTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateContentMutationVariables,
  APITypes.UpdateContentMutation
>;
export const deleteContent = /* GraphQL */ `mutation DeleteContent(
  $input: DeleteContentInput!
  $condition: ModelContentConditionInput
) {
  deleteContent(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    interventions {
      items {
        id
        interventionId
        contentId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    tags {
      items {
        id
        contentId
        contentTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteContentMutationVariables,
  APITypes.DeleteContentMutation
>;
export const createSurvey = /* GraphQL */ `mutation CreateSurvey(
  $input: CreateSurveyInput!
  $condition: ModelSurveyConditionInput
) {
  createSurvey(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    questions {
      id
      text {
        languageKeys
        languageTexts
        __typename
      }
      type
      questionOptions {
        id
        followUpQuestionIDs
        __typename
      }
      isFollowUpQuestion
      __typename
    }
    tags {
      items {
        id
        surveyId
        surveyTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    surveyType
    schemeVersion
    archived
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    interventionSurveysId
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSurveyMutationVariables,
  APITypes.CreateSurveyMutation
>;
export const updateSurvey = /* GraphQL */ `mutation UpdateSurvey(
  $input: UpdateSurveyInput!
  $condition: ModelSurveyConditionInput
) {
  updateSurvey(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    questions {
      id
      text {
        languageKeys
        languageTexts
        __typename
      }
      type
      questionOptions {
        id
        followUpQuestionIDs
        __typename
      }
      isFollowUpQuestion
      __typename
    }
    tags {
      items {
        id
        surveyId
        surveyTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    surveyType
    schemeVersion
    archived
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    interventionSurveysId
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSurveyMutationVariables,
  APITypes.UpdateSurveyMutation
>;
export const deleteSurvey = /* GraphQL */ `mutation DeleteSurvey(
  $input: DeleteSurveyInput!
  $condition: ModelSurveyConditionInput
) {
  deleteSurvey(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    questions {
      id
      text {
        languageKeys
        languageTexts
        __typename
      }
      type
      questionOptions {
        id
        followUpQuestionIDs
        __typename
      }
      isFollowUpQuestion
      __typename
    }
    tags {
      items {
        id
        surveyId
        surveyTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    surveyType
    schemeVersion
    archived
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    interventionSurveysId
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSurveyMutationVariables,
  APITypes.DeleteSurveyMutation
>;
export const createEntity = /* GraphQL */ `mutation CreateEntity(
  $input: CreateEntityInput!
  $condition: ModelEntityConditionInput
) {
  createEntity(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    parentEntityID
    level {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      parentLevelID
      interventionsAreAllowed
      allowedInterventions {
        nextToken
        startedAt
        __typename
      }
      customData {
        id
        type
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    location {
      latitude
      longitude
      __typename
    }
    customData {
      customDataID
      type
      name {
        languageKeys
        languageTexts
        __typename
      }
      intValue
      stringValue
      __typename
    }
    appliedInterventions {
      items {
        isOkay
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
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    entityLevelId
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEntityMutationVariables,
  APITypes.CreateEntityMutation
>;
export const updateEntity = /* GraphQL */ `mutation UpdateEntity(
  $input: UpdateEntityInput!
  $condition: ModelEntityConditionInput
) {
  updateEntity(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    parentEntityID
    level {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      parentLevelID
      interventionsAreAllowed
      allowedInterventions {
        nextToken
        startedAt
        __typename
      }
      customData {
        id
        type
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    location {
      latitude
      longitude
      __typename
    }
    customData {
      customDataID
      type
      name {
        languageKeys
        languageTexts
        __typename
      }
      intValue
      stringValue
      __typename
    }
    appliedInterventions {
      items {
        isOkay
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
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    entityLevelId
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateEntityMutationVariables,
  APITypes.UpdateEntityMutation
>;
export const deleteEntity = /* GraphQL */ `mutation DeleteEntity(
  $input: DeleteEntityInput!
  $condition: ModelEntityConditionInput
) {
  deleteEntity(input: $input, condition: $condition) {
    name {
      languageKeys
      languageTexts
      __typename
    }
    description {
      languageKeys
      languageTexts
      __typename
    }
    parentEntityID
    level {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      parentLevelID
      interventionsAreAllowed
      allowedInterventions {
        nextToken
        startedAt
        __typename
      }
      customData {
        id
        type
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    location {
      latitude
      longitude
      __typename
    }
    customData {
      customDataID
      type
      name {
        languageKeys
        languageTexts
        __typename
      }
      intValue
      stringValue
      __typename
    }
    appliedInterventions {
      items {
        isOkay
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
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    schemeVersion
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    entityLevelId
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEntityMutationVariables,
  APITypes.DeleteEntityMutation
>;
export const createAppliedIntervention = /* GraphQL */ `mutation CreateAppliedIntervention(
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
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    location {
      latitude
      longitude
      __typename
    }
    isOkay
    executedSurveys {
      items {
        surveyID
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
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
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
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAppliedInterventionMutationVariables,
  APITypes.CreateAppliedInterventionMutation
>;
export const updateAppliedIntervention = /* GraphQL */ `mutation UpdateAppliedIntervention(
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
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    location {
      latitude
      longitude
      __typename
    }
    isOkay
    executedSurveys {
      items {
        surveyID
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
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
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
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAppliedInterventionMutationVariables,
  APITypes.UpdateAppliedInterventionMutation
>;
export const deleteAppliedIntervention = /* GraphQL */ `mutation DeleteAppliedIntervention(
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
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    location {
      latitude
      longitude
      __typename
    }
    isOkay
    executedSurveys {
      items {
        surveyID
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
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
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
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAppliedInterventionMutationVariables,
  APITypes.DeleteAppliedInterventionMutation
>;
export const createExecutedSurvey = /* GraphQL */ `mutation CreateExecutedSurvey(
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
        organization_id
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      location {
        latitude
        longitude
        __typename
      }
      isOkay
      executedSurveys {
        nextToken
        startedAt
        __typename
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
      organization_id
      __typename
    }
    survey {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      questions {
        id
        type
        isFollowUpQuestion
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      surveyType
      schemeVersion
      archived
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      interventionSurveysId
      organization_id
      __typename
    }
    surveyID
    whoExecutedIt {
      firstName
      lastName
      bio
      permissions {
        permissionType
        allowedEntities
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    date
    location {
      latitude
      longitude
      __typename
    }
    answers {
      id
      questionID
      date
      type
      text
      intValue
      doubleValue
      rating
      questionOptions {
        id
        followUpQuestionIDs
        __typename
      }
      markings {
        x
        y
        rx
        ry
        text
        __typename
      }
      __typename
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
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateExecutedSurveyMutationVariables,
  APITypes.CreateExecutedSurveyMutation
>;
export const updateExecutedSurvey = /* GraphQL */ `mutation UpdateExecutedSurvey(
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
        organization_id
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      location {
        latitude
        longitude
        __typename
      }
      isOkay
      executedSurveys {
        nextToken
        startedAt
        __typename
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
      organization_id
      __typename
    }
    survey {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      questions {
        id
        type
        isFollowUpQuestion
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      surveyType
      schemeVersion
      archived
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      interventionSurveysId
      organization_id
      __typename
    }
    surveyID
    whoExecutedIt {
      firstName
      lastName
      bio
      permissions {
        permissionType
        allowedEntities
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    date
    location {
      latitude
      longitude
      __typename
    }
    answers {
      id
      questionID
      date
      type
      text
      intValue
      doubleValue
      rating
      questionOptions {
        id
        followUpQuestionIDs
        __typename
      }
      markings {
        x
        y
        rx
        ry
        text
        __typename
      }
      __typename
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
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateExecutedSurveyMutationVariables,
  APITypes.UpdateExecutedSurveyMutation
>;
export const deleteExecutedSurvey = /* GraphQL */ `mutation DeleteExecutedSurvey(
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
        organization_id
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      location {
        latitude
        longitude
        __typename
      }
      isOkay
      executedSurveys {
        nextToken
        startedAt
        __typename
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
      organization_id
      __typename
    }
    survey {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      questions {
        id
        type
        isFollowUpQuestion
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      surveyType
      schemeVersion
      archived
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      interventionSurveysId
      organization_id
      __typename
    }
    surveyID
    whoExecutedIt {
      firstName
      lastName
      bio
      permissions {
        permissionType
        allowedEntities
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    date
    location {
      latitude
      longitude
      __typename
    }
    answers {
      id
      questionID
      date
      type
      text
      intValue
      doubleValue
      rating
      questionOptions {
        id
        followUpQuestionIDs
        __typename
      }
      markings {
        x
        y
        rx
        ry
        text
        __typename
      }
      __typename
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
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteExecutedSurveyMutationVariables,
  APITypes.DeleteExecutedSurveyMutation
>;
export const createTask = /* GraphQL */ `mutation CreateTask(
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
      __typename
    }
    user {
      firstName
      lastName
      bio
      permissions {
        permissionType
        allowedEntities
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    userID
    entity {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      parentEntityID
      level {
        parentLevelID
        interventionsAreAllowed
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      location {
        latitude
        longitude
        __typename
      }
      customData {
        customDataID
        type
        intValue
        stringValue
        __typename
      }
      appliedInterventions {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      entityLevelId
      organization_id
      __typename
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
        organization_id
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      location {
        latitude
        longitude
        __typename
      }
      isOkay
      executedSurveys {
        nextToken
        startedAt
        __typename
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
      organization_id
      __typename
    }
    executedSurvey {
      appliedIntervention {
        isOkay
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
        organization_id
        __typename
      }
      survey {
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
        organization_id
        __typename
      }
      surveyID
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
        organization_id
        __typename
      }
      date
      location {
        latitude
        longitude
        __typename
      }
      answers {
        id
        questionID
        date
        type
        text
        intValue
        doubleValue
        rating
        __typename
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
      organization_id
      __typename
    }
    schemeVersion
    picIDs
    audioIDs
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
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTaskMutationVariables,
  APITypes.CreateTaskMutation
>;
export const updateTask = /* GraphQL */ `mutation UpdateTask(
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
      __typename
    }
    user {
      firstName
      lastName
      bio
      permissions {
        permissionType
        allowedEntities
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    userID
    entity {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      parentEntityID
      level {
        parentLevelID
        interventionsAreAllowed
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      location {
        latitude
        longitude
        __typename
      }
      customData {
        customDataID
        type
        intValue
        stringValue
        __typename
      }
      appliedInterventions {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      entityLevelId
      organization_id
      __typename
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
        organization_id
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      location {
        latitude
        longitude
        __typename
      }
      isOkay
      executedSurveys {
        nextToken
        startedAt
        __typename
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
      organization_id
      __typename
    }
    executedSurvey {
      appliedIntervention {
        isOkay
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
        organization_id
        __typename
      }
      survey {
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
        organization_id
        __typename
      }
      surveyID
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
        organization_id
        __typename
      }
      date
      location {
        latitude
        longitude
        __typename
      }
      answers {
        id
        questionID
        date
        type
        text
        intValue
        doubleValue
        rating
        __typename
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
      organization_id
      __typename
    }
    schemeVersion
    picIDs
    audioIDs
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
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTaskMutationVariables,
  APITypes.UpdateTaskMutation
>;
export const deleteTask = /* GraphQL */ `mutation DeleteTask(
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
      __typename
    }
    user {
      firstName
      lastName
      bio
      permissions {
        permissionType
        allowedEntities
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    userID
    entity {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      parentEntityID
      level {
        parentLevelID
        interventionsAreAllowed
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      location {
        latitude
        longitude
        __typename
      }
      customData {
        customDataID
        type
        intValue
        stringValue
        __typename
      }
      appliedInterventions {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      entityLevelId
      organization_id
      __typename
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
        organization_id
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      location {
        latitude
        longitude
        __typename
      }
      isOkay
      executedSurveys {
        nextToken
        startedAt
        __typename
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
      organization_id
      __typename
    }
    executedSurvey {
      appliedIntervention {
        isOkay
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
        organization_id
        __typename
      }
      survey {
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        interventionSurveysId
        organization_id
        __typename
      }
      surveyID
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
        organization_id
        __typename
      }
      date
      location {
        latitude
        longitude
        __typename
      }
      answers {
        id
        questionID
        date
        type
        text
        intValue
        doubleValue
        rating
        __typename
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
      organization_id
      __typename
    }
    schemeVersion
    picIDs
    audioIDs
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
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTaskMutationVariables,
  APITypes.DeleteTaskMutation
>;
export const createContentTag = /* GraphQL */ `mutation CreateContentTag(
  $input: CreateContentTagInput!
  $condition: ModelContentTagConditionInput
) {
  createContentTag(input: $input, condition: $condition) {
    text {
      languageKeys
      languageTexts
      __typename
    }
    schemeVersion
    contents {
      items {
        id
        contentId
        contentTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateContentTagMutationVariables,
  APITypes.CreateContentTagMutation
>;
export const updateContentTag = /* GraphQL */ `mutation UpdateContentTag(
  $input: UpdateContentTagInput!
  $condition: ModelContentTagConditionInput
) {
  updateContentTag(input: $input, condition: $condition) {
    text {
      languageKeys
      languageTexts
      __typename
    }
    schemeVersion
    contents {
      items {
        id
        contentId
        contentTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateContentTagMutationVariables,
  APITypes.UpdateContentTagMutation
>;
export const deleteContentTag = /* GraphQL */ `mutation DeleteContentTag(
  $input: DeleteContentTagInput!
  $condition: ModelContentTagConditionInput
) {
  deleteContentTag(input: $input, condition: $condition) {
    text {
      languageKeys
      languageTexts
      __typename
    }
    schemeVersion
    contents {
      items {
        id
        contentId
        contentTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteContentTagMutationVariables,
  APITypes.DeleteContentTagMutation
>;
export const createInterventionTag = /* GraphQL */ `mutation CreateInterventionTag(
  $input: CreateInterventionTagInput!
  $condition: ModelInterventionTagConditionInput
) {
  createInterventionTag(input: $input, condition: $condition) {
    text {
      languageKeys
      languageTexts
      __typename
    }
    schemeVersion
    interventions {
      items {
        id
        interventionId
        interventionTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInterventionTagMutationVariables,
  APITypes.CreateInterventionTagMutation
>;
export const updateInterventionTag = /* GraphQL */ `mutation UpdateInterventionTag(
  $input: UpdateInterventionTagInput!
  $condition: ModelInterventionTagConditionInput
) {
  updateInterventionTag(input: $input, condition: $condition) {
    text {
      languageKeys
      languageTexts
      __typename
    }
    schemeVersion
    interventions {
      items {
        id
        interventionId
        interventionTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInterventionTagMutationVariables,
  APITypes.UpdateInterventionTagMutation
>;
export const deleteInterventionTag = /* GraphQL */ `mutation DeleteInterventionTag(
  $input: DeleteInterventionTagInput!
  $condition: ModelInterventionTagConditionInput
) {
  deleteInterventionTag(input: $input, condition: $condition) {
    text {
      languageKeys
      languageTexts
      __typename
    }
    schemeVersion
    interventions {
      items {
        id
        interventionId
        interventionTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInterventionTagMutationVariables,
  APITypes.DeleteInterventionTagMutation
>;
export const createSurveyTag = /* GraphQL */ `mutation CreateSurveyTag(
  $input: CreateSurveyTagInput!
  $condition: ModelSurveyTagConditionInput
) {
  createSurveyTag(input: $input, condition: $condition) {
    text {
      languageKeys
      languageTexts
      __typename
    }
    schemeVersion
    surveys {
      items {
        id
        surveyId
        surveyTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSurveyTagMutationVariables,
  APITypes.CreateSurveyTagMutation
>;
export const updateSurveyTag = /* GraphQL */ `mutation UpdateSurveyTag(
  $input: UpdateSurveyTagInput!
  $condition: ModelSurveyTagConditionInput
) {
  updateSurveyTag(input: $input, condition: $condition) {
    text {
      languageKeys
      languageTexts
      __typename
    }
    schemeVersion
    surveys {
      items {
        id
        surveyId
        surveyTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSurveyTagMutationVariables,
  APITypes.UpdateSurveyTagMutation
>;
export const deleteSurveyTag = /* GraphQL */ `mutation DeleteSurveyTag(
  $input: DeleteSurveyTagInput!
  $condition: ModelSurveyTagConditionInput
) {
  deleteSurveyTag(input: $input, condition: $condition) {
    text {
      languageKeys
      languageTexts
      __typename
    }
    schemeVersion
    surveys {
      items {
        id
        surveyId
        surveyTagId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSurveyTagMutationVariables,
  APITypes.DeleteSurveyTagMutation
>;
export const createSessionData = /* GraphQL */ `mutation CreateSessionData(
  $input: CreateSessionDataInput!
  $condition: ModelSessionDataConditionInput
) {
  createSessionData(input: $input, condition: $condition) {
    date
    userID
    app
    version
    buildNumber
    remoteConfig
    platform
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSessionDataMutationVariables,
  APITypes.CreateSessionDataMutation
>;
export const updateSessionData = /* GraphQL */ `mutation UpdateSessionData(
  $input: UpdateSessionDataInput!
  $condition: ModelSessionDataConditionInput
) {
  updateSessionData(input: $input, condition: $condition) {
    date
    userID
    app
    version
    buildNumber
    remoteConfig
    platform
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSessionDataMutationVariables,
  APITypes.UpdateSessionDataMutation
>;
export const deleteSessionData = /* GraphQL */ `mutation DeleteSessionData(
  $input: DeleteSessionDataInput!
  $condition: ModelSessionDataConditionInput
) {
  deleteSessionData(input: $input, condition: $condition) {
    date
    userID
    app
    version
    buildNumber
    remoteConfig
    platform
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSessionDataMutationVariables,
  APITypes.DeleteSessionDataMutation
>;
export const createTestObject = /* GraphQL */ `mutation CreateTestObject(
  $input: CreateTestObjectInput!
  $condition: ModelTestObjectConditionInput
) {
  createTestObject(input: $input, condition: $condition) {
    name
    age
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTestObjectMutationVariables,
  APITypes.CreateTestObjectMutation
>;
export const updateTestObject = /* GraphQL */ `mutation UpdateTestObject(
  $input: UpdateTestObjectInput!
  $condition: ModelTestObjectConditionInput
) {
  updateTestObject(input: $input, condition: $condition) {
    name
    age
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTestObjectMutationVariables,
  APITypes.UpdateTestObjectMutation
>;
export const deleteTestObject = /* GraphQL */ `mutation DeleteTestObject(
  $input: DeleteTestObjectInput!
  $condition: ModelTestObjectConditionInput
) {
  deleteTestObject(input: $input, condition: $condition) {
    name
    age
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTestObjectMutationVariables,
  APITypes.DeleteTestObjectMutation
>;
export const createLevelInterventionRelation = /* GraphQL */ `mutation CreateLevelInterventionRelation(
  $input: CreateLevelInterventionRelationInput!
  $condition: ModelLevelInterventionRelationConditionInput
) {
  createLevelInterventionRelation(input: $input, condition: $condition) {
    id
    levelId
    interventionId
    level {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      parentLevelID
      interventionsAreAllowed
      allowedInterventions {
        nextToken
        startedAt
        __typename
      }
      customData {
        id
        type
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLevelInterventionRelationMutationVariables,
  APITypes.CreateLevelInterventionRelationMutation
>;
export const updateLevelInterventionRelation = /* GraphQL */ `mutation UpdateLevelInterventionRelation(
  $input: UpdateLevelInterventionRelationInput!
  $condition: ModelLevelInterventionRelationConditionInput
) {
  updateLevelInterventionRelation(input: $input, condition: $condition) {
    id
    levelId
    interventionId
    level {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      parentLevelID
      interventionsAreAllowed
      allowedInterventions {
        nextToken
        startedAt
        __typename
      }
      customData {
        id
        type
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLevelInterventionRelationMutationVariables,
  APITypes.UpdateLevelInterventionRelationMutation
>;
export const deleteLevelInterventionRelation = /* GraphQL */ `mutation DeleteLevelInterventionRelation(
  $input: DeleteLevelInterventionRelationInput!
  $condition: ModelLevelInterventionRelationConditionInput
) {
  deleteLevelInterventionRelation(input: $input, condition: $condition) {
    id
    levelId
    interventionId
    level {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      parentLevelID
      interventionsAreAllowed
      allowedInterventions {
        nextToken
        startedAt
        __typename
      }
      customData {
        id
        type
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLevelInterventionRelationMutationVariables,
  APITypes.DeleteLevelInterventionRelationMutation
>;
export const createInterventionContentRelation = /* GraphQL */ `mutation CreateInterventionContentRelation(
  $input: CreateInterventionContentRelationInput!
  $condition: ModelInterventionContentRelationConditionInput
) {
  createInterventionContentRelation(input: $input, condition: $condition) {
    id
    interventionId
    contentId
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    content {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventions {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInterventionContentRelationMutationVariables,
  APITypes.CreateInterventionContentRelationMutation
>;
export const updateInterventionContentRelation = /* GraphQL */ `mutation UpdateInterventionContentRelation(
  $input: UpdateInterventionContentRelationInput!
  $condition: ModelInterventionContentRelationConditionInput
) {
  updateInterventionContentRelation(input: $input, condition: $condition) {
    id
    interventionId
    contentId
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    content {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventions {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInterventionContentRelationMutationVariables,
  APITypes.UpdateInterventionContentRelationMutation
>;
export const deleteInterventionContentRelation = /* GraphQL */ `mutation DeleteInterventionContentRelation(
  $input: DeleteInterventionContentRelationInput!
  $condition: ModelInterventionContentRelationConditionInput
) {
  deleteInterventionContentRelation(input: $input, condition: $condition) {
    id
    interventionId
    contentId
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    content {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventions {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInterventionContentRelationMutationVariables,
  APITypes.DeleteInterventionContentRelationMutation
>;
export const createInterventionInterventionTagRelation = /* GraphQL */ `mutation CreateInterventionInterventionTagRelation(
  $input: CreateInterventionInterventionTagRelationInput!
  $condition: ModelInterventionInterventionTagRelationConditionInput
) {
  createInterventionInterventionTagRelation(
    input: $input
    condition: $condition
  ) {
    id
    interventionId
    interventionTagId
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    interventionTag {
      text {
        languageKeys
        languageTexts
        __typename
      }
      schemeVersion
      interventions {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInterventionInterventionTagRelationMutationVariables,
  APITypes.CreateInterventionInterventionTagRelationMutation
>;
export const updateInterventionInterventionTagRelation = /* GraphQL */ `mutation UpdateInterventionInterventionTagRelation(
  $input: UpdateInterventionInterventionTagRelationInput!
  $condition: ModelInterventionInterventionTagRelationConditionInput
) {
  updateInterventionInterventionTagRelation(
    input: $input
    condition: $condition
  ) {
    id
    interventionId
    interventionTagId
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    interventionTag {
      text {
        languageKeys
        languageTexts
        __typename
      }
      schemeVersion
      interventions {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInterventionInterventionTagRelationMutationVariables,
  APITypes.UpdateInterventionInterventionTagRelationMutation
>;
export const deleteInterventionInterventionTagRelation = /* GraphQL */ `mutation DeleteInterventionInterventionTagRelation(
  $input: DeleteInterventionInterventionTagRelationInput!
  $condition: ModelInterventionInterventionTagRelationConditionInput
) {
  deleteInterventionInterventionTagRelation(
    input: $input
    condition: $condition
  ) {
    id
    interventionId
    interventionTagId
    intervention {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventionType
      contents {
        nextToken
        startedAt
        __typename
      }
      surveys {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      levels {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    interventionTag {
      text {
        languageKeys
        languageTexts
        __typename
      }
      schemeVersion
      interventions {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInterventionInterventionTagRelationMutationVariables,
  APITypes.DeleteInterventionInterventionTagRelationMutation
>;
export const createContentContentTagRelation = /* GraphQL */ `mutation CreateContentContentTagRelation(
  $input: CreateContentContentTagRelationInput!
  $condition: ModelContentContentTagRelationConditionInput
) {
  createContentContentTagRelation(input: $input, condition: $condition) {
    id
    contentId
    contentTagId
    content {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventions {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    contentTag {
      text {
        languageKeys
        languageTexts
        __typename
      }
      schemeVersion
      contents {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateContentContentTagRelationMutationVariables,
  APITypes.CreateContentContentTagRelationMutation
>;
export const updateContentContentTagRelation = /* GraphQL */ `mutation UpdateContentContentTagRelation(
  $input: UpdateContentContentTagRelationInput!
  $condition: ModelContentContentTagRelationConditionInput
) {
  updateContentContentTagRelation(input: $input, condition: $condition) {
    id
    contentId
    contentTagId
    content {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventions {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    contentTag {
      text {
        languageKeys
        languageTexts
        __typename
      }
      schemeVersion
      contents {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateContentContentTagRelationMutationVariables,
  APITypes.UpdateContentContentTagRelationMutation
>;
export const deleteContentContentTagRelation = /* GraphQL */ `mutation DeleteContentContentTagRelation(
  $input: DeleteContentContentTagRelationInput!
  $condition: ModelContentContentTagRelationConditionInput
) {
  deleteContentContentTagRelation(input: $input, condition: $condition) {
    id
    contentId
    contentTagId
    content {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      interventions {
        nextToken
        startedAt
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      schemeVersion
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    contentTag {
      text {
        languageKeys
        languageTexts
        __typename
      }
      schemeVersion
      contents {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteContentContentTagRelationMutationVariables,
  APITypes.DeleteContentContentTagRelationMutation
>;
export const createSurveySurveyTagRelation = /* GraphQL */ `mutation CreateSurveySurveyTagRelation(
  $input: CreateSurveySurveyTagRelationInput!
  $condition: ModelSurveySurveyTagRelationConditionInput
) {
  createSurveySurveyTagRelation(input: $input, condition: $condition) {
    id
    surveyId
    surveyTagId
    survey {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      questions {
        id
        type
        isFollowUpQuestion
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      surveyType
      schemeVersion
      archived
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      interventionSurveysId
      organization_id
      __typename
    }
    surveyTag {
      text {
        languageKeys
        languageTexts
        __typename
      }
      schemeVersion
      surveys {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSurveySurveyTagRelationMutationVariables,
  APITypes.CreateSurveySurveyTagRelationMutation
>;
export const updateSurveySurveyTagRelation = /* GraphQL */ `mutation UpdateSurveySurveyTagRelation(
  $input: UpdateSurveySurveyTagRelationInput!
  $condition: ModelSurveySurveyTagRelationConditionInput
) {
  updateSurveySurveyTagRelation(input: $input, condition: $condition) {
    id
    surveyId
    surveyTagId
    survey {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      questions {
        id
        type
        isFollowUpQuestion
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      surveyType
      schemeVersion
      archived
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      interventionSurveysId
      organization_id
      __typename
    }
    surveyTag {
      text {
        languageKeys
        languageTexts
        __typename
      }
      schemeVersion
      surveys {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSurveySurveyTagRelationMutationVariables,
  APITypes.UpdateSurveySurveyTagRelationMutation
>;
export const deleteSurveySurveyTagRelation = /* GraphQL */ `mutation DeleteSurveySurveyTagRelation(
  $input: DeleteSurveySurveyTagRelationInput!
  $condition: ModelSurveySurveyTagRelationConditionInput
) {
  deleteSurveySurveyTagRelation(input: $input, condition: $condition) {
    id
    surveyId
    surveyTagId
    survey {
      name {
        languageKeys
        languageTexts
        __typename
      }
      description {
        languageKeys
        languageTexts
        __typename
      }
      intervention {
        interventionType
        schemeVersion
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organization_id
        __typename
      }
      questions {
        id
        type
        isFollowUpQuestion
        __typename
      }
      tags {
        nextToken
        startedAt
        __typename
      }
      surveyType
      schemeVersion
      archived
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      interventionSurveysId
      organization_id
      __typename
    }
    surveyTag {
      text {
        languageKeys
        languageTexts
        __typename
      }
      schemeVersion
      surveys {
        nextToken
        startedAt
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      organization_id
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSurveySurveyTagRelationMutationVariables,
  APITypes.DeleteSurveySurveyTagRelationMutation
>;
