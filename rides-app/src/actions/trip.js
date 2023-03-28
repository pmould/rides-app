
import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';
import * as CommonViewActions from './commonView';
import {SnackBars} from '../constants/Enums';

export const displayTripPhotoModal = (currentTripPhoto) => ({
  type: actionTypes.DISPLAY_TRIP_PHOTO_MODAL,
  payload: currentTripPhoto
});

export const hideTripPhotoModal = (currentTripPhoto) => ({
  type: actionTypes.HIDE_TRIP_PHOTO_MODAL,
  payload: currentTripPhoto
});

export const updateTripPhoto = (tripPhoto) => ({
  type: actionTypes.UPDATE_TRIP_PHOTO,
  payload: api.updateTripPhotoApi(tripPhoto)
});

export const deleteTripPhoto = (tripPhotoId) => ({
  type: actionTypes.DELETE_TRIP_PHOTO,
  payload: api.deleteTripPhotoApi(tripPhotoId),
  meta: {tripPhotoId}
});

export const setTripPhotoDescription = (description) => ({
  type: actionTypes.SET_TRIP_PHOTO_DESCRIPTION,
  payload: description
});

export const updateTripStatus = (reservationId, patches, sessionId, successMessage) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_TRIP_STATUS,
      payload: api.patchReservationApi(reservationId, patches, sessionId)
    }).then(({value}) => {
      dispatch(CommonViewActions.displaySnackBar({
        message: successMessage
      }))
      return value;
    });
  }
}
