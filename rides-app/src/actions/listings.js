import * as actionTypes from '../constants/actionTypes';
import * as CommonViewActions from './commonView';

import * as api from '../api';
import {fetchVehicleMakes, fetchVehicleModels} from './metaData';

import {FULFILLED} from 'redux-promise-middleware';

import history from '../history';

export const setListingProp = (prop, value) => ({
  type: actionTypes.SET_LISTING_PROP,
  payload: {prop, value}
});

export const setListingVehicleProp = (prop, value) => ({
  type: actionTypes.SET_LISTING_VEHICLE_PROP,
  payload: {prop, value}
});

export const setListingVehicleRegistrationProp = (prop, value) => ({
  type: actionTypes.SET_LISTING_VEHICLE_REGISTRATION_PROP,
  payload: {prop, value}
});

export const setListingVehicleYear = (modelYear) => {
  return (dispatch) => {

    dispatch({
      type: actionTypes.SET_LISTING_VEHICLE_YEAR,
      payload: modelYear
    });

    dispatch(fetchVehicleMakes(modelYear));
  };
};

export const setListingErrors = (errorMessageReactNode) => {
  return (dispatch) => {
    dispatch(setListingProp('hasErrors', true));
    dispatch(CommonViewActions.displayAlert('error', 'Section Incomplete', errorMessageReactNode));
  }
}
export const setListingVehicleMake = (makeId) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LISTING_VEHICLE_MAKE,
      payload: makeId
    });

    const modelYear = getState().listing.vehicle.modelYear;

    dispatch(fetchVehicleModels(modelYear, makeId))
  }
}

export const setListingLocation = (selectedValues, selectedOptions, type) => ({
  type: actionTypes.SET_LISTING_LOCATION,
  payload: {selectedValues, selectedOptions, type}
});

export const setGhPostCode = (value) => ({
  type: actionTypes.SET_LISTING_GH_POSTAL_CODE,
  payload: value
});

export const saveListingElegibility = (updatedListing) => {
  return (dispatch, getState) => {
    const {listing: {hasErrors}} = getState();

    if (hasErrors) {
      dispatch(CommonViewActions.closeAlert());
    }
    dispatch({
      type: actionTypes.SAVE_LISTING_ELEGIBILITY,
      payload: api.createListingApi(updatedListing)
    }).then(({value}) => {
      const {id} = value;
      history.push(`/list-your-car/${id}/availability`);
      return value;
    })

  };
}

export const saveListingAvailability = (listing) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_LISTING_AVAILABILITY,
      payload: api.saveListingApi(listing)
    }).then(({value}) => {
      const {id} = value;
      history.push(`/list-your-car/${id}/details`);
      return value;
    })
  };
}

export const saveListingDetails = (listing) => {
  return (dispatch, getState) => {
    const {listing: {hasErrors}} = getState();

    if (hasErrors) {
      dispatch(CommonViewActions.closeAlert());
    }

    dispatch({
      type: actionTypes.SAVE_LISTING_DETAILS,
      payload: api.saveListingApi(listing)
    }).then(({value}) => {
      const {id} = value;
      history.push(`/list-your-car/${id}/photos`);
      return value;
    })
  };
}

export const saveListingPhotosStage = (listing) => {
  return (dispatch, getState) => {
    const {listing: {hasErrors}} = getState();

    if (hasErrors) {
      dispatch(CommonViewActions.closeAlert());
    }

    dispatch({
      type: actionTypes.SAVE_LISTING_PHOTOS_STAGE,
      payload: api.saveListingApi(listing)
    }).then(({value}) => {
      const {id} = value;
      history.push(`/list-your-car/${id}/publish`);
      return value;
    })
  };
}

export const addListingPhoto = (photo) => ({
  type: actionTypes.ADD_LISTING_PHOTO_FULFILLED,
  payload: photo
});

export const saveListingPhoto = (listingId,formData) => ({
  type: actionTypes.SAVE_LISTING_PHOTO,
  payload: api.saveListingPhotoApi(listingId, formData)
});

export const deleteListingPhoto = (listingId, listingPhotoId) => ({
  type: actionTypes.DELETE_LISTING_PHOTO,
  payload: api.deleteListingPhotoApi(listingId, listingPhotoId),
  meta: listingPhotoId
});

export const fetchListing = (id) => ({
  type: actionTypes.FETCH_LISTING,
  payload: api.getListingApi(id)
});

export const deleteListing = (id) => ({
  type: actionTypes.DELETE_LISTING,
  payload: api.deleteListingApi(id)
  .then(({value}) => {
    history.push('/host/vehicles');
    return value;
  })
})

export const clearListing = () => ({
  type: actionTypes.CLEAR_LISTING
});

export const fetchListingWithVehicleMetaData = (id) => {
  return (dispatch, getState) => {
    return api.getListingApi(id)
      .then(data => {
        dispatch(receiveListing(data));
        const {vehicle = {}} = data;
        const {modelYear, makeId} = vehicle;
        modelYear && dispatch(fetchVehicleMakes(modelYear));
        modelYear && makeId && dispatch(fetchVehicleModels(modelYear, makeId));
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export const receiveListing = (listing) => ({
  type: `${actionTypes.FETCH_LISTING}_${FULFILLED}`,
  payload: listing
});

export const publishListing = (id) => ({
  type: actionTypes.PUBLISH_LISTING,
  payload: api.publishListingApi(id)
    .then(({value}) => {
      // TODO: Display listing info here
      history.push(`/host/vehicles`);
  })
});

export const fetchHostListings = () => ({
  type: actionTypes.FETCH_HOST_LISTINGS,
  payload: api.fetchtHostListingsApi()
})