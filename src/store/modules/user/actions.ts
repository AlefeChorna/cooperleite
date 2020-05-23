import { action } from 'typesafe-actions';
import { ReduxAction, ReduxShortAction } from '../types';
import { UserActionTypes, SignUpRequestProps } from './types';

export function signUpRequest(
  data: SignUpRequestProps,
): ReduxAction<string, SignUpRequestProps> {
  return action(UserActionTypes.SIGN_UP_REQUEST, data);
}

export function signUpSuccess(): ReduxShortAction<string> {
  return action(UserActionTypes.SIGN_UP_SUCCESS);
}

export function signFailure(message: string): ReduxAction<string, string> {
  return action(UserActionTypes.SIGN_FAILURE, message);
}
