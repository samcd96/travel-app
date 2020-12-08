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
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  getTrips = this.actions$.pipe(
    ofType(TripsActions.GET_TRIPS),
    tap(() => {
      Auth.currentSession().then((res) => {
        let idtoken = res.getIdToken();
        this.jwt = idtoken.getJwtToken();
        console.log(res);
        if (this.jwt) {
          console.log(this.jwt);
        } else {
          console.log('jwt gone');
        }
        //You can print them to see the full objects
      });
    }),
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

  // @Effect()
  // addItem = this.actions$.pipe(
  //   ofType(TripsActions.ADD_ITEM),
  //   switchMap((reqData: TripsActions.AddItem) => {
  //     return this.http
  //       .post<ItemsResponseData>(`${environment.domain}api/v1/items/`, {
  //         name: reqData.payload.name,
  //         catagory: reqData.payload.catagory,
  //         price: reqData.payload.price,
  //       })
  //       .pipe(
  //         map((resData) => {
  //           return new TripsActions.SetItems(resData.data.data);
  //         }),
  //         catchError((errorRes) => {
  //           console.log(errorRes);
  //           return handleError(errorRes);
  //         })
  //       );
  //   })
  // );

  // @Effect()
  // updateItem = this.actions$.pipe(
  //   ofType(TripsActions.UPDATE_ITEM),
  //   switchMap((reqData: TripsActions.UpdateItem) => {
  //     return this.http
  //       .patch<ItemsResponseData>(
  //         `${environment.domain}api/v1/items/${reqData.payload._id}`,
  //         {
  //           name: reqData.payload.name,
  //           catagory: reqData.payload.catagory,
  //           price: reqData.payload.price,
  //         }
  //       )
  //       .pipe(
  //         map((resData) => {
  //           console.log('done');
  //           return new TripsActions.SetItems(resData.data.data);
  //         }),
  //         catchError((errorRes) => {
  //           console.log(errorRes);
  //           return handleError(errorRes);
  //         })
  //       );
  //   })
  // );

  // @Effect()
  // deleteItem = this.actions$.pipe(
  //   ofType(TripsActions.DELETE_ITEM),
  //   switchMap((reqData: TripsActions.DeleteItem) => {
  //     return this.http.delete<ItemsResponseData>(
  //       `${environment.domain}api/v1/items/${reqData.payload}`
  //     );
  //   }),
  //   map((resData) => {
  //     console.log('done');
  //     return new TripsActions.SetItems(resData.data.data);
  //   })
  // );
}
