import { Trip } from '../../shared/models/trips.model';
import * as TripsActions from './trips.actions';

export interface State {
  allTrips: Trip[];
  errorMessage: string;
}

const initialState: State = {
  allTrips: [],
  errorMessage: null,
};

export function tripReducer(
  state = initialState,
  action: TripsActions.TripsActions
) {
  switch (action.type) {
    case TripsActions.SET_TRIPS:
      return {
        ...state,
        allTrips: [...action.payload],
        errorMessage: null,
      };
    case TripsActions.ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
