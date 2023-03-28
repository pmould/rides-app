import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as LoginActions from '../actions/login';
import * as LoginViewActions from '../actions/loginView';
import * as MetaDataActions from '../actions/metaData';
import * as RealTimeActions from '../actions/realtime';
import * as MessagesActions from '../actions/messages';
import * as CommonViewActions from '../actions/commonView';
import * as TripFeedActions from '../actions/tripFeed'; 
import * as NotificationActions from '../actions/notifications'; 

import {ConnectedRouter} from 'react-router-redux';
import Login from './Login';
import ResetPassword from './ResetPassword';
import ChangePassword from './Account/ChangePassword';
import Home from './Home';
import Footer from '../components/Footer';
import PrivateRoute from '../components/PrivateRoute';
import NotFoundPage from '../components/NotFoundPage';
import Listings from './Listings';
import ListCar from './ListCar';
import Search from './Search';
import RentACar from '../components/RentACar';
import Listing from './Listing';
import Checkout from './Checkout';
import TripConfirmation from './TripConfirmation';
import Dashboard from './Dashboard';
import Chat from '../components/Chat';
import MessageList from './MessageList';
import Messages from './Messages/Messages';
import Profile from './Profile';
import UserAccountActivation from './Account/UserAccountActivation';
import Header from './Header';
import Trip from './Trip';
import SharedLocationPage from './Trip/SharedLocationPage';
import TripPhotosPage from './Trip/TripPhotosPage';
import Account from './Account';


import SnackBar from './SnackBar';
import Alert from './Alert';

import * as realtime from '../utils/realtime';
import {setServiceWorkerInit, isSubscribed} from '../registerServiceWorker';

import {isAuthenticated, expiration} from '../utils/api';

import AppLoader from '../components/AppLoader';

import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import qs from 'query-string';

import history from '../history';

import {App, AppOverlay, PageContainer, Content} from '../components/styled-components';

class Router extends React.Component {
  componentWillMount() {
    const {actions, accountId} = this.props;
    realtime.setRealtime(actions);
    setServiceWorkerInit(actions);
    accountId && realtime.joinMessageNotificationRoom(accountId);
    
  }

  componentDidMount() {
    const {actions} = this.props;

    isAuthenticated() && actions.getUserAccount(actions);
    actions.fetchGhLocationSearchTaxonomy();
  }

  componentDidUpdate(prevProps) {
    const {actions, userId, accountId, pushNotifications} = this.props;
    const {location: {state}} = history;
    console.log('Logged In', document.location.pathname, isAuthenticated());
    if(isAuthenticated() && (document.location.pathname === '/login' || document.location.pathname === 'signup'))
    {
      history.push('/home', 'fromLogin');
    }

    if (prevProps.userId !== this.props.userId && userId) {
      pushNotifications.isActive && actions.updateWebPushSubscription();

      realtime.joinMessageNotificationRoom(accountId);
      const authenticated = isAuthenticated();
      console.log('state', state);
      if (authenticated && !state === 'fromLogin') {
        state && history.goBack();

        setInterval(() => {
          console.log(new Date(expiration));
          actions.reauthorizeLogin();
        }, 3600000)
      }
    }
  }

  render() {
    const {loginView, layoutView, actions, user: {id: userId}, showAppLoader, appOverlay} = this.props;

    const {openLoginModal, isSignUp} = loginView;
    const loggedIn = isAuthenticated();

    
    return (
      <ConnectedRouter history={history}>
        <App>
          {showAppLoader && <AppLoader {...{...this.props}} />}
          <SnackBar/>
          <Alert/>
          {openLoginModal && !loggedIn && !userId && <Login {...{...this.props, modal: true, isSignUp}}/>}
          <PageContainer fullHeight={layoutView.fullHeight}>
          <AppOverlay active={appOverlay}/>
          {<Header/>}
          <Switch>
            <Redirect exact from='/' to='/home'/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/rent-a-car' component={RentACar}/>
            <Route exact path='/listing/:listingId' component={Listing}/>
            
            <Route exact path='/searchListings'  render={(props) => {
              const {history: {location: {search}}} = props;
              const query = qs.parse(search);
              return <Search {...{...this.props, query}}/>;
            }}/>
            <PrivateRoute exact path='/checkout' render={(props) => {
              const {history: {location: {search}}} = props;
              const query = qs.parse(search);

              return <Checkout {...{...this.props, query}}/>;
              }} />
            <PrivateRoute exact path='/tripConfirmation' render={(props) => {
              const {history: {location: {search}}} = props;
              const query = qs.parse(search);

              return <TripConfirmation {...{...this.props, query}}/>;
              }} />  
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <PrivateRoute exact path='/trips/:reservationId' component={Trip}/>
            <PrivateRoute exact path='/host/vehicles' component={Listings}/>
            <PrivateRoute exact path='/list-your-car/:listingId/:section' component={ListCar}/>
            <PrivateRoute exact path='/messages' component={MessageList} />
            <PrivateRoute exact path='/driver/messages/reservation/:reservationId' component={Messages} />  
            <PrivateRoute exact path='/host/messages/reservation/:reservationId' component={Messages} />
            <Route exact path='/profiles/:profileAccountId' component={Profile}/>
            <PrivateRoute exact path='/profile' component={Profile}/>
            <Route exact path='/account' component={Account}/>
            <Route path='/chat' component={Chat}/>
            <Route exact {...{actions}} path='/login' render={routeProps => <Login {...{...routeProps, ...this.props, actions}} />}/>
            <Route exact {...{actions}} path='/signUp' render={routeProps => <Login {...{...routeProps, ...this.props, actions, isSignUp: true}} />}/>
              <Route exact {...{actions}} path='/resetPassword' render={routeProps => (
                <Content>
                  <ResetPassword {...{...routeProps, ...this.props, actions}} />
                </Content>
              )} />
            <PrivateRoute exact path='/changePassword' {...{...this.props}} render={(props) => {
              const {history: {location: {search}}} = props;
              const query = qs.parse(search);

              return <ChangePassword {...{...this.props, query}} />;
            }}/>
            <Route exact path='/userAccountActivation' render={(props) => {
              const {history: {location: {search}}} = props;
              const query = qs.parse(search);

              return <UserAccountActivation {...{...this.props, query}} />;
            }}/>
            <PrivateRoute exact path='/trip/:reservationId/photos' {...{...this.props}} render={(props) => {
              const {history: {location: {search}}} = props;
              const query = qs.parse(search);

              return <TripPhotosPage {...{...this.props, query}} />;
            }}/>
            <PrivateRoute exact path='/trip/:reservationId/sharedLocation' {...{...this.props}} render={(props) => {
              const {history: {location: {search}}} = props;
              const query = qs.parse(search);

              return <SharedLocationPage {...{...this.props, query}} />;
            }}/>
            <Route component={NotFoundPage}/>
          </Switch>
          </PageContainer>
          <Footer fullHeight={layoutView.fullHeight}/>
        </App>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginView: state.loginView,
    user: state.metaData.user,
    userId: state.metaData.user.id,
    accountId: state.metaData.user.accountId,
    showAppLoader: state.commonView.showAppLoader,
    layoutView: state.commonView.layoutView,
    appOverlay: state.commonView.appOverlay,
    pushNotifications: state.notifications.pushNotifications
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...RealTimeActions,
      ...MessagesActions,
      ...LoginActions,
      ...LoginViewActions,
      ...MetaDataActions,
      ...CommonViewActions,
      ...TripFeedActions,
      ...NotificationActions
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToActions)(Router);