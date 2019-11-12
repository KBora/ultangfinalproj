import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


// 3rd party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login'},
      { path: 'login', loadChildren: './login/login.module#LoginModule'},
      { path: 'register', loadChildren: './register/register.module#RegisterModule'}
    ]
  }
];


export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyD81cnoczI2Lml_HWlk_oayJ9ZhgQ7dbPA",
  authDomain: "ultimateangularfitness.firebaseapp.com",
  databaseURL: "https://ultimateangularfitness.firebaseio.com",
  projectId: "ultimateangularfitness",
  storageBucket: "ultimateangularfitness.appspot.com",
  messagingSenderId: "79918111810"
};


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ],
  declarations: [],
  providers: []
})

export class AuthModule {}
