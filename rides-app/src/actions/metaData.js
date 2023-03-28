import * as actionTypes from '../constants/actionTypes';

import * as api from '../api';

import * as realtime from '../utils/realtime';

export const fetchNewVehicleStaticData = () => ({
  type: actionTypes.FETCH_NEW_VEHICLE_STATIC_DATA,
  payload: api.getNewVehicleStaticDataApi()
});

export const fetchVehicleMakes = (year) => ({
  type: actionTypes.FETCH_VEHICLE_MAKES,
  payload: api.getVehicleMakesApi(year)
});

export const fetchVehicleModels = (year, makeId) => ({
  type: actionTypes.FETCH_VEHICLE_MODELS,
  payload: api.getVehicleModelsApi(year, makeId)
});

export const getUserAccount = (actions) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_USER_ACCOUNT,
      payload: api.getUserAccountApi()
    }).then(({value}) => {
      const user = value;
      // TODO: why is this here
      // realtime.setRealtime(actions, user);
    });
  }
}

export const fetchGhLocationSearchTaxonomy = () => ({
  type: actionTypes.FETCH_GH_LOCATION_SEARCH_TAXONOMY,
  payload: api.fetchGhLocationSearchTaxonomyApi()
});