import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @HostListener('error') handleError():void{
    const elNative = this.elHost.nativeElement;
    elNative.src = 'https://i.ibb.co/hBvQtGZ/picture-2008484-960-720.png';
  }
  constructor(private elHost:ElementRef) {
    
  }

}
