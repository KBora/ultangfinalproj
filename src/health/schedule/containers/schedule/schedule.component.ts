import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule.component.scss'],
  template: `
    <div>
        Schedule
    </div>
  `
})
export class ScheduleComponent {
  constructor() {}
}
