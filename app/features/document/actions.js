import * as types from './actionTypes';

export function changeTab(index) {
  return {
    type: types.DOCUMENTS_TAB_CHANGE,
    payload: {index},
  };
}

export function requestingDocumentsStart() {
  return {
    type: types.DOCUMENTS_REQUESTING_START,
  };
}

export function requestingDocumentsStop() {
  return {
    type: types.DOCUMENTS_REQUESTING_STOP,
  };
}

export function updateDocumentsState(data) {
  return {
    type: types.DOCUMENTS_STATE_UPDATE,
    payload: {...data},
  };
}

export function showDocumentsError(errorCode, errorMessage) {
  return {
    type: types.DOCUMENTS_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissDocumentsMessage() {
  return {
    type: types.DOCUMENTS_DISMISS_MESSAGE,
  };
}

export function getListVBNoiBo(loadMore = false, onSuccess = null) {
  return {
    type: types.DOCUMENTS_VBNB_GET_LIST,
    payload: {loadMore, onSuccess},
  };
}

export function getFileVBNB(id, trichYeu, onSuccess = null) {
  return {
    type: types.DOCUMENTS_VBNB_GET_FILE,
    payload: {id, trichYeu, onSuccess},
  };
}

export function changeVBNBFilter(filter) {
  return {
    type: types.DOCUMENTS_VBNB_FILTER_CHANGE,
    payload: {filter},
  };
}

export function updateVBNBData(filter, data) {
  return {
    type: types.DOCUMENTS_VBNB_DATA_UPDATE,
    payload: {filter, data},
  };
}

export function getListVBDen(loadMore = false, onSuccess = null) {
  return {
    type: types.DOCUMENTS_VBDEN_GET_LIST,
    payload: {loadMore, onSuccess},
  };
}

export function changeVBDenFilter(filter) {
  return {
    type: types.DOCUMENTS_VBDEN_FILTER_CHANGE,
    payload: {filter},
  };
}

export function updateVBDenData(filter, data) {
  return {
    type: types.DOCUMENTS_VBDEN_DATA_UPDATE,
    payload: {filter, data},
  };
}

//TODO: Document detail
export function requestingDocumentDetailStart() {
  return {
    type: types.DOCUMENT_DETAIL_REQUESTING_START,
  };
}

export function requestingDocumentDetailStop() {
  return {
    type: types.DOCUMENT_DETAIL_REQUESTING_STOP,
  };
}

export function updateDocumentDetailState(data) {
  return {
    type: types.DOCUMENT_DETAIL_STATE_UPDATE,
    payload: {...data},
  };
}

export function showDocumentDetailError(errorCode, errorMessage) {
  return {
    type: types.DOCUMENT_DETAIL_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissDocumentDetailMessage() {
  return {
    type: types.DOCUMENT_DETAIL_DISMISS_MESSAGE,
  };
}

export function getDocumentDetail(id, onSuccess) {
  return {
    type: types.DOCUMENT_DETAIL_GET_DETAILS,
    payload: {id, onSuccess},
  };
}

export function showFileInDetail(fileId, fileName, onSuccess) {
  return {
    type: types.DOCUMENT_DETAIL_GET_FILE,
    payload: {fileId, fileName, onSuccess},
  };
}
