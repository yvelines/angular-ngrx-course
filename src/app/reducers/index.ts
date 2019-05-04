import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { AuthActionTypes, AuthActions } from '../auth/auth.actions';
import { User } from '../model/user.model';

interface AuthState {
  loggedIn: boolean;
  user: User;
}

const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined
};

function authReducer(state: AuthState = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        ...initialAuthState,
        loggedIn: true,
        user: action.payload.user
      };
    default:
      return state;
  }
}

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
