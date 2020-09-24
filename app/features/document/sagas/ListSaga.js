import {put, select} from 'redux-saga/effects';
import {Platform} from 'react-native';
import * as actions from '../actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';
import RNFetchBlob from 'rn-fetch-blob';
import getAuthToken from '../../../lib/getAuthToken';

const getDocState = (state) => state.DocumentsReducer;

export function* getListVBNB({payload}) {
  try {
    const {loadMore, onSuccess} = payload;
    const {filter, vbnb} = yield select(getDocState);
    if (loadMore && !vbnb.next) {
      return;
    }
    yield put(actions.requestingDocumentsStart());
    const {search} = filter.noibo;
    let page = 1;
    let next = true;
    if (loadMore) {
      page = vbnb.page + 1;
      next = vbnb.next;
    }
    const params = {page, search};
    const res = yield api(ApiConstants.DOC_VBNB_LIST, 'get', params);
    const {results} = res.data;
    let lst = results;
    if (loadMore) {
      lst = vbnb.results.concat(results);
      if (results.length === 0) {
        next = false;
      }
    }
    const dataObj = {results: lst, page, next};
    yield put(actions.updateVBNBData(null, dataObj));
    if (onSuccess) {
      onSuccess(lst);
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showDocumentsError(code, message));
  } finally {
    yield put(actions.requestingDocumentsStop());
  }
}

export function* getFileVBNB({payload}) {
  try {
    yield put(actions.requestingDocumentsStart());
    const {id, trichYeu, onSuccess} = payload;
    let url = ApiConstants.DOC_VBNB_FILE.replace('{id}', id);
    const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/${trichYeu}.pdf`;
    const res = yield RNFetchBlob.config({
      path: pathToWrite,
    })
      .fetch('GET', url, {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getAuthToken()}`,
      })
      .progress((receivedStr, totalStr) => {
        console.log(receivedStr);
        console.log(totalStr);
      });
    console.log('The file saved to ', res.path());
    const obj = {path: res.path(), name: `${trichYeu}.pdf`};
    if (Platform.OS === 'ios') {
      setTimeout(async () => {
        await RNFetchBlob.ios.openDocument(res.path());
      }, 500);
      return;
    }
    yield RNFetchBlob.android.actionViewIntent(res.path(), 'application/pdf');
    if (onSuccess) {
      onSuccess(obj);
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showDocumentsError(code, message));
  } finally {
    yield put(actions.requestingDocumentsStop());
  }
}

export function* changeVBNBFilter({payload}) {
  const {filter} = payload;
  const data = {
    page: 1,
    next: true,
    results: [],
  };
  yield put(actions.updateVBNBData(filter, data));
  const payloadObj = {loadMore: false};
  yield getListVBNB({payload: payloadObj});
}
