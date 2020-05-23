import { AuthState } from './modules/auth/types';
import { UserState } from './modules/user/types';

export type StoreStateTypes = {
  auth: AuthState;
  user: UserState;
};
