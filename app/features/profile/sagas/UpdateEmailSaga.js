import {put, select} from 'redux-saga/effects';
import * as actions from '../actions';
import {updateAuthState} from '../../auth/actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';

const getAuthState = (state) => state.AuthReducer;

export function* updateEmail({payload}) {
  try {
    yield put(actions.requestingUpdateEmailStart());
    const {email, onSuccess} = payload;
    const res = yield api(ApiConstants.UPDATE_EMAIL, 'post', {email});
    console.log(res);
    const {user} = yield select(getAuthState);
    const userObj = {...user, email, isConfirmEmail: false};
    yield put(updateAuthState({user: userObj}));
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showUpdateEmailError(code, message));
  } finally {
    yield put(actions.requestingUpdateEmailStop());
  }
}

export function* resendEmailCode({payload}) {
  try {
    yield put(actions.requestingUpdateEmailStart());
    const {email, onSuccess} = payload;
    const res = yield api(ApiConstants.RESEND_EMAIL_CODE, 'post', {email});
    console.log(res);
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showUpdateEmailError(code, message));
  } finally {
    yield put(actions.requestingUpdateEmailStop());
  }
}

export function* verifyEmail({payload}) {
  try {
    yield put(actions.requestingUpdateEmailStart());
    const {email, code, onSuccess} = payload;
    const body = {email, code};
    const res = yield api(ApiConstants.VERIFY_EMAIL, 'post', body);
    console.log(res);
    const {user} = yield select(getAuthState);
    const userObj = {...user, email, isConfirmEmail: true};
    yield put(updateAuthState({user: userObj}));
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showUpdateEmailError(code, message));
  } finally {
    yield put(actions.requestingUpdateEmailStop());
  }
}
