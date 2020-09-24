import {put} from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';

export function* submit({payload}) {
  try {
    yield put(actions.requestingForgotStart());
    const {username, onSuccess} = payload;
    const res = yield api(ApiConstants.RESET_PASSWORD, 'post', {username});
    console.log(res.data);
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    console.log(e.response);
    const {code, message} = parseError(e);
    yield put(actions.showForgotError(code, message));
  } finally {
    yield put(actions.requestingForgotStop());
  }
}
