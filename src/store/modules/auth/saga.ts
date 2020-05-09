import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { AuthActionTypes, SignInRequestProps, AuthPayload } from './types';
import { signInSuccess, signFailure } from './actions';
import Request from '../../../services/request';
import history from '../../../services/history';
import { dashboardRoute } from '../../../routes/config';

interface SignAction {
  type: string;
  payload: SignInRequestProps;
}

export function* signIn({
  payload,
}: ReturnType<() => SignAction>): Generator<any> {
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

export default all([takeLatest(AuthActionTypes.SIGN_IN_REQUEST, signIn)]);
