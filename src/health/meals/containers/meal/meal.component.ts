import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `    
    <div class="meal">
        <div class="meal__title">
            <h1>
                <img src="/img/food.svg" alt="">
                <span *ngIf="meal$ | async as meal; else title;">
                    {{ meal.name ? 'Edit' : 'Create' }} meal
                </span>
                <ng-template #title>
                    Loading ...
                </ng-template>
            </h1>
        </div>
        <div *ngIf="meal$ | async as meal; else loading;">
            <meal-form 
                [meal]="meal"
                (update)="updateMeal($event)"
                (remove)="removeMeal($event)"
                (create)="addMeal($event)">
            </meal-form>
        </div>
        <ng-template #loading>
            <div class="message">
                <img src="/img/loading.svg" >
                Fetching meal...
            </div>
        </ng-template>
    </div>
  `
})

export class MealComponent implements OnInit, OnDestroy {

  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();

    // this gets a meal from the meals service, based on the params in the route
    this.meal$ = this.route.paramMap
      .switchMap(param => this.mealsService.getMeal(param.get('id')));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }

  async updateMeal(event: Meal) {
    // console.log('updateMeal', event);
    const key = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    //console.log('removeMeal', event);
    const key = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }
}
