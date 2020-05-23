import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { AuthActionTypes, SignInRequestProps, AuthPayload } from './types';
import { PersistReducerActionTypes } from '../types';
import { signInSuccess, signFailure } from './actions';
import Request from '../../../services/request';
import history from '../../../services/history';
import { dashboardRoute } from '../../../routes/config';

interface SignAction<P> {
  type: string;
  payload: P;
}

export function* signIn({
  payload,
}: ReturnType<() => SignAction<SignInRequestProps>>): Generator<any> {
  const { email, password } = payload;
  try {
    const response: any = yield call(Request.post, '/auth', {
      email,
      password,
    });
    const data = response.data as AuthPayload;

    Request.setHeader('Authorization', `Bearer ${data.token}`);

    toast.success('Login realizado com sucesso!');
    yield put(signInSuccess(data));
    history.push(dashboardRoute.path);
  } catch (err) {
    toast.error('Usuário ou senha incorretos!', {
      position: 'top-left',
    });
    yield put(signFailure(err.message));
  }
}

export function rehydrateAuth({ payload }: any): void {
  if (payload?.auth) {
    const persistedReducer = payload.auth;
    persistedReducer.loading = false;

    if (persistedReducer.token) {
      Request.setHeader('Authorization', `Bearer ${persistedReducer.token}`);
    }
  }
}

export default all([
  takeLatest(PersistReducerActionTypes.REHYDRATE, rehydrateAuth),
  takeLatest(AuthActionTypes.SIGN_IN_REQUEST, signIn),
]);
