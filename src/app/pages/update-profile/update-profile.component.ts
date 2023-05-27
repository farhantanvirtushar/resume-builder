import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/Experience';
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
      experiences: this.fb.array(
        this.user.experiences.map((experience) => {
          return this.fb.group({
            companyName: experience.companyName,
            designation: experience.designation,
            employmentType: experience.employmentType,
            startDate: experience.startDate,
            endDate: experience.endDate,
            currentlyWorking: experience.currentlyWorking,
            description: experience.description,
          });
        })
      ),
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

  getFormControlExperience(): FormArray {
    return this.userProfileForm.controls['experiences'] as FormArray;
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

    (this.userProfileForm.controls['experiences'] as FormArray).push(
      experience
    );
  }

  removeExperience(index: number) {
    console.log(index);
    (this.userProfileForm.controls['experiences'] as FormArray).removeAt(index);
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
    this.updateUserProfile();
  }

  updateUserProfile() {
    this.user.name = this.userProfileForm.value.name;
    this.user.photo = this.userProfileForm.value.photo;
    this.user.contact = this.userProfileForm.value.contact;
    this.user.experiences = this.userProfileForm.value.experiences;
    this.user.educations = this.userProfileForm.value.educations;
    this.user.languages = this.userProfileForm.value.languages;
    this.user.awards = this.userProfileForm.value.awards;
    this.user.publications = this.userProfileForm.value.publications;
    this.user.skills = this.userProfileForm.value.skills;

    localStorage.setItem('profile', JSON.stringify(this.user));
  }
}
