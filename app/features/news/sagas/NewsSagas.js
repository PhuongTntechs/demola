import {put, select} from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';

const getNewsState = (state) => state.NewsReducer;

export function* list({payload}) {
  try {
    yield put(actions.requestingNewsStart());
    const {data} = yield select(getNewsState);
    if (payload.loadMore && !data.next) {
      yield put(actions.requestingNewsStop());
      return;
    }
    let page = 1;
    let lst = [];
    let next = true;
    if (payload.loadMore) {
      page = data.page + 1;
      lst = data.results;
    }
    const res = yield api(ApiConstants.NEWS_LIST, 'get', {page});
    const {results} = res.data;
    lst = lst.concat(results);
    if (results.length === 0) {
      next = false;
    }
    const dataObj = {...data, page, next, results: lst};
    yield put(actions.updateNewsState({data: dataObj}));
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showNewsError(code, message));
  } finally {
    yield put(actions.requestingNewsStop());
  }
}

export function* changeRate({payload}) {
  try {
    yield put(actions.requestingNewsStart());
    const {id, rate} = payload;
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
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showNewsError(code, message));
  } finally {
    yield put(actions.requestingNewsStop());
  }
}
