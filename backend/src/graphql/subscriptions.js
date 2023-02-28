/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onCreateOrganization(filter: $filter) {
      nameCamelCase
      nameKebabCase
      nameVerbose
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onUpdateOrganization(filter: $filter) {
      nameCamelCase
      nameKebabCase
      nameVerbose
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onDeleteOrganization(filter: $filter) {
      nameCamelCase
      nameKebabCase
      nameVerbose
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
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
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
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
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
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
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateConfig = /* GraphQL */ `
  subscription OnCreateConfig(
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
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateConfig = /* GraphQL */ `
  subscription OnUpdateConfig(
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
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteConfig = /* GraphQL */ `
  subscription OnDeleteConfig(
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
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateLevel = /* GraphQL */ `
  subscription OnCreateLevel(
    $filter: ModelSubscriptionLevelFilterInput
    $organization_id: String
  ) {
    onCreateLevel(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
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
          organization_id
        }
        nextToken
      }
      customData {
        id
        name {
          languageKeys
          languageTexts
        }
        type
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateLevel = /* GraphQL */ `
  subscription OnUpdateLevel(
    $filter: ModelSubscriptionLevelFilterInput
    $organization_id: String
  ) {
    onUpdateLevel(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
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
          organization_id
        }
        nextToken
      }
      customData {
        id
        name {
          languageKeys
          languageTexts
        }
        type
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteLevel = /* GraphQL */ `
  subscription OnDeleteLevel(
    $filter: ModelSubscriptionLevelFilterInput
    $organization_id: String
  ) {
    onDeleteLevel(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
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
          organization_id
        }
        nextToken
      }
      customData {
        id
        name {
          languageKeys
          languageTexts
        }
        type
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateIntervention = /* GraphQL */ `
  subscription OnCreateIntervention(
    $filter: ModelSubscriptionInterventionFilterInput
    $organization_id: String
  ) {
    onCreateIntervention(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      interventionType
      contents {
        items {
          id
          interventionId
          contentId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      surveys {
        items {
          surveyType
          schemeVersion
          archived
          id
          createdAt
          updatedAt
          interventionSurveysId
          organization_id
        }
        nextToken
      }
      tags {
        items {
          id
          interventionId
          interventionTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      schemeVersion
      levels {
        items {
          id
          levelId
          interventionId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateIntervention = /* GraphQL */ `
  subscription OnUpdateIntervention(
    $filter: ModelSubscriptionInterventionFilterInput
    $organization_id: String
  ) {
    onUpdateIntervention(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      interventionType
      contents {
        items {
          id
          interventionId
          contentId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      surveys {
        items {
          surveyType
          schemeVersion
          archived
          id
          createdAt
          updatedAt
          interventionSurveysId
          organization_id
        }
        nextToken
      }
      tags {
        items {
          id
          interventionId
          interventionTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      schemeVersion
      levels {
        items {
          id
          levelId
          interventionId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteIntervention = /* GraphQL */ `
  subscription OnDeleteIntervention(
    $filter: ModelSubscriptionInterventionFilterInput
    $organization_id: String
  ) {
    onDeleteIntervention(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      interventionType
      contents {
        items {
          id
          interventionId
          contentId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      surveys {
        items {
          surveyType
          schemeVersion
          archived
          id
          createdAt
          updatedAt
          interventionSurveysId
          organization_id
        }
        nextToken
      }
      tags {
        items {
          id
          interventionId
          interventionTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      schemeVersion
      levels {
        items {
          id
          levelId
          interventionId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateContent = /* GraphQL */ `
  subscription OnCreateContent(
    $filter: ModelSubscriptionContentFilterInput
    $organization_id: String
  ) {
    onCreateContent(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      interventions {
        items {
          id
          interventionId
          contentId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      tags {
        items {
          id
          contentId
          contentTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateContent = /* GraphQL */ `
  subscription OnUpdateContent(
    $filter: ModelSubscriptionContentFilterInput
    $organization_id: String
  ) {
    onUpdateContent(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      interventions {
        items {
          id
          interventionId
          contentId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      tags {
        items {
          id
          contentId
          contentTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteContent = /* GraphQL */ `
  subscription OnDeleteContent(
    $filter: ModelSubscriptionContentFilterInput
    $organization_id: String
  ) {
    onDeleteContent(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      interventions {
        items {
          id
          interventionId
          contentId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      tags {
        items {
          id
          contentId
          contentTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateSurvey = /* GraphQL */ `
  subscription OnCreateSurvey(
    $filter: ModelSubscriptionSurveyFilterInput
    $organization_id: String
  ) {
    onCreateSurvey(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      intervention {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      questions {
        id
        text {
          languageKeys
          languageTexts
        }
        type
        questionOptions {
          id
          followUpQuestionIDs
        }
        isFollowUpQuestion
      }
      tags {
        items {
          id
          surveyId
          surveyTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      surveyType
      schemeVersion
      archived
      id
      createdAt
      updatedAt
      interventionSurveysId
      organization_id
    }
  }
`;
export const onUpdateSurvey = /* GraphQL */ `
  subscription OnUpdateSurvey(
    $filter: ModelSubscriptionSurveyFilterInput
    $organization_id: String
  ) {
    onUpdateSurvey(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      intervention {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      questions {
        id
        text {
          languageKeys
          languageTexts
        }
        type
        questionOptions {
          id
          followUpQuestionIDs
        }
        isFollowUpQuestion
      }
      tags {
        items {
          id
          surveyId
          surveyTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      surveyType
      schemeVersion
      archived
      id
      createdAt
      updatedAt
      interventionSurveysId
      organization_id
    }
  }
`;
export const onDeleteSurvey = /* GraphQL */ `
  subscription OnDeleteSurvey(
    $filter: ModelSubscriptionSurveyFilterInput
    $organization_id: String
  ) {
    onDeleteSurvey(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      intervention {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      questions {
        id
        text {
          languageKeys
          languageTexts
        }
        type
        questionOptions {
          id
          followUpQuestionIDs
        }
        isFollowUpQuestion
      }
      tags {
        items {
          id
          surveyId
          surveyTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      surveyType
      schemeVersion
      archived
      id
      createdAt
      updatedAt
      interventionSurveysId
      organization_id
    }
  }
`;
export const onCreateEntity = /* GraphQL */ `
  subscription OnCreateEntity(
    $filter: ModelSubscriptionEntityFilterInput
    $organization_id: String
  ) {
    onCreateEntity(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      parentEntityID
      level {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        parentLevelID
        interventionsAreAllowed
        allowedInterventions {
          nextToken
        }
        customData {
          id
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      location {
        latitude
        longitude
      }
      customData {
        customDataID
        type
        name {
          languageKeys
          languageTexts
        }
        intValue
        stringValue
      }
      appliedInterventions {
        items {
          isOkay
          schemeVersion
          id
          createdAt
          updatedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
          organization_id
        }
        nextToken
      }
      schemeVersion
      id
      createdAt
      updatedAt
      entityLevelId
      organization_id
    }
  }
`;
export const onUpdateEntity = /* GraphQL */ `
  subscription OnUpdateEntity(
    $filter: ModelSubscriptionEntityFilterInput
    $organization_id: String
  ) {
    onUpdateEntity(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      parentEntityID
      level {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        parentLevelID
        interventionsAreAllowed
        allowedInterventions {
          nextToken
        }
        customData {
          id
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      location {
        latitude
        longitude
      }
      customData {
        customDataID
        type
        name {
          languageKeys
          languageTexts
        }
        intValue
        stringValue
      }
      appliedInterventions {
        items {
          isOkay
          schemeVersion
          id
          createdAt
          updatedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
          organization_id
        }
        nextToken
      }
      schemeVersion
      id
      createdAt
      updatedAt
      entityLevelId
      organization_id
    }
  }
`;
export const onDeleteEntity = /* GraphQL */ `
  subscription OnDeleteEntity(
    $filter: ModelSubscriptionEntityFilterInput
    $organization_id: String
  ) {
    onDeleteEntity(filter: $filter, organization_id: $organization_id) {
      name {
        languageKeys
        languageTexts
      }
      description {
        languageKeys
        languageTexts
      }
      parentEntityID
      level {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        parentLevelID
        interventionsAreAllowed
        allowedInterventions {
          nextToken
        }
        customData {
          id
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      location {
        latitude
        longitude
      }
      customData {
        customDataID
        type
        name {
          languageKeys
          languageTexts
        }
        intValue
        stringValue
      }
      appliedInterventions {
        items {
          isOkay
          schemeVersion
          id
          createdAt
          updatedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
          organization_id
        }
        nextToken
      }
      schemeVersion
      id
      createdAt
      updatedAt
      entityLevelId
      organization_id
    }
  }
`;
export const onCreateAppliedIntervention = /* GraphQL */ `
  subscription OnCreateAppliedIntervention(
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
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      intervention {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      location {
        latitude
        longitude
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
          appliedInterventionExecutedSurveysId
          executedSurveySurveyId
          executedSurveyWhoExecutedItId
          organization_id
        }
        nextToken
      }
      schemeVersion
      id
      createdAt
      updatedAt
      entityAppliedInterventionsId
      appliedInterventionWhoDidItId
      appliedInterventionInterventionId
      organization_id
    }
  }
`;
export const onUpdateAppliedIntervention = /* GraphQL */ `
  subscription OnUpdateAppliedIntervention(
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
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      intervention {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      location {
        latitude
        longitude
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
          appliedInterventionExecutedSurveysId
          executedSurveySurveyId
          executedSurveyWhoExecutedItId
          organization_id
        }
        nextToken
      }
      schemeVersion
      id
      createdAt
      updatedAt
      entityAppliedInterventionsId
      appliedInterventionWhoDidItId
      appliedInterventionInterventionId
      organization_id
    }
  }
`;
export const onDeleteAppliedIntervention = /* GraphQL */ `
  subscription OnDeleteAppliedIntervention(
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
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      intervention {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      location {
        latitude
        longitude
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
          appliedInterventionExecutedSurveysId
          executedSurveySurveyId
          executedSurveyWhoExecutedItId
          organization_id
        }
        nextToken
      }
      schemeVersion
      id
      createdAt
      updatedAt
      entityAppliedInterventionsId
      appliedInterventionWhoDidItId
      appliedInterventionInterventionId
      organization_id
    }
  }
`;
export const onCreateExecutedSurvey = /* GraphQL */ `
  subscription OnCreateExecutedSurvey(
    $filter: ModelSubscriptionExecutedSurveyFilterInput
    $organization_id: String
  ) {
    onCreateExecutedSurvey(filter: $filter, organization_id: $organization_id) {
      appliedIntervention {
        whoDidIt {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        location {
          latitude
          longitude
        }
        isOkay
        executedSurveys {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        entityAppliedInterventionsId
        appliedInterventionWhoDidItId
        appliedInterventionInterventionId
        organization_id
      }
      survey {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        questions {
          id
          type
          isFollowUpQuestion
        }
        tags {
          nextToken
        }
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        interventionSurveysId
        organization_id
      }
      surveyID
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
        organization_id
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
        intValue
        doubleValue
        rating
        questionOptions {
          id
          followUpQuestionIDs
        }
        markings {
          x
          y
          rx
          ry
          text
        }
      }
      schemeVersion
      id
      createdAt
      updatedAt
      appliedInterventionExecutedSurveysId
      executedSurveySurveyId
      executedSurveyWhoExecutedItId
      organization_id
    }
  }
`;
export const onUpdateExecutedSurvey = /* GraphQL */ `
  subscription OnUpdateExecutedSurvey(
    $filter: ModelSubscriptionExecutedSurveyFilterInput
    $organization_id: String
  ) {
    onUpdateExecutedSurvey(filter: $filter, organization_id: $organization_id) {
      appliedIntervention {
        whoDidIt {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        location {
          latitude
          longitude
        }
        isOkay
        executedSurveys {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        entityAppliedInterventionsId
        appliedInterventionWhoDidItId
        appliedInterventionInterventionId
        organization_id
      }
      survey {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        questions {
          id
          type
          isFollowUpQuestion
        }
        tags {
          nextToken
        }
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        interventionSurveysId
        organization_id
      }
      surveyID
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
        organization_id
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
        intValue
        doubleValue
        rating
        questionOptions {
          id
          followUpQuestionIDs
        }
        markings {
          x
          y
          rx
          ry
          text
        }
      }
      schemeVersion
      id
      createdAt
      updatedAt
      appliedInterventionExecutedSurveysId
      executedSurveySurveyId
      executedSurveyWhoExecutedItId
      organization_id
    }
  }
`;
export const onDeleteExecutedSurvey = /* GraphQL */ `
  subscription OnDeleteExecutedSurvey(
    $filter: ModelSubscriptionExecutedSurveyFilterInput
    $organization_id: String
  ) {
    onDeleteExecutedSurvey(filter: $filter, organization_id: $organization_id) {
      appliedIntervention {
        whoDidIt {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        location {
          latitude
          longitude
        }
        isOkay
        executedSurveys {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        entityAppliedInterventionsId
        appliedInterventionWhoDidItId
        appliedInterventionInterventionId
        organization_id
      }
      survey {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        questions {
          id
          type
          isFollowUpQuestion
        }
        tags {
          nextToken
        }
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        interventionSurveysId
        organization_id
      }
      surveyID
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
        organization_id
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
        intValue
        doubleValue
        rating
        questionOptions {
          id
          followUpQuestionIDs
        }
        markings {
          x
          y
          rx
          ry
          text
        }
      }
      schemeVersion
      id
      createdAt
      updatedAt
      appliedInterventionExecutedSurveysId
      executedSurveySurveyId
      executedSurveyWhoExecutedItId
      organization_id
    }
  }
`;
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask(
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
        organization_id
      }
      userID
      entity {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        parentEntityID
        level {
          parentLevelID
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        location {
          latitude
          longitude
        }
        customData {
          customDataID
          type
          intValue
          stringValue
        }
        appliedInterventions {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        entityLevelId
        organization_id
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
          organization_id
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        location {
          latitude
          longitude
        }
        isOkay
        executedSurveys {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        entityAppliedInterventionsId
        appliedInterventionWhoDidItId
        appliedInterventionInterventionId
        organization_id
      }
      executedSurvey {
        appliedIntervention {
          isOkay
          schemeVersion
          id
          createdAt
          updatedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
          organization_id
        }
        survey {
          surveyType
          schemeVersion
          archived
          id
          createdAt
          updatedAt
          interventionSurveysId
          organization_id
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
          organization_id
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
          intValue
          doubleValue
          rating
        }
        schemeVersion
        id
        createdAt
        updatedAt
        appliedInterventionExecutedSurveysId
        executedSurveySurveyId
        executedSurveyWhoExecutedItId
        organization_id
      }
      schemeVersion
      picIDs
      audioIDs
      id
      createdAt
      updatedAt
      taskUserId
      taskEntityId
      taskAppliedInterventionId
      taskExecutedSurveyId
      organization_id
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask(
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
        organization_id
      }
      userID
      entity {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        parentEntityID
        level {
          parentLevelID
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        location {
          latitude
          longitude
        }
        customData {
          customDataID
          type
          intValue
          stringValue
        }
        appliedInterventions {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        entityLevelId
        organization_id
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
          organization_id
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        location {
          latitude
          longitude
        }
        isOkay
        executedSurveys {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        entityAppliedInterventionsId
        appliedInterventionWhoDidItId
        appliedInterventionInterventionId
        organization_id
      }
      executedSurvey {
        appliedIntervention {
          isOkay
          schemeVersion
          id
          createdAt
          updatedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
          organization_id
        }
        survey {
          surveyType
          schemeVersion
          archived
          id
          createdAt
          updatedAt
          interventionSurveysId
          organization_id
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
          organization_id
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
          intValue
          doubleValue
          rating
        }
        schemeVersion
        id
        createdAt
        updatedAt
        appliedInterventionExecutedSurveysId
        executedSurveySurveyId
        executedSurveyWhoExecutedItId
        organization_id
      }
      schemeVersion
      picIDs
      audioIDs
      id
      createdAt
      updatedAt
      taskUserId
      taskEntityId
      taskAppliedInterventionId
      taskExecutedSurveyId
      organization_id
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask(
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
        organization_id
      }
      userID
      entity {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        parentEntityID
        level {
          parentLevelID
          interventionsAreAllowed
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        location {
          latitude
          longitude
        }
        customData {
          customDataID
          type
          intValue
          stringValue
        }
        appliedInterventions {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        entityLevelId
        organization_id
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
          organization_id
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        location {
          latitude
          longitude
        }
        isOkay
        executedSurveys {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        entityAppliedInterventionsId
        appliedInterventionWhoDidItId
        appliedInterventionInterventionId
        organization_id
      }
      executedSurvey {
        appliedIntervention {
          isOkay
          schemeVersion
          id
          createdAt
          updatedAt
          entityAppliedInterventionsId
          appliedInterventionWhoDidItId
          appliedInterventionInterventionId
          organization_id
        }
        survey {
          surveyType
          schemeVersion
          archived
          id
          createdAt
          updatedAt
          interventionSurveysId
          organization_id
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
          organization_id
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
          intValue
          doubleValue
          rating
        }
        schemeVersion
        id
        createdAt
        updatedAt
        appliedInterventionExecutedSurveysId
        executedSurveySurveyId
        executedSurveyWhoExecutedItId
        organization_id
      }
      schemeVersion
      picIDs
      audioIDs
      id
      createdAt
      updatedAt
      taskUserId
      taskEntityId
      taskAppliedInterventionId
      taskExecutedSurveyId
      organization_id
    }
  }
`;
export const onCreateContentTag = /* GraphQL */ `
  subscription OnCreateContentTag(
    $filter: ModelSubscriptionContentTagFilterInput
    $organization_id: String
  ) {
    onCreateContentTag(filter: $filter, organization_id: $organization_id) {
      text {
        languageKeys
        languageTexts
      }
      schemeVersion
      contents {
        items {
          id
          contentId
          contentTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateContentTag = /* GraphQL */ `
  subscription OnUpdateContentTag(
    $filter: ModelSubscriptionContentTagFilterInput
    $organization_id: String
  ) {
    onUpdateContentTag(filter: $filter, organization_id: $organization_id) {
      text {
        languageKeys
        languageTexts
      }
      schemeVersion
      contents {
        items {
          id
          contentId
          contentTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteContentTag = /* GraphQL */ `
  subscription OnDeleteContentTag(
    $filter: ModelSubscriptionContentTagFilterInput
    $organization_id: String
  ) {
    onDeleteContentTag(filter: $filter, organization_id: $organization_id) {
      text {
        languageKeys
        languageTexts
      }
      schemeVersion
      contents {
        items {
          id
          contentId
          contentTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateInterventionTag = /* GraphQL */ `
  subscription OnCreateInterventionTag(
    $filter: ModelSubscriptionInterventionTagFilterInput
    $organization_id: String
  ) {
    onCreateInterventionTag(
      filter: $filter
      organization_id: $organization_id
    ) {
      text {
        languageKeys
        languageTexts
      }
      schemeVersion
      interventions {
        items {
          id
          interventionId
          interventionTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateInterventionTag = /* GraphQL */ `
  subscription OnUpdateInterventionTag(
    $filter: ModelSubscriptionInterventionTagFilterInput
    $organization_id: String
  ) {
    onUpdateInterventionTag(
      filter: $filter
      organization_id: $organization_id
    ) {
      text {
        languageKeys
        languageTexts
      }
      schemeVersion
      interventions {
        items {
          id
          interventionId
          interventionTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteInterventionTag = /* GraphQL */ `
  subscription OnDeleteInterventionTag(
    $filter: ModelSubscriptionInterventionTagFilterInput
    $organization_id: String
  ) {
    onDeleteInterventionTag(
      filter: $filter
      organization_id: $organization_id
    ) {
      text {
        languageKeys
        languageTexts
      }
      schemeVersion
      interventions {
        items {
          id
          interventionId
          interventionTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateSurveyTag = /* GraphQL */ `
  subscription OnCreateSurveyTag(
    $filter: ModelSubscriptionSurveyTagFilterInput
    $organization_id: String
  ) {
    onCreateSurveyTag(filter: $filter, organization_id: $organization_id) {
      text {
        languageKeys
        languageTexts
      }
      schemeVersion
      surveys {
        items {
          id
          surveyId
          surveyTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateSurveyTag = /* GraphQL */ `
  subscription OnUpdateSurveyTag(
    $filter: ModelSubscriptionSurveyTagFilterInput
    $organization_id: String
  ) {
    onUpdateSurveyTag(filter: $filter, organization_id: $organization_id) {
      text {
        languageKeys
        languageTexts
      }
      schemeVersion
      surveys {
        items {
          id
          surveyId
          surveyTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteSurveyTag = /* GraphQL */ `
  subscription OnDeleteSurveyTag(
    $filter: ModelSubscriptionSurveyTagFilterInput
    $organization_id: String
  ) {
    onDeleteSurveyTag(filter: $filter, organization_id: $organization_id) {
      text {
        languageKeys
        languageTexts
      }
      schemeVersion
      surveys {
        items {
          id
          surveyId
          surveyTagId
          createdAt
          updatedAt
          organization_id
        }
        nextToken
      }
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateSessionData = /* GraphQL */ `
  subscription OnCreateSessionData(
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
      organization_id
    }
  }
`;
export const onUpdateSessionData = /* GraphQL */ `
  subscription OnUpdateSessionData(
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
      organization_id
    }
  }
`;
export const onDeleteSessionData = /* GraphQL */ `
  subscription OnDeleteSessionData(
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
      organization_id
    }
  }
`;
export const onCreateTestObject = /* GraphQL */ `
  subscription OnCreateTestObject(
    $filter: ModelSubscriptionTestObjectFilterInput
    $organization_id: String
  ) {
    onCreateTestObject(filter: $filter, organization_id: $organization_id) {
      name
      age
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateTestObject = /* GraphQL */ `
  subscription OnUpdateTestObject(
    $filter: ModelSubscriptionTestObjectFilterInput
    $organization_id: String
  ) {
    onUpdateTestObject(filter: $filter, organization_id: $organization_id) {
      name
      age
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteTestObject = /* GraphQL */ `
  subscription OnDeleteTestObject(
    $filter: ModelSubscriptionTestObjectFilterInput
    $organization_id: String
  ) {
    onDeleteTestObject(filter: $filter, organization_id: $organization_id) {
      name
      age
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateLevelInterventionRelation = /* GraphQL */ `
  subscription OnCreateLevelInterventionRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        parentLevelID
        interventionsAreAllowed
        allowedInterventions {
          nextToken
        }
        customData {
          id
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      intervention {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateLevelInterventionRelation = /* GraphQL */ `
  subscription OnUpdateLevelInterventionRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        parentLevelID
        interventionsAreAllowed
        allowedInterventions {
          nextToken
        }
        customData {
          id
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      intervention {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteLevelInterventionRelation = /* GraphQL */ `
  subscription OnDeleteLevelInterventionRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        parentLevelID
        interventionsAreAllowed
        allowedInterventions {
          nextToken
        }
        customData {
          id
          type
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      intervention {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateInterventionContentRelation = /* GraphQL */ `
  subscription OnCreateInterventionContentRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      content {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventions {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateInterventionContentRelation = /* GraphQL */ `
  subscription OnUpdateInterventionContentRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      content {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventions {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteInterventionContentRelation = /* GraphQL */ `
  subscription OnDeleteInterventionContentRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      content {
        name {
          languageKeys
          languageTexts
        }
        description {
          languageKeys
          languageTexts
        }
        interventions {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateInterventionInterventionTagRelation = /* GraphQL */ `
  subscription OnCreateInterventionInterventionTagRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      interventionTag {
        text {
          languageKeys
          languageTexts
        }
        schemeVersion
        interventions {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateInterventionInterventionTagRelation = /* GraphQL */ `
  subscription OnUpdateInterventionInterventionTagRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      interventionTag {
        text {
          languageKeys
          languageTexts
        }
        schemeVersion
        interventions {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteInterventionInterventionTagRelation = /* GraphQL */ `
  subscription OnDeleteInterventionInterventionTagRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        interventionType
        contents {
          nextToken
        }
        surveys {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        levels {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      interventionTag {
        text {
          languageKeys
          languageTexts
        }
        schemeVersion
        interventions {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateContentContentTagRelation = /* GraphQL */ `
  subscription OnCreateContentContentTagRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        interventions {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      contentTag {
        text {
          languageKeys
          languageTexts
        }
        schemeVersion
        contents {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateContentContentTagRelation = /* GraphQL */ `
  subscription OnUpdateContentContentTagRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        interventions {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      contentTag {
        text {
          languageKeys
          languageTexts
        }
        schemeVersion
        contents {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteContentContentTagRelation = /* GraphQL */ `
  subscription OnDeleteContentContentTagRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        interventions {
          nextToken
        }
        tags {
          nextToken
        }
        schemeVersion
        id
        createdAt
        updatedAt
        organization_id
      }
      contentTag {
        text {
          languageKeys
          languageTexts
        }
        schemeVersion
        contents {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onCreateSurveySurveyTagRelation = /* GraphQL */ `
  subscription OnCreateSurveySurveyTagRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        questions {
          id
          type
          isFollowUpQuestion
        }
        tags {
          nextToken
        }
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        interventionSurveysId
        organization_id
      }
      surveyTag {
        text {
          languageKeys
          languageTexts
        }
        schemeVersion
        surveys {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onUpdateSurveySurveyTagRelation = /* GraphQL */ `
  subscription OnUpdateSurveySurveyTagRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        questions {
          id
          type
          isFollowUpQuestion
        }
        tags {
          nextToken
        }
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        interventionSurveysId
        organization_id
      }
      surveyTag {
        text {
          languageKeys
          languageTexts
        }
        schemeVersion
        surveys {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const onDeleteSurveySurveyTagRelation = /* GraphQL */ `
  subscription OnDeleteSurveySurveyTagRelation(
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
        }
        description {
          languageKeys
          languageTexts
        }
        intervention {
          interventionType
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        questions {
          id
          type
          isFollowUpQuestion
        }
        tags {
          nextToken
        }
        surveyType
        schemeVersion
        archived
        id
        createdAt
        updatedAt
        interventionSurveysId
        organization_id
      }
      surveyTag {
        text {
          languageKeys
          languageTexts
        }
        schemeVersion
        surveys {
          nextToken
        }
        id
        createdAt
        updatedAt
        organization_id
      }
      createdAt
      updatedAt
      organization_id
    }
  }
`;
