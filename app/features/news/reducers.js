import createReducer from '../../lib/createReducer';
import * as types from './actionTypes';

const InitialState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
  data: {
    page: 0,
    next: true,
    results: [],
  },
};

export const NewsReducer = createReducer(InitialState, {
  [types.NEWS_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.NEWS_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.NEWS_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.NEWS_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});

const InitialDetailsState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
  comments: {
    page: 0,
    next: true,
    results: [],
  },
  childComments: {},
};

export const NewsDetailsReducer = createReducer(InitialDetailsState, {
  [types.NEWS_DETAIL_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.NEWS_DETAIL_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.NEWS_DETAIL_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.NEWS_DETAIL_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});
