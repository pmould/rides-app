import {TripStatusCode} from './Enums';

export const facebookAppId = '149562755804337';
export const googleAppId = '127638149047-guana8a80dn85dlnm0qk5236ro0q1r28.apps.googleusercontent.com';
export const googleApiKey = 'AIzaSyAgzPxgjvLZH2pO6DuJfnc7_kg8oBO7td4'
export const DATE_DISPLAY_FORMAT = 'MM/DD/YYYY';
export const DATE_DISPLAY_TEXT_FORMAT = 'Do MMM YYYY';
export const DATE_DISPLAY_SHORT_TEXT_FORMAT = 'MMM DD';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_SHORT_FORMAT = 'MMM YYYY';
export const TIME_FORMAT = 'HH:mm';
export const TIME_DISPLAY_FORMAT = 'h:mma';
export const TIME_DISPLAY_MESSAGE_FORMAT = 'h:mm A';
export const TIME_DISPLAY_FULL_FORMAT = 'h:mm:ss a';
export const SUMMARY_DATE_FORMAT = 'ddd MMM D';
export const SUMMARY_TIME_FORMAT = 'h:mm A';

export const advanceTimeValues = [
  '12 hours',
  '1 day',
  '2 days',
  '3 days',
  '1 week'
];

export const tripMinDurationValues = [
  'Any',
  '1 day',
  '2 days',
  '3 days',
  '5 days',
  '1 week',
  '2 weeks',
  '1 month'
];   

export const tripMaxDurationValues = [
  'Any',
  '3 days',
  '5 days',
  '1 week',
  '2 week',
  '1 month',
  '3 months'
];

export const PopularCitiesList = [
  {
    value: 1,
    label: 'Accra'
  },
  {
    value: 2,
    label: 'Kumasi'
  },
  {
    value: 3,
    label: 'Sekondi Takoradi'
  }
];


export const RegionsList = [
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

export const coverPhotoPlaceHolder = 'http://via.placeholder.com/400x225?text=No%20image';
export const coverPhotoPlaceHolderLarge = 'http://via.placeholder.com/1600x900?text=No%20image';
export const defaultDailyRate = 25;

export const resetPasswordSuccessMessage = 'Reset Link has been sent to your email. Follow the instructions in the email to reset your password. The email will arrive shorty.';


export const activeTripStatuses = [
  TripStatusCode.APPROVED,
  TripStatusCode.AUTHORIZED,
  TripStatusCode.INPROGRESS,
  TripStatusCode.DRIVER_END_TRIP
];