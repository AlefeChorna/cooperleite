export interface AuthPayload {
  user: any;
  token: string;
}

export interface SignInRequestProps {
  email: string;
  password: string;
}

export enum AuthActionTypes {
  SIGN_IN_REQUEST = '@App/auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = '@App/auth/SIGN_IN_SUCCESS',
  SIGN_FAILURE = '@App/auth/SIGN_FAILURE',
  SIGN_OUT = '@App/auth/SIGN_OUT',
}

export interface AuthState {
  readonly token: string;
  readonly signed: boolean;
  readonly loading: boolean;
}
