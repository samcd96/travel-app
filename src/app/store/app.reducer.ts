import { ActionReducerMap } from '@ngrx/store';
import * as fromTrips from '../shared/trips-store/trips.reducer';

export interface AppState {
  items: fromTrips.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  items: fromTrips.tripReducer,
};
