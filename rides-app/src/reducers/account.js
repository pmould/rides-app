import * as actionTypes from '../constants/actionTypes';

import {FULFILLED, PENDING, REJECTED} from 'redux-promise-middleware';

import {cloneDeep} from 'lodash';

export default (state = getInitialState(), action) => {
  switch(action.type) {
    case `${actionTypes.SAVE_NEW_ACCOUNT}_${FULFILLED}`:
    case `${actionTypes.SAVE_NEW_ACCOUNT_DETAILS}_${FULFILLED}`:
    case `${actionTypes.ACTIVATE_NEW_ACCOUNT}_${FULFILLED}`: {
      const account = action.payload;
  
      const {email: accountEmail} = account || {};
      const newAccount = Object.assign({}, account);
      newAccount.email = accountEmail || state.email;

      return Object.assign({}, state, newAccount);
    }
    case `${actionTypes.LOGIN_BY_EMAIL}_${{PENDING}}`:
    case `${actionTypes.SIGNUP_BY_EMAIL}_${PENDING}`:  
    case `${actionTypes.SIGNUP_WITH_SOCIAL}_${PENDING}`: {
      return {...state, isLoggingIn: true}
    }
    case `${actionTypes.LOGIN_BY_EMAIL}_${FULFILLED}`:
    case `${actionTypes.SIGNUP_BY_EMAIL}_${FULFILLED}`:  
    case `${actionTypes.SIGNUP_WITH_SOCIAL}_${FULFILLED}`: 
    case `${actionTypes.FETCH_USER_ACCOUNT}_${FULFILLED}`: {
      const {account = {}, email: userEmail} = action.payload;

      const {email: accountEmail} = account;
      
      const newAccount = cloneDeep(account);
      newAccount.email = accountEmail || userEmail;

      return {...state, ...newAccount}
    }
    case `${actionTypes.LOGIN_BY_EMAIL}_${REJECTED}`:
    case `${actionTypes.SIGNUP_BY_EMAIL}_${REJECTED}`:  
    case `${actionTypes.SIGNUP_WITH_SOCIAL}_${REJECTED}`: {
      return {...state, loginFailed: true}
    }
    case `${actionTypes.UPDATE_NEW_ACCOUNT_DETAILS_PROP}`: {
      const {prop, value} = action.payload;
      return Object.assign({}, state, {[prop]: value});
    }
    case actionTypes.LOG_OUT_USER: {
      return getInitialState();
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    isLoggingIn: false,
    loginFailed: false
  }
}