import { Component, OnInit } from '@angular/core';
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { NgForm } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public user: any;
  public signInMode = true;
  public error: string;
  constructor(public store: Store<fromApp.AppState>, public router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (this.signInMode) {
      this.onSignIn(form);
    } else {
      this.onSignUp(form);
    }
  }

  onSignIn(form: NgForm) {
    Auth.signIn(form.value.userName, form.value.password)
      .then((user: CognitoUserInterface) => {
        console.log(user);
        this.user = user.attributes;
        this.router.navigate(['trips']);
        this.error = null;
      })
      .catch((error) => {
        console.log(error);
        this.error = error.message;
      });
  }

  onSignUp(form: NgForm) {
    Auth.signUp(form.value.userName, form.value.password)
      .then((stuff) => {
        console.log(stuff);
        this.error = null;
      })
      .catch((error) => {
        console.log(error);
        this.error = error.message;
      });
  }

  onChangeAuthMode() {
    this.signInMode = !this.signInMode;
  }
}
