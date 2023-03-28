import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as TripFeedActions from '../../actions/tripFeed'; 

import Activity from './Activity';
import Trips from './Trips';

import {MainContent, DashboardTabs, DashboardTab} from './styled-components';

import {PageTitle} from '../../components/styled-components';
import { DashboardTabTypes } from '../../constants/Enums';
import MobileTitleHeader from '../../components/MobileTitleHeader';

export const Dashbaord = (props) => {

  const changeTab = (key) => {
    const {actions} = props;
    if (key === DashboardTabTypes.activity) {
    actions.fetchTripFeed();
    }
    else if (key === DashboardTabTypes.trips) {
      actions.fetchTrips();
    }
  }

  return (
    <MainContent  defaultActiveKey="1">
      <MobileTitleHeader title='Trips'/>
      <div>
        <DashboardTabs onChange={changeTab}>
          <DashboardTab tab={<span>{'Activity'}</span>} key={DashboardTabTypes.activity}>
            <Activity/>  
          </DashboardTab>
          <DashboardTab tab={<span>{'Trips'}</span>} key={DashboardTabTypes.trips}>
            <Trips/>
          </DashboardTab>
        </DashboardTabs>
      </div>
  </MainContent>
  )
}

const mapStateToProps = (state) => {
  return {
    tripFeed: state.dashboard.tripFeed,
    completedTrips: state.dashboard.completedTrips
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
        ...TripFeedActions
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToActions)(Dashbaord);