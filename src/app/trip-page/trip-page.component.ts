import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Trip } from '../shared/models/trips.model';
import * as fromApp from '../store/app.reducer';
import * as TripsActions from '../shared/trips-store/trips.actions';
import { NgForm } from '@angular/forms';
import { TripRequestBody } from '../shared/models/tripRequestBody.model';
import { ImageRequestBody } from '../shared/models/imageRequestBody.model';

@Component({
  selector: 'app-trip-page',
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.css'],
})
export class TripPageComponent implements OnInit {
  public tripSub: Subscription;
  public trip: Trip;
  public editCoverMode = false;
  public isImageSaved = false;
  public newImage = false;
  public addImageMode = false;
  public coverImageBase64: string;
  public imageBase64: string;
  public loading = false;

  constructor(public store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    const urlArray = this.router.url.split('/');
    const id = urlArray[urlArray.length - 1];
    this.store.dispatch(new TripsActions.GetTrip(id));
    this.tripSub = this.store.select('items').subscribe((tripsState) => {
      this.trip = tripsState.selectedTrip;
      this.loading = tripsState.processing;
    });
  }

  onEditCover() {
    this.editCoverMode = true;
  }

  onSubmitEditCover(results: TripRequestBody | null) {
    if (results) {
      this.store.dispatch(
        new TripsActions.UpdateTrip({
          id: this.trip.id,
          body: results,
        })
      );
    }
    this.editCoverMode = false;
  }

  addImage() {
    this.addImageMode = true;
  }

  onCancelAddImage() {
    this.addImageMode = false;
  }

  onSubmitAddImage(imageform: NgForm) {
    const newImageRequestBody: ImageRequestBody = {
      image: {
        image: this.imageBase64,
        caption: imageform.value.caption,
      },
    };
    this.store.dispatch(
      new TripsActions.UpdateTrip({
        id: this.trip.id,
        body: newImageRequestBody,
      })
    );
    this.addImageMode = false;
  }

  deleteImage(image: string) {
    this.store.dispatch(
      new TripsActions.UpdateTrip({
        id: this.trip.id,
        body: { removeImage: image },
      })
    );
  }

  changeCaption(image: ImageRequestBody) {
    this.store.dispatch(
      new TripsActions.UpdateTrip({
        id: this.trip.id,
        body: { editCaption: image },
      })
    );
  }
}
