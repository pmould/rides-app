import * as actionTypes from '../constants/actionTypes';

import {FULFILLED, PENDING, REJECTED} from 'redux-promise-middleware';

import browserDetect from 'browser-detect';

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case `${actionTypes.REALTIME_RECEIVE_MESSAGE_NOTIFICATIONS}`: {
      return {...state, messageNotifications: action.payload}
    }
    case actionTypes.REALTIME_RECEIVE_NOTIFICATIONS: {
      return {...state, notifications: action.payload}
    }  
    case actionTypes.REALTIME_CLEAR_MESSAGE_NOTIFICATIONS: {
      state.messageNotifications = getInitialState().messageNotifications;
      return state;
    }
    case actionTypes.REALTIME_SET_SOCKET_SESSION_ID: {
      return {...state, socketSessionId: action.payload, realtimeConnected: true};
    }
    case actionTypes.REALTIME_CONNECTED: {
      return {...state, realtimeConnected: action.payload};
    }  
    case `${actionTypes.TURN_OFF_WEB_PUSH_NOTIFICATIONS}_${PENDING}`:
    case `${actionTypes.TURN_ON_WEB_PUSH_NOTIFICATIONS}_${PENDING}`:
    case `${actionTypes.UPDATE_WEB_PUSH_SUBSCRIPTION}_${PENDING}`: {
      return {...state, pushNotifications: {...state.pushNotifications, loading: true}}
    }
    case `${actionTypes.TURN_OFF_WEB_PUSH_NOTIFICATIONS}_${REJECTED}`:
    case `${actionTypes.TURN_ON_WEB_PUSH_NOTIFICATIONS}_${REJECTED}`:
    case `${actionTypes.UPDATE_WEB_PUSH_SUBSCRIPTION}_${REJECTED}`: {
      return {...state, pushNotifications: {...state.pushNotifications, loading: false}}
    }
    case `${actionTypes.FETCH_USER_ACCOUNT}_${FULFILLED}`:
    case `${actionTypes.TURN_OFF_WEB_PUSH_NOTIFICATIONS}_${FULFILLED}`:
    case `${actionTypes.TURN_ON_WEB_PUSH_NOTIFICATIONS}_${FULFILLED}`:
    case `${actionTypes.UPDATE_WEB_PUSH_SUBSCRIPTION}_${FULFILLED}`: {
      const {webPushSubscriptions = [], noSubscription} = action.payload || {};
      if (noSubscription) {
        return state;
      }
      const {name: browser} = browserDetect(navigator.userAgent);

      const webPushSubscription = webPushSubscriptions.filter(subscription =>
        subscription.browser === browser)[0];
      if (webPushSubscription) {
        webPushSubscription.isActive = Notification.permission === 'granted' && webPushSubscription.isActive;
      }
      
      return {...state, pushNotifications: {...webPushSubscription, loading: false}}
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    messageNotifications: {
      unReadMessageDriverGroupsCount: 0,
      unReadMessageHostGroupsCount: 0,
      unReadMessageGroupsCount: 0,
      messages: []
    },
    notifications: {
      unNotifiedNotificationsCount: 0,
      notifications: []
    },
    pushNotifications: {}
  }
}

