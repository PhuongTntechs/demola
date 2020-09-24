import createReducer from '../../lib/createReducer';
import * as types from './actionTypes';

const InitialState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
};

export const MenuReducer = createReducer(InitialState, {
  [types.MENU_VIEW_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.MENU_VIEW_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.MENU_VIEW_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.MENU_VIEW_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});
