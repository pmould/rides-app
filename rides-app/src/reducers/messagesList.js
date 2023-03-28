import * as actionTypes from '../constants/actionTypes';

import {FULFILLED, PENDING} from 'redux-promise-middleware';

import {ProfileTypes} from '../constants/Enums';

import {mapItems} from '../utils';

import cloneDeep from 'lodash/cloneDeep';

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGE_LIST_TAB: {
      return {...state, profileType: action.payload}
    }
    case `${actionTypes.GET_ALL_MESSAGES}_${PENDING}`: {
       const {profileType} = action.meta;
      if (profileType === ProfileTypes.driver) {
      const driver = cloneDeep(state.driver);
      driver.isLoading = true;
      return {...state, driver};
      }
      else {
      const host = cloneDeep(state.host);
      host.isLoading = true;
      return {...state, host};
      }
    }
    case `${actionTypes.GET_ALL_MESSAGES}_${FULFILLED}`: {
      const {results, meta} = action.payload;
      const {profileType} = action.meta;

      const mappedResults =  mapItems(results, 'room');
      if (profileType === ProfileTypes.driver) {
        const driver = cloneDeep(state.driver);
        driver.pagination = meta;
        driver.messages = mappedResults;
        driver.isLoading = false;

        return {...state, driver};
      }
      else {
        const host = cloneDeep(state.driver);
        host.pagination = meta;
        host.messages = mappedResults;
        host.isLoading = false;
        
        return {...state, host};
      }
    }
    default: return state;
  }
} 

const getInitialState = () => {
  return {
    profileType: 'host',
    isLoading: true,
    host: {
      messages: new Map(),
      pagination: {
        pageCount: 0,
        totalCount: 0
      }
    },
    driver: {
      messages: new Map(),
      pagination: {
        pageCount: 0,
        totalCount: 0
      }
    }
  };
}