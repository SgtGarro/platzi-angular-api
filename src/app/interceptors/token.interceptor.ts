import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request).pipe();
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();

    if (!token) return request;

    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return authRequest;
  }
}
