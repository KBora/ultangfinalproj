import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// containers
import { ScheduleComponent } from './containers/schedule/schedule.component';

export const ROUTES: Routes = [
  {
    path: '', component: ScheduleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ScheduleComponent
  ]
})

export class ScheduleModule {}
