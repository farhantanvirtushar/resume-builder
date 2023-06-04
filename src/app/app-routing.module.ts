import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { Template1Component } from './templates/template1/template1.component';
import { Template2Component } from './templates/template2/template2.component';
import { Template3Component } from './templates/template3/template3.component';
import { Template4Component } from './templates/template4/template4.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent
  },
  {
    path: 'template_1',
    component: Template1Component
  },
  {
    path: 'template_2',
    component: Template2Component
  },
  {
    path: 'template_3',
    component: Template3Component
  },
  {
    path: 'template_4',
    component: Template4Component
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
