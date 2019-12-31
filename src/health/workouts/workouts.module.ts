import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';

// containers
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { SharedModule } from '../shared/shared.module';
import { WorkoutComponent } from './containers/workout/workout.component';
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';

export const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'new', component: WorkoutComponent },
  { path: ':id', component: WorkoutComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    WorkoutsComponent,
    WorkoutComponent,
    WorkoutFormComponent,
    WorkoutTypeComponent
  ]
})

export class WorkoutsModule {}
