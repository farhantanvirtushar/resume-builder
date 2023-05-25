import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  public screenWidth: any;
  public screenHeight: any;

  public isMobileScreenSize: boolean = false;
  private mobileScreenSizeMax: number = 850;

  constructor() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.isMobileScreenSize = this.screenWidth <= this.mobileScreenSizeMax;
    window.addEventListener('resize', (event: Event) => {
      this.onWindowResize(event);
    });
  }

  onWindowResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.isMobileScreenSize = this.screenWidth <= this.mobileScreenSizeMax;
  }
}
