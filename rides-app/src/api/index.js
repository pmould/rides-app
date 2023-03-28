import {ridesWebApi, setAuthToken} from '../utils/api';
import qs from 'query-string';

export const reauthorizeLoginApi = async () => {
  return await ridesWebApi('auth/reauthorizeLogin')
  .then(async res => {
    const response = await res.json();
    if (!response.message) {
      setAuthToken(res.headers.get('Authorization'));      
    }
    else {
      return {error: response};
    }
    return response;
  })
  .catch(error => {
    console.warn(error);
    return error;
  });
}

export const signUpWithSocialApi = async (body, provider) => {
  return await ridesWebApi(`socialAuth/${provider}`, {
    method: 'POST',
    body: body
  })
    .then(async res => {
      const response = await res.json();
      if (!response.message) {
        setAuthToken(res.headers.get('Authorization'));      
      }
      else {
        return {error: response};
      }
      return response;
    })
    .catch(error => {
      console.warn(error);
      return error;
    });
};
export const loginByEmailApi = async (email, password) => {
  return await ridesWebApi(`login`, {
    method: 'POST',
    body: {
      email,
      password
    }
  })
  .then(async res => {
    const response = await res.json();
    if (!response.message) {
      setAuthToken(res.headers.get('Authorization'));      
    }
    else {
      return {error: response};
    }
    return response;
  })
  .catch(error => {
    console.warn(error);
    return error;
  });
};

export const signUpByEmailApi = async (body) => {
  return await ridesWebApi(`signUp`, {
    method: 'POST',
    body: body
  })
  .then(async res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });
};


export const getDriverProfileApi = (profileAccountId) => ridesWebApi(`profiles/${profileAccountId}`)
  .then(res => res.json());

export const getUserProfileApi = () => ridesWebApi('profile')
  .then(res => res.json());

export const saveProfilePictureApi = (formData, userId) => ridesWebApi(`profiles/${userId}/profilePicture`, {
  body: formData,
  method: 'POST'
})
.then(res => res.json());

export const saveCoverPhotoApi = (formData, userId) => ridesWebApi(`profiles/${userId}/coverPhoto`, {
  body: formData,
  method: 'POST'
})
.then(res => res.json());

export const updateUserProfileApi = (updates, userId) => ridesWebApi(`profiles/${userId}`, {
  body: updates,
  method: 'PATCH'
})
  .then(res => res.json());

export const activateUserAccountApi = (authToken) => ridesWebApi(`activateUserAccount?authToken=${authToken}`)
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });

export const sendResetPasswordEmailApi = (email) => ridesWebApi('sendResetPasswordEmail', {
  method: 'POST',
  body: {email}
})
.then(res => res.json())
.catch(error => {
  console.warn(error);
  return error;
  });

  export const verfiyResetAccountPasswordApi = (authToken) => ridesWebApi(`auth/passwordReset?authToken=${authToken}`)
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
    });

  export const resetAccountPasswordApi = (password, authToken) => ridesWebApi(
    `auth/updatePassword${authToken ? `?authToken=${authToken}` : ''}`, {
    method: 'POST',
    body: {password}
  })
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
    });
export const getNewVehicleStaticDataApi = () => ridesWebApi('newVehicleStaticData')
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });
  
export const getVehicleMakesApi = (year) => ridesWebApi(`vehicleMakes?year=${year}`)
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });

export const getVehicleModelsApi = (year, makeId) => ridesWebApi(`vehicleModels?year=${year}&makeId=${makeId}`)
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });

export const createListingApi = (listing) => ridesWebApi('listings', {
  method: 'POST', // listing.id ? 'PUT' : 'POST',
  body: listingExcluding(listing)
})
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });

export const getListingApi = (id) => ridesWebApi(`listings/${id}`)
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });

export const fetchtHostListingsApi = () => ridesWebApi('listings')
  .then(res => res.json())

export const saveListingApi = (listing) => ridesWebApi(`listings${getIdPath(listing)}`, {
  method: 'POST', // listing.id ? 'PUT' : 'POST',
  body: listingExcluding(listing)
})
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });

export const deleteListingApi = (listingId)  => ridesWebApi(`listing/${listingId}/deactivate`, {
  method: 'PATCH'
})
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });

export const saveListingPhotoApi = (listingId, formData) => {
  return ridesWebApi(`listings/photo?listingId=${listingId}`, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });
}

export const deleteListingPhotoApi = (listingId, listingPhotoId) => {
  return ridesWebApi(`listings/${listingId}/photos/${listingPhotoId}`, {
    method: 'DELETE'
  });
};

export const publishListingApi = (id) => {
  return ridesWebApi(`listings/${id}/publish`, {
    method: 'POST'
  })
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });
};

export const getUserAccountApi = () => ridesWebApi('userAccount')
  .then(res => res.json())
  .catch(error => {
    console.warn(error);
    return error;
  });

export const saveAccountApi = (account) => ridesWebApi(`accounts${getIdPath(account)}`, {
  method: account.id ? 'PUT' : 'POST',
  body: account
})
  .then(res => {
    !account.id && setAuthToken(res.headers.get('Authorization'));
    return res.json()
  })
  .catch(error => {
    console.warn(error);
    return error;
  });

export const fetchSearchListings = (ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId) => {
  var queryParams = qs.stringify({ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId});
  return ridesWebApi(`searchListings?${queryParams}`)
    .then(res => res.json());
}

export const fetchGhLocationSearchTaxonomyApi = () => ridesWebApi('ghLocationSearchTaxonomy')
  .then(res => res.json());

export const saveReservationApi = (reservation, socketSessionId) => ridesWebApi(`reservations?sessionId=${socketSessionId}`, {
  method: 'POST',
  body: reservation
})
  .then(res => res.json());

export const patchReservationApi = (reservationId, patches, sessionId) => ridesWebApi(`reservations/${reservationId}?sessionId=${sessionId}`, {
  method: 'PATCH',
  body: patches
})
  .then(res => res.json());

  // export const authorizedStartTripApi = (reservationId, socketSesnId) => ridesWebApi(`reservations/authorizedStartTrip?reservationId=${reservationId}`)
  //   .then(res => res.json());
  
export const approvePendingReservationApi = (reservationId, sessionId) => ridesWebApi(`reservations/${reservationId}/approvePending?sessionId=${sessionId}`, {
  method: 'PUT'
})
  .then(res => res.json());

// export const getAllMessagesApi = () => ridesWebApi('reservations/messages')
//   .then(res => res.json());
  
export const getMessagesApi = (profileType, limit, page) => ridesWebApi(`reservations/messages/${profileType}?limit=${limit}&page=${page}`)
  .then(res => res.json());

export const getReservationApi = (reservationId) => ridesWebApi(`reservations/${reservationId}`)
  .then(res => res.json());

export const getTripFeedApi = (limit, page) => ridesWebApi(`tripFeed?limit=${limit}&page=${page}`)
  .then(res => res.json());

export const getTripsApi = (limit, page) => ridesWebApi(`trips?limit=${limit}&page=${page}`)
  .then(res => res.json());

export const saveTripPhotoApi = (reservationId, file) => ridesWebApi(`reservation/${reservationId}/tripPhotos`, {
  method: 'POST',
  body: file
})
.then(res => res.json());

export const updateTripPhotoApi = (photo) => ridesWebApi('tripPhotos', {
  method: 'PUT',
  body: photo
})
.then(res => res.json());

export const deleteTripPhotoApi = (photoId) => ridesWebApi(`tripPhotos/${photoId}`, {
  method: 'DELETE'
});

export const deactivateWebNotificationApi = () => ridesWebApi('webNotificationDeavtivation', {
  method: 'PUT'
})
  .then(res => res.json());


const getIdPath = (model) => model.id ? `/${model.id}`: '';

const  listingExcluding = (listing) => {
  const {photos, ...restListing} = listing;
  return Object.assign({}, restListing);
}



