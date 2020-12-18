import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trip-image',
  templateUrl: './trip-image.component.html',
  styleUrls: ['./trip-image.component.css'],
})
export class TripImageComponent implements OnInit {
  @Input() image: { image: string; caption: string };
  @Output() deletingImage = new EventEmitter<string>();
  @Output() updateCaption = new EventEmitter<{
    image: string;
    caption: string;
  }>();
  public editCaptionMode = false;
  constructor() {}

  ngOnInit(): void {}

  onDeleteImage(image: string) {
    this.deletingImage.emit(image);
  }

  onClickCaption() {
    this.editCaptionMode = true;
  }

  onSubmitCaption(form: NgForm) {
    console.log(form.value.caption);

    this.updateCaption.emit({
      image: this.image.image,
      caption: form.value.caption,
    });
    this.editCaptionMode = false;
  }

  onCancelEditCaption() {
    this.editCaptionMode = false;
  }
}
