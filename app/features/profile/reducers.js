import createReducer from '../../lib/createReducer';
import * as types from './actionTypes';

const InitialState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
};

export const ProfileReducer = createReducer(InitialState, {});

const InitialEmailState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
};

export const EmailReducer = createReducer(InitialEmailState, {
  [types.UPDATE_EMAIL_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.UPDATE_EMAIL_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.UPDATE_EMAIL_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.UPDATE_EMAIL_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});

const PhoneInitialState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
};

export const PhoneReducer = createReducer(PhoneInitialState, {
  [types.UPDATE_PHONE_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.UPDATE_PHONE_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.UPDATE_PHONE_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.UPDATE_PHONE_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});

const PasswordInitialState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
};

export const PasswordReducer = createReducer(PasswordInitialState, {
  [types.UPDATE_PASSWORD_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.UPDATE_PASSWORD_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.UPDATE_PASSWORD_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.UPDATE_PASSWORD_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});
