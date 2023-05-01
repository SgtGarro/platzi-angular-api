import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth.model';
import { User } from '../model/user.model';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.API_URL = `${environment.API_URL}/api/auth`;
  }

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  profile() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.API_URL}/profile`, { headers });
  }
  /* profile(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.API_URL}/profile`, {
      headers,
    });
  } */

  fetchLoginAndProfile(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.profile()!));
  }
}
