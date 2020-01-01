import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from 'store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[],
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  // this is what firebase returns
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}
// the last property enables us to lookup item using an index lookup

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();

  // this keeps track of what section the user has just selected
  selected$ = this.section$
    .do((next: any) => this.store.set('selected', next ));

  // revision: these chained observable operations work on the stream and pass (another observable) to the next operator
  // eg map returns an object {startAt, endAt} to the next operator in the stream
  // note: .do / .tap does not modify the stream
  // the last operator in the stream needs to return the right type
  // in this case <ScheduleItem[]>
  // however each operation in the middle can do whatever

  // so it is basically like a sequence of operations on Observables



  // $schedule subscribes to $date and gets schedules from firebase
  public schedule$: Observable<ScheduleItem[]> = this.date$
    .do((next: any) => this.store.set('date', next))
    .map((day: any) => {

      const startAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ).getTime();
      const endAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
      ).getTime() - 1; // this gets the next day in milliseconds minus 1 millisecond!

      return { startAt , endAt };
    })
    .switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt))
    .map((data: any) => {
      const mapped: ScheduleList = {};

      for (const prop of data) {
        if (!mapped[prop.section]) { // this  maps firebase output into a ScheduleList.. this is the section name
          mapped[prop.section] = prop;
        }
      }
      // todo: debug this and find out how ScheduleList gets turned in ScheduleItem array
      // and what the store sets

      return mapped;
    })
    .do((next: any) => this.store.set('schedule', next));

  constructor(
    private store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  // we can update behavioursubject ourselves using .next
  // this is why we used behaviour subject

  // when we do this, the above .do code (subscription) will set the new date in the store
  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    //  passing what the user has selected into the section$ subject
    this.section$.next(event);
  }

  private getSchedule(startAt: number, endAt: number) {
    // get info from firebase
    return this.db.list(`schedule/${this.uid}`, {
      query: {
        orderByChild: 'timestamp',
        startAt,
        endAt
      }
    });
  }
}
