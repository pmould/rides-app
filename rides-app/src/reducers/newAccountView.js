import * as actionTypes from '../constants/actionTypes';
import {FULFILLED, PENDING} from 'redux-promise-middleware';

import cloneDeep from 'lodash/cloneDeep';

export default (state = getInitialState(), action) => {
  switch(action.type) {
    case `${actionTypes.SKIP_NEW_ACCOUNT_STEP}`: {
      state.currentStep++;

      return Object.assign({}, state);

    }
    case `${actionTypes.TRANSITION_PREV_NEW_ACCOUNT_STEP}`: {
      state.currentStep--;

      return Object.assign({}, state);
    }
    case `${actionTypes.SAVE_NEW_ACCOUNT}_${PENDING}`:
    case `${actionTypes.SAVE_NEW_ACCOUNT_DETAILS}_${PENDING}`: {
      state.isLoading = true;
      return Object.assign({}, state);
    }
    case `${actionTypes.SAVE_NEW_ACCOUNT}_${FULFILLED}`: {
      state.isLoading = false;
      state.currentStep = 2;
      return Object.assign({}, state);
    }
    case `${actionTypes.SAVE_NEW_ACCOUNT_DETAILS}_${FULFILLED}`: {
      state.isLoading = false;
      state.currentStep = 3;
      return Object.assign({}, state);
    }
    case `${actionTypes.FETCH_USER_ACCOUNT}_${FULFILLED}`: {
      const {account} = action.payload;
      const {id} = account || {};

      state.currentStep = id ? 2 : 1;
      return Object.assign({}, state);
    }
    case `${actionTypes.SAVE_LISTING_PHOTO}_${FULFILLED}`: {
      const {id} = action.payload;

      state.uploadedPhotoId = id;
      return Object.assign({}, state);
    }
    case `${actionTypes.ACTIVATE_NEW_USER_ACCOUNT}_${FULFILLED}`: {
      const newState = cloneDeep(state);
      const {error, success, message} = action.payload;
      if (error || message) {
        newState.userAccountActivationStatus = false;  
      }
      else if (success) {
        newState.userAccountActivationStatus = true; 
      }

      return newState;
    } 
    case actionTypes.LOG_OUT_USER: {
      return getInitialState();
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    currentStep: 1,
    skip: {
      1: false,
      2: false,
      3: false
    },
    isLoading: false,
    userAccountActivationStatus: undefined
  }
}