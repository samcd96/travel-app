import { Action } from '@ngrx/store';
import { Trip } from '../../shared/models/trips.model';

export const SET_TRIPS = '[TRIPS] Set trips';
export const GET_TRIPS = '[TRIPS] Get trips';
export const ADD_SELECTED_ITEM = '[TRIPS] Select item';
export const REMOVE_SELECT_ITEM = '[TRIPS] Deselect item';
export const DESELECT_ALL = '[TRIPS] Deselect all';
export const ADD_ITEM = '[TRIPS] Add item';
export const UPDATE_ITEM = '[TRIPS] Update item';
export const DELETE_ITEM = '[TRIPS] Delete item';
export const ERROR = '[TRIPS] Error';
export const CHANGE_SELECTED_QUANTITY = '[TRIPS] Change selected quantity';

export class SetTrips implements Action {
  readonly type = SET_TRIPS;
  constructor(public payload: Trip[]) {}
}

export class GetTrips implements Action {
  readonly type = GET_TRIPS;
}

// export class AddTrip implements Action {
//   readonly type = ADD_ITEM;
//   constructor(
//     public payload: { name: string; catagory: string; price: number }
//   ) {}
// }

// export class UpdateTrip implements Action {
//   readonly type = UPDATE_ITEM;
//   constructor(
//     public payload: {
//       _id: string;
//       name: string;
//       catagory: string;
//       price: number;
//     }
//   ) {}
// }

// export class DeleteTrip implements Action {
//   readonly type = DELETE_ITEM;
//   constructor(public payload: string) {}
// }

export class Error implements Action {
  readonly type = ERROR;
  constructor(public payload: string) {}
}

export type TripsActions =
  | SetTrips
  | GetTrips
  // | AddTrip
  // | UpdateTrip
  // | DeleteTrip
  | Error;
