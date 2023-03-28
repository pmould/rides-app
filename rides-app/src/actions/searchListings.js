import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

export const fetchSearchListings = (ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId) => ({
  type: actionTypes.FETCH_SEARCH_LISTINGS,
  payload: api.fetchSearchListings(ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId)
});

export const setSearchListingLocation = (selectedValues) => ({
  type: actionTypes.SET_SEARCH_LISTINGS_LOCATION,
  payload: selectedValues
});

export const clearSearchListings = () =>({
  type: actionTypes.CLEAR_SEARCH_LISTINGS
})

export const toggleSearchListingModal = () => ({
  type: actionTypes.TOGGLE_SEARCH_LISTING_MODAL
});