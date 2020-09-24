import {takeLatest} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as Salary from './SalarySaga';

export const SalarySagas = [
  takeLatest(types.SALARY_GET_LIST_IN_YEAR, Salary.getList),
  takeLatest(types.SALARY_MONTH_GET_DETAILS, Salary.getMonth),
];
