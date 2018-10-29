// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
// } from '@angular/router';
// import {AuthService} from '../services/auth.service';
// import {Observable} from 'rxjs';
// import {Injectable} from '@angular/core';
// // import {Store} from '@ngrx/store';
// // import * as fromApp from '../store/app.reducers';
// // import * as fromAuth from '../auth/store/auth.reducers';
// import {tap, map, take} from 'rxjs/operators';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     // private store: Store<fromApp.AppState>,
//     private auth: AuthService,
//     private router: Router
//   ) {}

//   /** ORIGINAL SOLUTION: */
//   // canActivate(
//   //   route: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot
//   //   ) {
//   //   return this.store.select('auth').pipe(
//   //     take(1),
//   //     map((authState: fromAuth.State) => {
//   //       return authState.authenticated; // end up having a new array array[false/true]
//   //     })
//   //   );
//   // }






// }
