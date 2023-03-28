import * as actionTypes from '../constants/actionTypes';

export const displaySnackBar = (snackBarOptions) => ({
  type: actionTypes.DISPLAY_SNACKBAR,
  payload: snackBarOptions
});

export const closeSnackBar = () => ({
  type: actionTypes.CLOSE_SNACKBAR
});

export const displayAlert = (type, message, description) => ({
  type: actionTypes.DISPLAY_ALERT,
  payload: {type, message, description}
});

export const closeAlert = () => ({
  type: actionTypes.CLOSE_ALERT
});

export const displayModalDialog = (modalName) => ({
  type: actionTypes.DISPLAY_MODAL_DIALOG,
  payload: modalName
});

export const closeModalDialog = () => ({
  type: actionTypes.CLOSE_MODAL_DIALOG
});

export const toggleAppOverlay = () => ({
  type: actionTypes.TOGGLE_APP_OVERLAY
});
