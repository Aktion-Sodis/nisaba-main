/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateOrganization = /* GraphQL */ `subscription OnCreateOrganization(
  $filter: ModelSubscriptionOrganizationFilterInput
) {
  onCreateOrganization(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateOrganizationSubscriptionVariables,
  APITypes.OnCreateOrganizationSubscription
>;
export const onUpdateOrganization = /* GraphQL */ `subscription OnUpdateOrganization(
  $filter: ModelSubscriptionOrganizationFilterInput
) {
  onUpdateOrganization(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateOrganizationSubscriptionVariables,
  APITypes.OnUpdateOrganizationSubscription
>;
export const onDeleteOrganization = /* GraphQL */ `subscription OnDeleteOrganization(
  $filter: ModelSubscriptionOrganizationFilterInput
) {
  onDeleteOrganization(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteOrganizationSubscriptionVariables,
  APITypes.OnDeleteOrganizationSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $organization_id: String
) {
  onCreateUser(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $organization_id: String
) {
  onUpdateUser(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $organization_id: String
) {
  onDeleteUser(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateConfig = /* GraphQL */ `subscription OnCreateConfig(
  $filter: ModelSubscriptionConfigFilterInput
  $organization_id: String
) {
  onCreateConfig(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnCreateConfigSubscriptionVariables,
  APITypes.OnCreateConfigSubscription
>;
export const onUpdateConfig = /* GraphQL */ `subscription OnUpdateConfig(
  $filter: ModelSubscriptionConfigFilterInput
  $organization_id: String
) {
  onUpdateConfig(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateConfigSubscriptionVariables,
  APITypes.OnUpdateConfigSubscription
>;
export const onDeleteConfig = /* GraphQL */ `subscription OnDeleteConfig(
  $filter: ModelSubscriptionConfigFilterInput
  $organization_id: String
) {
  onDeleteConfig(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteConfigSubscriptionVariables,
  APITypes.OnDeleteConfigSubscription
>;
export const onCreateLevel = /* GraphQL */ `subscription OnCreateLevel(
  $filter: ModelSubscriptionLevelFilterInput
  $organization_id: String
) {
  onCreateLevel(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnCreateLevelSubscriptionVariables,
  APITypes.OnCreateLevelSubscription
>;
export const onUpdateLevel = /* GraphQL */ `subscription OnUpdateLevel(
  $filter: ModelSubscriptionLevelFilterInput
  $organization_id: String
) {
  onUpdateLevel(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateLevelSubscriptionVariables,
  APITypes.OnUpdateLevelSubscription
>;
export const onDeleteLevel = /* GraphQL */ `subscription OnDeleteLevel(
  $filter: ModelSubscriptionLevelFilterInput
  $organization_id: String
) {
  onDeleteLevel(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteLevelSubscriptionVariables,
  APITypes.OnDeleteLevelSubscription
>;
export const onCreateIntervention = /* GraphQL */ `subscription OnCreateIntervention(
  $filter: ModelSubscriptionInterventionFilterInput
  $organization_id: String
) {
  onCreateIntervention(filter: $filter, organization_id: $organization_id) {
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
        content {
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
      nextToken
      startedAt
      __typename
    }
    surveys {
      items {
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
        status
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
        interventionTag {
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
` as GeneratedSubscription<
  APITypes.OnCreateInterventionSubscriptionVariables,
  APITypes.OnCreateInterventionSubscription
>;
export const onUpdateIntervention = /* GraphQL */ `subscription OnUpdateIntervention(
  $filter: ModelSubscriptionInterventionFilterInput
  $organization_id: String
) {
  onUpdateIntervention(filter: $filter, organization_id: $organization_id) {
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
        content {
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
      nextToken
      startedAt
      __typename
    }
    surveys {
      items {
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
        status
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
        interventionTag {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInterventionSubscriptionVariables,
  APITypes.OnUpdateInterventionSubscription
>;
export const onDeleteIntervention = /* GraphQL */ `subscription OnDeleteIntervention(
  $filter: ModelSubscriptionInterventionFilterInput
  $organization_id: String
) {
  onDeleteIntervention(filter: $filter, organization_id: $organization_id) {
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
        content {
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
      nextToken
      startedAt
      __typename
    }
    surveys {
      items {
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
        status
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
        interventionTag {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInterventionSubscriptionVariables,
  APITypes.OnDeleteInterventionSubscription
>;
export const onCreateContent = /* GraphQL */ `subscription OnCreateContent(
  $filter: ModelSubscriptionContentFilterInput
  $organization_id: String
) {
  onCreateContent(filter: $filter, organization_id: $organization_id) {
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
        content {
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
      nextToken
      startedAt
      __typename
    }
    tags {
      items {
        id
        contentId
        contentTagId
        content {
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
` as GeneratedSubscription<
  APITypes.OnCreateContentSubscriptionVariables,
  APITypes.OnCreateContentSubscription
>;
export const onUpdateContent = /* GraphQL */ `subscription OnUpdateContent(
  $filter: ModelSubscriptionContentFilterInput
  $organization_id: String
) {
  onUpdateContent(filter: $filter, organization_id: $organization_id) {
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
        content {
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
      nextToken
      startedAt
      __typename
    }
    tags {
      items {
        id
        contentId
        contentTagId
        content {
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
` as GeneratedSubscription<
  APITypes.OnUpdateContentSubscriptionVariables,
  APITypes.OnUpdateContentSubscription
>;
export const onDeleteContent = /* GraphQL */ `subscription OnDeleteContent(
  $filter: ModelSubscriptionContentFilterInput
  $organization_id: String
) {
  onDeleteContent(filter: $filter, organization_id: $organization_id) {
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
        content {
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
      nextToken
      startedAt
      __typename
    }
    tags {
      items {
        id
        contentId
        contentTagId
        content {
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
` as GeneratedSubscription<
  APITypes.OnDeleteContentSubscriptionVariables,
  APITypes.OnDeleteContentSubscription
>;
export const onCreateSurvey = /* GraphQL */ `subscription OnCreateSurvey(
  $filter: ModelSubscriptionSurveyFilterInput
  $organization_id: String
) {
  onCreateSurvey(filter: $filter, organization_id: $organization_id) {
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
          status
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
        text {
          languageKeys
          languageTexts
          __typename
        }
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
        survey {
          surveyType
          status
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
      nextToken
      startedAt
      __typename
    }
    surveyType
    status
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
` as GeneratedSubscription<
  APITypes.OnCreateSurveySubscriptionVariables,
  APITypes.OnCreateSurveySubscription
>;
export const onUpdateSurvey = /* GraphQL */ `subscription OnUpdateSurvey(
  $filter: ModelSubscriptionSurveyFilterInput
  $organization_id: String
) {
  onUpdateSurvey(filter: $filter, organization_id: $organization_id) {
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
          status
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
        text {
          languageKeys
          languageTexts
          __typename
        }
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
        survey {
          surveyType
          status
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
      nextToken
      startedAt
      __typename
    }
    surveyType
    status
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
` as GeneratedSubscription<
  APITypes.OnUpdateSurveySubscriptionVariables,
  APITypes.OnUpdateSurveySubscription
>;
export const onDeleteSurvey = /* GraphQL */ `subscription OnDeleteSurvey(
  $filter: ModelSubscriptionSurveyFilterInput
  $organization_id: String
) {
  onDeleteSurvey(filter: $filter, organization_id: $organization_id) {
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
          status
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
        text {
          languageKeys
          languageTexts
          __typename
        }
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
        survey {
          surveyType
          status
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
      nextToken
      startedAt
      __typename
    }
    surveyType
    status
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
` as GeneratedSubscription<
  APITypes.OnDeleteSurveySubscriptionVariables,
  APITypes.OnDeleteSurveySubscription
>;
export const onCreateEntity = /* GraphQL */ `subscription OnCreateEntity(
  $filter: ModelSubscriptionEntityFilterInput
  $organization_id: String
) {
  onCreateEntity(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEntitySubscriptionVariables,
  APITypes.OnCreateEntitySubscription
>;
export const onUpdateEntity = /* GraphQL */ `subscription OnUpdateEntity(
  $filter: ModelSubscriptionEntityFilterInput
  $organization_id: String
) {
  onUpdateEntity(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEntitySubscriptionVariables,
  APITypes.OnUpdateEntitySubscription
>;
export const onDeleteEntity = /* GraphQL */ `subscription OnDeleteEntity(
  $filter: ModelSubscriptionEntityFilterInput
  $organization_id: String
) {
  onDeleteEntity(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEntitySubscriptionVariables,
  APITypes.OnDeleteEntitySubscription
>;
export const onCreateAppliedIntervention = /* GraphQL */ `subscription OnCreateAppliedIntervention(
  $filter: ModelSubscriptionAppliedInterventionFilterInput
  $organization_id: String
) {
  onCreateAppliedIntervention(
    filter: $filter
    organization_id: $organization_id
  ) {
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
          status
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
    location {
      latitude
      longitude
      __typename
    }
    isOkay
    executedSurveys {
      items {
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
          status
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
` as GeneratedSubscription<
  APITypes.OnCreateAppliedInterventionSubscriptionVariables,
  APITypes.OnCreateAppliedInterventionSubscription
>;
export const onUpdateAppliedIntervention = /* GraphQL */ `subscription OnUpdateAppliedIntervention(
  $filter: ModelSubscriptionAppliedInterventionFilterInput
  $organization_id: String
) {
  onUpdateAppliedIntervention(
    filter: $filter
    organization_id: $organization_id
  ) {
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
          status
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
    location {
      latitude
      longitude
      __typename
    }
    isOkay
    executedSurveys {
      items {
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
          status
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
` as GeneratedSubscription<
  APITypes.OnUpdateAppliedInterventionSubscriptionVariables,
  APITypes.OnUpdateAppliedInterventionSubscription
>;
export const onDeleteAppliedIntervention = /* GraphQL */ `subscription OnDeleteAppliedIntervention(
  $filter: ModelSubscriptionAppliedInterventionFilterInput
  $organization_id: String
) {
  onDeleteAppliedIntervention(
    filter: $filter
    organization_id: $organization_id
  ) {
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
          status
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
    location {
      latitude
      longitude
      __typename
    }
    isOkay
    executedSurveys {
      items {
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
          status
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
` as GeneratedSubscription<
  APITypes.OnDeleteAppliedInterventionSubscriptionVariables,
  APITypes.OnDeleteAppliedInterventionSubscription
>;
export const onCreateExecutedSurvey = /* GraphQL */ `subscription OnCreateExecutedSurvey(
  $filter: ModelSubscriptionExecutedSurveyFilterInput
  $organization_id: String
) {
  onCreateExecutedSurvey(filter: $filter, organization_id: $organization_id) {
    appliedIntervention {
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
      status
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
        text {
          languageKeys
          languageTexts
          __typename
        }
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
` as GeneratedSubscription<
  APITypes.OnCreateExecutedSurveySubscriptionVariables,
  APITypes.OnCreateExecutedSurveySubscription
>;
export const onUpdateExecutedSurvey = /* GraphQL */ `subscription OnUpdateExecutedSurvey(
  $filter: ModelSubscriptionExecutedSurveyFilterInput
  $organization_id: String
) {
  onUpdateExecutedSurvey(filter: $filter, organization_id: $organization_id) {
    appliedIntervention {
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
      status
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
        text {
          languageKeys
          languageTexts
          __typename
        }
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
` as GeneratedSubscription<
  APITypes.OnUpdateExecutedSurveySubscriptionVariables,
  APITypes.OnUpdateExecutedSurveySubscription
>;
export const onDeleteExecutedSurvey = /* GraphQL */ `subscription OnDeleteExecutedSurvey(
  $filter: ModelSubscriptionExecutedSurveyFilterInput
  $organization_id: String
) {
  onDeleteExecutedSurvey(filter: $filter, organization_id: $organization_id) {
    appliedIntervention {
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
      status
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
        text {
          languageKeys
          languageTexts
          __typename
        }
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
` as GeneratedSubscription<
  APITypes.OnDeleteExecutedSurveySubscriptionVariables,
  APITypes.OnDeleteExecutedSurveySubscription
>;
export const onCreateTask = /* GraphQL */ `subscription OnCreateTask(
  $filter: ModelSubscriptionTaskFilterInput
  $organization_id: String
) {
  onCreateTask(filter: $filter, organization_id: $organization_id) {
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
    appliedIntervention {
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
    executedSurvey {
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
        status
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
` as GeneratedSubscription<
  APITypes.OnCreateTaskSubscriptionVariables,
  APITypes.OnCreateTaskSubscription
>;
export const onUpdateTask = /* GraphQL */ `subscription OnUpdateTask(
  $filter: ModelSubscriptionTaskFilterInput
  $organization_id: String
) {
  onUpdateTask(filter: $filter, organization_id: $organization_id) {
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
    appliedIntervention {
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
    executedSurvey {
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
        status
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
` as GeneratedSubscription<
  APITypes.OnUpdateTaskSubscriptionVariables,
  APITypes.OnUpdateTaskSubscription
>;
export const onDeleteTask = /* GraphQL */ `subscription OnDeleteTask(
  $filter: ModelSubscriptionTaskFilterInput
  $organization_id: String
) {
  onDeleteTask(filter: $filter, organization_id: $organization_id) {
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
    appliedIntervention {
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
    executedSurvey {
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
        status
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
` as GeneratedSubscription<
  APITypes.OnDeleteTaskSubscriptionVariables,
  APITypes.OnDeleteTaskSubscription
>;
export const onCreateContentTag = /* GraphQL */ `subscription OnCreateContentTag(
  $filter: ModelSubscriptionContentTagFilterInput
  $organization_id: String
) {
  onCreateContentTag(filter: $filter, organization_id: $organization_id) {
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
        content {
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
` as GeneratedSubscription<
  APITypes.OnCreateContentTagSubscriptionVariables,
  APITypes.OnCreateContentTagSubscription
>;
export const onUpdateContentTag = /* GraphQL */ `subscription OnUpdateContentTag(
  $filter: ModelSubscriptionContentTagFilterInput
  $organization_id: String
) {
  onUpdateContentTag(filter: $filter, organization_id: $organization_id) {
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
        content {
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
` as GeneratedSubscription<
  APITypes.OnUpdateContentTagSubscriptionVariables,
  APITypes.OnUpdateContentTagSubscription
>;
export const onDeleteContentTag = /* GraphQL */ `subscription OnDeleteContentTag(
  $filter: ModelSubscriptionContentTagFilterInput
  $organization_id: String
) {
  onDeleteContentTag(filter: $filter, organization_id: $organization_id) {
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
        content {
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
` as GeneratedSubscription<
  APITypes.OnDeleteContentTagSubscriptionVariables,
  APITypes.OnDeleteContentTagSubscription
>;
export const onCreateInterventionTag = /* GraphQL */ `subscription OnCreateInterventionTag(
  $filter: ModelSubscriptionInterventionTagFilterInput
  $organization_id: String
) {
  onCreateInterventionTag(filter: $filter, organization_id: $organization_id) {
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
        interventionTag {
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
` as GeneratedSubscription<
  APITypes.OnCreateInterventionTagSubscriptionVariables,
  APITypes.OnCreateInterventionTagSubscription
>;
export const onUpdateInterventionTag = /* GraphQL */ `subscription OnUpdateInterventionTag(
  $filter: ModelSubscriptionInterventionTagFilterInput
  $organization_id: String
) {
  onUpdateInterventionTag(filter: $filter, organization_id: $organization_id) {
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
        interventionTag {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInterventionTagSubscriptionVariables,
  APITypes.OnUpdateInterventionTagSubscription
>;
export const onDeleteInterventionTag = /* GraphQL */ `subscription OnDeleteInterventionTag(
  $filter: ModelSubscriptionInterventionTagFilterInput
  $organization_id: String
) {
  onDeleteInterventionTag(filter: $filter, organization_id: $organization_id) {
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
        interventionTag {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInterventionTagSubscriptionVariables,
  APITypes.OnDeleteInterventionTagSubscription
>;
export const onCreateSurveyTag = /* GraphQL */ `subscription OnCreateSurveyTag(
  $filter: ModelSubscriptionSurveyTagFilterInput
  $organization_id: String
) {
  onCreateSurveyTag(filter: $filter, organization_id: $organization_id) {
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
        survey {
          surveyType
          status
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
` as GeneratedSubscription<
  APITypes.OnCreateSurveyTagSubscriptionVariables,
  APITypes.OnCreateSurveyTagSubscription
>;
export const onUpdateSurveyTag = /* GraphQL */ `subscription OnUpdateSurveyTag(
  $filter: ModelSubscriptionSurveyTagFilterInput
  $organization_id: String
) {
  onUpdateSurveyTag(filter: $filter, organization_id: $organization_id) {
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
        survey {
          surveyType
          status
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
` as GeneratedSubscription<
  APITypes.OnUpdateSurveyTagSubscriptionVariables,
  APITypes.OnUpdateSurveyTagSubscription
>;
export const onDeleteSurveyTag = /* GraphQL */ `subscription OnDeleteSurveyTag(
  $filter: ModelSubscriptionSurveyTagFilterInput
  $organization_id: String
) {
  onDeleteSurveyTag(filter: $filter, organization_id: $organization_id) {
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
        survey {
          surveyType
          status
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
` as GeneratedSubscription<
  APITypes.OnDeleteSurveyTagSubscriptionVariables,
  APITypes.OnDeleteSurveyTagSubscription
>;
export const onCreateSessionData = /* GraphQL */ `subscription OnCreateSessionData(
  $filter: ModelSubscriptionSessionDataFilterInput
  $organization_id: String
) {
  onCreateSessionData(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSessionDataSubscriptionVariables,
  APITypes.OnCreateSessionDataSubscription
>;
export const onUpdateSessionData = /* GraphQL */ `subscription OnUpdateSessionData(
  $filter: ModelSubscriptionSessionDataFilterInput
  $organization_id: String
) {
  onUpdateSessionData(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSessionDataSubscriptionVariables,
  APITypes.OnUpdateSessionDataSubscription
>;
export const onDeleteSessionData = /* GraphQL */ `subscription OnDeleteSessionData(
  $filter: ModelSubscriptionSessionDataFilterInput
  $organization_id: String
) {
  onDeleteSessionData(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSessionDataSubscriptionVariables,
  APITypes.OnDeleteSessionDataSubscription
>;
export const onCreateTestObject = /* GraphQL */ `subscription OnCreateTestObject(
  $filter: ModelSubscriptionTestObjectFilterInput
  $organization_id: String
) {
  onCreateTestObject(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTestObjectSubscriptionVariables,
  APITypes.OnCreateTestObjectSubscription
>;
export const onUpdateTestObject = /* GraphQL */ `subscription OnUpdateTestObject(
  $filter: ModelSubscriptionTestObjectFilterInput
  $organization_id: String
) {
  onUpdateTestObject(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTestObjectSubscriptionVariables,
  APITypes.OnUpdateTestObjectSubscription
>;
export const onDeleteTestObject = /* GraphQL */ `subscription OnDeleteTestObject(
  $filter: ModelSubscriptionTestObjectFilterInput
  $organization_id: String
) {
  onDeleteTestObject(filter: $filter, organization_id: $organization_id) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTestObjectSubscriptionVariables,
  APITypes.OnDeleteTestObjectSubscription
>;
export const onCreateLevelInterventionRelation = /* GraphQL */ `subscription OnCreateLevelInterventionRelation(
  $filter: ModelSubscriptionLevelInterventionRelationFilterInput
  $organization_id: String
) {
  onCreateLevelInterventionRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
          status
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLevelInterventionRelationSubscriptionVariables,
  APITypes.OnCreateLevelInterventionRelationSubscription
>;
export const onUpdateLevelInterventionRelation = /* GraphQL */ `subscription OnUpdateLevelInterventionRelation(
  $filter: ModelSubscriptionLevelInterventionRelationFilterInput
  $organization_id: String
) {
  onUpdateLevelInterventionRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
          status
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLevelInterventionRelationSubscriptionVariables,
  APITypes.OnUpdateLevelInterventionRelationSubscription
>;
export const onDeleteLevelInterventionRelation = /* GraphQL */ `subscription OnDeleteLevelInterventionRelation(
  $filter: ModelSubscriptionLevelInterventionRelationFilterInput
  $organization_id: String
) {
  onDeleteLevelInterventionRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
          status
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLevelInterventionRelationSubscriptionVariables,
  APITypes.OnDeleteLevelInterventionRelationSubscription
>;
export const onCreateInterventionContentRelation = /* GraphQL */ `subscription OnCreateInterventionContentRelation(
  $filter: ModelSubscriptionInterventionContentRelationFilterInput
  $organization_id: String
) {
  onCreateInterventionContentRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
          status
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateInterventionContentRelationSubscriptionVariables,
  APITypes.OnCreateInterventionContentRelationSubscription
>;
export const onUpdateInterventionContentRelation = /* GraphQL */ `subscription OnUpdateInterventionContentRelation(
  $filter: ModelSubscriptionInterventionContentRelationFilterInput
  $organization_id: String
) {
  onUpdateInterventionContentRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
          status
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateInterventionContentRelationSubscriptionVariables,
  APITypes.OnUpdateInterventionContentRelationSubscription
>;
export const onDeleteInterventionContentRelation = /* GraphQL */ `subscription OnDeleteInterventionContentRelation(
  $filter: ModelSubscriptionInterventionContentRelationFilterInput
  $organization_id: String
) {
  onDeleteInterventionContentRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
          status
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteInterventionContentRelationSubscriptionVariables,
  APITypes.OnDeleteInterventionContentRelationSubscription
>;
export const onCreateInterventionInterventionTagRelation = /* GraphQL */ `subscription OnCreateInterventionInterventionTagRelation(
  $filter: ModelSubscriptionInterventionInterventionTagRelationFilterInput
  $organization_id: String
) {
  onCreateInterventionInterventionTagRelation(
    filter: $filter
    organization_id: $organization_id
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
          status
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
    interventionTag {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateInterventionInterventionTagRelationSubscriptionVariables,
  APITypes.OnCreateInterventionInterventionTagRelationSubscription
>;
export const onUpdateInterventionInterventionTagRelation = /* GraphQL */ `subscription OnUpdateInterventionInterventionTagRelation(
  $filter: ModelSubscriptionInterventionInterventionTagRelationFilterInput
  $organization_id: String
) {
  onUpdateInterventionInterventionTagRelation(
    filter: $filter
    organization_id: $organization_id
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
          status
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
    interventionTag {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateInterventionInterventionTagRelationSubscriptionVariables,
  APITypes.OnUpdateInterventionInterventionTagRelationSubscription
>;
export const onDeleteInterventionInterventionTagRelation = /* GraphQL */ `subscription OnDeleteInterventionInterventionTagRelation(
  $filter: ModelSubscriptionInterventionInterventionTagRelationFilterInput
  $organization_id: String
) {
  onDeleteInterventionInterventionTagRelation(
    filter: $filter
    organization_id: $organization_id
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
          status
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
    interventionTag {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteInterventionInterventionTagRelationSubscriptionVariables,
  APITypes.OnDeleteInterventionInterventionTagRelationSubscription
>;
export const onCreateContentContentTagRelation = /* GraphQL */ `subscription OnCreateContentContentTagRelation(
  $filter: ModelSubscriptionContentContentTagRelationFilterInput
  $organization_id: String
) {
  onCreateContentContentTagRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
    contentTag {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateContentContentTagRelationSubscriptionVariables,
  APITypes.OnCreateContentContentTagRelationSubscription
>;
export const onUpdateContentContentTagRelation = /* GraphQL */ `subscription OnUpdateContentContentTagRelation(
  $filter: ModelSubscriptionContentContentTagRelationFilterInput
  $organization_id: String
) {
  onUpdateContentContentTagRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
    contentTag {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateContentContentTagRelationSubscriptionVariables,
  APITypes.OnUpdateContentContentTagRelationSubscription
>;
export const onDeleteContentContentTagRelation = /* GraphQL */ `subscription OnDeleteContentContentTagRelation(
  $filter: ModelSubscriptionContentContentTagRelationFilterInput
  $organization_id: String
) {
  onDeleteContentContentTagRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
    contentTag {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteContentContentTagRelationSubscriptionVariables,
  APITypes.OnDeleteContentContentTagRelationSubscription
>;
export const onCreateSurveySurveyTagRelation = /* GraphQL */ `subscription OnCreateSurveySurveyTagRelation(
  $filter: ModelSubscriptionSurveySurveyTagRelationFilterInput
  $organization_id: String
) {
  onCreateSurveySurveyTagRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
      status
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSurveySurveyTagRelationSubscriptionVariables,
  APITypes.OnCreateSurveySurveyTagRelationSubscription
>;
export const onUpdateSurveySurveyTagRelation = /* GraphQL */ `subscription OnUpdateSurveySurveyTagRelation(
  $filter: ModelSubscriptionSurveySurveyTagRelationFilterInput
  $organization_id: String
) {
  onUpdateSurveySurveyTagRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
      status
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSurveySurveyTagRelationSubscriptionVariables,
  APITypes.OnUpdateSurveySurveyTagRelationSubscription
>;
export const onDeleteSurveySurveyTagRelation = /* GraphQL */ `subscription OnDeleteSurveySurveyTagRelation(
  $filter: ModelSubscriptionSurveySurveyTagRelationFilterInput
  $organization_id: String
) {
  onDeleteSurveySurveyTagRelation(
    filter: $filter
    organization_id: $organization_id
  ) {
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
      status
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    organization_id
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSurveySurveyTagRelationSubscriptionVariables,
  APITypes.OnDeleteSurveySurveyTagRelationSubscription
>;
