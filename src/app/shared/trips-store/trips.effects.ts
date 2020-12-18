import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as TripsActions from './trips.actions';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Trip } from 'src/app/shared/models/trips.model';
import { Auth } from 'aws-amplify';

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occured!';
  if (!errorRes.error || !errorRes.error.message) {
    return of(new TripsActions.Error(errorMessage));
  }
  errorMessage = errorRes.error.message;
  return of(new TripsActions.Error(errorMessage));
};

@Injectable()
export class TripsEffects {
  jwt: string;
  constructor(private actions$: Actions, private http: HttpClient) {
    Auth.currentSession()
      .then((res) => {
        let idtoken = res.getIdToken();
        this.jwt = idtoken.getJwtToken();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  @Effect()
  getTrips = this.actions$.pipe(
    ofType(TripsActions.GET_TRIPS),

    switchMap(() => {
      return this.http
        .get<Trip[]>(`${environment.domain}/trips`, {
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
        })
        .pipe(
          map((tripsResponse) => {
            return new TripsActions.SetTrips(tripsResponse);
          }),
          catchError((errorRes) => {
            console.log(errorRes);
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  addTrip = this.actions$.pipe(
    ofType(TripsActions.ADD_TRIP),
    switchMap((reqData: TripsActions.AddTrip) => {
      return this.http
        .post<Trip>(`${environment.domain}/trips`, reqData.payload, {
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
        })
        .pipe(
          map((resData) => {
            console.log('done');
            return new TripsActions.SetAddTrip(resData);
          }),
          catchError((errorRes) => {
            console.log(errorRes);
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  getTrip = this.actions$.pipe(
    ofType(TripsActions.GET_TRIP),

    switchMap((idData: TripsActions.GetTrip) => {
      return this.http
        .get<Trip>(`${environment.domain}/trips/${idData.payload}`, {
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
        })
        .pipe(
          map((tripsResponse) => {
            return new TripsActions.SetTrip(tripsResponse);
          }),
          catchError((errorRes) => {
            console.log(errorRes);
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  updateTrip = this.actions$.pipe(
    ofType(TripsActions.UPDATE_TRIP),

    switchMap((reqData: TripsActions.UpdateTrip) => {
      console.log(reqData.payload);
      return this.http
        .put<Trip>(
          `${environment.domain}/trips/${reqData.payload.id}`,
          reqData.payload.body,
          {
            headers: {
              Authorization: `Bearer ${this.jwt}`,
            },
          }
        )
        .pipe(
          map((tripsResponse) => {
            return new TripsActions.SetTrip(tripsResponse);
          }),
          catchError((errorRes) => {
            console.log(errorRes);
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  deleteTrip = this.actions$.pipe(
    ofType(TripsActions.DELETE_TRIP),

    switchMap((reqData: TripsActions.DeleteTrip) => {
      console.log(reqData.payload);
      return this.http
        .delete<{ message: string; id: string }>(
          `${environment.domain}/trips/${reqData.payload}`,
          {
            headers: {
              Authorization: `Bearer ${this.jwt}`,
            },
          }
        )
        .pipe(
          map((tripsResponse) => {
            return new TripsActions.SetDeleteTrip(tripsResponse);
          }),
          catchError((errorRes) => {
            console.log(errorRes);
            return handleError(errorRes);
          })
        );
    })
  );
}
