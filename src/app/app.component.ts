import { Component } from '@angular/core';
import { User } from './model/user.model';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
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
  public imgRta: string;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private filesService: FilesService
  ) {
    this.token = '';
    this.user = {
      id: '0',
      name: 'example',
      email: 'example@mail.com',
      password: '12345',
    };
    this.imgRta = '';
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
    this.authService.profile()?.subscribe((profile) => {
      console.log(profile);
      this.user = profile;
    });
  }

  public downloadPDF() {
    this.filesService
      .getFile(
        'my-file.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  public onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (!file) return;

    this.filesService.uploadFile(file).subscribe((rta) => {
      this.imgRta = rta.location;
    });
  }
}
