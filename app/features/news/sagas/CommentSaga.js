import {put, select} from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';

const getNewsDetailState = (state) => state.NewsDetailsReducer;

export function* getComments({payload}) {
  try {
    yield put(actions.requestingNewsDetailStart());
    const {id, loadMore} = payload;
    const {comments} = yield select(getNewsDetailState);
    let page = 1;
    let lst = [];
    let next = true;
    if (loadMore) {
      if (!comments.next) {
        yield put(actions.requestingNewsDetailStop());
        return;
      }
      page = comments.page + 1;
      lst = comments.results;
    }
    const url = ApiConstants.NEWS_COMMENTS.replace('{id}', id);
    const res = yield api(url, 'get', {page});
    const {results} = res.data;
    lst = lst.concat(results);
    if (results.length === 0) {
      next = false;
    }
    const dataObj = {...comments, next, page, results: lst};
    yield put(actions.updateNewsDetailState({comments: dataObj}));
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showNewsDetailError(code, message));
  } finally {
    yield put(actions.requestingNewsDetailStop());
  }
}

export function* getChildComment({payload}) {
  try {
    yield put(actions.requestingNewsDetailStart());
    const {parent, onSuccess} = payload;
    const url = ApiConstants.NEWS_CHILD_COMMENTS.replace('{id}', parent);
    const res = yield api(url, 'get');
    const {childComments} = yield select(getNewsDetailState);
    const {results} = res.data;
    const dataObj = {...childComments};
    dataObj[parent] = results;
    yield put(actions.updateNewsDetailState({childComments: dataObj}));
    if (onSuccess) {
      onSuccess(results);
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showNewsDetailError(code, message));
  } finally {
    yield put(actions.requestingNewsDetailStop());
  }
}

export function* addComment({payload}) {
  try {
    const {avatarUrl, tinTucID, hoTen, noiDung, parentId} = payload.data;
    const url = ApiConstants.NEWS_COMMENTS.replace('{id}', tinTucID);
    const body = {
      parentId,
      message: noiDung,
      hoTen,
      avatarUrl,
    };
    const res = yield api(url, 'post', body);
    const comment = {
      ...payload.data,
      id: res.data.id,
    };
    console.log(comment);
    const {comments, childComments} = yield select(getNewsDetailState);
    const lst =
      parentId === 0
        ? (comments.results ?? []).concat([comment])
        : (comments.results ?? []).map((obj) => {
            if (obj.id === parentId) {
              obj.child += 1;
            }
            return obj;
          });
    let lstChild = {...childComments};
    if (parentId > 0) {
      lstChild[parentId] = (childComments[parentId] ?? []).concat([comment]);
    }
    const dataObj = {...comments, results: lst};
    yield put(
      actions.updateNewsDetailState({
        childComments: lstChild,
        comments: dataObj,
      }),
    );
    if (payload.onSuccess) {
      payload.onSuccess();
    }
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showNewsDetailError(code, message));
  } finally {
    yield put(actions.requestingNewsDetailStop());
  }
}

export function* deleteComment({payload}) {
  try {
    yield put(actions.requestingNewsDetailStart());
    const {data, onSuccess} = payload;
    const url = ApiConstants.NEWS_DELETE_COMMENT.replace('{id}', data.id);
    yield api(url, 'delete');
    const {comments, childComments} = yield select(getNewsDetailState);
    let lst = (comments.results ?? []).filter((obj) => obj.id !== data.id);
    const lstChild = {...childComments};
    lstChild[data.id] = [];
    if (data.parentId > 0) {
      lstChild[data.parentId] = (lstChild[data.parentId] ?? []).filter(
        (obj) => obj.id === data.id,
      );
      lst = (comments.results ?? []).map((obj) => {
        if (obj.id === data.parentId) {
          obj.child -= 1;
        }
        return obj;
      });
    }
    const dataObj = {...comments, results: lst};
    yield put(
      actions.updateNewsDetailState({
        childComments: lstChild,
        comments: dataObj,
      }),
    );
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
