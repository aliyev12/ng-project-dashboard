import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {take, switchMap} from 'rxjs/operators';

import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    // const copiedReq = req.clone({headers: req.headers.set('', '')});
    // const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});

    return this.store
      .select('auth')
      .pipe(take(1))
      .pipe(
        switchMap((authState: fromAuth.State) => {
          const copiedReq = req.clone({
            params: req.params.set('auth', authState.token),
          });
          console.log(
            `We're inside the interceptor, ready to return next.handle...`
          );
          return next.handle(copiedReq);
        })
      );
  }
}
