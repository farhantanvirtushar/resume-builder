import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { Template1Component } from './templates/template1/template1.component';

const routes: Routes = [
  {
    path: 'home',
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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
