import {takeLatest} from 'redux-saga/effects';
import * as Dummy from './Dummy';

export const TestSagas = [takeLatest('TEST_DUMMY', Dummy.dummy)];
