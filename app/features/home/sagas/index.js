import {takeLatest} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as UpdateSaga from './UpdateSaga';
import * as UploadAvatar from './UploadAvatarSaga';

export const HomeSagas = [
  takeLatest(types.WELCOME_CHECK_APP_UPDATE, UpdateSaga.checkUpdate),
  takeLatest(types.WELCOME_UPLOAD_AVATAR, UploadAvatar.updateAvatar),
];
