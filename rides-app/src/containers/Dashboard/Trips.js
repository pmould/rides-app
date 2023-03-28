import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ListingActions from '../../actions/listings';
import * as ReservationActions from '../../actions/reservation';
import * as LoginViewActions from '../../actions/loginView';
import * as TripFeedActions from '../../actions/tripFeed'; 

import {withRouter} from 'react-router-dom';

import {
  SectionTrips,
  ListingPrimaryPhoto, TripFeedMain,
  TripFeedItem, TripFeedContent, TripFeedMessage, TripFeedVehicle, TripFeedLocation
} from './styled-components';


import {ContentFooter, SPagination} from '../../components/styled-components';

import {DATE_DISPLAY_TEXT_FORMAT} from '../../constants';

import {getListingLocation, getVehicleDescription} from '../../utils';

import moment from 'moment';

import styled from 'styled-components';
import {Icon, Spin, Skeleton} from 'antd';
export const NoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const NoMessages = styled.div`
  color: #333;
  padding-left: 8px;
`;
export const Messages = styled.div`
  position: relative;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #CCC;
  z-index: 1;
`;


export const StyledSpin = styled(Spin)`
  height: 100%;
  opacity: 1;
  display: flex !important;
  align-items: center;
  justify-content: center;
`; 
export const StyledSkeleton = styled(Skeleton)`
  padding: 20px;
  border-bottom: 1px solid lightgrey;
`;

export const OverlayWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export class Trips extends React.Component {
  state = {
    today: moment(),
    currentPage: 1,
    pageSize: 10
  }

  componentWillMount() {
    const {actions} = this.props;

    actions.fetchTrips();
  }

  renderTrip(trip) {
    const {accountId} = this.props;

    const {driver, listing: {host}, startDate, endDate, vehicle, listing} = trip;
    const {listingLocation, photos} = listing;

    const isHost = host.id === accountId;

    const hostFirstName = host.firstName;

    const location = getListingLocation(listingLocation);
    const vehicleDescription = getVehicleDescription(vehicle);
    const listingPrimaryPhoto = photos[0] && photos[0].photo;
    const hostName = !isHost ? `${hostFirstName ? `${hostFirstName}'s` : ''}` : 'Your ';

    const tripMessage = (
      <div>
        {moment(startDate).format(DATE_DISPLAY_TEXT_FORMAT)} - {moment(endDate).format(DATE_DISPLAY_TEXT_FORMAT)}
      </div>
    );
    return (
      <TripFeedItem key={trip.id}>
        <ListingPrimaryPhoto src={listingPrimaryPhoto}></ListingPrimaryPhoto>  
        <TripFeedMain>
          <TripFeedContent>
            <TripFeedVehicle>{hostName} {vehicleDescription}</TripFeedVehicle>
            <TripFeedMessage>{tripMessage}</TripFeedMessage>
            <TripFeedLocation>{location}</TripFeedLocation>
          </TripFeedContent>
        </TripFeedMain>
      </TripFeedItem>
    );
  }
  
  onPaginationChange = (page) => {
    const {actions} = this.props;
    this.setState({currentPage: page});
    actions.fetchTrips();
  }

  render() {
    const {trips, pagination: {totalCount, count}, isLoading} = this.props;
    const {currentPage, pageSize} = this.state;

    const tripsListDisplay = !!trips.size && [...trips.values()].map(trip => {
      return this.renderTrip(trip);
    });
    
    return (
      <SectionTrips>
        <div>
        <Messages>
          {!isLoading && (!tripsListDisplay || tripsListDisplay.length === 0) && (
            <NoContent>
              <Icon type="message" /><NoMessages>No Trips</NoMessages>
            </NoContent>
          )}
          {isLoading && (tripsListDisplay && tripsListDisplay.length > 0) && (
            <OverlayWrapper>
              <Overlay/>
              <StyledSpin/>
            </OverlayWrapper>
          )}
          {isLoading && (!tripsListDisplay ||  tripsListDisplay.length === 0)
            ? Array(pageSize).fill().map((_, i) => <StyledSkeleton active avatar size='small' active paragraph={{rows: 0}}></StyledSkeleton>)
            : tripsListDisplay}
        </Messages>
        </div>
        {(isLoading || (!isLoading && tripsListDisplay && tripsListDisplay.length > 0)) && (
          <ContentFooter>
            {isLoading
              ? <SPagination/>
              : <SPagination pageSize={pageSize} current={currentPage} onChange={(page) => this.onPaginationChange(page)} total={totalCount} />}
          </ContentFooter>)}
      </SectionTrips>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listing: state.listing,
    user: state.metaData.user,
    accountId: state.metaData.user.accountId,
    reservation: state.reservation,
    trips: state.dashboard.completedTrips.trips,
    pagination: state.dashboard.completedTrips.pagination,
    page: state.dashboard.completedTrips.page,
    limit: state.dashboard.completedTrips.limit,
    isLoading: state.dashboard.completedTrips.isLoading,
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...ListingActions,
      ...ReservationActions,
      ...LoginViewActions,
      ...TripFeedActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Trips));