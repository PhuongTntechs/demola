import {put, select} from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';
import AsyncStorage from '@react-native-community/async-storage';

const getAuthState = (state) => state.AuthReducer;

export function* update({payload}) {
  try {
    yield put(actions.requestingUpdatePasswordStart());
    const {password, onSuccess} = payload;
    yield api(ApiConstants.UPDATE_PASSWORD, 'put', {password});
    const {user} = yield select(getAuthState);
    const userObj = {
      username: user.maNS,
      password,
    };
    yield AsyncStorage.setItem('login', JSON.stringify(userObj));
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showUpdatePasswordError(code, message));
  } finally {
    yield put(actions.requestingUpdatePasswordStop());
  }
}
