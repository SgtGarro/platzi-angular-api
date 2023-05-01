import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css'],
})
export class ImgComponent {
  @Input() public img!: string;
  public imgDefault;

  constructor() {
    this.imgDefault =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
  }

  public imgError() {
    this.img = this.imgDefault;
  }
}
