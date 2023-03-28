import * as actionTypes from '../constants/actionTypes';

import {FULFILLED, PENDING} from 'redux-promise-middleware';

import {mapItems} from '../utils';
import cloneDeep from 'lodash/cloneDeep';

export default (state = getInitialState(), action) => {
  switch (action.type) { 
    case `${actionTypes.FETCH_SEARCH_LISTINGS}_${FULFILLED}`: {
      const {listings = {}} = action.payload;

      return {
       ...state,
       items: mapItems(listings),
       loading: false
      } 
    }
    case `${actionTypes.FETCH_SEARCH_LISTINGS}_${PENDING}`: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.SET_SEARCH_LISTINGS_LOCATION: {
      const selectedValues = action.payload;
      const newState = cloneDeep(state);
      newState.listingLocation = newState.listingLocation || {};
      const listingLocation = newState.listingLocation;

      if (selectedValues[0] === 'all') {
        return {...newState, listingLocation: {all: true}};
      }

      if (selectedValues[0] === 'regions') {
        listingLocation.ghPostCodeRegionId = selectedValues[1];
        if (selectedValues[2] === 'all') {
          return {...newState, listingLocation: {ghPostCodeRegionId: listingLocation.ghPostCodeRegionId}};
        }
        else {
          listingLocation.ghRegionAreaId = selectedValues[3];
          listingLocation.popular = selectedValues[2] === 'popularAreas';
          const {ghRegionAreaId, ghPostCodeRegionId, popular} = listingLocation;
          return {...newState, listingLocation: {ghPostCodeRegionId, ghRegionAreaId, popular}};
        }
      }
      else if (selectedValues[0] === 'popularCities') {
        listingLocation.ghCityId = selectedValues[1];
        if (selectedValues[2] === 'all') {
          return {...newState, listingLocation: {ghCityId: listingLocation.ghCityId}};
        }
        else {
          listingLocation.ghCityAreaId = selectedValues[3];
          listingLocation.popular = selectedValues[2] === 'popularAreas';
          const {ghCityAreaId, ghCityId, popular} = listingLocation;
          return {...newState, listingLocation: {ghCityId, ghCityAreaId, popular}};
        }
      }
      else {
        return {...newState, listingLocation: {}}
      }
    }
    case actionTypes.TOGGLE_SEARCH_LISTING_MODAL: {
      return {...state, showSearchListingsModal: !state.showSearchListingsModal}
    }
    case actionTypes.CLEAR_SEARCH_LISTINGS:
    case actionTypes.LOG_OUT_USER: {
      return {showSearchListingsModal: state.showSearchListingsModal};
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    loading: true,
    listings: new Map(),
    listingLocation: {},
    all: false,
    allRegionId: undefined,
    allCityId: undefined,
    showSearchListingsModal: undefined
  };
};

