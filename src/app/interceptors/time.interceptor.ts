import {
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const CHECK_TIME = new HttpContextToken<boolean>(() => false);

export const checkTime = function () {
  return new HttpContext().set(CHECK_TIME, true);
};

@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.context.get(CHECK_TIME)) return next.handle(request);

    const start = performance.now();

    return next.handle(request).pipe(
      tap(() => {
        const time = performance.now() - start + 'ms';
        console.log(request.url, time);
      })
    );
  }
}
