import * as actionTypes from '../constants/actionTypes';

export const skipNewAccountStep = (account) => ({
  type: actionTypes.SKIP_NEW_ACCOUNT_STEP
});

export const transitionPrevStep = (account) => ({
  type: actionTypes.TRANSITION_PREV_NEW_ACCOUNT_STEP
});

