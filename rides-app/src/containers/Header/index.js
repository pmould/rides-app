import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as LoginViewActions from '../../actions/loginView';
import * as LoginActions from '../../actions/login';
import * as SearchListingsActions from '../../actions/searchListings';

import history from '../../history';

import {isAuthenticated, resetAuthentication} from '../../utils/api';
import {unregister as unRegisterServiceWorker} from '../../registerServiceWorker';

import * as realtime from '../../utils/realtime';

import {withRouter} from 'react-router-dom';

import {Dropdown, Badge} from 'antd';

import {MessageIcon, AppNamePartOne, HeaderButtons, MobileNavBar, MobileNavBarMenu,
  MobileHamburgerMenu, DropDownInner, DownArrow, HeaderNavLink, HeaderNavItem, LeftHeader, LoginMenu,
  LoginMenuItem, LogoLink, ListCarButton, RightContent, FindListingSearchHeader, FindListingButtonHeader,
  HeaderContent, HeaderWrapper, HeaderRightButton, HeaderRight, User, UserImage, RealtimeConnected, DashboardIcon} from './styled-components';

import FindListing from '../LocationSearchControl/FindListing';

import MobileFindListings from '../LocationSearchControl/MobileFindListings';

FindListing.defaultProps = {
  searchColor: 'white'
}

class Header extends React.Component {
  state = {
    userImageLoaded: false,
    clickedMobileMenuIcon: false
  }

  logOutUser(actions) {
    unRegisterServiceWorker();
    actions.logOutUser();
    resetAuthentication();
  }

  userImageLoadHander = () => {
    this.setState({userImageLoaded: true});
  }

  renderMobileHeaderMenu = () => {
    return (
      <MobileNavBar class="navbar">
          <div class="container">
            <div class="row">
              <LogoLink  to="/home">
                <AppNamePartOne>GH</AppNamePartOne><div>Rides</div>
              </LogoLink>
              {/* <div class="col-md-4 col-8 navbar-logo"><img src="http://static.satez.eu/logo.svg" alt=""></div> */}

            </div>
          </div>
        </MobileNavBar>
    );
  }

  renderAccountMenu(loggedIn, isLoginPage, isSearchPage) {
    const {user, actions} = this.props;

    const {picture = ''} = user;

    const menu = (
      <LoginMenu innerRef={(node) => {this.menu = node;}}>
        {!loggedIn && <LoginMenuItem hiddenDesktop={!isSearchPage}
          onClick={() => this.login(isLoginPage, actions)}  
        ><a>Log In</a></LoginMenuItem>}
        {!loggedIn && <LoginMenuItem  hiddenDesktop={!isSearchPage}
          onClick={() => this.signUp(isLoginPage, actions)}   
        ><a>Sign Up</a></LoginMenuItem>}
        {loggedIn && <LoginMenuItem hiddenDesktop={!isSearchPage}
          onClick={this.goToMessages} 
        ><a>Messages</a></LoginMenuItem>}
        {loggedIn && <LoginMenuItem  hiddenDesktop={!isSearchPage}
          onClick={this.goToDashboard} 
        ><a>Dashboard</a></LoginMenuItem>}
        {loggedIn && <LoginMenuItem  hiddenDesktop={!isSearchPage}
          onClick={this.goToVehicle} 
        ><a>Vehicles</a></LoginMenuItem>}
        {loggedIn && <LoginMenuItem border hiddenDesktop={!isSearchPage}
          onClick={this.goToListACar}><a>List A Car</a></LoginMenuItem>}
        {loggedIn && <LoginMenuItem 
          onClick={() => this.goToProfile()}  
        ><a>Profile</a></LoginMenuItem>}
        {loggedIn && <LoginMenuItem border
          onClick={this.goToAccount} 
        ><a>Account</a></LoginMenuItem>}
        <LoginMenuItem
          onClick={() => {}}  
        ><a>About Us</a></LoginMenuItem>
        {<LoginMenuItem
          onClick={() => {}}    
        ><a>Contact Us</a></LoginMenuItem>}
        {loggedIn && <LoginMenuItem
          onClick={() => this.logOutUser(actions)}   
        ><a>Log Out</a></LoginMenuItem>}
      </LoginMenu>
    );

    return (
      <Dropdown
        trigger={['click', 'hover']}
        overlay={menu}
        align={{
          offset: [2, 8],
          overflow: {
            adjustX: 1,
            adjustY: 1,
          }
        }}
        placement="bottomRight">
        <DropDownInner>
          <User>
            {user.id ? <UserImage
              onLoad={this.userImageLoadHander}
              onError={() => this.setState({defaultImage: 'defaultProfilePicture.jpg'})}
              alt='name' src={this.state.defaultImage || picture} />
              : <MessageIcon type='user'/>}
          </User>
          {<DownArrow />}
        </DropDownInner>
      </Dropdown>
    );
  }

  goToMessages = () => {
    const {user: {accountId}} = this.props;
    history.push('/messages');
    this.closeMobileHeader();
  }

  goToDashboard = () => {
    const {user: {accountId}} = this.props;
    realtime.clearNotifications(accountId);
    this.closeMobileHeader();
    history.push('/dashboard');
  }

  goToAccount = () => {
    this.closeMobileHeader();
    history.push('/account');
  }

  goToProfile = () => {
    const {user: {id: userId}} = this.props;
    history.push(`/profile`);
  }
  displayMobileMenu = () => {
    this.setState((state) => ({clickedMobileMenuIcon: !state.clickedMobileMenuIcon}));
  }

  signUp = (isLoginPage, actions) => {
    isLoginPage || window.matchMedia('(max-width: 750px)').matches
      ? history.push('/signUp', `${history.location}${history.location.search}`)
      : actions.toggleLoginModal(true);
    this.closeMobileHeader();
  }

  login = (isLoginPage, actions) => {
    isLoginPage || window.matchMedia('(max-width: 750px)').matches
      ? history.push('/login')
      : actions.toggleLoginModal();
    this.closeMobileHeader();
  }

  goToSearch = () => {
    history.push('/rent-a-car');
    this.closeMobileHeader();
  }

  goToVehicle = () => {
    history.push('/host/vehicles');
    this.closeMobileHeader();
  }

  goToListACar = () => {
    history.push('/list-your-car/new/elegibility');
    this.closeMobileHeader();
  }

  closeMobileHeader = () => {
    this.setState((state) => ({clickedMobileMenuIcon: false}));
  }
  
  render() {
    const {actions, location: {pathname = ''}, notifications: {messageNotifications, notifications},
    fullHeight, realtimeConnected} = this.props;
    const {clickedMobileMenuIcon} = this.state;

    const isLoginPage = pathname === '/login' || pathname === '/signUp' || pathname === '/resetPassword'

    const loggedIn = isAuthenticated();

    const isSearchPage = pathname === '/searchListings';
    const isHomePage = pathname === '/home';

    const rightHeader = (
      <HeaderRight>
        {!loggedIn && (
        <React.Fragment>
          <HeaderRightButton
            hiddenmobile    
            onClick={() => this.signUp(isLoginPage, actions)}
          >Sign Up</HeaderRightButton>
          <HeaderRightButton
            hiddenmobile
          onClick={() => this.login(isLoginPage, actions)}
          >Log In</HeaderRightButton> 
        </React.Fragment>
        )}
        {this.renderAccountMenu(loggedIn, isLoginPage, isSearchPage)}
      </HeaderRight>
    );
    
    const rightHeaderButtons = !isSearchPage
      ? (
        <HeaderButtons>
          {/* <ListCarButton ghost
            onClick={this.goToSearch}>
            Search
          </ListCarButton> */}
          <ListCarButton
            ghost
            hiddenmobile='true'
            loggedIn={loggedIn}
            onClick={this.goToListACar}>
            List a car
          </ListCarButton>
          {!loggedIn && <HeaderNavItem
            hiddenDesktop  
            onClick={() => this.login(isLoginPage, actions)}>Log in</HeaderNavItem>}
          {loggedIn && <HeaderNavLink
            hiddenmobile  
            to='/host/vehicles'>Vehicles</HeaderNavLink>}
          {loggedIn && <HeaderNavItem
            hiddenmobile   
            onClick={this.goToDashboard}>
            <Badge style={{fontSize: '12px'}} offset={[-85, 8]} count={notifications.unNotifiedNotificationsCount}>
            Dashboard

            </Badge> 
            </HeaderNavItem>}
          {loggedIn && <HeaderNavItem hiddenDesktop>
            <Badge style={{fontSize: '12px'}} count={notifications.unNotifiedNotificationsCount}>
              <DashboardIcon onClick={this.goToDashboard}/>
            </Badge>
            </HeaderNavItem>}
          {loggedIn && <HeaderNavItem onClick={this.goToMessages}>
            <Badge style={{fontSize: '12px'}} count={messageNotifications.unReadMessageGroupsCount}>
              <MessageIcon />
            </Badge>
            </HeaderNavItem>}
        </HeaderButtons>
      )
      : (
          <React.Fragment>
            <FindListingSearchHeader>            
              <FindListing {...this.props}/>
            </FindListingSearchHeader>
          {!loggedIn && <HeaderNavItem
            hiddenDesktop  
            onClick={() => this.login(isLoginPage, actions)}>Log in</HeaderNavItem>}
          </React.Fragment>
        );
    
    return (
      <HeaderWrapper>
        <MobileFindListings/>
        {!realtimeConnected && (
          <RealtimeConnected>
            Real Time Disconnected
          </RealtimeConnected>
        )}
        <HeaderContent>
          <LeftHeader isSearchPage={isSearchPage}>
            <LogoLink to='/home'>
              <AppNamePartOne>GH</AppNamePartOne><div>Rides</div>
            </LogoLink>
            {!isSearchPage && !isHomePage && (
              <React.Fragment>
                <FindListingSearchHeader>            
                  <FindListing inputSize={'small'} {...this.props}/>
                </FindListingSearchHeader>
              </React.Fragment>
            )}
          </LeftHeader> 
          <RightContent>
          <FindListingButtonHeader onClick={actions.toggleSearchListingModal}>Search</FindListingButtonHeader>
            {rightHeaderButtons}
            {rightHeader}
            {/* <MobileNavBarMenu
              active={clickedMobileMenuIcon}  
            >
              <nav>
                <ul>
                  {!loggedIn && <li
                    onClick={() => this.login(isLoginPage, actions)}  
                  ><a>Log In</a></li>}
                  {!loggedIn && <li
                    onClick={() => this.signUp(isLoginPage, actions)}   
                  ><a>Sign Up</a></li>}
                  <li
                    onClick={this.goToSearch}  
                  ><a>Search</a></li>
                  {loggedIn && <li
                    onClick={this.goToListACar}><a>List A Car</a></li>}
                  {loggedIn && <li
                    onClick={this.goToVehicle} 
                  ><a>Vehicles</a></li>}
                  {loggedIn && <li
                    onClick={this.goToDashboard} 
                  ><a>Dashboard</a></li>}
                  {<li
                    onClick={() => {}}  
                  ><a>About Us</a></li>}
                  {<li
                    onClick={() => {}}    
                  ><a>Contact Us</a></li>}
                  {loggedIn && <li
                    onClick={() => this.logOutUser(actions)}   
                  ><a>Log Out</a></li>}
                </ul>
              </nav>
            </MobileNavBarMenu>
            <MobileHamburgerMenu
              onClick={this.displayMobileMenu}
              active={clickedMobileMenuIcon}>
              <span></span>
            </MobileHamburgerMenu> */}
          </RightContent>
        </HeaderContent>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.metaData.user,
    notifications: state.notifications,
    realtimeConnected: state.notifications.realtimeConnected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...LoginActions,
      ...LoginViewActions,
      ...SearchListingsActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));



