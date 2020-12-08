import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { tap } from 'rxjs/operators'; // fancy pipe-able operators
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (response) => {
          console.log('Oh boy we got an answer');
          console.log(request);
        },

        (error) => {
          console.log('Something might be burning back there');
          console.log(request);
        }
      )
    );
  }
}
