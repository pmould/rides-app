import * as actionTypes from '../constants/actionTypes';

import * as api from '../api';

import history from '../history';

export const getMessages = (profileType, limit = 5, page = 1) => ({
  type: actionTypes.GET_ALL_MESSAGES,
  meta: {profileType},
  payload: api.getMessagesApi(profileType, limit, page)
});

export const setMessageListTab = (profileType) => ({
  type: actionTypes.SET_MESSAGE_LIST_TAB,
  payload: profileType
});

export const goToReservationMessage = (reservation, room, isDriver) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_RESERVATION_MESSAGE_INIT,
      payload: {reservation, room}
    });

    history.push(`/${isDriver ? 'driver' : 'host'}/messages/reservation/${reservation.id}`)
  }
}