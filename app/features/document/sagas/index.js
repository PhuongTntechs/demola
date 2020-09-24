import {takeLatest} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as List from './ListSaga';
import * as Detail from './DetailSaga';

export const DocumentSagas = [
  takeLatest(types.DOCUMENTS_VBNB_GET_LIST, List.getListVBNB),
  takeLatest(types.DOCUMENTS_VBNB_GET_FILE, List.getFileVBNB),
  takeLatest(types.DOCUMENTS_VBNB_FILTER_CHANGE, List.changeVBNBFilter),
  takeLatest(types.DOCUMENT_DETAIL_GET_DETAILS, Detail.get),
  takeLatest(types.DOCUMENT_DETAIL_GET_FILE, Detail.getFile),
];
