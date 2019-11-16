import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';

// containers
import { AppComponent } from './containers/app/app.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  declarations: [
    AppComponent,
    AppNavComponent,
    AppHeaderComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
