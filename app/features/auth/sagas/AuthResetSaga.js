import {put} from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';

export function* resend({payload}) {
  try {
    yield put(actions.requestingResetStart());
    const {username, onSuccess} = payload;
    yield api(ApiConstants.RESET_PASSWORD, 'post', {username});
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showResetError(code, message));
  } finally {
    yield put(actions.requestingResetStop());
  }
}

export function* submit({payload}) {
  try {
    yield put(actions.requestingResetStart());
    const {username, code, password, onSuccess} = payload;
    const body = {username, code, password};
    yield api(ApiConstants.CONFIRM_RESET_PASSWORD, 'post', body);
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showResetError(code, message));
  } finally {
    yield put(actions.requestingResetStop());
  }
}
