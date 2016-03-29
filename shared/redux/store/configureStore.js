import { createStore, applyMiddleware, compose, dispatch } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../../container/DevTools/DevTools';

import { routerMiddleware } from 'react-router-redux';

import createLogger from 'redux-logger';

import fetch from 'isomorphic-fetch';

import * as Actions from '../../redux/actions/actions';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${(process.env.PORT || 8000)}`) : '';

const logger = createLogger();

export function configureStore(initialState = {}, history) {

  let middleware = [ thunk ];

  let finalCreateStore;

  const reactRouterReduxMiddleware = routerMiddleware(history);

  if (process.env.CLIENT) {
    middleware.push(logger,reactRouterReduxMiddleware);
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    middleware.push(reactRouterReduxMiddleware);
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }


  // if (process.env.CLIENT) {
  //   middleware.push(logger,reactRouterReduxMiddleware);
  // } else {
  //   middleware.push(reactRouterReduxMiddleware);
  // }

  // const finalCreateStore = applyMiddleware(...middleware)

  const store = finalCreateStore(rootReducer, initialState);



  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducer', () => {
      const nextReducer = require('../reducers/reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
