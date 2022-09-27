import { Entity } from '../../../models';

export interface EntityState {
  entities: Entity[];
  loading: boolean;
  chosenEntityIds: string[]
}
