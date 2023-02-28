/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
      nameCamelCase
      nameKebabCase
      nameVerbose
      id
      createdAt
      updatedAt
    }
  }
`;
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
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
      }
      nextToken
    }
  }
`;
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
      organization_id
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
        organization_id
      }
      nextToken
    }
  }
`;
export const getConfig = /* GraphQL */ `
  query GetConfig($id: ID!) {
    getConfig(id: $id) {
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
      nextToken
    }
  }
`;
export const getLevel = /* GraphQL */ `
  query GetLevel($id: ID!) {
    getLevel(id: $id) {
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
export const listLevels = /* GraphQL */ `
  query ListLevels(
    $filter: ModelLevelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getIntervention = /* GraphQL */ `
  query GetIntervention($id: ID!) {
    getIntervention(id: $id) {
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
export const listInterventions = /* GraphQL */ `
  query ListInterventions(
    $filter: ModelInterventionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterventions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getContent = /* GraphQL */ `
  query GetContent($id: ID!) {
    getContent(id: $id) {
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
export const listContents = /* GraphQL */ `
  query ListContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSurvey = /* GraphQL */ `
  query GetSurvey($id: ID!) {
    getSurvey(id: $id) {
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
export const listSurveys = /* GraphQL */ `
  query ListSurveys(
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEntity = /* GraphQL */ `
  query GetEntity($id: ID!) {
    getEntity(id: $id) {
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
export const listEntities = /* GraphQL */ `
  query ListEntities(
    $filter: ModelEntityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
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
      nextToken
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
export const listExecutedSurveys = /* GraphQL */ `
  query ListExecutedSurveys(
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
      nextToken
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
          organization_id
        }
        userID
        entity {
          parentEntityID
          schemeVersion
          id
          createdAt
          updatedAt
          entityLevelId
          organization_id
        }
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
        executedSurvey {
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
      nextToken
    }
  }
`;
export const getContentTag = /* GraphQL */ `
  query GetContentTag($id: ID!) {
    getContentTag(id: $id) {
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
export const listContentTags = /* GraphQL */ `
  query ListContentTags(
    $filter: ModelContentTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContentTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getInterventionTag = /* GraphQL */ `
  query GetInterventionTag($id: ID!) {
    getInterventionTag(id: $id) {
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
export const listInterventionTags = /* GraphQL */ `
  query ListInterventionTags(
    $filter: ModelInterventionTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterventionTags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getSurveyTag = /* GraphQL */ `
  query GetSurveyTag($id: ID!) {
    getSurveyTag(id: $id) {
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
export const listSurveyTags = /* GraphQL */ `
  query ListSurveyTags(
    $filter: ModelSurveyTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveyTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSessionData = /* GraphQL */ `
  query GetSessionData($id: ID!) {
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
      organization_id
    }
  }
`;
export const listSessionData = /* GraphQL */ `
  query ListSessionData(
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
        organization_id
      }
      nextToken
    }
  }
`;
export const getTestObject = /* GraphQL */ `
  query GetTestObject($id: ID!) {
    getTestObject(id: $id) {
      name
      age
      id
      createdAt
      updatedAt
      organization_id
    }
  }
`;
export const listTestObjects = /* GraphQL */ `
  query ListTestObjects(
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
        organization_id
      }
      nextToken
    }
  }
`;
export const getLevelInterventionRelation = /* GraphQL */ `
  query GetLevelInterventionRelation($id: ID!) {
    getLevelInterventionRelation(id: $id) {
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
export const listLevelInterventionRelations = /* GraphQL */ `
  query ListLevelInterventionRelations(
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
        createdAt
        updatedAt
        organization_id
      }
      nextToken
    }
  }
`;
export const getInterventionContentRelation = /* GraphQL */ `
  query GetInterventionContentRelation($id: ID!) {
    getInterventionContentRelation(id: $id) {
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
export const listInterventionContentRelations = /* GraphQL */ `
  query ListInterventionContentRelations(
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
          organization_id
        }
        content {
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
      nextToken
    }
  }
`;
export const getInterventionInterventionTagRelation = /* GraphQL */ `
  query GetInterventionInterventionTagRelation($id: ID!) {
    getInterventionInterventionTagRelation(id: $id) {
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
export const listInterventionInterventionTagRelations = /* GraphQL */ `
  query ListInterventionInterventionTagRelations(
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
          organization_id
        }
        interventionTag {
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
      nextToken
    }
  }
`;
export const getContentContentTagRelation = /* GraphQL */ `
  query GetContentContentTagRelation($id: ID!) {
    getContentContentTagRelation(id: $id) {
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
export const listContentContentTagRelations = /* GraphQL */ `
  query ListContentContentTagRelations(
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
          organization_id
        }
        contentTag {
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
      nextToken
    }
  }
`;
export const getSurveySurveyTagRelation = /* GraphQL */ `
  query GetSurveySurveyTagRelation($id: ID!) {
    getSurveySurveyTagRelation(id: $id) {
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
export const listSurveySurveyTagRelations = /* GraphQL */ `
  query ListSurveySurveyTagRelations(
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
          interventionSurveysId
          organization_id
        }
        surveyTag {
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
      nextToken
    }
  }
`;
export const executedSurveyBySurveyID = /* GraphQL */ `
  query ExecutedSurveyBySurveyID(
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
      nextToken
    }
  }
`;
export const taskByUserID = /* GraphQL */ `
  query TaskByUserID(
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
        }
        user {
          firstName
          lastName
          bio
          schemeVersion
          id
          createdAt
          updatedAt
          organization_id
        }
        userID
        entity {
          parentEntityID
          schemeVersion
          id
          createdAt
          updatedAt
          entityLevelId
          organization_id
        }
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
        executedSurvey {
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
      nextToken
    }
  }
`;
export const levelInterventionRelationsByLevelId = /* GraphQL */ `
  query LevelInterventionRelationsByLevelId(
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
        createdAt
        updatedAt
        organization_id
      }
      nextToken
    }
  }
`;
export const levelInterventionRelationsByInterventionId = /* GraphQL */ `
  query LevelInterventionRelationsByInterventionId(
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
        createdAt
        updatedAt
        organization_id
      }
      nextToken
    }
  }
`;
export const interventionContentRelationsByInterventionId = /* GraphQL */ `
  query InterventionContentRelationsByInterventionId(
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
          organization_id
        }
        content {
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
      nextToken
    }
  }
`;
export const interventionContentRelationsByContentId = /* GraphQL */ `
  query InterventionContentRelationsByContentId(
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
          organization_id
        }
        content {
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
      nextToken
    }
  }
`;
export const interventionInterventionTagRelationsByInterventionId = /* GraphQL */ `
  query InterventionInterventionTagRelationsByInterventionId(
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
          organization_id
        }
        interventionTag {
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
      nextToken
    }
  }
`;
export const interventionInterventionTagRelationsByInterventionTagId = /* GraphQL */ `
  query InterventionInterventionTagRelationsByInterventionTagId(
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
          organization_id
        }
        interventionTag {
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
      nextToken
    }
  }
`;
export const contentContentTagRelationsByContentId = /* GraphQL */ `
  query ContentContentTagRelationsByContentId(
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
          organization_id
        }
        contentTag {
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
      nextToken
    }
  }
`;
export const contentContentTagRelationsByContentTagId = /* GraphQL */ `
  query ContentContentTagRelationsByContentTagId(
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
          organization_id
        }
        contentTag {
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
      nextToken
    }
  }
`;
export const surveySurveyTagRelationsBySurveyId = /* GraphQL */ `
  query SurveySurveyTagRelationsBySurveyId(
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
          interventionSurveysId
          organization_id
        }
        surveyTag {
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
      nextToken
    }
  }
`;
export const surveySurveyTagRelationsBySurveyTagId = /* GraphQL */ `
  query SurveySurveyTagRelationsBySurveyTagId(
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
          interventionSurveysId
          organization_id
        }
        surveyTag {
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
      nextToken
    }
  }
`;
