import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ListingActions from '../../actions/listings';
import * as ReservationActions from '../../actions/reservation';
import * as LoginViewActions from '../../actions/loginView';
import * as TripFeedActions from '../../actions/tripFeed'; 

import {withRouter} from 'react-router-dom';

import {
  SectionDate, SectionTrips,
  ListingPrimaryPhoto, TripFeedMain, TripActions, StartTripButton,
  TripFeedItem, TripFeedStatus, TripFeedContent, TripFeedMessage, TripFeedVehicle, TripFeedLocation
} from './styled-components';

import {ContentFooter, SPagination} from '../../components/styled-components';

import {TripStatusCode} from '../../constants/Enums';
import {DATE_FORMAT, TIME_DISPLAY_FORMAT, DATE_DISPLAY_TEXT_FORMAT} from '../../constants';

import {getListingLocation, getVehicleDescription} from '../../utils';

import moment from 'moment';

import styled from 'styled-components';
import {Icon, Spin, Skeleton} from 'antd';
export const NoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
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

//export const 

export class Activity extends React.Component {
  state = {
    today: moment(),
    currentPage: 1,
    pageSize: 5
  }

  componentWillMount() {
    const {actions} = this.props;

    actions.fetchTripFeed();
  }

  getTripsByDate = (trips) => {
    const tripsMap = [...trips.values()].reduce((acc, trip) => {
      const {statusCodeId} = trip;

      const startDate = moment(trip.startDate);
      const endDate = moment(trip.endDate);
      const tipStarted = statusCodeId === TripStatusCode.INPROGRESS || statusCodeId === TripStatusCode.DRIVER_END_TRIP;
      const dateOrder = tipStarted ? endDate : startDate;

      const dateKey = moment(dateOrder).format(DATE_FORMAT);
      const tripList = acc.get(dateKey) || [];
      return acc.set(dateKey, [trip, ...tripList]);
    }, new Map());

    return new Map([...tripsMap].sort(([firstDate, firstTrips], [secondDate, secondTrips]) => {
      return moment(secondDate).diff(moment(firstDate));
    }));
  }

  authorizedStartTrip = (e, trip) => {
    e.stopPropagation();
    const {actions, socketSessionId} = this.props;
    const patches = [
      { 'op': 'test', 'path': '/statusCodeId', 'value': trip.statusCodeId },
      { 'op': 'replace', 'path': '/statusCodeId', 'value': TripStatusCode.AUTHORIZED}
    ]
    actions.authorizedStartTrip(trip.id, patches, socketSessionId)
  }

  driverEndTrip = (e, trip) => {
    e.stopPropagation();
    const {actions, socketSessionId} = this.props;
    const patches = [
      { 'op': 'test', 'path': '/statusCodeId', 'value': trip.statusCodeId },
      { 'op': 'replace', 'path': '/statusCodeId', 'value': TripStatusCode.DRIVER_END_TRIP}
    ];
    actions.driverEndTrip(trip.id, patches, socketSessionId);
  }

  startTrip = (e, trip) => {
    e.stopPropagation();
    const {actions, socketSessionId} = this.props;
    console.log('socketSessionId', socketSessionId);
    const patches = [
      { 'op': 'test', 'path': '/statusCodeId', 'value': trip.statusCodeId },
      { 'op': 'replace', 'path': '/statusCodeId', 'value': TripStatusCode.INPROGRESS}
    ];
    actions.startTrip(trip.id, patches, socketSessionId);
  }

  authorizedStartTrip = (e, trip) => {
    e.stopPropagation();
    const {actions, socketSessionId} = this.props;
    const patches = [
      { 'op': 'test', 'path': '/statusCodeId', 'value': trip.statusCodeId },
      { 'op': 'replace', 'path': '/statusCodeId', 'value': TripStatusCode.AUTHORIZED}
    ]
    actions.authorizedStartTrip(trip.id, patches, socketSessionId)
  }

  endTrip = (e, trip) => {
    e.stopPropagation();
    const {actions, socketSessionId} = this.props;
    const patches = [
      { 'op': 'test', 'path': '/statusCodeId', 'value': trip.statusCodeId },
      { 'op': 'replace', 'path': '/statusCodeId', 'value': TripStatusCode.COMPLETED}
    ];
    actions.endTrip(trip.id, patches, socketSessionId)
  }

  goToTripPage = (reservationId) => {
    const {history} = this.props;

    history.push(`/trips/${reservationId}`);
  }

  renderUpCompingTrips(trip) {
    const {accountId, actions} = this.props;
    const {today} = this.state;

    const {driver, startDate, endDate, statusCodeId, vehicle, listing, id: reservationId} = trip;
    const {listingLocation, photos} = listing;

    const isDriver = driver.id === accountId;

    const driverFirstName = driver.firstName;

    const location = getListingLocation(listingLocation);
    const vehicleDescription = getVehicleDescription(vehicle);
    const listingPrimaryPhoto = photos[0] && photos[0].photo;
    const driverName = isDriver ? 'Your ' : `${driverFirstName ? `${driverFirstName}'s` : ''}`;

    const isApproved = statusCodeId === TripStatusCode.APPROVED;
    const authorized = statusCodeId === TripStatusCode.AUTHORIZED;
    const inProgress = statusCodeId === TripStatusCode.INPROGRESS;
    const driverEndTrip = statusCodeId === TripStatusCode.DRIVER_END_TRIP;

    const isToday = moment(today).diff(moment(startDate), 'days') === 0;

    const displayAuthStartTrip = !isDriver && isToday && isApproved;
    const displayStartTrip = isDriver && authorized;
    const displayDriverEndTrip = isDriver && inProgress;
    const displayHostEndTrip = !isDriver && driverEndTrip;

    const tripStarted = inProgress || driverEndTrip;
    const tripMessage = tripStarted
      ? `${driverName} Trip ends at ${moment(endDate).format(TIME_DISPLAY_FORMAT)}`
      : `${driverName} Trip starts at ${moment(startDate).format(TIME_DISPLAY_FORMAT)}` 

    return (
      <TripFeedItem key={trip.id} onClick={() => this.goToTripPage(reservationId)}>
        <ListingPrimaryPhoto src={listingPrimaryPhoto}></ListingPrimaryPhoto>  
        <TripFeedMain>
          {isApproved && <TripFeedStatus>Pending Authorization</TripFeedStatus>}
          {authorized && <TripFeedStatus>Trip Authorized</TripFeedStatus>}
          {inProgress && <TripFeedStatus>In Progress</TripFeedStatus>}
          {driverEndTrip && <TripFeedStatus end>Trip Ended By Driver</TripFeedStatus>}
          <TripFeedContent>
            <TripFeedMessage>{tripMessage}</TripFeedMessage>
            <TripFeedVehicle>{vehicleDescription}</TripFeedVehicle>
            <TripFeedLocation>{location}</TripFeedLocation>
          </TripFeedContent>
        </TripFeedMain>
        <TripActions>
          {displayAuthStartTrip && <StartTripButton
            onClick={(e) => this.authorizedStartTrip(e, trip)}
          >Authorize Start Trip</StartTripButton>}
          {displayStartTrip && <StartTripButton
            onClick={(e) => this.startTrip(e, trip)}
          >Start Trip</StartTripButton>}
          {displayDriverEndTrip && <StartTripButton
            type='danger'
            onClick={(e) => this.driverEndTrip(e, trip)}
          >Complete Trip</StartTripButton>}
          {displayHostEndTrip && <StartTripButton
            type='danger'
            onClick={(e) => this.endTrip(e, trip)}
        >End Trip</StartTripButton>}
        </TripActions>
      </TripFeedItem>
    );
  }
  
  onPaginationChange = (page) => {
    const {actions} = this.props;

    this.setState({currentPage: page});
    actions.fetchTripFeed();
  }

  render() {
    const {trips, pagination: {totalCount, count}, isLoading} = this.props;
    const {currentPage, pageSize} = this.state;

    const tripsByDate = !!trips.size && this.getTripsByDate(trips);

    const tripSectionDisplay = tripsByDate && Array.from(tripsByDate.entries())
      .map(([date, trips]) => {
      const tripsListnDisplay = trips.map(trip => {
        switch (trip.statusCodeId) {
          case TripStatusCode.APPROVED: {
            return this.renderUpCompingTrips(trip);
          }
          default: return this.renderUpCompingTrips(trip);
        }
      });

      return (
        <div key={date}>
          <SectionDate>{moment(date).format(DATE_DISPLAY_TEXT_FORMAT)}</SectionDate>
          <SectionTrips>
            {tripsListnDisplay}
          </SectionTrips>
        </div>
      );
    });
    console.log('isLoading', isLoading, 'tripSectionDisplay', tripSectionDisplay)
    return (
      <div>
        <Messages>
          {!isLoading && (!tripSectionDisplay || tripSectionDisplay.length === 0) && (
            <NoContent>
              <Icon type="message" /><NoMessages>No Activity</NoMessages>
            </NoContent>
          )}
          {isLoading && (tripSectionDisplay && tripSectionDisplay.length > 0) && (
            <OverlayWrapper>
              <Overlay/>
              <StyledSpin/>
            </OverlayWrapper>
          )}
          {isLoading && (!tripSectionDisplay || tripSectionDisplay.length === 0)
            ? Array(pageSize).fill().map((_, i) => <StyledSkeleton active avatar size='small' active paragraph={{rows: 0}}></StyledSkeleton>)
            : tripSectionDisplay}
        </Messages>
        {(isLoading || (!isLoading && tripSectionDisplay && tripSectionDisplay.length > 0)) && (
          <ContentFooter>
            {isLoading
              ? <SPagination/>
              : <SPagination
                pageSize={pageSize}
                current={currentPage}
                onChange={(page) => this.onPaginationChange(page)}
                total={totalCount} />}
          </ContentFooter>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listing: state.listing,
    socketSessionId: state.notifications.socketSessionId,
    user: state.metaData.user,
    accountId: state.metaData.user.accountId,
    reservation: state.reservation,
    trips: state.dashboard.tripFeed.trips,
    pagination: state.dashboard.tripFeed.pagination,
    page: state.dashboard.tripFeed.page,
    limit: state.dashboard.tripFeed.limit,
    isLoading: state.dashboard.tripFeed.isLoading
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

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Activity));