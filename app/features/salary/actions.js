import * as types from './actionTypes';

export function requestingSalaryStart() {
  return {
    type: types.SALARY_REQUESTING_START,
  };
}

export function requestingSalaryStop() {
  return {
    type: types.SALARY_REQUESTING_STOP,
  };
}

export function updateSalaryState(data) {
  return {
    type: types.SALARY_STATE_UPDATE,
    payload: {...data},
  };
}

export function showSalaryError(errorCode, errorMessage) {
  return {
    type: types.SALARY_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissSalaryMessage() {
  return {
    type: types.SALARY_DISMISS_MESSAGE,
  };
}

export function getListSalary(year, onSuccess) {
  return {
    type: types.SALARY_GET_LIST_IN_YEAR,
    payload: {year, onSuccess},
  };
}

//TODO: Salary month details
export function requestingSalaryMonthStart() {
  return {
    type: types.SALARY_MONTH_REQUESTING_START,
  };
}

export function requestingSalaryMonthStop() {
  return {
    type: types.SALARY_MONTH_REQUESTING_STOP,
  };
}

export function updateSalaryMonthState(data) {
  return {
    type: types.SALARY_MONTH_STATE_UPDATE,
    payload: {...data},
  };
}

export function showSalaryMonthError(errorCode, errorMessage) {
  return {
    type: types.SALARY_MONTH_STATE_UPDATE,
    payload: {requesting: false, errorCode, errorMessage},
  };
}

export function dismissSalaryMonthMessage() {
  return {
    type: types.SALARY_MONTH_DISMISS_MESSAGE,
  };
}

export function getSalaryMonth(month, year, onSuccess) {
  return {
    type: types.SALARY_MONTH_GET_DETAILS,
    payload: {month, year, onSuccess},
  };
}
