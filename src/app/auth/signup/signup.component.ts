// import { Component, OnInit, OnDestroy } from '@angular/core';

// import {
//   FormGroup,
//   FormControl,
//   Validators
// } from '@angular/forms';
// import * as fromApp from '../../store/app.reducers';
// import * as AuthActions from '../store/auth.actions';
// import {Store} from '@ngrx/store';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent implements OnInit, OnDestroy {
//   signupForm: FormGroup;
//   errorsPresent = false;

//   constructor(
//     public authService: AuthService,
//     public store: Store<fromApp.AppState>,
//     public authActions: AuthActions.AuthActions
//   ) {}

//   ngOnInit() {
//     this.signupForm = new FormGroup({
//       email: new FormControl(null, [
//         Validators.required,
//         Validators.email,
//         Validators.minLength(6),
//         Validators.maxLength(320),
//       ]),
//       password: new FormControl(null, [
//         Validators.required,
//         Validators.minLength(8),
//         Validators.maxLength(24),
//       ]),
//       confirmPassword: new FormControl(null, [
//         Validators.required,
//         Validators.minLength(8),
//         Validators.maxLength(24),
//       ]),
//     });

//     this.onChanges();
//   }

//   onChanges() {
//     this.signupForm.get('email').valueChanges.subscribe(val => {
//       this.authService.setErrorsPresent(false);
//     });

//     this.signupForm.get('confirmPassword').valueChanges.subscribe(val => {
//       if (val !== this.signupForm.get('password').value) {
//         console.log('mismatch!');
//       } else {
//         console.log('match!!');
//       }
//     });
//   }

//   onFormSubmit() {
//     const email = this.signupForm.value.email;
//     const password = this.signupForm.value.password;
//     this.store.dispatch(
//       new AuthActions.TrySignup({username: email, password: password})
//     );
//   }

//   change() {
//     this.authService.setErrorsPresent(false);
//   }

//   ngOnDestroy() {
//     const setSignup = false;
//     this.authService.setSignedup(setSignup);
//   }
// }














import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignup({username: email, password: password}));
  }

}
