import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Auth, Hub } from 'aws-amplify';

import { Trip } from '../shared/models/trips.model';
import * as fromApp from '../store/app.reducer';
import * as TripsActions from '../shared/trips-store/trips.actions';
import { TripRequestBody } from '../shared/models/tripRequestBody.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit, OnDestroy {
  public jwt: string;
  public trips: Trip[];
  public tripsSub: Subscription;
  public addTripMode = false;
  public isImageSaved = false;
  public cardImageBase64: string;
  public user: any;
  public loading = false;
  public error = null;

  constructor(public store: Store<fromApp.AppState>, public router: Router) {}

  ngOnInit(): void {
    this.onAuthEvent();
    Hub.listen('auth', () => {
      this.onAuthEvent();
    });
    this.store.dispatch(new TripsActions.GetTrips());
    this.tripsSub = this.store.select('items').subscribe((tripsState) => {
      this.trips = tripsState.allTrips;
      this.loading = tripsState.processing;
    });
  }

  onAuthEvent() {
    Auth.currentSession()
      .then((state) => {
        this.user = state;
        if (!this.user) {
          this.router.navigate(['/auth']);
        }
      })
      .catch(() => {
        this.user = null;
        this.router.navigate(['/auth']);
      });
  }

  onAddTrip() {
    this.addTripMode = true;
  }

  onSubmit(results: TripRequestBody | null) {
    if (results) {
      this.store.dispatch(new TripsActions.AddTrip(results));
    }
    this.addTripMode = false;
  }

  ngOnDestroy() {
    this.tripsSub.unsubscribe();
  }

  onDeleteTrip(deletingTripId: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this trip?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })
      .then((result) => {
        if (result.value) {
          this.store.dispatch(new TripsActions.DeleteTrip(deletingTripId));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
