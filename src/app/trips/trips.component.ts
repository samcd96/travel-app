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
  public isImageSaved = true;
  public cardImageBase64: string;
  public user: any;
  public loading = false;

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

  onSubmitAddTrip(form: NgForm) {
    const newTripRequestBody: TripRequestBody = {
      tripName: form.value.tripName,
      tripStart: form.value.tripStart,
      tripEnd: form.value.tripEnd,
      description: form.value.description,
    };
    if (this.cardImageBase64) {
      newTripRequestBody.coverImage = this.cardImageBase64;
    }
    this.addTripMode = false;

    this.store.dispatch(new TripsActions.AddTrip(newTripRequestBody));
  }

  onCancelAddTrip() {
    this.addTripMode = false;
  }

  ngOnDestroy() {
    this.tripsSub.unsubscribe();
  }

  fileChangeEvent(fileInput: any) {
    this.isImageSaved = false;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
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
