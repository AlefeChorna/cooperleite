import { action } from 'typesafe-actions';
import { ReduxAction, ReduxShortAction } from '../types';
import {
  AuthActionTypes,
  AuthPayload,
  SignInRequestProps,
  SignUpRequestProps,
} from './types';

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

export function signUpRequest(
  data: SignUpRequestProps,
): ReduxAction<string, SignUpRequestProps> {
  return action(AuthActionTypes.SIGN_UP_REQUEST, data);
}

export function signUpSuccess(): ReduxShortAction<string> {
  return action(AuthActionTypes.SIGN_UP_SUCCESS);
}

export function signFailure(message: string): ReduxAction<string, string> {
  return action(AuthActionTypes.SIGN_FAILURE, message);
}
