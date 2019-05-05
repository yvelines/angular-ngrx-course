import { Action } from '@ngrx/store';
import { User } from '../model/user.model';

export enum AuthActionTypes {
    LoginAction = '[Login] Action',
    LogoutAction = '[Logout] Action'
}

export class LoginAction implements Action {
    readonly type = AuthActionTypes.LoginAction;
    constructor(public payload: { user: User }) { }
}

export class LogoutAction implements Action {
    readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions = LoginAction | LogoutAction;
