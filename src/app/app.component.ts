import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as featureAuthActions from './auth/store/auth.actions';
import { AppState } from './reducers';
import { partition, Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { AuthState } from './auth/store/auth.reducer';
import { isLoggedInSelector, isLoggedOutSelector } from './auth/store/auth.selectors';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean>;

  constructor(
    private store$: Store<any>
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store$.pipe(select(isLoggedInSelector));
    this.isLoggedOut$ = this.store$.pipe(select(isLoggedOutSelector));
  }

  logout() {
    this.store$.dispatch(new featureAuthActions.LogoutAction());
  }
}
