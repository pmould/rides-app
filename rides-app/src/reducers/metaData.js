import * as actionTypes from '../constants/actionTypes';

import {FULFILLED} from 'redux-promise-middleware';

export default (state = getInitialState(), action) => {
  switch(action.type){
    case `${actionTypes.FETCH_NEW_VEHICLE_STATIC_DATA}_${FULFILLED}`: {
      return Object.assign({}, state, action.payload);
    }
    case `${actionTypes.FETCH_VEHICLE_MAKES}_${FULFILLED}`: {
      return Object.assign({}, state, {makes: action.payload});
    }
    case `${actionTypes.FETCH_VEHICLE_MODELS}_${FULFILLED}`: {
      return Object.assign({}, state, {models: action.payload});
    }
    case `${actionTypes.FETCH_GH_LOCATION_SEARCH_TAXONOMY}_${FULFILLED}`: {
      return Object.assign({}, state, {ghLocationSearchTaxonomy: action.payload});
    }
    case `${actionTypes.LOGIN_BY_EMAIL}_${FULFILLED}`:
    case `${actionTypes.SIGNUP_BY_EMAIL}_${FULFILLED}`:   
    case `${actionTypes.SIGNUP_WITH_SOCIAL}_${FULFILLED}`:
    case `${actionTypes.FETCH_USER_ACCOUNT}_${FULFILLED}`: {
      return {...state, user: action.payload};
    }
    case actionTypes.LOG_OUT_USER: {
      return getInitialState();
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    ghLocationSearchTaxonomy: {},
    years: [],
    makes: [],
    models: [],
    vehicleType: [],
    odometerOptions: [],
    marketValues: [],
    user: {}
  };
}

// {id: Math.floor(Math.random() * 1000 + 1)}