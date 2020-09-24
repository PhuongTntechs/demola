import {put} from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';
import RNFetchBlob from 'rn-fetch-blob';
import getAuthToken from '../../../lib/getAuthToken';
import {Platform} from 'react-native';

export function* get({payload}) {
  try {
    yield put(actions.requestingDocumentDetailStart());
    const {id, onSuccess} = payload;
    const url = ApiConstants.DOC_VBNB_DETAIL.replace('{id}', id);
    const res = yield api(url, 'get');
    const {data, files} = res.data;
    yield put(actions.updateDocumentDetailState({detail: data, files}));
    if (onSuccess) {
      onSuccess(data, files);
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showDocumentDetailError(code, message));
  } finally {
    yield put(actions.requestingDocumentDetailStop());
  }
}

export function* getFile({payload}) {
  try {
    yield put(actions.requestingDocumentDetailStart());
    const {fileId, fileName, onSuccess} = payload;
    let url = ApiConstants.DOC_FILE_VBNB.replace('{id}', fileId);
    const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`;
    const res = yield RNFetchBlob.config({
      path: pathToWrite,
    })
      .fetch('GET', url, {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getAuthToken()}`,
      })
      .progress((receivedStr, totalStr) => {
        console.log(receivedStr, totalStr);
      });
    console.log('The file saved to ', res.path());
    const obj = {path: res.path(), name: fileName};
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
    yield put(actions.showDocumentDetailError(code, message));
  } finally {
    yield put(actions.requestingDocumentDetailStop());
  }
}
