import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';
import { LoginProvider } from '../constants/Enums';

export const reauthorizeLogin = () => ({
  type: actionTypes.REAUTHORIZE_LOGIN,
  payload: api.reauthorizeLoginApi()
});

export const signUpWithSocial = (type, data, fromModal) => ({
  type: actionTypes.SIGNUP_WITH_SOCIAL,
  payload: api.signUpWithSocialApi(data, type),
  meta: {fromModal, signUp: true, type}
});

export const loginByEmail = (email, password, fromModal) => ({
  type: actionTypes.LOGIN_BY_EMAIL,
  payload: api.loginByEmailApi(email, password),
  meta: {fromModal, type: LoginProvider.email}
});

export const signUpByEmail = (body, fromModal) => ({
  type: actionTypes.SIGNUP_BY_EMAIL,
  payload: api.signUpByEmailApi(body),
  meta: {fromModal, signUp: true, type: LoginProvider.email}
})

export const logOutUser = () => ({
  type: actionTypes.LOG_OUT_USER
});

export const sendResetPasswordEmail = (email) => ({
  type: actionTypes.SEND_RESET_ACCOUNT_PASSWORD_EMAIL,
  payload: api.sendResetPasswordEmailApi(email)
});

export const toggleForgotPasswordForm = (email) => ({
  type: actionTypes.TOGGLE_PASSWORD_RESET_FORM
});

export const verfiyResetAccountPassword = (authToken) => ({
  type: actionTypes.VERIFY_RESET_ACCOUNT_PASSWORD,
  payload: api.verfiyResetAccountPasswordApi(authToken)
});

export const resetAccountPassword = (password, authToken) => ({
  type: actionTypes.RESET_ACCOUNT_PASSWORD,
  payload: api.resetAccountPasswordApi(password, authToken)
});

export const clearLoginView = () => ({
  type: actionTypes.CLEAR_LOGIN_VIEW
})