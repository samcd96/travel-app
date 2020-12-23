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
  public forgotPasswordMode = false;
  public changePasswordMode = false;
  public authenticate = true;
  public error: string;
  public email: string;
  public message: string;
  constructor(public store: Store<fromApp.AppState>, public router: Router) {}

  ngOnInit() {}

  // Operations

  onSubmitSignLogIn(form: NgForm) {
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
      .then(() => {
        this.error = null;
        this.onAuthenticate();
        this.displayMessage('Signed up successfully!');
      })
      .catch((error) => {
        console.log(error);
        this.error = error.message;
      });
  }

  onSubmitChangePassword(form: NgForm) {
    Auth.forgotPasswordSubmit(
      this.email,
      form.value.code,
      form.value.new_password
    )
      .then(() => {
        this.error = null;
        this.onAuthenticate();
        this.displayMessage('Password reset!');
      })
      .catch((error) => {
        console.log(error);
        this.error = error.message;
      });
  }

  onSubmitForgotPassword(form: NgForm) {
    this.email = form.value.userName;
    Auth.forgotPassword(this.email)
      .then(() => {
        this.error = null;
        this.onChangePassword();
        this.displayMessage(
          `Code set to ${this.email}. Use this to reset your password!`
        );
      })
      .catch((error) => {
        console.log(error);
        this.error = error.message;
      });
  }

  displayMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }

  // Changing modes

  onChangeAuthMode() {
    this.signInMode = !this.signInMode;
  }

  onAuthenticate() {
    this.forgotPasswordMode = false;
    this.signInMode = true;
    this.authenticate = true;
    this.changePasswordMode = false;
    this.error = null;
  }

  onForgetPassword() {
    this.forgotPasswordMode = true;
    this.authenticate = false;
    this.changePasswordMode = false;
    this.error = null;
  }

  onChangePassword() {
    this.forgotPasswordMode = false;
    this.authenticate = false;
    this.changePasswordMode = true;
  }
}
