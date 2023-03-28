import * as actionTypes from '../constants/actionTypes';

import {FULFILLED, PENDING} from 'redux-promise-middleware';

export default (state = getInitialState(), action) => {
  switch(action.type){
    case actionTypes.TOGGLE_EDIT_PROFILE: {
      return {...state, isEditable: !state.isEditable};
    }
    case actionTypes.SET_ABOUT_TEXT: {
      return {...state, account: {...state.account, aboutText: action.payload}};
    }
    case `${actionTypes.UPDATE_USER_PROFILE}_${FULFILLED}`: {
      return {account: action.payload, isEditable: false}
    }
    case `${actionTypes.FETCH_PROFILE_DATA}_${FULFILLED}`:
    case `${actionTypes.FETCH_USER_ACCOUNT}_${FULFILLED}`: {
      return {...state, account: action.payload};
    }
    case actionTypes.CLEAR_PROFILE_PAGE:
    case actionTypes.LOG_OUT_USER: {
      return getInitialState();
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    account: {},
    isEditable: false
  };
}

// {id: Math.floor(Math.random() * 1000 + 1)}