import * as actionTypes from '../constants/actionTypes';
import {FULFILLED, PENDING, REJECTED} from 'redux-promise-middleware';

import cloneDeep from 'lodash/cloneDeep';

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case `${actionTypes.AUTHORIZE_START_TRIP}_${REJECTED}`:
    case `${actionTypes.START_TRIP}_${REJECTED}`:
    case `${actionTypes.END_TRIP}_${REJECTED}`:
    case `${actionTypes.DRIVER_END_TRIP}_${REJECTED}`: {
      return {
        ...state, alertView: {
          type: 'error',
          message: 'Unable to perform action. Refresh and try again. If issue still occurs please contact support',
          open: true
        }
      }
    }
    case actionTypes.DISPLAY_ALERT: {
      const alertViewOptions = action.payload || {};
      return {
        ...state, alertView: {
          ...alertViewOptions,
          open: true
        }
      };
    }
    case actionTypes.CLOSE_ALERT: {
      return {
        ...state, alertView: {
          open: false
        }
      };
    }
    case actionTypes.DISPLAY_SNACKBAR: {
      const snackBarOptions = action.payload || {};
      return {
        ...state, snackBarView: {
          ...snackBarOptions,
          open: true
        }
      };
    }
    case actionTypes.CLOSE_SNACKBAR: {
      const snackBarOptions = action.payload || {};
      return {
        ...state, snackBarView: {
          ...snackBarOptions,
          open: false
        }
      };
    }
    case `${actionTypes.FETCH_SEARCH_LISTINGS}_${PENDING}`:
    case actionTypes.CLOSE_MODAL_DIALOG: {
      return {
        ...state, modalDialogView: {}
      };
    }
    case actionTypes.DISPLAY_MODAL_DIALOG: {
      return {
        ...state, modalDialogView: {
          name: action.payload
        }
      };
    }
    case `${actionTypes.VERIFY_RESET_ACCOUNT_PASSWORD}_${PENDING}`:
    {
      const newState = cloneDeep(state);
      newState.showAppLoader = true;
      return newState;
    }
    case `${actionTypes.VERIFY_RESET_ACCOUNT_PASSWORD}_${FULFILLED}`:
    {
      const newState = cloneDeep(state);
      newState.showAppLoader = false;
      return newState;
    }
    case actionTypes.TOGGLE_MESSAGE_INIT_VIEW:
    {
      return {...state, layoutView: {
        ...state.layoutView, fullHeight: !state.layoutView.fullHeight
      }};
    }
    case actionTypes.TOGGLE_APP_OVERLAY:
    {
      return {...state, appOverlay: !state.appOverlay}
    }
    default: return state;
  }
}

export const getInitialState = () => {
  return {
    appOverlay: false,
    alertView: {
      type: '',
      message: '',
      open: false
    },
    snackBarView: {
      open: false
    },
    modalDialogView: {
      open: false
    },
    layoutView: {
      fullHeight: false
    }
  }
}
