import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import 'rxjs/operator/do';

export interface Workout {
  name: string,
  type: string, // endurance strength
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class WorkoutsService {

  workouts$: Observable<Workout[]> = this.db.list(`workouts/${this.uid}`)
    .do(next => this.store.set('workouts', next));
  // i think this is subscribing to all workouts for a user
  // and adding it to the 'workouts' variable in the store

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string) {
    if (!key) return Observable.of({}); // if no key, return empty object

    // no need to get workout from API
    // the Store will have the workouts available
    return this.store.select<Workout[]>('workouts')
      .filter(Boolean)  // stops stream if store does not have workouts
      .map( workouts => workouts.find((workout: Workout) => workout.$key === key));
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
