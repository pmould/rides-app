import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

export const editNewMessage = (message) => ({
  type: actionTypes.EDIT_NEW_MESSAGE,
  payload: message
});

export const getReservation = (reservationId, accountId, isDriver) => ({
  type: actionTypes.GET_RESERVATION,
  payload: api.getReservationApi(reservationId)
});

export const toggleMessageViewInit = () => ({
  type: actionTypes.TOGGLE_MESSAGE_INIT_VIEW
});

export const clearReservationMessages = () => ({
  type: actionTypes.CLEAR_RESERVATION_MESSAGES
});

export const joinMessageRoom = (room) => ({
  type: actionTypes.JOIN_MESSAGE_ROOM,
  payload: room
});


