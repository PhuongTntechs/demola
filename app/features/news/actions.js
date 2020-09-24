import * as types from './actionTypes';

export function requestingNewsStart() {
  return {
    type: types.NEWS_REQUESTING_START,
  };
}

export function requestingNewsStop() {
  return {
    type: types.NEWS_REQUESTING_STOP,
  };
}

export function updateNewsState(data) {
  return {
    type: types.NEWS_STATE_UPDATE,
    payload: {...data},
  };
}

export function showNewsError(errorCode, errorMessage) {
  return {
    type: types.NEWS_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissNewsMessage() {
  return {
    type: types.NEWS_DISMISS_MESSAGE,
  };
}

export function getListNews(loadMore = false) {
  return {
    type: types.NEWS_GET_LIST,
    payload: {loadMore},
  };
}

export function onChangeRate(id, rate) {
  return {
    type: types.NEWS_RATE_CHANGE,
    payload: {id, rate},
  };
}

//TODO: Detail news
export function requestingNewsDetailStart() {
  return {
    type: types.NEWS_DETAIL_REQUESTING_START,
  };
}

export function requestingNewsDetailStop() {
  return {
    type: types.NEWS_DETAIL_REQUESTING_STOP,
  };
}

export function updateNewsDetailState(data) {
  return {
    type: types.NEWS_DETAIL_STATE_UPDATE,
    payload: {...data},
  };
}

export function showNewsDetailError(errorCode, errorMessage) {
  return {
    type: types.NEWS_DETAIL_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissNewsDetailMessage() {
  return {
    type: types.NEWS_DETAIL_DISMISS_MESSAGE,
  };
}

export function getNewsDetail(id, onSuccess) {
  return {
    type: types.NEWS_DETAIL_GET_DETAIL,
    payload: {id, onSuccess},
  };
}

export function onChangeRateDetail(id, rate, onSuccess) {
  return {
    type: types.NEWS_DETAIL_RATE_CHANGE,
    payload: {id, rate, onSuccess},
  };
}

export function getComments(id, loadMore, onSuccess) {
  return {
    type: types.NEWS_DETAIL_GET_COMMENTS,
    payload: {id, loadMore, onSuccess},
  };
}

export function getChildComments(parent, onSuccess) {
  return {
    type: types.NEWS_DETAIL_GET_CHILD_COMMENTS,
    payload: {parent, onSuccess},
  };
}

export function addComment(data, onSuccess) {
  return {
    type: types.NEWS_DETAIL_ADD_COMMENT,
    payload: {data, onSuccess},
  };
}

export function deleteComment(data, onSuccess) {
  return {
    type: types.NEWS_DETAIL_DELETE_COMMENT,
    payload: {data, onSuccess},
  };
}
