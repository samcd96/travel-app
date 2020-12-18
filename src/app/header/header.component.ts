import { Auth } from 'aws-amplify';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
} from '@aws-amplify/ui-components';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { Router } from '@angular/router';
import * as TripsActions from '../shared/trips-store/trips.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(public store: Store<fromApp.AppState>, public router: Router) {}
  ngOnInit(): void {
    // onAuthUIStateChange((authState, authData) => {
    //   this.authState = authState;
    //   this.user = authData as CognitoUserInterface;
    //   // this.store.dispatch(
    //   //   new AuthActions.SetAuthState({ authState, user: this.user.attributes })
    //   // );
    //   this.ref.detectChanges();
    // });
  }

  onSignOut() {
    try {
      Auth.signOut({ global: true });
      this.store.dispatch(new TripsActions.ClearCache());
      this.router.navigate(['/auth']);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  onClickAllTrips() {
    this.router.navigate(['/trips']);
  }
}
