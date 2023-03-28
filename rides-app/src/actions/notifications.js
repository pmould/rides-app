import * as actionTypes from '../constants/actionTypes';
import {registerAndUpdateSubscription, askPermission, unsubscribe} from '../registerServiceWorker';
import * as api from '../api';

export const updateWebPushSubscription = () => ({
  type: actionTypes.UPDATE_WEB_PUSH_SUBSCRIPTION,
  payload: registerAndUpdateSubscription()
});

export const turnOffWebNotifications = () => ({
  type: actionTypes.TURN_OFF_WEB_PUSH_NOTIFICATIONS,
  payload: unsubscribe()
});

export const turnOnWebNotifications = () => ({
  type: actionTypes.TURN_ON_WEB_PUSH_NOTIFICATIONS,
  payload: askPermission()
})