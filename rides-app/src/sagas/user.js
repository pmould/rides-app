import * as actionTypes from '../constants/actionTypes';
import * as accountActions from '../actions/account';
import * as metaDataActions from '../actions/metaData';

import {FULFILLED} from 'redux-promise-middleware';
import {takeEvery, call, put} from 'redux-saga/effects';

export function* onUserImageSavedSaga() {
  yield takeEvery([
    `${actionTypes.UPDATE_USER_PROFILE}_${FULFILLED}`,
    `${actionTypes.SAVE_PROFILE_PICTURE}_${FULFILLED}`,
    `${actionTypes.SAVE_COVER_PHOTO}_${FULFILLED}`], onUserImageSaved);
}

function* onUserImageSaved(action) {
  try {
    yield put(metaDataActions.getUserAccount());
    yield put(accountActions.getUserProfileData());
  }
  catch(ex) {
    console.warn('onUserImageSaved failed', ex);
  }
}

