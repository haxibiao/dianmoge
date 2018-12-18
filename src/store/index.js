import { applyMiddleware, combineReducers, createStore } from 'redux';
import { effectsMiddleware } from 'redux-effex';

import reducers from './reducers';
import Effects from './effects';
export { default as actions } from './actions';

export default createStore(combineReducers(reducers), applyMiddleware(effectsMiddleware(Effects)));
