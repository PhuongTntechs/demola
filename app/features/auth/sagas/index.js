import {takeLatest} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as AuthSaga from './AuthSaga';
import * as AuthForgot from './AuthForgotSaga';
import * as AuthReset from './AuthResetSaga';

export const AuthSagas = [
  takeLatest(types.AUTH_GET_STORE_LOGIN, AuthSaga.getStoreLogin),
  takeLatest(types.AUTH_LOGIN_SUBMIT, AuthSaga.login),
  takeLatest(types.AUTH_LOGOUT, AuthSaga.logout),
  takeLatest(types.AUTH_FORGOT_SUBMIT, AuthForgot.submit),
  takeLatest(types.AUTH_RESET_RESEND_CODE, AuthReset.resend),
  takeLatest(types.AUTH_RESET_SUBMIT, AuthReset.submit),
];
