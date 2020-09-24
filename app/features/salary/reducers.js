import createReducer from '../../lib/createReducer';
import * as types from './actionTypes';

const InitialState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
};

export const SalaryReducer = createReducer(InitialState, {
  [types.SALARY_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.SALARY_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.SALARY_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.SALARY_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});

const InitialMonthState = {
  requesting: false,
  errorCode: 0,
  errorMessage: '',
};

export const SalaryMonthReducer = createReducer(InitialMonthState, {
  [types.SALARY_MONTH_STATE_UPDATE](state, {payload}) {
    return {
      ...state,
      ...payload,
    };
  },
  [types.SALARY_MONTH_REQUESTING_START](state) {
    return {
      ...state,
      requesting: true,
      errorCode: 0,
      errorMessage: '',
    };
  },
  [types.SALARY_MONTH_REQUESTING_STOP](state) {
    return {
      ...state,
      requesting: false,
    };
  },
  [types.SALARY_MONTH_DISMISS_MESSAGE](state) {
    return {
      ...state,
      errorCode: 0,
      errorMessage: '',
    };
  },
});
