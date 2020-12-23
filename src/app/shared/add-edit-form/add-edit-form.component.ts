import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TripRequestBody } from '../models/tripRequestBody.model';
import { Trip } from '../models/trips.model';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css'],
})
export class AddEditFormComponent implements OnInit {
  public cardImageBase64 = null;
  @Output() results = new EventEmitter<TripRequestBody | null>();
  public isImageSaved = false;
  public error = null;
  // public editTripMode = false;
  @Input() trip = null;

  constructor() {}

  ngOnInit(): void {}

  onSubmitAddEditTrip(form: NgForm) {
    const result: TripRequestBody = {
      tripName: form.value.tripName,
      tripStart: form.value.tripStart,
      tripEnd: form.value.tripEnd,
      description: form.value.description,
    };
    if (this.cardImageBase64) {
      result.coverImage = this.cardImageBase64;
    }
    this.results.emit(result);
  }

  onCancelAddTrip() {
    this.results.emit(null);
  }

  fileChangeEvent(fileInput: any) {
    this.isImageSaved = false;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          if (image.height > image.width || image.width > 2 * image.height) {
            this.error = 'Inputted cover image is invalid';
            return;
          }
          console.log(image.height, image.width);
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
          this.error = null;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
