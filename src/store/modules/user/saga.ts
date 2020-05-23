import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  UserActionTypes,
  SignUpRequestProps,
  User,
  UpdateProfileRequestProps,
} from './types';
import {
  signUpSuccess,
  signFailure,
  updateAvatarSuccess,
  updateProfileSuccess,
  updateProfileFailure,
} from './actions';
import Request from '../../../services/request';
import history from '../../../services/history';
import { signInRoute, dashboardRoute } from '../../../routes/config';

interface UserAction<P> {
  type: string;
  payload: P;
}

export function* signUp({
  payload,
}: ReturnType<() => UserAction<SignUpRequestProps>>): Generator<any> {
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

export function* updateAvatar({
  payload,
}: ReturnType<() => UserAction<FormData>>): Generator<any> {
  try {
    const response: any = yield call(
      Request.patch,
      '/api/v1/profile/avatar',
      payload,
    );
    const updatedUser = response.data as User;

    yield put(updateAvatarSuccess(updatedUser));

    toast.success('Avatar atualizado com sucesso');
  } catch (err) {
    toast.error('Não foi possível atualizar seu avatar. Tente novamente!');
  }
}

export function* updateProfile({
  payload,
}: ReturnType<() => UserAction<UpdateProfileRequestProps>>): Generator<any> {
  try {
    const profileData = payload;

    if (!profileData.old_password) {
      delete profileData.old_password;
      delete profileData.new_password;
      delete profileData.new_password_confirmation;
    }

    const response: any = yield call(
      Request.put,
      '/api/v1/profile',
      profileData,
    );
    const updatedUser = response.data as User;

    yield put(updateProfileSuccess(updatedUser));
    toast.success('Perfil alterado com sucesso');
    history.push(dashboardRoute.path);
  } catch (err) {
    toast.error('Não foi possível atualizar o perfil. Tente novamente!');

    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest(UserActionTypes.SIGN_UP_REQUEST, signUp),
  takeLatest(UserActionTypes.UPDATE_AVATAR_REQUEST, updateAvatar),
  takeLatest(UserActionTypes.UPDATE_PROFILE_REQUEST, updateProfile),
]);
