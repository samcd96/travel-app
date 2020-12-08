import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Trip } from '../shared/models/trips.model';
import * as fromApp from '../store/app.reducer';
import * as TripsActions from './store/trips.actions';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  jwt: string;
  trips: Trip[];
  constructor(public store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new TripsActions.GetTrips());
    this.store.select('items').subscribe((tripsState) => {
      this.trips = tripsState.allTrips;
    });
  }
}
