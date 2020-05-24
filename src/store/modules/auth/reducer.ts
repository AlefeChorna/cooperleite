import { Reducer } from 'redux';
import produce from 'immer';
import { AuthState, AuthActionTypes } from './types';

const INITIAL_STATE: AuthState = {
  token: '',
  signed: false,
  loading: false,
};

const auth: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AuthActionTypes.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthActionTypes.SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case AuthActionTypes.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }
      case AuthActionTypes.SIGN_OUT: {
        Object.assign(draft, INITIAL_STATE);
        break;
      }
      default:
    }
  });
};

export default auth;
