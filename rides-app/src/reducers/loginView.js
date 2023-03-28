import * as actionTypes from '../constants/actionTypes';

import {PENDING, FULFILLED} from 'redux-promise-middleware';

import cloneDeep from 'lodash/cloneDeep';

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case `${actionTypes.LOGIN_BY_EMAIL}_${PENDING}`:
    case `${actionTypes.SIGNUP_BY_EMAIL}_${PENDING}`:  
    case `${actionTypes.SIGNUP_WITH_SOCIAL}_${PENDING}`: {
      return {...state, isLoggingIn: action.meta.type}
    }
    case actionTypes.TOGGLE_VIEW_SIGN_UP: {
      return {...state, viewSignUp: !state.viewSignUp};
    }
    
    case actionTypes.GO_BACK_FROM_SIGN_UP_SUCCESS: {
      return {...state, registerByEmailSuccess: false, viewSignUp: false};
    }
    case `${actionTypes.LOGIN_BY_EMAIL}_${FULFILLED}`:
    case `${actionTypes.SIGNUP_BY_EMAIL}_${FULFILLED}`: 
    case `${actionTypes.SIGNUP_WITH_SOCIAL}_${FULFILLED}`: {
      const newState = cloneDeep(state);
      const {error, id: userId, success} = action.payload;
      console.log(action.payload);
      const {fromModal, signUp} = action.meta;
      if ((userId) && fromModal) {
        const {openLoginModal} = newState;
        newState.openLoginModal = !openLoginModal;
      }

      if (!userId && !success) {
        newState.errorMessages = [`Unable to ${signUp ? 'sign up' : 'log in' }. Please try again`];
      }

      if (success) {
        newState.registerByEmailSuccess = true;
      }
      
      if (error && error.message) {
        newState.errorMessages = [error.message];

        newState.accountTaken = error.accountTaken;
      }

      newState.isLoggingIn = '';

      return newState;
    }
    case `${actionTypes.SEND_RESET_ACCOUNT_PASSWORD_EMAIL}_${FULFILLED}`: {
      const newState = cloneDeep(state);

      if (!action.payload.success)
      {
        newState.errorMessages = ['Reset Password Failed. Please Try again later'];
      } 
      else {
        newState.resetAccountPasswordEmailSent = true;
      }

      return newState;
    }
    case actionTypes.TOGGLE_SIGNUP_LOGIN:
    {
        return {...state,isSignUp: !state.isSignUp};
    }
    case actionTypes.TOGGLE_VIEW_SIGN_UP:
    {
        return {...state, viewSignUp: !state.viewSignUp};
    }
    case actionTypes.TOGGLE_LOGIN_MODAL: {
      const {openLoginModal} = state;
      state.openLoginModal = !openLoginModal;
      state.isSignUp = action.payload.isSignUp

    return Object.assign({}, state);
    }
    case actionTypes.TOGGLE_PASSWORD_RESET_FORM: {
      const newState = cloneDeep(state);
      newState.resetAccountPasswordEmailSent = false;
      newState.viewForgotPasswordForm = !newState.viewForgotPasswordForm;
      return newState;
    }
    case `${actionTypes.RESET_ACCOUNT_PASSWORD}_${FULFILLED}`: {
      const newState = cloneDeep(state);
      if (!action.error && action.payload.success) {
        newState.accountPasswordResetSuccess = true;
        newState.errorMessages = [];
      }
      else {
        newState.errorMessages = ['Reset Account Password Failed.'];
      }

      return newState; 
    }  
    case actionTypes.SET_LOGIN_ERROR_MESSAGE: {
      state.errorMessages = action.payload;
      return {...state};
    }
    case `${actionTypes.VERIFY_RESET_ACCOUNT_PASSWORD}_${FULFILLED}`: {
      const newState = cloneDeep(state);
      newState.resetPasswordLinkNotExpired = !action.error && action.payload.success;
      return newState;
    } 
    case actionTypes.CLEAR_LOGIN_VIEW:
    case actionTypes.LOG_OUT_USER: {
      return getInitialState();
    }
    default: return state;
  }
}

const getInitialState = () => {
  return {
    accountTaken: false,
    errorMessages: [],
    openLoginModal: false,
    resetPasswordLinkNotExpired: false,
    registerByEmailSuccess: false,
    accountPasswordResetSuccess: false
  }
}