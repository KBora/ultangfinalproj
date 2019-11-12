import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../app/containers/login/login.component';

export const ROUTES: Routes = [
  {
    path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})

export class LoginModule {}
