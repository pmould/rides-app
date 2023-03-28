import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as MetaDataActions from '../../actions/metaData';
import * as LoginViewActions from '../../actions/loginView';

import {isAuthenticated} from '../../utils/api'; 

import {PopularCitiesList, RegionsList} from '../../constants';

import {Link, withRouter} from 'react-router-dom';

import {Card, Icon} from 'antd';
import {AboutTextWrapper, AboutTextContent, LoggedInWrapper, PromoDisplayWrapper, PromoJoinButton, HomePage,
  MainContent,LoggedInContent, CardTitleContent, PromoDisplayContent, Title, StyledSpinner,
  SearchWrapper, Search, SearchTitle, SearchSelection, SearchSelectionItem, SearchItems, SearchItem} from './styled-components';

import AccountModal from '../AccountModal';

import FindListing from '../LocationSearchControl/FindListing';

class Home extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {user, history} = this.props;

    if(user.id && (nextProps.user.id !== user.id)) {
      // history.push('/home');
    }
  }

  componentWillMount() {
    window.document.querySelector('body').scrollTop = 0;
  }

  render() {
    const {account, user = {}, actions} = this.props;

    const {active} = account;
    const {id: userId} = user;
    const showAccountSetUpModal = userId && !active;

    const isLoggedIn = isAuthenticated();

    const aboutText = (
      <AboutTextWrapper>
        <PromoDisplayWrapper>
          <PromoDisplayContent>
            <div>Start earning today on our online platform from the comfort of your couch!</div>
              <PromoJoinButton
                onClick={actions.toggleLoginModal}>
                Join GH Rides
              </PromoJoinButton>
            </PromoDisplayContent>
        </PromoDisplayWrapper>
        <AboutTextContent>
          <Card bordered={false} title={<CardTitleContent>GH Rides coming soon</CardTitleContent>}>
            <div>
                GH Rides is an online platform/application that connects vehicle owners with individuals who require vehicles for short term rental.
            </div>
            <br/>
            <div>
              Why use GH Rides?
            </div>
            <br/>
            <ul>
              <li>More variety of cars</li>
              <li>Flexible Hours and Prices</li>
              <li>Safer user experience</li>
              <ul>
                
                <li>
                  Trusted platform of verified vehicle owners
                </li>
                <li>
                  Vehicle inspections
                </li>
                <li>
                  Membership Cards with photograph
                </li>
              </ul>
              </ul>
              <br/>
          </Card>
        </AboutTextContent>
      </AboutTextWrapper>
    );

    const userText = (
      <div>
        <Title>{`${user.firstName}, welcome back to  GH Rides`}</Title>
        <div>
          <Link to='/rent-a-car'>Rent A Car</Link>
        </div>
        <div>
          <Link to='/list-your-car/new/elegibility'>List A Car</Link>
        </div>
        <div>
          Learn More
        </div>
      </div>
    );

    const loading = !user.id && isLoggedIn;
    const antIcon = <Icon type="loading" style={{fontSize: 36}} spin />;
    return (
      <HomePage>
        <MainContent>
          {isLoggedIn && (
            <LoggedInWrapper>
              <LoggedInContent>
                {userText}
              </LoggedInContent>
            </LoggedInWrapper>
            )}
          <SearchWrapper>
            <Search>
              <SearchTitle>Search Vehicles to Rent in Ghana</SearchTitle>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <FindListing size='large'/>
              </div>
              <SearchSelection>
                <SearchSelectionItem>
                  <SearchItems>
                  <SearchItem>
                    <Link to={{
                      pathname: `/searchListings`,
                      state: 'fromSearchNavLink'}}>All of Ghana</Link>
                  </SearchItem>
                  </SearchItems>
                </SearchSelectionItem>
                <SearchSelectionItem>
                  Cities
                  <SearchItems>
                    {
                      PopularCitiesList.map(city => (
                        <SearchItem key={city.value}>
                          <Link to={{
                            pathname: `/searchListings`,
                            search: `?ghCityId=${city.value}`,
                            state: 'fromSearchNavLink'}}>{city.label}</Link>
                        </SearchItem>
                      ))
                    }
                  </SearchItems>
                </SearchSelectionItem>
                <SearchSelectionItem>
                  Regions
                  <SearchItems>
                    {
                      RegionsList.map(region => (
                        <SearchItem key={region.value}>
                          <Link to={{
                            pathname: '/searchListings',
                            search: `?ghPostCodeRegionId=${region.value}`,
                            state: 'fromSearchNavLink'}}>{region.label}</Link>
                        </SearchItem>
                      ))
                    }
                  </SearchItems>
                </SearchSelectionItem>
              </SearchSelection>
            </Search>
          </SearchWrapper>
          {loading
          ? <StyledSpinner size='large' indicator={antIcon}/>
          : !isLoggedIn && aboutText}
          {showAccountSetUpModal && <AccountModal/>}
        </MainContent>
      </HomePage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    user: state.metaData.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...MetaDataActions,
      ...LoginViewActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));