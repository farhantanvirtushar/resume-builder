import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Template } from 'src/app/models/Template';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public templateList: Template[] =[
    {
      url:'template_1',
      isPro: false,
      image:'template_1.png'
    },
    {
      url:'template_1',
      isPro: false,
      image:'template_1.png'
    },
    {
      url:'template_1',
      isPro: false,
      image:'template_1.png'
    },
    {
      url:'template_1',
      isPro: false,
      image:'template_1.png'
    },

  ];

  col_span: number = 2;
  constructor(public screenSizeService: ScreenSizeService, private router: Router) {
    this.adjustColumns();
  }


  ngOnInit(): void {
  }

  adjustColumns() {
    if (this.screenSizeService.isMobileScreenSize) {
      this.col_span = 3;
    } else {
      this.col_span = 2;
    }
  }

  onResize(event: any) {
    this.adjustColumns();
  }

  preview(url: string) {
    this.router.navigate(['/' + url]);
  }

  goToUpdatePage(){
    this.router.navigate(['/update-profile']);
  }
}
