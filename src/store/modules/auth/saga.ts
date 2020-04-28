import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import Request from '../../../services/request';
import history from '../../../services/history';
import { signInSuccess, signFailure } from './actions';

interface SignIn {
  email: string;
  password: string;
}

interface Action {
  type: string;
  payload?: SignIn;
}

export function* signIn({
  payload,
}: ReturnType<() => Action>): Generator<void> {
  // const { email, password } = payload;
  // try {
  //   const response = yield call(Request.post, '/oauth/token', {
  //     email,
  //     password,
  //   });
  //   Request.setHeader('Authorization', `Bearer ${response.data.access_token}`);
  //   yield put(
  //     signInSuccess({
  //       token: response.data.access_token,
  //       refreshToken: response.data.refresh_token,
  //     }),
  //   );
  //   history.push('/dashboard');
  // } catch (err) {
  //   toast.error('Usuário ou senha incorretos!');
  //   yield put(signFailure(err));
  // }
}

export default all([takeLatest('@App/auth/SIGN_IN_REQUEST', signIn)]);
