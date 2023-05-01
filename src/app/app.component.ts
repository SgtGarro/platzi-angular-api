import { Component } from '@angular/core';
import { User } from './model/user.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'my-store';
  public token: string;
  public user: User;

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.token = '';
    this.user = {
      id: '0',
      name: 'example',
      email: 'example@mail.com',
      password: '12345',
    };
  }

  public createUser() {
    this.usersService
      .createUser({
        name: 'Sebas',
        email: 'sebas123@gmail.com',
        password: '12345',
      })
      .subscribe({
        next: (user) => console.log(user),
      });
  }

  public login() {
    this.authService.login('sebas123@gmail.com', '12345').subscribe({
      next: (token) => {
        this.token = token.access_token;
      },
    });
  }

  public getProfile() {
    this.authService.profile(this.token).subscribe((profile) => {
      console.log(profile);
      this.user = profile;
    });
  }
}
