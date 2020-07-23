import { Reducer } from 'redux';
import produce from 'immer';
import { UserState, User, UserActionTypes } from './types';
import { AuthActionTypes } from '../auth/types';

const INITIAL_STATE: UserState = {
  profile: {} as User,
  errors: {},
  loading: false,
};

const user: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AuthActionTypes.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case UserActionTypes.SIGN_UP_REQUEST:
      case UserActionTypes.UPDATE_PROFILE_REQUEST: {
        draft.loading = true;
        draft.errors = {};
        break;
      }
      case UserActionTypes.SIGN_UP_SUCCESS: {
        draft.loading = false;
        break;
      }
      case UserActionTypes.SIGN_FAILURE:
      case UserActionTypes.UPDATE_PROFILE_FAILURE: {
        draft.loading = false;
        draft.errors = action.payload.errors;
        break;
      }
      case UserActionTypes.UPDATE_AVATAR_SUCCESS: {
        draft.profile = action.payload;
        break;
      }
      case UserActionTypes.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload;
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

export default user;
