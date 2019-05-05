import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as featureAuthActions from './auth/store/auth.actions';
import { AppState } from './reducers';
import { partition, Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { AuthState } from './auth/store/auth.reducer';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isLoggedIn: boolean;
  public isLoggedOut: boolean;

  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean>;

  constructor(
    private router: Router,
    private store$: Store<any>
  ) { }

  ngOnInit() {

    [this.isLoggedIn$, this.isLoggedOut$] =
      partition(this.store$.pipe(map((state: any) => state.auth.loggedIn)
      ), (loggedIn: boolean) => loggedIn);

    this.isLoggedIn$
      .pipe(
        tap((isLoggedIn: boolean) => { this.isLoggedIn = isLoggedIn; this.isLoggedOut = !isLoggedIn; }),
      ).subscribe(() => console.log('this.isLoggedIn => ', this.isLoggedIn));

    this.isLoggedOut$
      .pipe(
        tap((isLoggedIn: boolean) => { this.isLoggedIn = isLoggedIn; this.isLoggedOut = !isLoggedIn; })
      ).subscribe(() => console.log('this.isLoggedOut => ', this.isLoggedOut));
  }

  logout() {
    this.store$.dispatch(new featureAuthActions.LogoutAction());
    this.router.navigateByUrl('/');
  }
}
