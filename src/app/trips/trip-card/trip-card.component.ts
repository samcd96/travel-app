import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Trip } from 'src/app/shared/models/trips.model';
import * as fromApp from '../../store/app.reducer';
import * as TripsActions from '../../shared/trips-store/trips.actions';
@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent implements OnInit {
  @Input() trip: Trip;
  @Output() deletingTripId = new EventEmitter<String>();
  public hovering = false;

  constructor(public store: Store<fromApp.AppState>, private router: Router) {}

  onSelect() {
    this.router.navigate([`tripPage/${this.trip.id}`]);
  }

  onDeleteTrip() {
    this.deletingTripId.emit(this.trip.id);
  }

  onMouseEnter() {
    this.hovering = true;
  }

  onMouseLeave() {
    this.hovering = false;
  }

  ngOnInit(): void {}
}
