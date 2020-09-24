import createReducer from '../../lib/createReducer';
import * as types from './actionTypes';

const InitialState = {};

export const AuthReducer = createReducer(InitialState, {
  [types.AUTH_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload.data,
    };
  },
});

const LoginInitialState = {
  requesting: false,
  errorMessage: '',
  errorCode: 0,
};

export const LoginReducer = createReducer(LoginInitialState, {
  [types.AUTH_LOGIN_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload.data,
    };
  },
  [types.AUTH_LOGIN_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorMessage: '',
      errorCode: 0,
    };
  },
  [types.AUTH_LOGIN_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.AUTH_LOGIN_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorMessage: '',
      errorCode: 0,
    };
  },
});

//TODO: Forgot password
const ForgotInitialState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
};

export const ForgotReducer = createReducer(ForgotInitialState, {
  [types.AUTH_FORGOT_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.AUTH_FORGOT_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.AUTH_FORGOT_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.AUTH_FORGOT_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});

//TODO: Reset password
const ResetInitialState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
};

export const ResetPasswordReducer = createReducer(ResetInitialState, {
  [types.AUTH_RESET_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.AUTH_RESET_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.AUTH_RESET_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.AUTH_RESET_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});
