import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatusListener = new Subject<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => {
          this.authStatusListener.next(true);
          resolve(userData);
        })
        .catch(err => {
          reject(err);
          this.authStatusListener.next(false);
        });
    });
  } /* END OF LOGIN */

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  } /* END OF GET-AUTH */

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  } /* END OF LOGIN */
}
