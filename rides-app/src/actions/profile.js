import * as actionTypes from '../constants/actionTypes';

import {ridesWebApi} from '../utils/api';

export const updateUserProfilePicture = (formData) => {

  ridesWebApi('updateProfilePicture', {
    method: 'POST'
  }).then(data => {

  });
  
  return ({
    type: actionTypes.UPDATE_USER_PROFILE_PICTURE
  })
};
