import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  styleUrls: ['./template2.component.scss']
})
export class Template2Component implements OnInit {

  user!: User;
  constructor(private readonly meta: Meta, private router: Router) {
    this.meta.removeTag('name="viewport"');
    this.meta.addTag({ name: 'viewport', content: 'width=1024' })

  }

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];

  ngOnInit(): void {
    let profileStr = localStorage.getItem('profile');
    if (profileStr != null) {
      this.user = JSON.parse(profileStr);
      console.log(this.user);
    } else {
      this.user = {
        name: 'Lorem Ipsum',
        profession: '',
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

  goHome() {
    this.router.navigate(['/home']);
  }

  save(){
    window.print()
  }
}
