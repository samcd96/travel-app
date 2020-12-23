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
  styleUrls: ['./trip-page.component.css', '../shared/styles/common-forms.css'],
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
  public hovering: boolean;

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
    this.imageBase64 = null;
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

  onMouseEnter() {
    this.hovering = true;
  }

  onMouseLeave() {
    this.hovering = false;
  }

  fileChangeEvent(fileInput: any) {
    this.isImageSaved = false;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          console.log(image.height, image.width);
          const imgBase64Path = e.target.result;
          this.imageBase64 = imgBase64Path;
          this.isImageSaved = true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
