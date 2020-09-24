import * as types from './actionTypes';

export function requestingProfileStart() {
  return {
    type: types.PROFILE_REQUESTING_START,
  };
}

export function requestingProfileStop() {
  return {
    type: types.PROFILE_REQUESTING_STOP,
  };
}

export function updateProfileState(data) {
  return {
    type: types.PROFILE_STATE_UPDATE,
    payload: {...data},
  };
}

export function showProfileError(errorCode, errorMessage) {
  return {
    type: types.PROFILE_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissProfileMessage() {
  return {
    type: types.PROFILE_DISMISS_MESSAGE,
  };
}

//TODO: Email
export function requestingUpdateEmailStart() {
  return {
    type: types.UPDATE_EMAIL_REQUESTING_START,
  };
}

export function requestingUpdateEmailStop() {
  return {
    type: types.UPDATE_EMAIL_REQUESTING_STOP,
  };
}

export function updateEmailState(data) {
  return {
    type: types.UPDATE_EMAIL_STATE_UPDATE,
    payload: {...data},
  };
}

export function showUpdateEmailError(errorCode, errorMessage) {
  return {
    type: types.UPDATE_EMAIL_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissUpdateEmailMessage() {
  return {
    type: types.UPDATE_EMAIL_DISMISS_MESSAGE,
  };
}

export function submitUpdateEmail(email, onSuccess) {
  return {
    type: types.UPDATE_EMAIL_SUBMIT_UPDATE,
    payload: {email, onSuccess},
  };
}

export function submitVerifyEmail(email, code, onSuccess) {
  return {
    type: types.UPDATE_EMAIL_SUBMIT_VERIFY,
    payload: {email, code, onSuccess},
  };
}

export function resendEmailCode(email, onSuccess) {
  return {
    type: types.UPDATE_EMAIL_RESEND_CODE,
    payload: {email, onSuccess},
  };
}

//TODO: Change phone
export function requestingUpdatePhoneStart() {
  return {
    type: types.UPDATE_PHONE_REQUESTING_START,
  };
}

export function requestingUpdatePhoneStop() {
  return {
    type: types.UPDATE_PHONE_REQUESTING_STOP,
  };
}

export function updatePhoneState(data) {
  return {
    type: types.UPDATE_PHONE_STATE_UPDATE,
    payload: {...data},
  };
}

export function showUpdatePhoneError(errorCode, errorMessage) {
  return {
    type: types.UPDATE_PHONE_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissUpdatePhoneMessage() {
  return {
    type: types.UPDATE_PHONE_DISMISS_MESSAGE,
  };
}

export function submitUpdatePhone(phone, onSuccess) {
  return {
    type: types.UPDATE_PHONE_SUBMIT_UPDATE,
    payload: {phone, onSuccess},
  };
}

//TODO: Change password
export function requestingUpdatePasswordStart() {
  return {
    type: types.UPDATE_PASSWORD_REQUESTING_START,
  };
}

export function requestingUpdatePasswordStop() {
  return {
    type: types.UPDATE_PASSWORD_REQUESTING_STOP,
  };
}

export function updatePasswordState(data) {
  return {
    type: types.UPDATE_PASSWORD_STATE_UPDATE,
    payload: {...data},
  };
}

export function showUpdatePasswordError(errorCode, errorMessage) {
  return {
    type: types.UPDATE_PASSWORD_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissUpdatePasswordMessage() {
  return {
    type: types.UPDATE_PASSWORD_DISMISS_MESSAGE,
  };
}

export function submitUpdatePassword(password, onSuccess) {
  return {
    type: types.UPDATE_PASSWORD_SUBMIT_UPDATE,
    payload: {password, onSuccess},
  };
}
