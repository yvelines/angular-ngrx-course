import { User } from '../model/user.model';
import { AuthActions, AuthActionTypes } from './auth.actions';


export interface AuthState {
  loggedIn: boolean;
  user: User;
}

export const initialState: AuthState = {
  loggedIn: false,
  user: undefined
};

const loginActionReducer = (state: AuthState, action: AuthActions): AuthState => {
  return {
    ...state,
    loggedIn: true,
    user: action.payload.user
  };
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginAction:
      return loginActionReducer(state, action);

    default:
      return state;
  }
}



