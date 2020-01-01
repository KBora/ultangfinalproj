import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ScheduleItem, ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { Store } from 'store';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule.component.scss'],
  template: `
      <div class="schedule">

          <schedule-calendar
            [date]="date$ | async"
            [items]="schedule$ | async"
            (change)="changeDate($event)"
            (select)="changeSection($event)"
            >
          </schedule-calendar>
          
          <schedule-assign 
            *ngIf="open"
            [section]="selected$ | async"
            [list]="list$ | async">
              
          </schedule-assign>
      </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    private workoutService: WorkoutsService,
    private mealsService: MealsService
  ) {}

  changeDate(date: Date) {
    console.log('schedule.component date', date);
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    // go to service..
    console.log('changeSection: ', event);
    this.scheduleService.selectSection(event);
  }

  ngOnInit() {

    this.date$ = this.store.select('date'); // currently selected date
    this.schedule$ = this.store.select('schedule'); // ScheduleItem
    this.selected$ = this.store.select('selected'); // selected section
    this.list$ = this.store.select('list'); // list of meals OR workouts for a selected section

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutService.workouts$.subscribe()
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
