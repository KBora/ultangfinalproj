import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from '../../../shared/services/meals/meals.service';
import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-assign.component.scss'],
  template: `
    <div class="schedule-assign">
        
        <div class="schedule-assign__modal">
            <div class="schedule-assign__title">
                <h1>
                    <img src="/img/{{ section.type === 'workouts' ? 'workout' : 'food'}}.svg " alt="">
                    Assign {{ section.type }}
                </h1>
                <a class="btn__add"
                    [routerLink]="getRoute(section.type)">
                    <img src="/img/add-white.svg" alt="">
                    New {{ section.type }}
                </a>
            </div>
        </div>
        
    </div>
  `
})
export class ScheduleAssignComponent implements OnInit {

  @Input()
  section: any;

  @Input()
  list: Meal[] | Workout[];

  ngOnInit(): void {

  }

  getRoute(name: string) {
    return[`../${name}/new`];
  }
}
