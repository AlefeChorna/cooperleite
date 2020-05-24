import { action } from 'typesafe-actions';
import { ReduxAction, ReduxShortAction } from '../types';
import { AuthActionTypes, AuthPayload, SignInRequestProps } from './types';

export function signInRequest(
  data: SignInRequestProps,
): ReduxAction<string, SignInRequestProps> {
  return action(AuthActionTypes.SIGN_IN_REQUEST, data);
}

export function signInSuccess(
  data: AuthPayload,
): ReduxAction<string, AuthPayload> {
  return action(AuthActionTypes.SIGN_IN_SUCCESS, data);
}

export function signFailure(message: string): ReduxAction<string, string> {
  return action(AuthActionTypes.SIGN_FAILURE, message);
}

export function signOut(): ReduxShortAction<string> {
  return action(AuthActionTypes.SIGN_OUT);
}
