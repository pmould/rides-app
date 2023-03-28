import moment from 'moment';
import {DATE_DISPLAY_SHORT_TEXT_FORMAT, DATE_DISPLAY_FORMAT, TIME_DISPLAY_MESSAGE_FORMAT} from '../constants';

export const mapItems = (list, prop = 'id') => {
  if(list instanceof Map || !Array.isArray(list)) {
    return;
  }
  
  const map = new Map();
  list.forEach(item => {
    map.set(item[prop], item);
  });

  return map;
}



// export const  = (listings) => 
//   Object.entries(listings)
//   .map(([key, item]) => listings[key] = item);

export const getTripTotal = (dailyRate, startDate, endDate) => {
  if (startDate && endDate) {
    const diff = moment(endDate).diff(moment(startDate), 'days');
    return dailyRate * diff;
  }
}

export const getListingLocation = (listingLocation) => {
  console.log(listingLocation)
  const area = (listingLocation.ghCityArea && listingLocation.ghCityArea.area) || (listingLocation.ghRegionArea && listingLocation.ghRegionArea.area);
  const place = (listingLocation.ghMajorCity && listingLocation.ghMajorCity.city) || (listingLocation.ghPostCodeRegion && listingLocation.ghPostCodeRegion.region);
  return place ? `${area}, ${place}` : '';
}

export const getVehicleDescription = (vehicle) => {
  const {modelYear = '', make: {make = ''} = {}, model: {model = ''} = {}} = vehicle || {};
  return `${modelYear} ${make} ${model}`.trim();
}

export const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const getDateFromText = (date) => {
  const mom = moment(date), now = moment(), diffInDays = mom.from(now), diffInYears = now.diff(mom, 'years');

  if( diffInYears !== 0 ){
      return mom.format(DATE_DISPLAY_FORMAT)
  }
  else{
      if (diffInDays.indexOf('second') !== -1 || diffInDays.indexOf('minute') !== -1 || diffInDays.indexOf('hour') !== -1)
        return mom.format(TIME_DISPLAY_MESSAGE_FORMAT);
      if (diffInDays === '1 day ago')
          return 'Yesterday';
      else if( diffInDays === '2 days ago')
          return diffInDays
      else 
        return mom.format(DATE_DISPLAY_SHORT_TEXT_FORMAT);
  }
}