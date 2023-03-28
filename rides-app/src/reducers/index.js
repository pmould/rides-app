import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";
import listing from './listing';
import metaData from './metaData';
import account from './account';
import newAccountView from './newAccountView';
import loginView from './loginView';
import newListingView from './newListingView';
import listings from './listings';
import searchListings from './searchListings';
import reservation from './reservation';
import messages from './messages';
import messagesList from './messagesList';
import notifications from './notifications';
import commonView from './commonView';
import dashboard from './dashboard';
import trip from './trip';
import profile from './profile';

export default combineReducers({
  listing,
  listings,
  messagesList,
  searchListings,
  reservation,
  metaData,
  account,
  newAccountView,
  loginView,
  newListingView,
  messages,
  notifications,
  commonView,
  dashboard,
  trip,
  profile,
  routing: routerReducer
});