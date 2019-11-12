import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

/*
var firebaseConfig = {
  apiKey: "AIzaSyD81cnoczI2Lml_HWlk_oayJ9ZhgQ7dbPA",
  authDomain: "ultimateangularfitness.firebaseapp.com",
  databaseURL: "https://ultimateangularfitness.firebaseio.com",
  projectId: "ultimateangularfitness",
  storageBucket: "ultimateangularfitness.appspot.com",
  messagingSenderId: "79918111810",
  appId: "1:79918111810:web:25c57a21a39c8b7a89e1db"
};
  */
