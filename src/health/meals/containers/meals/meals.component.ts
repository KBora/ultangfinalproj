import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'meals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meals.component.scss'],
  template: `
    <div>
        Meals
    </div>
  `
})
export class MealsComponent {
  constructor() {}
}
