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
        profession:'',
        photo: '',
        summary:'',
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
      profession: [this.user.profession],
      photo: [this.user.photo],
      summary: [this.user.summary],
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
      educations: this.fb.array(
        this.user.educations.map((educatioin) => {
          return this.fb.group({
            school: educatioin.school,
            degree: educatioin.degree,
            major: educatioin.major,
            startDate: educatioin.startDate,
            endDate: educatioin.endDate,
            grade: educatioin.grade,
          });
        })
      ),
      languages: this.fb.array(
        this.user.languages.map((language) => {
          return this.fb.group({
            name: language.name,
            proficiency: language.proficiency,
          });
        })
      ),
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
      skills: this.fb.array(
        this.user.skills.map((skill) => {
          return this.fb.group({
            name: skill.name,
            proficiency: skill.proficiency,
          });
        })
      ),
    });
  }

  getFormControlExperience(): FormArray {
    return this.userProfileForm.controls['experiences'] as FormArray;
  }

  getFormControlEducation(): FormArray {
    return this.userProfileForm.controls['educations'] as FormArray;
  }

  getFormControlSkills(): FormArray {
    return this.userProfileForm.controls['skills'] as FormArray;
  }
  getFormControlLanguages(): FormArray {
    return this.userProfileForm.controls['languages'] as FormArray;
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
    (this.userProfileForm.controls['experiences'] as FormArray).removeAt(index);
  }

  addEducation() {
    const education = this.fb.group({
      school: [''],
      degree: [''],
      major: [''],
      startDate: [''],
      endDate: [''],
      grade: [],
    });

    (this.userProfileForm.controls['educations'] as FormArray).push(education);
  }

  removeEducation(index: number) {
    (this.userProfileForm.controls['educations'] as FormArray).removeAt(index);
  }

  addSkill() {
    const education = this.fb.group({
      name: [''],
      proficiency: [50.0],
    });

    (this.userProfileForm.controls['skills'] as FormArray).push(education);
    let temp = (
      (this.userProfileForm.controls['skills'] as FormArray).at(0) as FormGroup
    ).controls['proficiency'].value;
    console.log(temp);
  }

  removeSkill(index: number) {
    (this.userProfileForm.controls['skills'] as FormArray).removeAt(index);
  }

  addLanguage() {
    const language = this.fb.group({
      name: [''],
      proficiency: [50.0],
    });

    (this.userProfileForm.controls['languages'] as FormArray).push(language);

  }

  removeLanguage(index: number) {
    (this.userProfileForm.controls['languages'] as FormArray).removeAt(index);
  }

  formatLabel(value: number): string {
    if (value >= 1) {
      return Math.round(value) + '%';
    }

    return `${value}`;
  }

  getToolTipText(value: number) {
    return `${value}%`;
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

  cancel() {
    this.router.navigate(['/home']);
  }

  updateUserProfile() {
    this.user.name = this.userProfileForm.value.name;
    this.user.profession = this.userProfileForm.value.profession;
    this.user.photo = this.userProfileForm.value.photo;
    this.user.summary = this.userProfileForm.value.summary;
    this.user.contact = this.userProfileForm.value.contact;
    this.user.experiences = this.userProfileForm.value.experiences;
    this.user.educations = this.userProfileForm.value.educations;
    this.user.languages = this.userProfileForm.value.languages;
    this.user.awards = this.userProfileForm.value.awards;
    this.user.publications = this.userProfileForm.value.publications;
    this.user.skills = this.userProfileForm.value.skills;

    localStorage.setItem('profile', JSON.stringify(this.user));
    this.router.navigate(['/home']);
  }
}
