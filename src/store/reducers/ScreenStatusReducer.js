import types from '../types';
import { List } from 'immutable';
import { screenStatus } from '../state/screenStatus';

class ScreenStatusReducer {
  static reduce(state = screenStatus(), action) {
    if (ScreenStatusReducer[action.type]) {
      return ScreenStatusReducer[action.type](state, action);
    } else {
      return state;
    }
  }

  static [types.SHOW_LOADING_SPINNER](state, action) {
    return state.set('loading', action.status);
  }

  static [types.HIDDEN_LOADING_SPINNER](state, action) {
    return state.set('loading', action.status);
  }
}

export default ScreenStatusReducer.reduce;
