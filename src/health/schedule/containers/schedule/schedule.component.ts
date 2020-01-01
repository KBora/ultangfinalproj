import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ScheduleItem, ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { Store } from 'store';

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
      </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
  ) {}

  changeDate(date: Date) {
    console.log('schedule.component date', date);
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    // go to service..
    console.log('changeSection: ', event);
    this.scheduleService.selectSection(event);
  }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
