import * as actionTypes from '../constants/actionTypes';
import {FULFILLED} from 'redux-promise-middleware';

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
    case `${actionTypes.SAVE_NEW_ACCOUNT}_${FULFILLED}`: {
      state.currentStep = 2;
      return Object.assign({}, state);
    }
    case `${actionTypes.SAVE_NEW_ACCOUNT_DETAILS}_${FULFILLED}`: {
      state.currentStep = 3;

      return Object.assign({}, state);
    }
    case `${actionTypes.FETCH_USER_ACCOUNT}_${FULFILLED}`: {
      const {account} = action.payload;
      const {id} = account || {};

      state.currentStep = id ? 2 : 1;
      return Object.assign({}, state);
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
    };
}