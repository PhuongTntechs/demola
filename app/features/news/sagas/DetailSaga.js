import {put, select} from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';

const getNewsState = (state) => state.NewsReducer;

export function* detail({payload}) {
  try {
    yield put(actions.requestingNewsDetailStart());
    const {id, onSuccess} = payload;
    const url = ApiConstants.NEWS_DETAIL.replace('{id}', id);
    const res = yield api(url, 'get');
    if (onSuccess) {
      onSuccess(res.data);
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showNewsDetailError(code, message));
  } finally {
    yield put(actions.requestingNewsDetailStop());
  }
}

export function* changeRate({payload}) {
  try {
    yield put(actions.requestingNewsDetailStart());
    const {id, rate, onSuccess} = payload;
    const url = ApiConstants.NEWS_SET_RATE.replace('{id}', id);
    yield api(url, 'put', {rate});
    const {data} = yield select(getNewsState);
    const lst = [...data.results].map((obj) => {
      if (obj.id === id) {
        obj.rate = rate;
      }
      return obj;
    });
    const dataObj = {...data, results: lst};
    yield put(actions.updateNewsState({data: dataObj}));
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showNewsDetailError(code, message));
  } finally {
    yield put(actions.requestingNewsDetailStop());
  }
}
