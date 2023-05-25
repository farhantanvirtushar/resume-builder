import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  user!: User;
  userProfileForm: FormGroup = this.fb.group({});
  col_span: number = 2;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    let profileStr = localStorage.getItem('profile');
    if (profileStr != null) {
      this.user = JSON.parse(profileStr);
    } else {
      this.user = {
        name: 'Lorem Ipsum',
        photo: '',
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
      localStorage.setItem('profile', JSON.stringify(this.user));
    }

    this.createForm();
    this.adjustColumns();
  }

  createForm() {
    this.userProfileForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      photo: [this.user.photo, [Validators.required]],
      experiences: this.fb.array([]),
      educatioins: [this.user.educations],
      languages: [this.user.languages],
      contact: this.fb.group({
        email: [this.user.contact.email],
        phone: [this.user.contact.phone],
        github: [this.user.contact.github],
        linkedin: [this.user.contact.linkedin],
        website: [this.user.contact.website],
        address: [this.user.contact.address],
      }),
      awards: [this.user.awards],
      publications: [this.user.publications],
      skills: [this.user.skills],
    });
  }

  addExperience() {
    const experience = this.fb.group({
      companyName: [''],
      designation: [''],
      employmentType: [''],
      startDate: [''],
      endDate: [''],
      currentlyWorking: [false],
      description: [''],
    });

    // let experienceFormArray = this.userProfileForm.get('expereinces')
    // console.log(experienceFormArray);
    // experienceFormArray.push(experience);
    // this.userProfileForm.setControl('experience', experienceFormArray);
  }

  adjustColumns() {
    if (this.screenSizeService.isMobileScreenSize) {
      this.col_span = 6;
    } else {
      this.col_span = 3;
    }
  }

  onResize(event: any) {
    this.adjustColumns();
  }

  onSubmit() {
    console.log(this.userProfileForm.value);
    if (this.userProfileForm.valid) {
      localStorage.setItem(
        'profile',
        JSON.stringify(this.userProfileForm.value)
      );
    }
  }
}
