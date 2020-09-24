import {put, select} from 'redux-saga/effects';
import * as actions from '../actions';
import {updateAuthState} from '../../auth/actions';
import api from '../../../api';
import ApiConstants from '../../../api/ApiConstants';
import parseError from '../../../lib/parseError';

const getAuthState = (state) => state.AuthReducer;

export function* updateAvatar({payload}) {
  try {
    yield put(actions.requestingHomeStart());
    const {image} = payload;
    let media = new FormData();
    media.append('file', {
      uri: image.path,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
    console.log(media);
    const header = {
      'Content-Type': 'multipart/form-data',
    };
    const res = yield api(
      ApiConstants.UPLOAD_AVATAR,
      'post',
      media,
      true,
      header,
    );
    console.log(res.data);
    const {user} = yield select(getAuthState);
    const userObj = {...user, avatarUrl: image.path};
    yield put(updateAuthState({user: userObj}));
  } catch (e) {
    const {code, message} = parseError(e);
    yield put(actions.showHomeError(code, message));
  } finally {
    yield put(actions.requestingHomeStop());
  }
}
