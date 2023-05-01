import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth.model';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = `${environment.API_URL}/api/auth`;
  }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.API_URL}/login`, { email, password });
  }

  profile(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.API_URL}/profile`, {
      headers,
    });
  }

  fetchLoginAndProfile(email: string, password: string, token: string) {
    return zip(this.login(email, password), this.profile(token));
  }
}
