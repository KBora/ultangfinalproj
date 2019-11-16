import { Component } from '@angular/core';
import { Store } from 'store';
import { AuthService, User } from '../../../auth/shared/services/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
        <app-header 
            [user]="user$ | async"
            (logout)="onLogout()">
        </app-header>
        <app-nav
            *ngIf="(user$ | async)?.authenticated">
        </app-nav>
        <div class="wrapper">
            <router-outlet></router-outlet>
        </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
    user$: Observable<User>;
    subscription: Subscription;

  constructor(
      private store: Store,
      private router: Router,
      private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async onLogout() {
    await this.authService.logoutUser();
    // redirect back to the login screen
    this.router.navigate(['auth/login'])
  }

}
