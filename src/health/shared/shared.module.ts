import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CommonModule } from '@angular/common';
import { MealsService } from './services/meals/meals.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [
  ],
  exports: [

  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ MealsService ]
    }
  }
}
