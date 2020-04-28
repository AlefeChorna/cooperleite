import {
  createStore,
  compose,
  applyMiddleware,
  Reducer,
  Middleware,
  Store,
} from 'redux';

export default (reducers: Reducer, middlewares: Middleware[]): Store => {
  const reduxDevTools =
    // eslint-disable-next-line no-underscore-dangle
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION__) || compose;

  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(applyMiddleware(...middlewares), reduxDevTools())
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
