import * as actionTypes from '../constants/actionTypes';

import {FULFILLED, PENDING} from 'redux-promise-middleware';

import {mapItems} from '../utils';

export default (state = getInitialState(), action) => {
  switch (action.type) { 
    case `${actionTypes.FETCH_HOST_LISTINGS}_${FULFILLED}`: {
      const items = mapItems(action.payload);
      return {
        items,
        loading: false
      } 
    }
    case `${actionTypes.FETCH_HOST_LISTINGS}_${PENDING}`: {
      return {...state, loading: true};
    }
    case actionTypes.LOG_OUT_USER: {
      return getInitialState();
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    items: new Map()
  }
}