import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import Request from '../../../services/request';
import history from '../../../services/history';
import { signInSuccess, signFailure } from './actions';
import { AuthActionTypes, SignInRequestProps, AuthPayload } from './types';

interface SignAction {
  type: string;
  payload: SignInRequestProps;
}

export function* signIn({
  payload,
}: ReturnType<() => SignAction>): Generator<any> {
  const { email, password } = payload;
  try {
    console.log('aqui >>> ', email, password);
    const response: any = yield call(Request.post, '/auth', {
      email,
      password,
    });
    console.log('aqui 2222 >>> ', response);
    const data = response.data as AuthPayload;

    Request.setHeader('Authorization', `Bearer ${data.token}`);

    yield put(signInSuccess(data));
    history.push('/dashboard');
  } catch (err) {
    console.log('signIn error >>> ', toast.error);
    toast.error('Usuário ou senha incorretos!');
    yield put(signFailure(err.message));
  }
}

export default all([takeLatest(AuthActionTypes.SIGN_IN_REQUEST, signIn)]);
