import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthActionTypes, LoginAction, LogoutAction } from './auth.actions';


@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<LoginAction>(AuthActionTypes.LoginAction),
    tap(() => console.log('login$  Effect')),
    tap((action: any) => {
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<LoginAction>(AuthActionTypes.LogoutAction),
    tap(() => console.log('logout$  Effect')),
    tap((action: any) => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
      console.log(action.user);
    })
  );

  @Effect()
  init$ = defer(() => {
    console.log('init$  Effect');
    const userData: any = localStorage.getItem('user');
    return userData
      ? [new LoginAction({ user: JSON.parse(userData) })]
      : [new LogoutAction()];
  });

  constructor(
    private actions$: Actions,
    private router: Router) { }
}
