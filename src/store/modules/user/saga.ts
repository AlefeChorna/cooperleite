import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { UserActionTypes, SignUpRequestProps } from './types';
import { signUpSuccess, signFailure } from './actions';
import Request from '../../../services/request';
import history from '../../../services/history';
import { signInRoute } from '../../../routes/config';

interface SignAction<P> {
  type: string;
  payload: P;
}

export function* signUp({
  payload,
}: ReturnType<() => SignAction<SignUpRequestProps>>): Generator<any> {
  const { name, email, password } = payload;
  try {
    yield call(Request.post, '/signup', {
      name,
      email,
      password,
    });

    toast.success('Cadastro realizado com sucesso. Faça login para continuar!');
    yield put(signUpSuccess());
    history.push(signInRoute.path);
  } catch (err) {
    let errorMessage =
      'Não foi possível realizar o cadastro. Tente novamente mais tarde!';

    if (err?.status === Request.HTTP_STATUS.UNPROCESSABLE_ENTITY) {
      errorMessage = err.message;
    }

    toast.error(errorMessage);
    yield put(signFailure(err.message));
  }
}

export default all([takeLatest(UserActionTypes.SIGN_UP_REQUEST, signUp)]);
