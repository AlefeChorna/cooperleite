import { action } from 'typesafe-actions';
import { ReduxAction, ReduxShortAction } from '../types';
import {
  UserActionTypes,
  SignUpRequestProps,
  User,
  UpdateProfileRequestProps,
} from './types';

export function signUpRequest(
  data: SignUpRequestProps,
): ReduxAction<string, SignUpRequestProps> {
  return action(UserActionTypes.SIGN_UP_REQUEST, data);
}

export function signUpSuccess(): ReduxShortAction<string> {
  return action(UserActionTypes.SIGN_UP_SUCCESS);
}

export function signFailure(errors: object): ReduxAction<string, object> {
  return action(UserActionTypes.SIGN_FAILURE, { errors });
}

export function updateAvatarRequest(
  data: FormData,
): ReduxAction<string, FormData> {
  return action(UserActionTypes.UPDATE_AVATAR_REQUEST, data);
}

export function updateAvatarSuccess(data: User): ReduxAction<string, User> {
  return action(UserActionTypes.UPDATE_AVATAR_SUCCESS, data);
}

export function updateProfileRequest(
  data: UpdateProfileRequestProps,
): ReduxAction<string, UpdateProfileRequestProps> {
  return action(UserActionTypes.UPDATE_PROFILE_REQUEST, data);
}

export function updateProfileSuccess(data: User): ReduxAction<string, User> {
  return action(UserActionTypes.UPDATE_PROFILE_SUCCESS, data);
}

export function updateProfileFailure(): ReduxShortAction<string> {
  return action(UserActionTypes.UPDATE_PROFILE_FAILURE);
}
