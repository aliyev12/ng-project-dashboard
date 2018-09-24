import * as firebase from 'firebase';
import { SignupComponent } from './signup/signup.component';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  errorsPresent = false;
  signedUp = false;
  signedUpMessage: string;
  errorEmailPresent = false;
  errorEmailMessage = '';

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    console.log('signupUser started...');

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          this.signedUp = true;
          this.signedUpMessage = response.user.email;
          console.log('Successfully signed up!');
          console.log(response);
        }
      )
      .catch(
        error => {
          this.errorsPresent = true;
          console.log(error);
          console.log(error.code);
          if (error.code === 'auth/invalid-email') {
            this.errorEmailPresent = true;
            this.errorEmailMessage = error.message;
          }
        }
      );
  }

  signinUser(email: string, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
      return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  signedupSuccessfully() {
    return this.signedUp;
  }

  setSignedup(signedup: boolean) {
    this.signedUp = signedup;
  }

  newUsername() {
    return this.signedUpMessage;
  }

  emailErrorPresent() {
    return this.errorEmailPresent;
  }

  emailErrorMessage() {
    return this.errorEmailMessage;
  }

  errorsPresentNotification() {
    return this.errorsPresent;
  }

  setErrorsPresent(state: boolean) {
    this.errorsPresent = state;
  }
}
