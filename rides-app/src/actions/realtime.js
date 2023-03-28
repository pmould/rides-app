import * as actionTypes from '../constants/actionTypes';
import * as messageListActions from './messageList';
import * as messageActions from './messages';
import * as tripFeedActions from './tripFeed';
import * as reservationActions from './reservation';
import {ProfileTypes} from '../constants/Enums';
import * as CommonViewActions from './commonView';

export const setSocketSessionId = (socketSessionId) => ({
  type: actionTypes.REALTIME_SET_SOCKET_SESSION_ID,
  payload: socketSessionId
});

export const setRealTimeConnected = (realtimeConnected) => ({
  type: actionTypes.REALTIME_CONNECTED,
  payload: realtimeConnected
});

export const onJoinedRoom = () => ({
  type: actionTypes.REALTIME_JOINED_ROOM,
});

export const recieveAllMessagges = (payload) => ({
  type: actionTypes.REALTIME_RECEIVE_ALL_MESSAGES,
  payload
});

export const recievedMessage = (message) => ({
  type: actionTypes.REALTIME_RECEIVED_MESSAGE,
  payload: message
});

export const updateIsTyping = (isTyping) => ({
  type: actionTypes.REALTIME_UPDATE_IS_TYPING,
  payload: isTyping
});

export const receiveMessageNotifications = (notifications, init) => {
  return (dispatch, getState) => {
    const {routing: {location: {pathname}}, messagesList: {profileType}} = getState();
      dispatch({
        type: actionTypes.REALTIME_RECEIVE_MESSAGE_NOTIFICATIONS,
        payload: notifications
      });
    if (pathname === '/messages' && !init) {
      dispatch(messageListActions.getMessages(profileType));
    }
  }
}

export const clearMessageNotifications = () => ({
  type: actionTypes.REALTIME_CLEAR_MESSAGE_NOTIFICATIONS
});

export const recieveAllNotifications = (notificationPayload, reservationId) => {
  return (dispatch, getState) => {
    const {routing: {location: {pathname}}} = getState();
    const notifications = notificationPayload && notificationPayload.notifications;
    const notification = notifications && notifications[notifications.length - 1];


    dispatch({
      type: actionTypes.REALTIME_RECEIVE_NOTIFICATIONS, 
      payload: notificationPayload
    });

    if (pathname === '/dashboard') {
      dispatch(tripFeedActions.fetchTripFeed());
    }

    if (pathname.indexOf('/trips/') !== -1) {
      reservationId && dispatch(reservationActions.getTrip(reservationId));
    }
 
    if (notification && notification.type === 'trip-notification' && notification.pendingAlert) {
      dispatch(
        CommonViewActions.displaySnackBar({
          description: notification.message
        })
      );

      if (notification.reservationId === reservationId && pathname.indexOf('/messages/reservation/') !== -1)  {
        dispatch(messageActions.getReservation(reservationId))
      }
    }

    if (pathname.indexOf('/trips/') !== -1) {
      reservationId && dispatch(reservationActions.getTrip(reservationId));
    }

  }
}

export const setTripMeetUpSharedLocation = (payload) => ({
  type: actionTypes.REALTIME_RECEIVE_TRIP_MEETUP_SHARED_LOCATION,
  payload
});

export const clearAllNotifications = () => ({
  type: actionTypes.REALTIME_CLEAR_NOTIFICATIONS
})