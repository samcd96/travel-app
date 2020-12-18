import { Action } from '@ngrx/store';
import { TripRequestBody } from 'src/app/shared/models/tripRequestBody.model';
import { ImageRequestBody } from '../models/imageRequestBody.model';
import { Trip } from '../models/trips.model';

export const SET_TRIPS = '[TRIPS] Set trips';
export const GET_TRIPS = '[TRIPS] Get trips';
export const ADD_TRIP = '[TRIPS] Add trip';
export const SET_ADD_TRIP = '[TRIPS] Set add trip';
export const ERROR = '[TRIPS] Error';
export const GET_TRIP = '[TRIPS] Get trip';
export const SET_TRIP = '[TRIPS] Set trip';
export const UPDATE_TRIP = '[TRIPS] Update trip';
export const DELETE_TRIP = '[TRIPS] Delete trip';
export const SET_DELETE_TRIP = '[TRIPS] Set delete trip';
export const CLEAR_CACHE = '[TRIPS] Clear cache';

export class SetTrips implements Action {
  readonly type = SET_TRIPS;
  constructor(public payload: Trip[]) {}
}

export class GetTrips implements Action {
  readonly type = GET_TRIPS;
}

export class SetAddTrip implements Action {
  readonly type = SET_ADD_TRIP;
  constructor(public payload: Trip) {}
}

export class AddTrip implements Action {
  readonly type = ADD_TRIP;
  constructor(public payload: TripRequestBody) {}
}

export class GetTrip implements Action {
  readonly type = GET_TRIP;
  constructor(public payload: string) {}
}

export class SetTrip implements Action {
  readonly type = SET_TRIP;
  constructor(public payload: Trip) {}
}

export class UpdateTrip implements Action {
  readonly type = UPDATE_TRIP;
  constructor(
    public payload: {
      id: string;
      body:
        | TripRequestBody
        | ImageRequestBody
        | { removeImage: string }
        | { editCaption: ImageRequestBody };
    }
  ) {}
}

export class DeleteTrip implements Action {
  readonly type = DELETE_TRIP;
  constructor(public payload: string) {}
}

export class SetDeleteTrip implements Action {
  readonly type = SET_DELETE_TRIP;
  constructor(public payload: { message: string; id: string }) {}
}

export class Error implements Action {
  readonly type = ERROR;
  constructor(public payload: string) {}
}

export class ClearCache implements Action {
  readonly type = CLEAR_CACHE;
}

export type TripsActions =
  | SetTrips
  | GetTrips
  | GetTrip
  | AddTrip
  | SetAddTrip
  | SetTrip
  | SetDeleteTrip
  | UpdateTrip
  | DeleteTrip
  | Error
  | ClearCache;
