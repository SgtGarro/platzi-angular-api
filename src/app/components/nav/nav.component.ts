import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public isShownSidebar: boolean;
  public counter: number;
  public token: string;
  public user: User | null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService
  ) {
    this.isShownSidebar = false;
    this.counter = 0;
    this.token = '';
    this.user = null;
  }
  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleSidebar() {
    this.isShownSidebar = !this.isShownSidebar;
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

  public loginAndGetProfile() {
    this.authService
      .login('sebas123@gmail.com', '12345')
      .pipe(
        switchMap((token) => {
          this.token = token.access_token;
          return this.authService.profile(this.token);
        })
      )
      .subscribe((user) => {
        this.user = user;
      });
  }
}
