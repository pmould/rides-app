import * as actionTypes from '../constants/actionTypes';

import {FULFILLED} from 'redux-promise-middleware';
import cloneDeep from 'lodash/cloneDeep';

export default (state = getInitialState(), action) => {
  switch (action.type) { 
    case actionTypes.REALTIME_JOINED_ROOM: {
      state.isOnline = true;
      return cloneDeep(state);
    }
    case actionTypes.EDIT_NEW_MESSAGE: {
      state.newMessage = action.payload;
      return cloneDeep(state);
    }
    case actionTypes.REALTIME_RECEIVED_MESSAGE: {
      const {id} = action.payload;
      const newState = cloneDeep(state);
      newState.messages.set(id, action.payload);

      newState.messages = new Map([...newState.messages.entries()]
        .sort((a, b) => a[0].id - b[0].id));  

      return newState;
    }
    case actionTypes.REALTIME_RECEIVE_ALL_MESSAGES: {
      const {messages} = action.payload;
      const newState = cloneDeep(state);
      newState.messages = new Map(Object.entries(messages)
        .sort((a, b) => a[0].id - b[0].id));
      return newState;
    }
    case actionTypes.REALTIME_UPDATE_IS_TYPING: {
      state.recpientIsTyping = action.payload;
      return cloneDeep(state);
    }
    // case `${actionTypes.GET_RESERVATION}_${FULFILLED}`: {
    //   const {id: reservationId,driverId, listing: {hostId} = {}} = action.payload;
    //   const {accountId, isDriver} = action.meta;
    //   const room = `trip-${reservationId}-host-account-${isDriver ? hostId : accountId}-driver-account-${isDriver ? accountId : driverId}`;
    //   return {...state, room};     
    // } 
    case actionTypes.JOIN_MESSAGE_ROOM: {
      return {...state, room: action.payload}
    }
    case actionTypes.SET_RESERVATION_MESSAGE_INIT: {
      const {room} = action.payload;
      return {...getInitialState(), room};
    }
    case actionTypes.CLEAR_RESERVATION_MESSAGES: {
      return getInitialState();
    }  
    case actionTypes.LOG_OUT_USER: {
      return {};
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    messages: new Map(),
    recpientIsTyping: false,
    room: ''
  }
}