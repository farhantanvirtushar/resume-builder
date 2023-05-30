import { Component, OnInit } from '@angular/core';
import { Template } from 'src/app/models/Template';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  templetList: Template[] =[
    {
      url:'template_1',
      isPro: false,
      image:'template_1.png'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
