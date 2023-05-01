import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.backgroundColor = 'red';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.backgroundColor = 'blue';
  }
  constructor(private elementRef: ElementRef) {}
}
