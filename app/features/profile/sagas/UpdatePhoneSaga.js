import {put, select} from 'redux-saga/effects';
import * as actions from '../actions';
import {updateAuthState} from '../../auth/actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';

const getAuthState = (state) => state.AuthReducer;

export function* update({payload}) {
  try {
    yield put(actions.requestingUpdatePhoneStart());
    const {phone, onSuccess} = payload;
    yield api(ApiConstants.UPDATE_PHONE, 'put', {phone});
    const {user} = yield select(getAuthState);
    const userObj = {...user, phoneNumber: phone};
    yield put(updateAuthState({user: userObj}));
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showUpdatePhoneError(code, message));
  } finally {
    yield put(actions.requestingUpdatePhoneStop());
  }
}
