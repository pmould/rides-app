import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

import {SnackBars} from '../constants/Enums';
import * as CommonViewActions from './commonView';
import *  as TripActions from './trip';

import history from '../history';



// export const saveTripPhoto = (reservationId, file) => ({
//   type: actionTypes.SAVE_TRIP_PHOTO,
//   payload: api.saveTripPhotoApi(reservationId, file),
// });
export const saveTripPhoto = (reservationId, file) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_TRIP_PHOTO,
      payload: api.saveTripPhotoApi(reservationId, file),
    }).then(({value}) => {
      dispatch(TripActions.displayTripPhotoModal(value));
      return value;
    });
  }
}

export const getTrip = (reservationId) => ({
  type: actionTypes.GET_TRIP,
  payload: api.getReservationApi(reservationId),
});

export const setReservationStartDate = (startDate) => ({
  type: actionTypes.SET_RESERVATION_START_DATE,
  payload: startDate
});

export const setReservationStartTime = (startTime) => ({
  type: actionTypes.SET_RESERVATION_START_TIME,
  payload: startTime
});

export const setReservationEndDate = (endDate) => ({
  type: actionTypes.SET_RESERVATION_END_DATE,
  payload: endDate
});

export const setReservationEndTime = (endTime) => ({
  type: actionTypes.SET_RESERVATION_END_TIME,
  payload: endTime
});

export const setInitialTripDates = () => ({
  type: actionTypes.SET_INITIAL_TRIP_DATES
});

export const saveReservation = (reservation, socketSessionId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_RESERVATION,
      payload: api.saveReservationApi(reservation, socketSessionId)
    }).then(({value: {id}}) => {
      history.push(`tripConfirmation?reservationId=${id}`);
    });
  };
}

export const setInitialReservationMessage = (message) => ({
  type: actionTypes.SET_INITIAL_RESERVATION_MESSAGE,
  payload: message
});

export const approvePendingReservation = (reservationId, patches, socketSessionId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.APPROVE_PENDING_RESERVATION,
      payload: api.patchReservationApi(reservationId, patches, socketSessionId)
    }).then(({value: {id = undefined} = {}}) => {
      if (id) {
        dispatch(
          CommonViewActions.displaySnackBar({
            message: 'Trip Approved Succeeded'
          })
        );
      }
    });
  };
}
