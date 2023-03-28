import * as actionTypes from '../constants/actionTypes';

import {FULFILLED, PENDING} from 'redux-promise-middleware';
import moment from 'moment';

import {DATE_FORMAT, TIME_FORMAT} from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case `${actionTypes.SAVE_RESERVATION}_${FULFILLED}`: {
      return {...action.payload, sending: false};
    }
    case `${actionTypes.SAVE_RESERVATION}_${PENDING}`: {
      return {...state, sending: true};
    }
    case actionTypes.SET_INITIAL_TRIP_DATES: {
      const startDate = moment().hours(10).minutes(0).format(`${DATE_FORMAT} ${TIME_FORMAT}`);
      const endDate = moment().days(7).hours(10).minutes(0).format(`${DATE_FORMAT} ${TIME_FORMAT}`);

      return Object.assign({}, state, {
        startDate, endDate
      });
    }
    case actionTypes.SET_RESERVATION_START_DATE: {
      const date = action.payload.format(DATE_FORMAT);
      const time = (state.startDate && moment(state.startDate).format(TIME_FORMAT)) || '';
      return Object.assign({}, state, {
        startDate: `${date} ${time}`.trim(),
      });
    }
    case actionTypes.SET_RESERVATION_START_TIME: {
      const date = (state.startDate && moment(state.startDate).format(DATE_FORMAT))  || '';
      const time = action.payload.format(TIME_FORMAT);
      return Object.assign({}, state, {
        startDate: `${date} ${time}`,
      });
    }
    case actionTypes.SET_RESERVATION_END_DATE: {
      const date = action.payload.format(DATE_FORMAT);
      const time = (state.startDate && moment(state.startDate).format(TIME_FORMAT))  || '';
      return Object.assign({}, state, {
        endDate: `${date} ${time}`.trim(),
      });
    }
    case actionTypes.SET_RESERVATION_END_TIME: {
      const date = (state.endDate && moment(state.endDate).format(DATE_FORMAT))  || '';
      const time = action.payload.format(TIME_FORMAT);
      return Object.assign({}, state, {
        endDate: `${date} ${time}`.trim(),
      });
    }
    case actionTypes.SET_INITIAL_RESERVATION_MESSAGE: {
      return {...state, initialMessage: action.payload}
    }
    case `${actionTypes.APPROVE_PENDING_RESERVATION}_${FULFILLED}`:  
    case `${actionTypes.GET_RESERVATION}_${FULFILLED}`: {
      return action.payload;
    }  
    case actionTypes.SET_RESERVATION_MESSAGE_INIT: {
      return action.payload.reservation;
    }
    case `${actionTypes.TURN_ON_WEB_PUSH_NOTIFICATIONS}_${FULFILLED}`: {
      return {...state, webPushNoitificationViewable: true};
    }
    case `${actionTypes.GET_RESERVATION}_${PENDING}`:
    case actionTypes.CLEAR_RESERVATION_MESSAGES: {
      return {};
    }  
    default: return state;
  }
}