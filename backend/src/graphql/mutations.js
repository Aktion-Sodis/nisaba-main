/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
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
    }
  }
`;
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
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
    }
  }
`;
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
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
    }
  }
`;
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
      organization_id
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
      organization_id
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
      organization_id
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
export const updateConfig = /* GraphQL */ `
  mutation UpdateConfig(
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
      }
      schemeVersion
      id
      createdAt
      updatedAt
      organization_id
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
export const createLevel = /* GraphQL */ `
  mutation CreateLevel(
    $input: CreateLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    createLevel(input: $input, condition: $condition) {
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
export const updateLevel = /* GraphQL */ `
  mutation UpdateLevel(
    $input: UpdateLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    updateLevel(input: $input, condition: $condition) {
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
export const deleteLevel = /* GraphQL */ `
  mutation DeleteLevel(
    $input: DeleteLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    deleteLevel(input: $input, condition: $condition) {
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
export const createIntervention = /* GraphQL */ `
  mutation CreateIntervention(
    $input: CreateInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    createIntervention(input: $input, condition: $condition) {
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
export const updateIntervention = /* GraphQL */ `
  mutation UpdateIntervention(
    $input: UpdateInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    updateIntervention(input: $input, condition: $condition) {
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
export const deleteIntervention = /* GraphQL */ `
  mutation DeleteIntervention(
    $input: DeleteInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    deleteIntervention(input: $input, condition: $condition) {
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
export const createContent = /* GraphQL */ `
  mutation CreateContent(
    $input: CreateContentInput!
    $condition: ModelContentConditionInput
  ) {
    createContent(input: $input, condition: $condition) {
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
export const updateContent = /* GraphQL */ `
  mutation UpdateContent(
    $input: UpdateContentInput!
    $condition: ModelContentConditionInput
  ) {
    updateContent(input: $input, condition: $condition) {
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
export const deleteContent = /* GraphQL */ `
  mutation DeleteContent(
    $input: DeleteContentInput!
    $condition: ModelContentConditionInput
  ) {
    deleteContent(input: $input, condition: $condition) {
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
export const createSurvey = /* GraphQL */ `
  mutation CreateSurvey(
    $input: CreateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    createSurvey(input: $input, condition: $condition) {
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
export const updateSurvey = /* GraphQL */ `
  mutation UpdateSurvey(
    $input: UpdateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    updateSurvey(input: $input, condition: $condition) {
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
export const deleteSurvey = /* GraphQL */ `
  mutation DeleteSurvey(
    $input: DeleteSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    deleteSurvey(input: $input, condition: $condition) {
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
export const createEntity = /* GraphQL */ `
  mutation CreateEntity(
    $input: CreateEntityInput!
    $condition: ModelEntityConditionInput
  ) {
    createEntity(input: $input, condition: $condition) {
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
export const updateEntity = /* GraphQL */ `
  mutation UpdateEntity(
    $input: UpdateEntityInput!
    $condition: ModelEntityConditionInput
  ) {
    updateEntity(input: $input, condition: $condition) {
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
export const deleteEntity = /* GraphQL */ `
  mutation DeleteEntity(
    $input: DeleteEntityInput!
    $condition: ModelEntityConditionInput
  ) {
    deleteEntity(input: $input, condition: $condition) {
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
export const createContentTag = /* GraphQL */ `
  mutation CreateContentTag(
    $input: CreateContentTagInput!
    $condition: ModelContentTagConditionInput
  ) {
    createContentTag(input: $input, condition: $condition) {
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
export const updateContentTag = /* GraphQL */ `
  mutation UpdateContentTag(
    $input: UpdateContentTagInput!
    $condition: ModelContentTagConditionInput
  ) {
    updateContentTag(input: $input, condition: $condition) {
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
export const deleteContentTag = /* GraphQL */ `
  mutation DeleteContentTag(
    $input: DeleteContentTagInput!
    $condition: ModelContentTagConditionInput
  ) {
    deleteContentTag(input: $input, condition: $condition) {
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
export const createInterventionTag = /* GraphQL */ `
  mutation CreateInterventionTag(
    $input: CreateInterventionTagInput!
    $condition: ModelInterventionTagConditionInput
  ) {
    createInterventionTag(input: $input, condition: $condition) {
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
export const updateInterventionTag = /* GraphQL */ `
  mutation UpdateInterventionTag(
    $input: UpdateInterventionTagInput!
    $condition: ModelInterventionTagConditionInput
  ) {
    updateInterventionTag(input: $input, condition: $condition) {
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
export const deleteInterventionTag = /* GraphQL */ `
  mutation DeleteInterventionTag(
    $input: DeleteInterventionTagInput!
    $condition: ModelInterventionTagConditionInput
  ) {
    deleteInterventionTag(input: $input, condition: $condition) {
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
export const createSurveyTag = /* GraphQL */ `
  mutation CreateSurveyTag(
    $input: CreateSurveyTagInput!
    $condition: ModelSurveyTagConditionInput
  ) {
    createSurveyTag(input: $input, condition: $condition) {
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
export const updateSurveyTag = /* GraphQL */ `
  mutation UpdateSurveyTag(
    $input: UpdateSurveyTagInput!
    $condition: ModelSurveyTagConditionInput
  ) {
    updateSurveyTag(input: $input, condition: $condition) {
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
export const deleteSurveyTag = /* GraphQL */ `
  mutation DeleteSurveyTag(
    $input: DeleteSurveyTagInput!
    $condition: ModelSurveyTagConditionInput
  ) {
    deleteSurveyTag(input: $input, condition: $condition) {
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
export const createSessionData = /* GraphQL */ `
  mutation CreateSessionData(
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
      organization_id
    }
  }
`;
export const updateSessionData = /* GraphQL */ `
  mutation UpdateSessionData(
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
      organization_id
    }
  }
`;
export const deleteSessionData = /* GraphQL */ `
  mutation DeleteSessionData(
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
      organization_id
    }
  }
`;
export const createTestObject = /* GraphQL */ `
  mutation CreateTestObject(
    $input: CreateTestObjectInput!
    $condition: ModelTestObjectConditionInput
  ) {
    createTestObject(input: $input, condition: $condition) {
      name
      age
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const updateTestObject = /* GraphQL */ `
  mutation UpdateTestObject(
    $input: UpdateTestObjectInput!
    $condition: ModelTestObjectConditionInput
  ) {
    updateTestObject(input: $input, condition: $condition) {
      name
      age
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const deleteTestObject = /* GraphQL */ `
  mutation DeleteTestObject(
    $input: DeleteTestObjectInput!
    $condition: ModelTestObjectConditionInput
  ) {
    deleteTestObject(input: $input, condition: $condition) {
      name
      age
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const createLevelInterventionRelation = /* GraphQL */ `
  mutation CreateLevelInterventionRelation(
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
export const updateLevelInterventionRelation = /* GraphQL */ `
  mutation UpdateLevelInterventionRelation(
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
export const deleteLevelInterventionRelation = /* GraphQL */ `
  mutation DeleteLevelInterventionRelation(
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
export const createInterventionContentRelation = /* GraphQL */ `
  mutation CreateInterventionContentRelation(
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
export const updateInterventionContentRelation = /* GraphQL */ `
  mutation UpdateInterventionContentRelation(
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
export const deleteInterventionContentRelation = /* GraphQL */ `
  mutation DeleteInterventionContentRelation(
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
export const createInterventionInterventionTagRelation = /* GraphQL */ `
  mutation CreateInterventionInterventionTagRelation(
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
export const updateInterventionInterventionTagRelation = /* GraphQL */ `
  mutation UpdateInterventionInterventionTagRelation(
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
export const deleteInterventionInterventionTagRelation = /* GraphQL */ `
  mutation DeleteInterventionInterventionTagRelation(
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
export const createContentContentTagRelation = /* GraphQL */ `
  mutation CreateContentContentTagRelation(
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
export const updateContentContentTagRelation = /* GraphQL */ `
  mutation UpdateContentContentTagRelation(
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
export const deleteContentContentTagRelation = /* GraphQL */ `
  mutation DeleteContentContentTagRelation(
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
export const createSurveySurveyTagRelation = /* GraphQL */ `
  mutation CreateSurveySurveyTagRelation(
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
export const updateSurveySurveyTagRelation = /* GraphQL */ `
  mutation UpdateSurveySurveyTagRelation(
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
export const deleteSurveySurveyTagRelation = /* GraphQL */ `
  mutation DeleteSurveySurveyTagRelation(
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
