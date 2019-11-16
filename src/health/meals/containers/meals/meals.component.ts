import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

@Component({
  selector: 'meals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meals.component.scss'],
  template: `    
    <div class="meals">
        <div class="meals__title">
            <h1>
                <img src="/img/food.svg" alt="Food icon">
                Your meals
            </h1>
            <a href="" 
               class="btn__add"
               [routerLink]="['../meals/new']">
                <img src="/img/add-white.svg" alt="Add white">
                New meal
            </a>
        </div>
        
        <div *ngIf="meals$ | async as meals; else loading;">
            <div class="message" *ngIf="!meals.length">
                <img src="/img/face.svg" alt="No meals">
                No meals, add a new meal to start
            </div>
            <!-- meals ngFor -->
        </div>
        
        <ng-template #loading>
            <div class="message">
                <img src="/img/loading.svg" alt="Loading icon">
                Fetching meals ...
            </div>
        </ng-template>
        
    </div>
  `
})

export class MealsComponent implements OnInit, OnDestroy{

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private mealsService: MealsService
  ) {}

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
