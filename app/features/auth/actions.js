import * as types from './actionTypes';

//TODO: Auth state
export function updateAuthState(data) {
  return {
    type: types.AUTH_UPDATE,
    payload: {data},
  };
}

export function getStoreLogin() {
  return {
    type: types.AUTH_GET_STORE_LOGIN,
  };
}

export function doLogout(onSuccess = null, onError = null) {
  return {
    type: types.AUTH_LOGOUT,
    payload: {onSuccess, onError},
  };
}

//TODO: Login screen
export function requestingLoginStart() {
  return {
    type: types.AUTH_LOGIN_REQUESTING_START,
  };
}

export function requestingLoginStop() {
  return {
    type: types.AUTH_LOGIN_REQUESTING_STOP,
  };
}

export function updateLoginState(data) {
  return {
    type: types.AUTH_LOGIN_STATE_UPDATE,
    payload: {data},
  };
}

export function showLoginError(errorCode, errorMessage) {
  return {
    type: types.AUTH_LOGIN_STATE_UPDATE,
    payload: {data: {requesting: false, errorCode, errorMessage}},
  };
}

export function dismissLoginMessage() {
  return {
    type: types.AUTH_LOGIN_DISMISS_MESSAGE,
  };
}

export function submitLogin(username, password, onSuccess, onError) {
  return {
    type: types.AUTH_LOGIN_SUBMIT,
    payload: {username, password, onSuccess, onError},
  };
}

//TODO: Forgot screen
export function requestingForgotStart() {
  return {
    type: types.AUTH_FORGOT_REQUESTING_START,
  };
}

export function requestingForgotStop() {
  return {
    type: types.AUTH_FORGOT_REQUESTING_STOP,
  };
}

export function updateForgotState(data) {
  return {
    type: types.AUTH_FORGOT_STATE_UPDATE,
    payload: {...data},
  };
}

export function showForgotError(errorCode, errorMessage) {
  return {
    type: types.AUTH_FORGOT_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissForgotMessage() {
  return {
    type: types.AUTH_FORGOT_DISMISS_MESSAGE,
  };
}

export function submitForgot(username, onSuccess) {
  return {
    type: types.AUTH_FORGOT_SUBMIT,
    payload: {username, onSuccess},
  };
}

//TODO: Reset password
export function requestingResetStart() {
  return {
    type: types.AUTH_RESET_REQUESTING_START,
  };
}

export function requestingResetStop() {
  return {
    type: types.AUTH_RESET_REQUESTING_STOP,
  };
}

export function updateResetState(data) {
  return {
    type: types.AUTH_RESET_STATE_UPDATE,
    payload: {...data},
  };
}

export function showResetError(errorCode, errorMessage) {
  return {
    type: types.AUTH_RESET_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissResetMessage() {
  return {
    type: types.AUTH_RESET_DISMISS_MESSAGE,
  };
}

export function resendResetCode(username, onSuccess) {
  return {
    type: types.AUTH_RESET_RESEND_CODE,
    payload: {username, onSuccess},
  };
}

export function submitResetPassword(username, code, password, onSuccess) {
  return {
    type: types.AUTH_RESET_SUBMIT,
    payload: {username, code, password, onSuccess},
  };
}
