import * as actionTypes from '../constants/actionTypes';

export const toggleLoginModal = (isSignUp) => ({
  type: actionTypes.TOGGLE_LOGIN_MODAL,
  payload: {isSignUp}
});

export const toggleSignUpLogin = () => ({
  type: actionTypes.TOGGLE_SIGNUP_LOGIN
});

export const updateLoginErrorMessage = (messages) => ({
  type: actionTypes.SET_LOGIN_ERROR_MESSAGE,
  payload: messages
})

export const goBackFromSignUpSuccess = () => ({
  type: actionTypes.GO_BACK_FROM_SIGN_UP_SUCCESS
});

export const toggleViewSignUp = () => ({
  type: actionTypes.TOGGLE_VIEW_SIGN_UP
})