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

export interface UpdateProfileRequestProps {
  name: string;
  email: string;
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export enum UserActionTypes {
  SIGN_UP_REQUEST = '@App/user/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS = '@App/user/SIGN_UP_SUCCESS',
  SIGN_FAILURE = '@App/user/SIGN_FAILURE',
  UPDATE_AVATAR_REQUEST = '@App/user/UPDATE_AVATAR_REQUEST',
  UPDATE_AVATAR_SUCCESS = '@App/user/UPDATE_AVATAR_SUCCESS',
  UPDATE_PROFILE_REQUEST = '@App/user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS = '@App/user/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE = '@App/user/UPDATE_PROFILE_FAILURE',
}

export interface UserState {
  readonly profile: User;
  readonly loading: boolean;
  readonly errors: object;
}
