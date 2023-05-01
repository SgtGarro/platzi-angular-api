import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../model/user.model';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = `${environment.API_URL}/api/users`;
  }

  createUser(user: CreateUserDTO) {
    return this.http.post<User>(this.API_URL, user);
  }
  getAllUser() {
    return this.http.get<User[]>(this.API_URL);
  }
}
