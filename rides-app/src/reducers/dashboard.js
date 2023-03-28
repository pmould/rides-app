import * as actionTypes from '../constants/actionTypes';

import {PENDING, FULFILLED, REJECTED} from 'redux-promise-middleware';

import {mapItems} from '../utils';
import {TripStatusCode} from '../constants/Enums';

import cloneDeep from 'lodash/cloneDeep';

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case `${actionTypes.FETCH_TRIP_FEED}_${PENDING}`: {
      const tripFeed = cloneDeep(state.tripFeed);
      tripFeed.isLoading = true;
      return {...state, tripFeed};    
    }
    case `${actionTypes.FETCH_TRIPS}_${PENDING}`: {
      const completedTrips = cloneDeep(state.completedTrips);
      completedTrips.isLoading = true;
      return {...state, completedTrips};
    }
    case `${actionTypes.FETCH_TRIP_FEED}_${FULFILLED}`: {
      const {results, meta} = action.payload;
      
      const newState = cloneDeep(state);
      newState.tripFeed.pagination = meta;
      newState.tripFeed.trips = mapItems(results);
      newState.tripFeed.isLoading = false;

      return newState;
    }
    case `${actionTypes.AUTHORIZE_START_TRIP}_${FULFILLED}`: 
    case `${actionTypes.START_TRIP}_${FULFILLED}`:
    case `${actionTypes.DRIVER_END_TRIP}_${FULFILLED}`: {
      const {id: reservationId, statusCodeId} = action.payload;
      const tripFeed = cloneDeep(state.tripFeed);
      tripFeed.trips.get(reservationId).statusCodeId = statusCodeId;

      state.tripFeed = tripFeed;
      return state;
    }
    case `${actionTypes.END_TRIP}_${FULFILLED}`: {
      const {id: reservationId, statusCodeId} = action.payload;
      const tripFeed = cloneDeep(state.tripFeed);
      if (statusCodeId === TripStatusCode.COMPLETED) {
        tripFeed.trips.delete(reservationId);
        tripFeed.pagination.totalCount--;
      };
      state.tripFeed = tripFeed;
      return state;
    }
    case `${actionTypes.FETCH_TRIPS}_${FULFILLED}`: {
      const {results, meta} = action.payload;
      
      const newState = cloneDeep(state);
      newState.completedTrips.pagination = meta;
      newState.completedTrips.trips = mapItems(results);
      newState.completedTrips.isLoading = false;
      return newState;
    }
    case `${actionTypes.START_TRIP}_${REJECTED}`: {
      return state;
    }
    default: return state;
  }
} 

const getInitialState = () => {
  return {
    tripFeed: {
      isLoading: false,
      trips: new Map(),
      page: 1,
      limit: 10,
      pagination: {
        pageCount: 0,
        totalCount: 0
      }
    },
    completedTrips: {
      isLoading: false,
      trips: new Map(),
      page: 1,
      limit: 10,
      pagination: {
        pageCount: 0,
        totalCount: 0
      }
    }
  }
}