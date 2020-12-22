import { findIndex } from 'rxjs/operators';
import { Trip } from '../models/trips.model';
import * as TripsActions from './trips.actions';

export interface State {
  processing: boolean;
  allTrips: Trip[];
  errorMessage: string;
  selectedTrip: Trip;
}

const initialState: State = {
  processing: false,
  allTrips: [],
  errorMessage: null,
  selectedTrip: null,
};

export function tripReducer(
  state = initialState,
  action: TripsActions.TripsActions
) {
  switch (action.type) {
    case TripsActions.GET_TRIPS:
      return {
        ...state,
        processing: true,
      };
    case TripsActions.SET_TRIPS:
      return {
        ...state,
        allTrips: [...action.payload],
        errorMessage: null,
        processing: false,
      };
    case TripsActions.ADD_TRIP:
      return {
        ...state,
        processing: true,
      };
    case TripsActions.SET_ADD_TRIP:
      return {
        ...state,
        processing: false,
        allTrips: [...state.allTrips, action.payload],
        errorMessage: null,
      };
    case TripsActions.GET_TRIP:
      return {
        ...state,
        processing: true,
      };
    case TripsActions.UPDATE_TRIP:
      return {
        ...state,
        processing: true,
      };
    case TripsActions.SET_TRIP:
      const updateId = action.payload.id;
      const updateIndex = state.allTrips.findIndex((el) => el.id === updateId);
      let updatedTrips = [...state.allTrips];
      updatedTrips[updateIndex] = { ...action.payload };
      return {
        ...state,
        allTrips: updatedTrips,
        selectedTrip: { ...action.payload },
        errorMessage: null,
        processing: false,
      };
    case TripsActions.DELETE_TRIP:
      console.log(action.payload);
      return {
        ...state,
        processing: true,
      };
    case TripsActions.SET_DELETE_TRIP:
      console.log(action.payload);
      return {
        ...state,
        allTrips: state.allTrips.filter((trip) => {
          return trip.id !== action.payload.id;
        }),
        selectedTrip: null,
        errorMessage: null,
        processing: false,
      };
    case TripsActions.ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        processing: false,
      };
    case TripsActions.CLEAR_CACHE:
      return {
        ...state,
        processing: false,
        allTrips: [],
        errorMessage: null,
        selectedTrip: null,
      };
    default:
      return state;
  }
}
