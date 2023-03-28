import * as actionTypes from '../constants/actionTypes';

import {FULFILLED} from 'redux-promise-middleware';

import cloneDeep from 'lodash/cloneDeep';
import {mapItems} from '../utils';
import {defaultDailyRate} from '../constants';

export default (state = getInitialState(), action) => {
  switch(action.type) {
    case `${actionTypes.FETCH_LISTING}_${FULFILLED}`: {
      const listing = action.payload;
      const {photos = []} = listing;
      return {...cloneDeep(listing),
        photos: mapItems(photos)
      };
    }
    case actionTypes.CLEAR_LISTING: {
      return getInitialState();
    }
    case actionTypes.ADD_LISTING_PHOTO_FULFILLED: {
      const photo = action.payload;
      const newState = cloneDeep(state);

      newState.photos = newState.photos || new Map();

      newState.photos.set(photo.id, photo);
      return newState;
    }
    case `${actionTypes.SAVE_LISTING_PHOTO}_${FULFILLED}`: {
      const {id, photo} = action.payload;
     
      const newState = cloneDeep(state);
      newState.photos = newState.photos || {};
      newState.photos.set(id, photo);
      delete newState.hasErrors;
      return newState;
    }
    case `${actionTypes.DELETE_LISTING_PHOTO}_${FULFILLED}`: {
      const newState = cloneDeep(state);
      newState.photos.delete(action.meta);
      return newState;
    }
    case actionTypes.SET_LISTING_PROP: {
      const {prop, value} = action.payload;
      return Object.assign({}, state, {[prop]: value});
    }
    case actionTypes.SET_LISTING_VEHICLE_PROP: {
      const {prop, value} = action.payload;
      state.vehicle[prop] = value;
      return Object.assign({}, state, state);
    }
    case actionTypes.SET_LISTING_VEHICLE_YEAR: {
      const {vehicle} = state;

      delete vehicle.makeId;
      delete vehicle.modelId;

      vehicle.modelYear = action.payload;
      return Object.assign({}, state, state);
    }

    case actionTypes.SET_LISTING_VEHICLE_MAKE: {
      const {vehicle} = state;

      delete vehicle.modelId;

      vehicle.makeId = action.payload;
      return Object.assign({}, state, state);
    }
    case actionTypes.SET_LISTING_LOCATION: {
      const {selectedValues, type} = action.payload;
      const newState = cloneDeep(state);
      newState.listingLocation = newState.listingLocation || {};
      const listingLocation = newState.listingLocation;

      const didUpdateOnlySubAreas = selectedValues[0] === 'popularAreas' || selectedValues[0] === 'otherAreas';

      if (selectedValues[0] === 'regions') {
        listingLocation.ghPostCodeRegionId = selectedValues[1];
        listingLocation.ghRegionAreaId = selectedValues[3];
        listingLocation.popular = selectedValues[2] === 'popularAreas';
        delete listingLocation.ghCityId;
        delete listingLocation.ghCityAreaId;
        newState.listingLocation = listingLocation;
      }
      else if (selectedValues[0] === 'popularCities') {
        listingLocation.ghCityId = selectedValues[1];
        listingLocation.ghCityAreaId = selectedValues[3];
        listingLocation.popular = selectedValues[2] === 'popularAreas';
        delete listingLocation.ghPostCodeRegionId;
        delete listingLocation.ghRegionAreaId;
        newState.listingLocation = listingLocation;
      }
      else if (didUpdateOnlySubAreas && listingLocation.ghCityId) {
        listingLocation.ghCityAreaId = selectedValues[1];
        listingLocation.popular = selectedValues[0] === 'popularAreas';
        newState.listingLocation = listingLocation;
      }
      else if (didUpdateOnlySubAreas && listingLocation.ghPostCodeRegionId) {
        listingLocation.ghRegionAreaId = selectedValues[1];
        listingLocation.popular = selectedValues[0] === 'popularAreas';
        newState.listingLocation = listingLocation;
      }
      else if (type === 'subAreaChange' && selectedValues.length === 0) {
        delete listingLocation.ghRegionAreaId;
        delete listingLocation.ghCityAreaId;
        delete listingLocation.ghCityArea;
        delete listingLocation.ghRegionArea;
      }
      else {
        delete newState.listingLocation;
      }

      return newState;
    }
    case actionTypes.SET_LISTING_GH_POSTAL_CODE: {
      const newState = cloneDeep(state);

      newState.address = newState.address || {};
      newState.address.ghPostCode = action.payload;
      return newState;
    }
    case actionTypes.SET_LISTING_VEHICLE_REGISTRATION_PROP: {
      const {prop, value} = action.payload;

      state.vehicleRegistration  = state.vehicleRegistration || {};
      state.vehicleRegistration[prop] = value;
      return Object.assign({}, state, state);
    }
    case `${actionTypes.SAVE_LISTING_PHOTOS_STAGE}_FULFILLED`:
    case `${actionTypes.SAVE_LISTING_DETAILS}_FULFILLED`:
    case `${actionTypes.SAVE_LISTING_AVAILABILITY}_FULFILLED`:
    case `${actionTypes.SAVE_LISTING_ELEGIBILITY}_FULFILLED`: {
      const {id} = action.payload;

      return {...action.payload, photos: state.photos};
    }
    case `${actionTypes.DELETE_LISTING}_FULFILLED`:
    case actionTypes.LOG_OUT_USER: {
      return getInitialState();
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    id: undefined,
    vehicle: {
      modelYear: undefined,
      makeId: undefined,
      modelId: undefined,
      vehicleTypeId: undefined,
      manual: undefined,
      odometerReadingEstimate: undefined,
      marketValueEstimate: undefined
    },
    // TODO: set default Daily Rate on backend
    dailyRate: undefined,
    advanceTime: '12 hours',
    tripMinDuration: undefined,
    tripMaxDuration: undefined,
    coverPhoto: undefined,
    photos: new Map()
  }
}