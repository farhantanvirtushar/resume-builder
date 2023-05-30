import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.scss']
})
export class Template1Component implements OnInit {

  user!: User;
  constructor() { }

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];

  ngOnInit(): void {
    let profileStr = localStorage.getItem('profile');
    if (profileStr != null) {
      this.user = JSON.parse(profileStr);
      console.log(this.user);
    } else {
      this.user = {
        name: 'Lorem Ipsum',
        photo: '',
        summary: '',
        experiences: [],
        educations: [],
        languages: [],
        contact: {
          email: 'ex@example.com',
          phone: '',
        },
        awards: [],
        publications: [],
        skills: [],
      };
    }
  }

  getDateString(dateStr: string | null | undefined): string {

    if(!dateStr || dateStr === undefined || dateStr === null){
      return "";
    }
    let date = new Date(dateStr);

    return `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`;
  }

  save(){
    window.print()
  }

}
