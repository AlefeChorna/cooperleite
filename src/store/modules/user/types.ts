export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatar_url: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface SignUpRequestProps {
  name: string;
  email: string;
  password: string;
}

export enum UserActionTypes {
  SIGN_UP_REQUEST = '@App/user/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS = '@App/user/SIGN_UP_SUCCESS',
  SIGN_FAILURE = '@App/user/SIGN_FAILURE',
}

export interface UserState {
  readonly profile: User;
  readonly loading: boolean;
}
