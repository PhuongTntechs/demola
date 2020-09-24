import * as types from './actionTypes';

export function requestingMenuStart() {
  return {
    type: types.MENU_VIEW_REQUESTING_START,
  };
}

export function requestingMenuStop() {
  return {
    type: types.MENU_VIEW_REQUESTING_STOP,
  };
}

export function updateMenuState(data) {
  return {
    type: types.MENU_VIEW_STATE_UPDATE,
    payload: {...data},
  };
}

export function showMenuError(errorCode, errorMessage) {
  return {
    type: types.MENU_VIEW_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissMenuMessage() {
  return {
    type: types.MENU_VIEW_DISMISS_MESSAGE,
  };
}
