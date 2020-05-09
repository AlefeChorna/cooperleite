export type ReduxShortAction<T> = {
  type: T;
};

export type ReduxAction<T, P> = {
  type: T;
  payload: P;
};
