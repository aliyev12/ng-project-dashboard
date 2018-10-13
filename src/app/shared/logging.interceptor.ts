import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import {tap} from 'rxjs/operators';

// if not using rxjs-compat, then import the following:
// import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ... and the following as well:
    // next.handle(req).pipe(tap(...))
    return next.handle(req).pipe(tap(
      event => {
        console.log('Logging interceptor', event);
      }
    ));
  }
}
