import {put} from 'redux-saga/effects';
import * as actions from '../actions';
import {registerID, deRegisterID} from '../../notification/actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';
import {Platform} from 'react-native';
import * as RootNavigation from '../../../navigation/RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';

export function* getStoreLogin() {
  try {
    const data = yield AsyncStorage.getItem('login');
    console.log(data);
    if (data) {
      const {username, password} = JSON.parse(data);
      const onError = () => RootNavigation.replace('AuthLogin');
      yield put(actions.submitLogin(username, password, null, onError));
    } else {
      RootNavigation.replace('AuthLogin');
    }
  } catch (e) {
    RootNavigation.replace('AuthLogin');
  }
}

export function* login({payload}) {
  try {
    yield put(actions.requestingLoginStart());
    const {username, password, onSuccess} = payload;
    const body = {
      username: username.trim(),
      password: password,
      platform: Platform.OS,
    };
    console.log(ApiConstants.LOGIN, body);
    const res = yield api(ApiConstants.LOGIN, 'post', body);
    console.log(res.data);
    const newData = {
      token: res.data.token,
      user: res.data.user,
      fbPermission: res.data.user.feebackPermission ?? {
        accept: false,
        delete: false,
        forward: false,
        reply: false,
        view: false,
      },
    };
    yield put(actions.updateAuthState(newData));
    yield AsyncStorage.setItem('login', JSON.stringify({username, password}));
    yield put(registerID());
    RootNavigation.replace('Welcome');
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    console.log(e);
    const {code, message} = parseError(e);
    if (payload.onError) {
      payload.onError(code, message);
    } else {
      yield put(actions.showLoginError(code, message));
    }
  } finally {
    yield put(actions.requestingLoginStop());
  }
}

export function* logout({payload}) {
  const {onSuccess, onError} = payload;
  try {
    yield put(deRegisterID());
    yield AsyncStorage.removeItem('login');
    RootNavigation.replace('AuthLogin');
    yield put({type: 'REDUX_RESET'});
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    const {code, message} = parseError(e);
    if (onError) {
      onError(message);
    }
    yield put(actions.showLoginError(code, message));
  }
}
