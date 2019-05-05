import { User } from '../model/user.model';
import { AuthActions, LoginAction, LogoutAction, AuthActionTypes } from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  user: User;
}

export const initialState: AuthState = {
  loggedIn: false,
  user: undefined
};

const loginActionReducer = (state: AuthState, action: LoginAction): AuthState => {
  return {
    ...state,
    loggedIn: true,
    user: action.payload.user
  };
};

const logoutActionReducer = (state: AuthState, action: LogoutAction): AuthState => {
  return {
    ...state,
    loggedIn: false,
    user: undefined
  };
};


export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginAction:
      return loginActionReducer(state, action);

    case AuthActionTypes.LogoutAction:
      return logoutActionReducer(state, action);

    default:
      return state;
  }
}



