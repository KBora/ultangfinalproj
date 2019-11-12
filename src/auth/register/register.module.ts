import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../../app/containers/register/register.component';

export const ROUTES: Routes = [
  {
    path: '', component: RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    RegisterComponent
  ],
  providers: []
})

export class RegisterModule {}
