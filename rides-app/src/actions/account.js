import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

// import history from '../history';

export const saveNewAccount = (account) => ({
  type: actionTypes.SAVE_NEW_ACCOUNT,
  payload: api.saveAccountApi(account)
});

export const saveNewAccountDetails = (account) => ({
  type: actionTypes.SAVE_NEW_ACCOUNT_DETAILS,
  payload: api.saveAccountApi(account)
});

export const activateNewAccount = (account) => ({
  type: actionTypes.ACTIVATE_NEW_ACCOUNT,
  payload: api.saveAccountApi(account)
});

export const updateNewAccountDetailsProp = (prop, value) => ({
  type: actionTypes.UPDATE_NEW_ACCOUNT_DETAILS_PROP,
  payload: {prop, value}
});

export const activateNewUserAccount = (authToken) => ({
  type: actionTypes.ACTIVATE_NEW_USER_ACCOUNT,
  payload: api.activateUserAccountApi(authToken)
});

export const saveProfilePicture = (formData, userId) => ({
  type: actionTypes.SAVE_PROFILE_PICTURE,
  payload: api.saveProfilePictureApi(formData, userId)
});

export const saveCoverPhoto = (formData, userId) => ({
  type: actionTypes.SAVE_COVER_PHOTO,
  payload: api.saveCoverPhotoApi(formData, userId)
});

export const setAboutText = (aboutText) => ({
  type: actionTypes.SET_ABOUT_TEXT,
  payload: aboutText
});

export const updateUserProfile = (updates, userId) => ({
  type: actionTypes.UPDATE_USER_PROFILE,
  payload: api.updateUserProfileApi(updates, userId)
})

export const getDriverProfileData = (profileAccountId) => ({
  type: actionTypes.FETCH_PROFILE_DATA,
  payload: api.getDriverProfileApi(profileAccountId)
});

export const getUserProfileData = () => ({
  type: actionTypes.FETCH_PROFILE_DATA,
  payload: api.getUserProfileApi()
});

export const toggleEditProfile = () => ({
  type: actionTypes.TOGGLE_EDIT_PROFILE
}); 

export const cancelEditProfile = () => {
  return (dispatch) => {
    dispatch(getUserProfileData());
    dispatch(toggleEditProfile());
  }
}

export const clearProfilePage = () => ({
  type: actionTypes.CLEAR_PROFILE_PAGE
})
