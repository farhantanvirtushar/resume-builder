import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
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
      url:'template_2',
      isPro: false,
      image:'template_2.png'
    },
    {
      url:'template_3',
      isPro: false,
      image:'template_3.png'
    },
    {
      url:'template_1',
      isPro: false,
      image:'template_1.png'
    },

  ];

  col_span: number = 2;
  constructor(private readonly meta: Meta, public screenSizeService: ScreenSizeService, private router: Router) {
    this.meta.removeTag('name="viewport"');
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' })
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
