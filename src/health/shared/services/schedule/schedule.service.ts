import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from 'store';


@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  public schedule$: Observable<any[]> = this.date$
    .do((next: any) => this.store.set('date', next));

  constructor(
    private store: Store
  ) {}

  // we can update behavioursubject ourselves using .next
  // this is why we used behaviour subject

  // when we do this, the above .do code (subscription) will set the new date in the store
  updateDate(date: Date) {
    this.date$.next(date);
  }
}
