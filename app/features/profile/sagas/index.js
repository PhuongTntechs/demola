import {takeLatest} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as UpdateEmail from './UpdateEmailSaga';
import * as UpdatePhone from './UpdatePhoneSaga';
import * as UpdatePassword from './UpdatePasswordSaga';

export const ProfileSagas = [
  takeLatest(types.UPDATE_EMAIL_SUBMIT_UPDATE, UpdateEmail.updateEmail),
  takeLatest(types.UPDATE_EMAIL_RESEND_CODE, UpdateEmail.resendEmailCode),
  takeLatest(types.UPDATE_EMAIL_SUBMIT_VERIFY, UpdateEmail.verifyEmail),
  takeLatest(types.UPDATE_PHONE_SUBMIT_UPDATE, UpdatePhone.update),
  takeLatest(types.UPDATE_PASSWORD_SUBMIT_UPDATE, UpdatePassword.update),
];
