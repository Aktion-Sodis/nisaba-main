import { Survey } from '../../../models';

export interface SurveyState {
  surveys: Survey[];
  loading: boolean;
  filters: {
    _deleted: boolean;
    archived: boolean;
  };
}
