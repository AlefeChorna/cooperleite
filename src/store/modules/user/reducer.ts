import { Reducer } from 'redux';
import produce from 'immer';
import { UserState, User, UserActionTypes } from './types';
import { AuthActionTypes } from '../auth/types';

const INITIAL_STATE: UserState = {
  profile: {} as User,
  loading: false,
};

const user: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AuthActionTypes.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case UserActionTypes.SIGN_UP_REQUEST: {
        draft.loading = true;
        break;
      }
      case UserActionTypes.SIGN_UP_SUCCESS:
      case UserActionTypes.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
};

export default user;
