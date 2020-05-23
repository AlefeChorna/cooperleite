import storage from 'redux-persist/lib/storage';
import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';

export default (reducers: Reducer): Reducer => {
  const persistedReducer = persistReducer(
    {
      key: 'cooperleite',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );

  return persistedReducer;
};
