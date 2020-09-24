import * as types from './actionTypes';

export function checkAppUpdate(onSuccess = null, onError = null) {
  return {
    type: types.WELCOME_CHECK_APP_UPDATE,
    payload: {onSuccess, onError},
  };
}

export function requestingHomeStart() {
  return {
    type: types.WELCOME_REQUESTING_START,
  };
}

export function requestingHomeStop() {
  return {
    type: types.WELCOME_REQUESTING_STOP,
  };
}

export function updateHomeState(data) {
  return {
    type: types.WELCOME_STATE_UPDATE,
    payload: {...data},
  };
}

export function showHomeError(errorCode, errorMessage) {
  return {
    type: types.WELCOME_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissHomeMessage() {
  return {
    type: types.WELCOME_DISMISS_MESSAGE,
  };
}

export function uploadAvatar(image, onSuccess) {
  return {
    type: types.WELCOME_UPLOAD_AVATAR,
    payload: {image, onSuccess},
  };
}
