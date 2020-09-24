import {all} from 'redux-saga/effects';
import {TestSagas} from '../features/test/sagas';
import {AuthSagas} from '../features/auth/sagas';
import {HomeSagas} from '../features/home/sagas';
import {NotificationSagas} from '../features/notification/sagas';
import {DocumentSagas} from '../features/document/sagas';
import {NewsSagas} from '../features/news/sagas';
import {SalarySagas} from '../features/salary/sagas';
import {MenuSagas} from '../features/menu/sagas';
import {ProfileSagas} from '../features/profile/sagas';

export default function* rootSaga() {
  yield all([
    ...TestSagas,
    ...AuthSagas,
    ...HomeSagas,
    ...NotificationSagas,
    ...DocumentSagas,
    ...NewsSagas,
    ...SalarySagas,
    ...MenuSagas,
    ...ProfileSagas,
  ]);
}
