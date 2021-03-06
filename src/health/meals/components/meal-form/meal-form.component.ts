import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  template: `
    <div class="meal-form">
        <form [formGroup]="form">
            <div class="meal-form__name">
                <label for="">
                    <h3>Meal name</h3>
                    <input
                        type="text"
                        placeholder="e.g. Cereal"
                        formControlName="name">
                    <div class="error" *ngIf="required">
                        Meal name is required
                    </div>
                </label>
            </div>
            
            <div class="meal-form__food">
                <div class="meal-form__subtitle">
                    <h3>Food</h3>
                    <button
                        type="button"
                        class="meal-form__add"
                        (click)="addIngredient()">
                        <img src="/img/add-white.svg" alt="">
                        Add food
                    </button>
                </div>
                <div formArrayName="ingredients">
                    <label *ngFor="let c of ingredients.controls; index as i">
                       <input 
                            [formControlName]="i.toString()" placeholder="e.g. Milk"
                            type="text">
                        <span 
                            class="meal-form__remove"
                            (click)="removeIngredient(i);">
                        </span>
                    </label>
                </div>
            </div>
            
            <div class="meal-form__submit">
                <div>
                    <button
                        *ngIf="!exists"
                        type="button"
                        class="button"
                        (click)="createMeal()">
                        Create meal
                    </button>
                    <button
                        *ngIf="exists"    
                        type="button"
                        class="button"
                        (click)="updateMeal()">
                        Save
                    </button>
                    <a href=""
                       class="button button--cancel"
                       [routerLink]="['../']">
                        Cancel</a>
                </div>

                <div class="meal-form__delete">
                    <div *ngIf="toggled">
                        <p>Delete item?</p>
                        <button
                          class="confirm"
                          type="button"
                          (click)="removeMeal()">
                            Yes
                        </button>
                        <button
                          class="cancel"
                          type="button"
                          (click)="toggle()">
                            No
                        </button>
                    </div>

                    <button
                      class="button button--delete"
                      type="button"
                      (click)="toggle()">
                        Delete
                    </button>
                </div>
                
            </div>
            
        </form>
    </div>
  `
})

export class MealFormComponent implements OnChanges {

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  toggled = false;
  exists = false;


  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name) {
      console.log(this.meal);
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value); // patchValue updates a portion of the form, in this case, it is updating the form with the name field (and other fields too I assume?)

      //NOTE: patch Value does not update a Form Array.. therefore we need to do it manually
      // by emptying it, then refilling it:
      if (value.ingredients) {
        for(const ingredient of value.ingredients) {
          this.ingredients.push(new FormControl(ingredient));
        }
      }

    }
  }

  emptyIngredients() {
    // bit of a hack to empty ingredients
    while(this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }


  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }
  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }
  removeMeal() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}
