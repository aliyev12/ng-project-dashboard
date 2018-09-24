import { FormControl, AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {
  static passwordsMatch(c: AbstractControl): {[s: string]: boolean} {
    if (c.get('password') !== c.get('confirmPassword')) {
      console.log('passwordsDontMatch: true');

      return {'passwordsDontMatch': true};
    }
    return null;
  }


// ,CustomValidators.passwordsMatch(this.password, this.confirmedPassword).bind(this)


  // static invalidProjectName(control: FormControl): {[s: string]: boolean} {
  //   if (control.value === 'Test') {
  //     return {'invalidProjectName': true}
  //   }
  //   return null;
  // }


  // static asyncInvalidProjectName(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'Testproject') {
  //         resolve({'invalidProjectName': true});
  //       } else {
  //         resolve(null);
  //       }
  //     }, 2000);
  //   });
  //   return promise;
  // }


}
