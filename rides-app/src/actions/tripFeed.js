import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';
import * as CommonViewActions from './commonView';
import {SnackBars} from '../constants/Enums';

export const fetchTrips = () => {
  return (dispatch, getState) => {
    const  {dashboard: {completedTrips: {limit, page, isLoading}}} = getState();
    if (isLoading) {
      return;
    }

    dispatch({
      type: actionTypes.FETCH_TRIPS,
      payload: api.getTripsApi(limit, page)
    });
  }
};

export const fetchTripFeed = () => {
  return (dispatch, getState) => {
    const  {dashboard: {tripFeed: {limit, page, isLoading}}} = getState();
    if (isLoading) {
      return;
    }
    dispatch({
      type: actionTypes.FETCH_TRIP_FEED,
      payload: api.getTripFeedApi(limit, page)
    });
  }
};

export const authorizedStartTrip = (reservationId, patches, socketSessionId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.AUTHORIZE_START_TRIP,
      payload: api.patchReservationApi(reservationId, patches, socketSessionId)
    }).then(({value: {id = undefined} = {}}) => {
      if (id) {
        dispatch(
          CommonViewActions.displaySnackBar({
            message: 'Trip Authorized Succeeded'
          })
        );
      }
    })
  };
}

export const startTrip = (reservationId, patches, socketSessionId) => {
  console.log(socketSessionId);
  return (dispatch) => {
    dispatch({
      type: actionTypes.START_TRIP,
      payload: api.patchReservationApi(reservationId, patches, socketSessionId)
    }).then(({value: {id = undefined} = {}}) => {
      if (id) {
        dispatch(
          CommonViewActions.displaySnackBar({
            message: 'Trip Started Succeeded'
          })
        );
      }
    })
  };
}

export const driverEndTrip = (reservationId, patches, socketSessionId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DRIVER_END_TRIP,
      payload: api.patchReservationApi(reservationId, patches, socketSessionId)
    }).then(({value: {id = undefined} = {}}) => {
      if (id) {
        dispatch(
          CommonViewActions.displaySnackBar({
            message: 'Trip Marked as Ended By Driver'
          })
        );
      }
    });
  };
};

export const endTrip = (reservationId, patches, socketSessionId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.END_TRIP,
      payload: api.patchReservationApi(reservationId, patches, socketSessionId)
    }).then(({value: {id = undefined} = {}}) => {
      if (id) {
        dispatch(
          CommonViewActions.displaySnackBar({
            message: 'Trip Marked as Completed by Host'
          })
        );
      }
    });
  };
};