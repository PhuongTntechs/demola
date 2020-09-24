import {takeLatest} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as News from './NewsSagas';
import * as Detail from './DetailSaga';
import * as Comment from './CommentSaga';

export const NewsSagas = [
  takeLatest(types.NEWS_GET_LIST, News.list),
  takeLatest(types.NEWS_RATE_CHANGE, News.changeRate),
  takeLatest(types.NEWS_DETAIL_GET_DETAIL, Detail.detail),
  takeLatest(types.NEWS_DETAIL_RATE_CHANGE, Detail.changeRate),
  takeLatest(types.NEWS_DETAIL_GET_COMMENTS, Comment.getComments),
  takeLatest(types.NEWS_DETAIL_GET_CHILD_COMMENTS, Comment.getChildComment),
  takeLatest(types.NEWS_DETAIL_ADD_COMMENT, Comment.addComment),
  takeLatest(types.NEWS_DETAIL_DELETE_COMMENT, Comment.deleteComment),
];
