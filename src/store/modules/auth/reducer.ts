/* eslint-disable no-param-reassign */
import produce from 'immer';
import { AnyAction } from 'redux';

interface AuthState {
  token?: null;
  refreshToken?: null;
  signed?: boolean;
  loading?: boolean;
}

interface AuthAction {
  type: string;
  payload: any;
}

const INITIAL_STATE: AuthState = {
  token: null,
  refreshToken: null,
  signed: false,
  loading: false,
};

export default function auth(
  state = INITIAL_STATE,
  action: AnyAction,
): AuthState {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@App/auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@App/auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.refreshToken = action.payload.refreshToken;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@App/auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
