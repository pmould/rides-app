import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

import * as MetaDataActions from '../../../actions/metaData';
import * as ReservationActions from '../../../actions/reservation';
import * as TripActions from '../../../actions/trip';

import {Content} from '../../../components/styled-components';
import MobileTitleHeader from '../../../components/MobileTitleHeader';
import ShareLocationMap from '../../../components/Trip/ShareLocationMap';
import {DATE_DISPLAY_TEXT_FORMAT} from '../../../constants';

import * as realtime from '../../../utils/realtime';

import {Icon} from 'antd';

import moment from 'moment';

export const MainContent = styled(Content)`
  padding: 0;
`;

export const ResponsiveMapWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-bottom: 35%;
`;

export const NoMap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ShareLocationButton = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
  cursor: pointer;
`;

export const LastUpdatedAt = styled.div`
  color: #333;
  font-size: 12px;
`;


class SharedLocationPage extends React.Component {
  state = {
    sharingLocation: false
  }

  componentWillMount() {
    const {actions, match: {params: {reservationId}}} = this.props;

    actions.getTrip(reservationId);
   realtime.joinTripMeetupLocation(reservationId);
  }

  shareLocation = () => {
    const {sharingLocation} = this.state;

    if (sharingLocation) {
      this.stopSharingLocation();
    }
    else {
      this.watchId = navigator.geolocation.watchPosition(this.geoSuccess, this.geoError);
    }
  }

  stopSharingLocation = () => {
    navigator.geolocation.clearWatch(this.watchId);
    this.setState({sharingLocation: false});
  }

  geoSuccess = (position) => {
    const {actions} = this.props;
    realtime.sendTripMeetupLocation(position.coords);
    this.setState({sharingLocation: true});
  };

  geoError = (error) => {
    this.setState({sharingLocation: false});
    switch(error.code) {
      case error.TIMEOUT:
        break;
    }
  }

  render() {
    const {reservation, accountId, sharedMeetUpLocation, history} = this.props;
    const {id: reservationId,
      driver: {id: driverId, firstName: driverFirstName, picture: driverPicture} = {},
      listing: {
        host: {id: hostId, picture: hostPicture, firstName: hostFirstName} = {}} = 0} = reservation;

    const {sharingLocation} = this.state;

    const isDriver = accountId === driverId;

    return (
      <MainContent>
        <MobileTitleHeader
          only
          title='Shared Location'/>
        <div>
          {sharedMeetUpLocation.updatedAt
            ? <ShareLocationMap
                isDriver={isDriver}
                hostFirstName={hostFirstName}
                lastUpdatedAt={sharedMeetUpLocation.updatedAt}
                initialCenter={{
                  lat: sharedMeetUpLocation.latitude,
                  lng: sharedMeetUpLocation.longitude
                }}
                center={{
                  lat: sharedMeetUpLocation.latitude,
                  lng: sharedMeetUpLocation.longitude
                }}
                zoom={5}
              />
            : (
              <NoMap>
                <Icon
                  type='environment'>
                </Icon>
                &nbsp;No Location has been shared currently
              </NoMap>
            )}
        </div> 
      </MainContent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.metaData.user,
    accountId: state.metaData.user.accountId,
    reservation: state.trip.reservation,
    sharedMeetUpLocation: state.trip.sharedMeetUpLocation
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...ReservationActions,
      ...TripActions,
      ...MetaDataActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(SharedLocationPage));