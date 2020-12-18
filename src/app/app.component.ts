import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@aws-amplify/ui-components';

import * as fromApp from './store/app.reducer';
import { Subscription } from 'rxjs';
import { Auth, Hub } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'travel-app-front';
  authSub: Subscription;
  authState: AuthState;
  user: any = null;

  constructor(public store: Store<fromApp.AppState>, public router: Router) {}
  onAuthEvent() {
    Auth.currentSession()
      .then((state) => {
        console.log(state);
        this.user = state;
        if (!this.user) {
          this.router.navigate(['/auth']);
        }
      })
      .catch((error) => {
        console.log(error);
        this.user = null;
        this.router.navigate(['/auth']);
      });
  }
  ngOnInit() {
    this.onAuthEvent();
    Hub.listen('auth', () => {
      this.onAuthEvent();
    });
  }

  ngOnDestroy() {
    // this.authSub.unsubscribe();
  }
}
