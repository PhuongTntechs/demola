import createReducer from '../../lib/createReducer';
import * as types from './actionTypes';

const InitialState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
  tabIndex: 0,
  filter: {
    noibo: {
      search: '',
    },
    den: {
      search: '',
    },
  },
  vbnb: {
    page: 1,
    next: true,
    results: [],
  },
  vbden: {
    page: 1,
    next: true,
    results: [],
  },
};

export const DocumentsReducer = createReducer(InitialState, {
  [types.DOCUMENTS_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.DOCUMENTS_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.DOCUMENTS_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.DOCUMENTS_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.DOCUMENTS_VBNB_DATA_UPDATE](state, {payload}) {
    return {
      ...state,
      filter: {
        ...state.filter,
        noibo: {
          ...state.filter.noibo,
          ...payload.filter,
        },
      },
      vbnb: {
        ...state.vbnb,
        ...payload.data,
      },
    };
  },
  [types.DOCUMENTS_VBDEN_DATA_UPDATE](state, {payload}) {
    return {
      ...state,
      filter: {
        ...state.filter,
        den: {
          ...state.filter.den,
          ...payload.filter,
        },
      },
      vbden: {
        ...state.vbden,
        ...payload.data,
      },
    };
  },
});

const InitialDetailState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
};

export const DocumentDetailReducer = createReducer(InitialDetailState, {
  [types.DOCUMENT_DETAIL_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.DOCUMENT_DETAIL_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.DOCUMENT_DETAIL_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.DOCUMENT_DETAIL_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});
