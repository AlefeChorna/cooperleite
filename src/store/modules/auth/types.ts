export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

export interface AuthPayload {
  user: User;
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
}

export interface AuthState {
  readonly token: string;
  readonly user: User;
  readonly signed: boolean;
  readonly loading: boolean;
}
