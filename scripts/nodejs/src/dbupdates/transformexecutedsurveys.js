import Amplify, { API, Auth } from "aws-amplify";
import * as queries from "../graphql/queries.js"
import * as mutations from "../graphql/mutations.js";

const transformexecutedsurveys = async () => {
    const executedSurveysResult = await API.graphql({
        query: queries.listExecutedSurveys
    })
    const executedSurveys = executedSurveysResult.data.listExecutedSurveys.items;
    for (const executedSurvey of executedSurveys) {
        var newExecutedSurvey = {
            
            surveyID: executedSurvey.survey.id,
            date: executedSurvey.date,
            location: executedSurvey.location,
            answers: executedSurvey.answers,
            schemeVersion: executedSurvey.schemeVersion,
            id: executedSurvey.id,
            _version: executedSurvey._version,
            appliedInterventionExecutedSurveysId: executedSurvey.appliedIntervention.id,
            executedSurveySurveyId: executedSurvey.survey.id,
            executedSurveyWhoExecutedItId: executedSurvey.whoExecutedIt.id

        }
        const updatedResult = await API.graphql({
            query: mutations.updateExecutedSurvey,
            variables: {
                input: newExecutedSurvey,
              },
        });
    }
}

/*
type ExecutedSurvey {
  appliedIntervention: AppliedIntervention!
  survey: Survey!
  surveyID: String
  whoExecutedIt: User!
  date: AWSDateTime!
  location: Location
  answers: [QuestionAnswer!]!
  schemeVersion: Int
  id: ID!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  _version: Int!
  _deleted: Boolean
  _lastChangedAt: AWSTimestamp!
  appliedInterventionExecutedSurveysId: ID!
  executedSurveySurveyId: ID!
  executedSurveyWhoExecutedItId: ID!
}
*/ 
export default transformexecutedsurveys;