import * as actionTypes from '../constants/actionTypes';

import {FULFILLED} from 'redux-promise-middleware';
import cloneDeep from 'lodash/cloneDeep';

export default (state = getInitialState(), action) => {
  switch (action.type) { 
    case `${actionTypes.GET_TRIP}_${FULFILLED}`: {
      return {...state, reservation: action.payload}
    }
    case `${actionTypes.UPDATE_TRIP_STATUS}_${FULFILLED}`: {
      const newState = cloneDeep(state);
      newState.reservation = action.payload;
      return newState;
    }
    case `${actionTypes.SAVE_TRIP_PHOTO}_${FULFILLED}`: {
      const newState = cloneDeep(state);
      const tripPhotos = newState.reservation.tripPhotos || [];
      newState.reservation.tripPhotos = tripPhotos.concat([action.payload]);
      return newState;
    }
    case actionTypes.REALTIME_RECEIVE_TRIP_MEETUP_SHARED_LOCATION: {

      return {...state, sharedMeetUpLocation: action.payload}
    }
    case actionTypes.DISPLAY_TRIP_PHOTO_MODAL: {
      const newState = cloneDeep(state);
      newState.tripView.currentTripPhoto = action.payload;
      return newState;
    }
    case actionTypes.HIDE_TRIP_PHOTO_MODAL: {
      const newState = cloneDeep(state);
      newState.tripView.currentTripPhoto = {};
      return newState;
    }
    case actionTypes.SET_TRIP_PHOTO_DESCRIPTION: {
      const newState = cloneDeep(state);
      let currentTripPhoto = newState.tripView.currentTripPhoto;
      newState.tripView.currentTripPhoto = {...currentTripPhoto, description: action.payload};
      return newState;
    }
    case `${actionTypes.UPDATE_TRIP_PHOTO}_${FULFILLED}`: {
      const updatedTripPhoto = action.payload;
      const newState = cloneDeep(state);
      const index = newState.reservation.tripPhotos
        .findIndex(x => x.id === updatedTripPhoto.id);
      if (index === -1) return state;
      newState.reservation.tripPhotos.splice(index, 1, updatedTripPhoto);

      return newState;
    }
    case `${actionTypes.DELETE_TRIP_PHOTO}_${FULFILLED}`: {
      const updatedTripPhoto = action.payload;
      const {tripPhotoId} = action.meta;

      const newState = cloneDeep(state);
      const index = newState.reservation.tripPhotos
        .findIndex(x => x.id === tripPhotoId);
      if (index === -1) return state;
      newState.tripView.currentTripPhoto = {};
      newState.reservation.tripPhotos.splice(index, 1);

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
    reservation: {},
    sharedMeetUpLocation: {},
    tripView: {
      currentTripPhoto: {}
    }
  }
}