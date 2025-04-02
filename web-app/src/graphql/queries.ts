/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getOrganization = /* GraphQL */ `query GetOrganization($id: ID!) {
  getOrganization(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetOrganizationQueryVariables,
  APITypes.GetOrganizationQuery
>;
export const listOrganizations = /* GraphQL */ `query ListOrganizations(
  $filter: ModelOrganizationFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListOrganizationsQueryVariables,
  APITypes.ListOrganizationsQuery
>;
export const syncOrganizations = /* GraphQL */ `query SyncOrganizations(
  $filter: ModelOrganizationFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncOrganizations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncOrganizationsQueryVariables,
  APITypes.SyncOrganizationsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const syncUsers = /* GraphQL */ `query SyncUsers(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncUsersQueryVariables, APITypes.SyncUsersQuery>;
export const getConfig = /* GraphQL */ `query GetConfig($id: ID!) {
  getConfig(id: $id) {
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
` as GeneratedQuery<APITypes.GetConfigQueryVariables, APITypes.GetConfigQuery>;
export const listConfigs = /* GraphQL */ `query ListConfigs(
  $filter: ModelConfigFilterInput
  $limit: Int
  $nextToken: String
) {
  listConfigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConfigsQueryVariables,
  APITypes.ListConfigsQuery
>;
export const syncConfigs = /* GraphQL */ `query SyncConfigs(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncConfigsQueryVariables,
  APITypes.SyncConfigsQuery
>;
export const getLevel = /* GraphQL */ `query GetLevel($id: ID!) {
  getLevel(id: $id) {
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
` as GeneratedQuery<APITypes.GetLevelQueryVariables, APITypes.GetLevelQuery>;
export const listLevels = /* GraphQL */ `query ListLevels(
  $filter: ModelLevelFilterInput
  $limit: Int
  $nextToken: String
) {
  listLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLevelsQueryVariables,
  APITypes.ListLevelsQuery
>;
export const syncLevels = /* GraphQL */ `query SyncLevels(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncLevelsQueryVariables,
  APITypes.SyncLevelsQuery
>;
export const getIntervention = /* GraphQL */ `query GetIntervention($id: ID!) {
  getIntervention(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetInterventionQueryVariables,
  APITypes.GetInterventionQuery
>;
export const listInterventions = /* GraphQL */ `query ListInterventions(
  $filter: ModelInterventionFilterInput
  $limit: Int
  $nextToken: String
) {
  listInterventions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInterventionsQueryVariables,
  APITypes.ListInterventionsQuery
>;
export const syncInterventions = /* GraphQL */ `query SyncInterventions(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncInterventionsQueryVariables,
  APITypes.SyncInterventionsQuery
>;
export const getContent = /* GraphQL */ `query GetContent($id: ID!) {
  getContent(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetContentQueryVariables,
  APITypes.GetContentQuery
>;
export const listContents = /* GraphQL */ `query ListContents(
  $filter: ModelContentFilterInput
  $limit: Int
  $nextToken: String
) {
  listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListContentsQueryVariables,
  APITypes.ListContentsQuery
>;
export const syncContents = /* GraphQL */ `query SyncContents(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncContentsQueryVariables,
  APITypes.SyncContentsQuery
>;
export const getSurvey = /* GraphQL */ `query GetSurvey($id: ID!) {
  getSurvey(id: $id) {
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
` as GeneratedQuery<APITypes.GetSurveyQueryVariables, APITypes.GetSurveyQuery>;
export const listSurveys = /* GraphQL */ `query ListSurveys(
  $filter: ModelSurveyFilterInput
  $limit: Int
  $nextToken: String
) {
  listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
}
` as GeneratedQuery<
  APITypes.ListSurveysQueryVariables,
  APITypes.ListSurveysQuery
>;
export const syncSurveys = /* GraphQL */ `query SyncSurveys(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncSurveysQueryVariables,
  APITypes.SyncSurveysQuery
>;
export const getEntity = /* GraphQL */ `query GetEntity($id: ID!) {
  getEntity(id: $id) {
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
` as GeneratedQuery<APITypes.GetEntityQueryVariables, APITypes.GetEntityQuery>;
export const listEntities = /* GraphQL */ `query ListEntities(
  $filter: ModelEntityFilterInput
  $limit: Int
  $nextToken: String
) {
  listEntities(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEntitiesQueryVariables,
  APITypes.ListEntitiesQuery
>;
export const syncEntities = /* GraphQL */ `query SyncEntities(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncEntitiesQueryVariables,
  APITypes.SyncEntitiesQuery
>;
export const getAppliedIntervention = /* GraphQL */ `query GetAppliedIntervention($id: ID!) {
  getAppliedIntervention(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetAppliedInterventionQueryVariables,
  APITypes.GetAppliedInterventionQuery
>;
export const listAppliedInterventions = /* GraphQL */ `query ListAppliedInterventions(
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
}
` as GeneratedQuery<
  APITypes.ListAppliedInterventionsQueryVariables,
  APITypes.ListAppliedInterventionsQuery
>;
export const syncAppliedInterventions = /* GraphQL */ `query SyncAppliedInterventions(
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
}
` as GeneratedQuery<
  APITypes.SyncAppliedInterventionsQueryVariables,
  APITypes.SyncAppliedInterventionsQuery
>;
export const getExecutedSurvey = /* GraphQL */ `query GetExecutedSurvey($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetExecutedSurveyQueryVariables,
  APITypes.GetExecutedSurveyQuery
>;
export const listExecutedSurveys = /* GraphQL */ `query ListExecutedSurveys(
  $filter: ModelExecutedSurveyFilterInput
  $limit: Int
  $nextToken: String
) {
  listExecutedSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
}
` as GeneratedQuery<
  APITypes.ListExecutedSurveysQueryVariables,
  APITypes.ListExecutedSurveysQuery
>;
export const syncExecutedSurveys = /* GraphQL */ `query SyncExecutedSurveys(
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncExecutedSurveysQueryVariables,
  APITypes.SyncExecutedSurveysQuery
>;
export const getTask = /* GraphQL */ `query GetTask($id: ID!) {
  getTask(id: $id) {
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
` as GeneratedQuery<APITypes.GetTaskQueryVariables, APITypes.GetTaskQuery>;
export const listTasks = /* GraphQL */ `query ListTasks(
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
        __typename
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
        organization_id
        __typename
      }
      userID
      entity {
        parentEntityID
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
      executedSurvey {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTasksQueryVariables, APITypes.ListTasksQuery>;
export const syncTasks = /* GraphQL */ `query SyncTasks(
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
        __typename
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
        organization_id
        __typename
      }
      userID
      entity {
        parentEntityID
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
      executedSurvey {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncTasksQueryVariables, APITypes.SyncTasksQuery>;
export const getContentTag = /* GraphQL */ `query GetContentTag($id: ID!) {
  getContentTag(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetContentTagQueryVariables,
  APITypes.GetContentTagQuery
>;
export const listContentTags = /* GraphQL */ `query ListContentTags(
  $filter: ModelContentTagFilterInput
  $limit: Int
  $nextToken: String
) {
  listContentTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListContentTagsQueryVariables,
  APITypes.ListContentTagsQuery
>;
export const syncContentTags = /* GraphQL */ `query SyncContentTags(
  $filter: ModelContentTagFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncContentTags(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncContentTagsQueryVariables,
  APITypes.SyncContentTagsQuery
>;
export const getInterventionTag = /* GraphQL */ `query GetInterventionTag($id: ID!) {
  getInterventionTag(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetInterventionTagQueryVariables,
  APITypes.GetInterventionTagQuery
>;
export const listInterventionTags = /* GraphQL */ `query ListInterventionTags(
  $filter: ModelInterventionTagFilterInput
  $limit: Int
  $nextToken: String
) {
  listInterventionTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInterventionTagsQueryVariables,
  APITypes.ListInterventionTagsQuery
>;
export const syncInterventionTags = /* GraphQL */ `query SyncInterventionTags(
  $filter: ModelInterventionTagFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncInterventionTags(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncInterventionTagsQueryVariables,
  APITypes.SyncInterventionTagsQuery
>;
export const getSurveyTag = /* GraphQL */ `query GetSurveyTag($id: ID!) {
  getSurveyTag(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetSurveyTagQueryVariables,
  APITypes.GetSurveyTagQuery
>;
export const listSurveyTags = /* GraphQL */ `query ListSurveyTags(
  $filter: ModelSurveyTagFilterInput
  $limit: Int
  $nextToken: String
) {
  listSurveyTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSurveyTagsQueryVariables,
  APITypes.ListSurveyTagsQuery
>;
export const syncSurveyTags = /* GraphQL */ `query SyncSurveyTags(
  $filter: ModelSurveyTagFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncSurveyTags(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncSurveyTagsQueryVariables,
  APITypes.SyncSurveyTagsQuery
>;
export const getSessionData = /* GraphQL */ `query GetSessionData($id: ID!) {
  getSessionData(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetSessionDataQueryVariables,
  APITypes.GetSessionDataQuery
>;
export const listSessionData = /* GraphQL */ `query ListSessionData(
  $filter: ModelSessionDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessionData(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSessionDataQueryVariables,
  APITypes.ListSessionDataQuery
>;
export const syncSessionData = /* GraphQL */ `query SyncSessionData(
  $filter: ModelSessionDataFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncSessionData(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncSessionDataQueryVariables,
  APITypes.SyncSessionDataQuery
>;
export const getTestObject = /* GraphQL */ `query GetTestObject($id: ID!) {
  getTestObject(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetTestObjectQueryVariables,
  APITypes.GetTestObjectQuery
>;
export const listTestObjects = /* GraphQL */ `query ListTestObjects(
  $filter: ModelTestObjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listTestObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTestObjectsQueryVariables,
  APITypes.ListTestObjectsQuery
>;
export const syncTestObjects = /* GraphQL */ `query SyncTestObjects(
  $filter: ModelTestObjectFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTestObjects(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTestObjectsQueryVariables,
  APITypes.SyncTestObjectsQuery
>;
export const getLevelInterventionRelation = /* GraphQL */ `query GetLevelInterventionRelation($id: ID!) {
  getLevelInterventionRelation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetLevelInterventionRelationQueryVariables,
  APITypes.GetLevelInterventionRelationQuery
>;
export const listLevelInterventionRelations = /* GraphQL */ `query ListLevelInterventionRelations(
  $filter: ModelLevelInterventionRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  listLevelInterventionRelations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ListLevelInterventionRelationsQueryVariables,
  APITypes.ListLevelInterventionRelationsQuery
>;
export const syncLevelInterventionRelations = /* GraphQL */ `query SyncLevelInterventionRelations(
  $filter: ModelLevelInterventionRelationFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncLevelInterventionRelations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
}
` as GeneratedQuery<
  APITypes.SyncLevelInterventionRelationsQueryVariables,
  APITypes.SyncLevelInterventionRelationsQuery
>;
export const getInterventionContentRelation = /* GraphQL */ `query GetInterventionContentRelation($id: ID!) {
  getInterventionContentRelation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetInterventionContentRelationQueryVariables,
  APITypes.GetInterventionContentRelationQuery
>;
export const listInterventionContentRelations = /* GraphQL */ `query ListInterventionContentRelations(
  $filter: ModelInterventionContentRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  listInterventionContentRelations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ListInterventionContentRelationsQueryVariables,
  APITypes.ListInterventionContentRelationsQuery
>;
export const syncInterventionContentRelations = /* GraphQL */ `query SyncInterventionContentRelations(
  $filter: ModelInterventionContentRelationFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncInterventionContentRelations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
}
` as GeneratedQuery<
  APITypes.SyncInterventionContentRelationsQueryVariables,
  APITypes.SyncInterventionContentRelationsQuery
>;
export const getInterventionInterventionTagRelation = /* GraphQL */ `query GetInterventionInterventionTagRelation($id: ID!) {
  getInterventionInterventionTagRelation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetInterventionInterventionTagRelationQueryVariables,
  APITypes.GetInterventionInterventionTagRelationQuery
>;
export const listInterventionInterventionTagRelations = /* GraphQL */ `query ListInterventionInterventionTagRelations(
  $filter: ModelInterventionInterventionTagRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  listInterventionInterventionTagRelations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ListInterventionInterventionTagRelationsQueryVariables,
  APITypes.ListInterventionInterventionTagRelationsQuery
>;
export const syncInterventionInterventionTagRelations = /* GraphQL */ `query SyncInterventionInterventionTagRelations(
  $filter: ModelInterventionInterventionTagRelationFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncInterventionInterventionTagRelations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
}
` as GeneratedQuery<
  APITypes.SyncInterventionInterventionTagRelationsQueryVariables,
  APITypes.SyncInterventionInterventionTagRelationsQuery
>;
export const getContentContentTagRelation = /* GraphQL */ `query GetContentContentTagRelation($id: ID!) {
  getContentContentTagRelation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetContentContentTagRelationQueryVariables,
  APITypes.GetContentContentTagRelationQuery
>;
export const listContentContentTagRelations = /* GraphQL */ `query ListContentContentTagRelations(
  $filter: ModelContentContentTagRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  listContentContentTagRelations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ListContentContentTagRelationsQueryVariables,
  APITypes.ListContentContentTagRelationsQuery
>;
export const syncContentContentTagRelations = /* GraphQL */ `query SyncContentContentTagRelations(
  $filter: ModelContentContentTagRelationFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncContentContentTagRelations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
}
` as GeneratedQuery<
  APITypes.SyncContentContentTagRelationsQueryVariables,
  APITypes.SyncContentContentTagRelationsQuery
>;
export const getSurveySurveyTagRelation = /* GraphQL */ `query GetSurveySurveyTagRelation($id: ID!) {
  getSurveySurveyTagRelation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetSurveySurveyTagRelationQueryVariables,
  APITypes.GetSurveySurveyTagRelationQuery
>;
export const listSurveySurveyTagRelations = /* GraphQL */ `query ListSurveySurveyTagRelations(
  $filter: ModelSurveySurveyTagRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  listSurveySurveyTagRelations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      surveyId
      surveyTagId
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
}
` as GeneratedQuery<
  APITypes.ListSurveySurveyTagRelationsQueryVariables,
  APITypes.ListSurveySurveyTagRelationsQuery
>;
export const syncSurveySurveyTagRelations = /* GraphQL */ `query SyncSurveySurveyTagRelations(
  $filter: ModelSurveySurveyTagRelationFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncSurveySurveyTagRelations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      surveyId
      surveyTagId
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
}
` as GeneratedQuery<
  APITypes.SyncSurveySurveyTagRelationsQueryVariables,
  APITypes.SyncSurveySurveyTagRelationsQuery
>;
export const executedSurveyBySurveyID = /* GraphQL */ `query ExecutedSurveyBySurveyID(
  $surveyID: String!
  $sortDirection: ModelSortDirection
  $filter: ModelExecutedSurveyFilterInput
  $limit: Int
  $nextToken: String
) {
  executedSurveyBySurveyID(
    surveyID: $surveyID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ExecutedSurveyBySurveyIDQueryVariables,
  APITypes.ExecutedSurveyBySurveyIDQuery
>;
export const taskByUserID = /* GraphQL */ `query TaskByUserID(
  $userID: String!
  $sortDirection: ModelSortDirection
  $filter: ModelTaskFilterInput
  $limit: Int
  $nextToken: String
) {
  taskByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
        parentEntityID
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
      executedSurvey {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TaskByUserIDQueryVariables,
  APITypes.TaskByUserIDQuery
>;
export const levelInterventionRelationsByLevelId = /* GraphQL */ `query LevelInterventionRelationsByLevelId(
  $levelId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelLevelInterventionRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  levelInterventionRelationsByLevelId(
    levelId: $levelId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.LevelInterventionRelationsByLevelIdQueryVariables,
  APITypes.LevelInterventionRelationsByLevelIdQuery
>;
export const levelInterventionRelationsByInterventionId = /* GraphQL */ `query LevelInterventionRelationsByInterventionId(
  $interventionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelLevelInterventionRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  levelInterventionRelationsByInterventionId(
    interventionId: $interventionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.LevelInterventionRelationsByInterventionIdQueryVariables,
  APITypes.LevelInterventionRelationsByInterventionIdQuery
>;
export const interventionContentRelationsByInterventionId = /* GraphQL */ `query InterventionContentRelationsByInterventionId(
  $interventionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelInterventionContentRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  interventionContentRelationsByInterventionId(
    interventionId: $interventionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.InterventionContentRelationsByInterventionIdQueryVariables,
  APITypes.InterventionContentRelationsByInterventionIdQuery
>;
export const interventionContentRelationsByContentId = /* GraphQL */ `query InterventionContentRelationsByContentId(
  $contentId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelInterventionContentRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  interventionContentRelationsByContentId(
    contentId: $contentId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.InterventionContentRelationsByContentIdQueryVariables,
  APITypes.InterventionContentRelationsByContentIdQuery
>;
export const interventionInterventionTagRelationsByInterventionId = /* GraphQL */ `query InterventionInterventionTagRelationsByInterventionId(
  $interventionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelInterventionInterventionTagRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  interventionInterventionTagRelationsByInterventionId(
    interventionId: $interventionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.InterventionInterventionTagRelationsByInterventionIdQueryVariables,
  APITypes.InterventionInterventionTagRelationsByInterventionIdQuery
>;
export const interventionInterventionTagRelationsByInterventionTagId = /* GraphQL */ `query InterventionInterventionTagRelationsByInterventionTagId(
  $interventionTagId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelInterventionInterventionTagRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  interventionInterventionTagRelationsByInterventionTagId(
    interventionTagId: $interventionTagId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.InterventionInterventionTagRelationsByInterventionTagIdQueryVariables,
  APITypes.InterventionInterventionTagRelationsByInterventionTagIdQuery
>;
export const contentContentTagRelationsByContentId = /* GraphQL */ `query ContentContentTagRelationsByContentId(
  $contentId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelContentContentTagRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  contentContentTagRelationsByContentId(
    contentId: $contentId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ContentContentTagRelationsByContentIdQueryVariables,
  APITypes.ContentContentTagRelationsByContentIdQuery
>;
export const contentContentTagRelationsByContentTagId = /* GraphQL */ `query ContentContentTagRelationsByContentTagId(
  $contentTagId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelContentContentTagRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  contentContentTagRelationsByContentTagId(
    contentTagId: $contentTagId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ContentContentTagRelationsByContentTagIdQueryVariables,
  APITypes.ContentContentTagRelationsByContentTagIdQuery
>;
export const surveySurveyTagRelationsBySurveyId = /* GraphQL */ `query SurveySurveyTagRelationsBySurveyId(
  $surveyId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSurveySurveyTagRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  surveySurveyTagRelationsBySurveyId(
    surveyId: $surveyId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      surveyId
      surveyTagId
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
}
` as GeneratedQuery<
  APITypes.SurveySurveyTagRelationsBySurveyIdQueryVariables,
  APITypes.SurveySurveyTagRelationsBySurveyIdQuery
>;
export const surveySurveyTagRelationsBySurveyTagId = /* GraphQL */ `query SurveySurveyTagRelationsBySurveyTagId(
  $surveyTagId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSurveySurveyTagRelationFilterInput
  $limit: Int
  $nextToken: String
) {
  surveySurveyTagRelationsBySurveyTagId(
    surveyTagId: $surveyTagId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      surveyId
      surveyTagId
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
}
` as GeneratedQuery<
  APITypes.SurveySurveyTagRelationsBySurveyTagIdQueryVariables,
  APITypes.SurveySurveyTagRelationsBySurveyTagIdQuery
>;
