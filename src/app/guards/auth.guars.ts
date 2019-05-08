import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, noop } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { isLoggedInSelector } from '../auth/store/auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private store$: Store<AppState>,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.store$.pipe(
            select(isLoggedInSelector),
            tap(loggedIn => !loggedIn ? this.router.navigateByUrl('/login') : noop)

        );
    }
}
