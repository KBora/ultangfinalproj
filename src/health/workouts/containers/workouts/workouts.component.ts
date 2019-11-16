import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'workouts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workouts.component.scss'],
  template: `
    <div>
        Workouts
    </div>
  `
})
export class WorkoutsComponent {
  constructor() {}
}
