import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CustomValidators } from '../../shared/custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  errorsPresent = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email : new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(320)
      ]),
      password : new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24)
      ]
        ),
      confirmPassword : new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(24)
      ])
    });

    this.onChanges();
  }

//   pwdMatchValidator(frm: FormControl) {
//     return this.signupForm.value.password === frm.value
//        ? null : {'mismatch': true};
//  }

//   pwdMatchValidator(frm: FormGroup) {
//     return frm.get('password').value === frm.get('confirmPassword').value
//        ? null : {'mismatch': true};
//  }

  onChanges() {
    this.signupForm.get('email').valueChanges.subscribe(val => {
    this.authService.setErrorsPresent(false);
    });

    this.signupForm.get('confirmPassword').valueChanges.subscribe(val => {
      if (val !== this.signupForm.get('password').value) {
        console.log('mismatch!');
      } else {
        console.log('match!!');

      }
      });
  }

  // onSignup(form: NgForm) {
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   this.authService.signupUser(email, password);
  // }

  onFormSubmit() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.authService.signupUser(email, password);
  }

  change() {
    this.authService.setErrorsPresent(false);
  }

  ngOnDestroy() {
    const setSignup = false;
    this.authService.setSignedup(setSignup);
  }

}





