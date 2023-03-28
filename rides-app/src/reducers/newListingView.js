import * as actionTypes from '../constants/actionTypes';

import {FULFILLED, PENDING} from 'redux-promise-middleware';

export default (state = getInitialState(), action) => {
  switch (action.type) { 
    case `${actionTypes.SAVE_LISTING_ELEGIBILITY}_${PENDING}`:   
    case `${actionTypes.SAVE_LISTING_AVAILABILITY}_${PENDING}`:
    case `${actionTypes.SAVE_LISTING_DETAILS}_${PENDING}`: 
    case `${actionTypes.SAVE_LISTING_PHOTO}_${PENDING}`: {
      return {...state, isLoading: true}
    }
    case `${actionTypes.SAVE_LISTING_ELEGIBILITY}_${FULFILLED}`:   
    case `${actionTypes.SAVE_LISTING_AVAILABILITY}_${FULFILLED}`:
    case `${actionTypes.SAVE_LISTING_DETAILS}_${FULFILLED}`: 
    case `${actionTypes.SAVE_LISTING_PHOTO}_${FULFILLED}`: {
      return Object.assign({}, state, {
        isLoading: false
      });
    }
    case `${actionTypes.TURN_ON_WEB_PUSH_NOTIFICATIONS}_${FULFILLED}`: {
      return {...state, webPushNoitificationViewable: true};
    }
    case actionTypes.LOG_OUT_USER: {
      return getInitialState();
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    isLoading: false
  }
}