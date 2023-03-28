export const TransmissionTypes = {
  manual : false,
  automatic: true
};

export const TransmissionOptions = [
  {label: 'manual', value: true},
  {label: 'automatic', value: false}
];

export const AccountTypes = {
  casualEarner: 1,
  company: 2
};

export const ProfileTypes = {
  driver: 'driver',
  host: 'host'
}

export const DashboardTabTypes = {
  activity: 'activity',
  trips: 'trips'
}

export const NewAccountSteps = {
  type: 1,
  details: 2,
  activate: 3
};

export const NewListingSteps = {
  elegibility: {
    stateId: 1,
    name: 'elegibility'
  },
  availability: {
    stateId: 2,
    name: 'availability'
  },
  details: {
    stateId: 3,
    name: 'details'
  },
  photos: {
    stateId: 4,
    name: 'photos'
  },
  publish : {
    stateId: 5,
    name: 'publish'
  }
};

export const PopularCitiesEnum = {
  1: {
    label: 'Accra',
    value: 1
  },
  2: {
    label: 'Kumasi',
    value: 2
  },
  3: {
    label: 'Sekondi Takoradi',
    value: 3
  }
};

export const RegionsEnum = {
  1: {
    label: 'Ashanti',
    value: 1
  },
  2: {
    label: 'Brong Ahafo',
    value: 2
  },
  3 : {
    label: 'Central',
    value: 3
  },
  4: {
    label: 'Eastern',
    value: 4
  },
  5: {
    label: 'Greater Accra',
    value: 5
  },
  6: {
    label: 'Northern',
    value: 6
  },
  7: {
    label: 'Upper East',
    value: 7
  },
  8: {
    label: 'Upper West',
    value: 8
  },
  9: {
    label: 'Volta',
    value: 9
  },
  10: {
    label: 'Western',
    value: 10
  }
};

export const Regions = [
  {
    value: 1,
    label: 'Ashanti'
  },
  {
    value: 2,
    label: 'Brong Ahafo'
  },
  {
    value: 3,
    label: 'Central'
  },
  {
    value: 4,
    label: 'Eastern'
  },
  {
    value: 5,
    label: 'Greater Accra'
  },
  {
    value: 6,
    label: 'Northern'
  },
  {
    value: 7,
    label: 'Upper East'
  },
  {
    value: 8,
    label: 'Upper West'
  },
  {
    value: 9,
    label: 'Volta'  
  },
  {
    value: 10,
    label: 'Western'  
  }
];

export const ModalDialogs = {
  searchListing: 'searchListing'
}

export const TripStatusCodeString = {
  0: 'PENDING',
  1: 'APPROVED',
  2: 'IN PROGRSS',
  3: 'COMPLETED',
  4: 'DECLINED'
};
export const TripStatusCode = {
  PENDING: 0,
  APPROVED: 1,
  AUTHORIZED: 2,
  INPROGRESS: 3,
  DRIVER_END_TRIP: 4, 
  COMPLETED: 5,
  DECLINED: 6
}

export const LoginProvider = {
  facebook: 'facebook',
  google: 'google',
  email: 'email',
  none:'none'
};

export const TripWorkFlow = {
  host: {
    [TripStatusCode.APPROVED]: {
      nextText: 'Authorize Start Trip',
      successText: 'Trip Authorized Succeeded',
      next: TripStatusCode.AUTHORIZED,
      buttonType: {}
    },
    [TripStatusCode.DRIVER_END_TRIP]: {
      nextText: 'Complete Trip',
      next: TripStatusCode.COMPLETED,
      successText: 'Trip Marked as Completed by Host',
      buttonType: {
        mobile: 'warning',
        desktop: 'danger'
      }
    }
  },
  driver: {
    [TripStatusCode.AUTHORIZED]: {
      nextText: 'Start Trip',
      successText: 'Trip Started Succeeded',
      next: TripStatusCode.INPROGRESS,
      buttonType: {}
    },
    [TripStatusCode.INPROGRESS]: {
      nextText: 'End Trip',
      successText: 'Trip Marked as Ended By Driver',
      next: TripStatusCode.DRIVER_END_TRIP,
      buttonType: {
        mobile: 'warning',
        desktop: 'danger'
      }
    }
  }
};