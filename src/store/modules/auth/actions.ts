interface Action {
  type: string;
  payload?: any;
}

interface SignInSuccess {
  token: string;
  refreshToken: string;
}

export function signInRequest(email: string, password: string): Action {
  return {
    type: '@App/auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess({ token, refreshToken }: SignInSuccess): Action {
  return {
    type: '@App/auth/SIGN_IN_SUCCESS',
    payload: { token, refreshToken },
  };
}

export function signFailure(error: any): Action {
  return {
    type: '@App/auth/SIGN_FAILURE',
    payload: { error },
  };
}
