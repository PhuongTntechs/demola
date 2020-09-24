import {put} from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';

export function* getList({payload}) {
  try {
    yield put(actions.requestingSalaryStart());
    const {year, onSuccess} = payload;
    const res = yield api(ApiConstants.SALARY_LIST, 'get', {year});
    if (onSuccess) {
      onSuccess(res.data);
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showSalaryError(code, message));
  } finally {
    yield put(actions.requestingSalaryStop());
  }
}

export function* getMonth({payload}) {
  try {
    yield put(actions.requestingSalaryMonthStart());
    const {month, year, onSuccess} = payload;
    const res = yield api(ApiConstants.SALARY_DETAIL, 'get', {month, year});
    console.log(res.data);
    if (onSuccess) {
      onSuccess(res.data);
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showSalaryMonthError(code, message));
  } finally {
    yield put(actions.requestingSalaryMonthStop());
  }
}
