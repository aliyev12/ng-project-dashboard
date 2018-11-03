// import {Effect, Actions} from '@ngrx/effects';
// import {Injectable} from '@angular/core';
// import * as AuthActions from './auth.actions';
// import {switchMap, tap, map, mergeMap} from 'rxjs/operators';
// // $$ The RxJS provides a convenient method for turning a promise into an observable, it is called fromPromise, as demonstrated below:
// import {from} from 'rxjs';
// import * as firebase from 'firebase';
// import {Router} from '@angular/router';
// // $ for rxjs 6+, import whatever is right above this comment, and do the following: use pipe(mergeMap(...)) instead of
// // $  mergemap(...), as demonstrated somewhere below:

// @Injectable()
// export class AuthEffects {
//   // $ If you have a sideeffect that doesn't yield any action at the end then do the following:
//   // $ @Effect({dispatch: false})  . Otherwise, just do like below:
//   @Effect()
//   authSignup = this.actions$.ofType(AuthActions.TRY_SIGNUP).pipe(
//     // $ Extracting only the payload of this action with .map:
//     map((action: AuthActions.TrySignup) => {
//       // $ .map operator, will wrap the below into a new observable so I can chain more observables after the .map:
//       return action.payload;
//     }),
//     // $ Using firebase to try signing a user up:
//     // $ the .switchMap gets the authData with username and password:
//     switchMap((authData: {username: string; password: string}) => {
//       // $ In this .switchMap, I need to return a new observable because this is what @Effect is expecting:
//       // $ Turning a promise into an observable with 'fromPromise' operator:
//       return from(
//         firebase
//           .auth()
//           .createUserWithEmailAndPassword(authData.username, authData.password)
//           .catch(error => console.log('Error with signing up!'))
//       );
//     }),
//     switchMap(() => {
//       // $ Here I need to dispatch an action and fetch a token:
//       return from(firebase.auth().currentUser.getIdToken());
//     }),
//     // $ mergeMap returns an array of objects and they will be merged and set with ngrx to be used with @Effects
//     // $ Basically, mergeMap will end up returning two observables.
//     mergeMap((token: string) => {
//       this.router.navigate(['/']);
//       return [
//         {
//           // $ Emitting the SIGNUP action to update the authenticated to true within our store:
//           type: AuthActions.SIGNUP,
//         },
//         {
//           // $ !!! ATTENTION! Both property names (type and payload) are reserved by ngrx effects.
//           // $ Here I'm emitting SET_TOKEN action in order to extract the token and save it in out store:
//           type: AuthActions.SET_TOKEN,
//           payload: token,
//         },
//       ];
//     })
//   ); // end of pipe

//   @Effect()
//   authSignin = this.actions$.ofType(AuthActions.TRY_SIGNIN).pipe(
//     map((action: AuthActions.TrySignin) => {
//       console.log('Signing in with effect...');
//       return action.payload;
//     }),
//     switchMap((authData: {username: string; password: string}) => {
//       return from(
//         firebase
//           .auth()
//           .signInWithEmailAndPassword(authData.username, authData.password)
//           .then(whatever => {
//             console.log('firebase successfully sent user credentials.');
//             console.log('Whatever was inside the firebase packet: ');
//             console.log(whatever);
//           })
//           .catch(error => {
//             console.log('Error: ' + error);
//           })
//       );
//     }),
//     switchMap(() => {
//       return from(firebase.auth().currentUser.getIdToken());
//     }),
//     mergeMap((token: string) => {
//       console.log('redirecting to home page...');
//       this.router.navigate(['/']);
//       return [
//         {
//           type: AuthActions.SIGNIN,
//         },
//         {
//           type: AuthActions.SET_TOKEN,
//           payload: token,
//         },
//       ];
//     })
//   ); // end of pipe

//   @Effect({dispatch: false})
//   authLogout = this.actions$.ofType(AuthActions.LOGOUT).pipe(
//   tap(() => {
//     this.router.navigate(['/']);
//   })
//   ); // end of pipe

//   constructor(private actions$: Actions, private router: Router) {}
// }

// // $ Actions is something that listens to all the actions that take place in the application.
// // $ By assigning @Effect() to the authSignup variable, that property now is being controlled by the
// // $ ... Effects module that I'm importing.
// // $ The .ofType provided by the ngrx, allows checking the type of action that passes through the actions$
// // $ ... so that we're only continuoing to execure whatever is in that property if we meet that specified type for the action.
// // $ So, once a TRY_SIGNUP action is dispatched from anywhere in the application, only then we can chain other observable operators,
// // $...  such as switchMap etc...console.log();
// // $ In signup.component.ts, we dispatch a store action of type TrySignup, and pass an object as a payload with username and password.

// // $ Firebase returns promises, so use use the fromPromise operator to turn that promise into an observable.

// // $ At the end of Effect chain, we typically dispatch a new effect.
// // $ If we're NOT dispatching a new effect at the end of effect chain, then we can add a configuration to the @Effect at the very top,
// // $... to say:
// // $ ... @Effect({dispatch: false}), consequently, we MUST NOT emmit any actions in the mergeMap.
