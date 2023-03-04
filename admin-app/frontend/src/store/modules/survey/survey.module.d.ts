import { Survey, SurveySurveyTagRelation, SurveyTag } from "../../../models";

export interface SurveyState {
  surveys: Survey[];
  tags: SurveyTag[];
  tagRelations: SurveySurveyTagRelation[];
  loading: boolean;
  filters: {
    _deleted: boolean;
    archived: boolean;
  };
}
