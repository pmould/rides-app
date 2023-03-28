import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ListingActions from '../../actions/listings';
import * as ReservationActions from '../../actions/reservation';
import * as LoginViewActions from '../../actions/loginView';


import {coverPhotoPlaceHolderLarge} from '../../constants';

import {isAuthenticated} from '../../utils/api';
import {getListingLocation, getVehicleDescription} from '../../utils';

import {withRouter} from 'react-router-dom';

import {ListingPage, ListingItem, ListingCoverPhoto, ListingCoverPhotoWrapper,
  ListingCoverPhotoResponsiveWrapper, MainContent, Schedule, ListingInfo, Info, InfoLabel,
  InfoText,VehicleInfoYear, PerDay, PriceLabel, DailyRate, DailyRateNumber, Currency, DateTimeRow,
  DateTimePicker, AntDatePicker, AntTimePicker, CheckoutButton, SideBar, Skeleton, Host, HostImage, HostNamePic, HostRating,
  CheckoutMobileButton, SideBarSkeleton} from './styled-components';

// TODO: Figure out why Skeleton cannot be added from ./styled-components as export {Skeleton};
//import {Skeleton} from 'antd';
import moment from 'moment';

class Listing extends React.Component {
  componentDidMount() {
    const {actions, match} = this.props;
    const {params = {}} = match;
    const {listingId = ''} = params;
    actions.fetchListing(listingId);
    actions.setInitialTripDates();

    document.querySelector('body').scrollTop = 0;
    document.querySelector('html').scrollTop = 0;
  }

  componentWillUnmount() {
    const {actions} = this.props;
    actions.clearListing();
  }

  checkoutHandler = () => {
    const {actions, history, reservation: {startDate, endDate}, listing: {id: listingId}} = this.props;
  
    if(isAuthenticated()) {
      history.push(`/checkout?startDate=${startDate}&endDate=${endDate}&listingId=${listingId}`);
    }
    else {
      window.matchMedia('(max-width: 750px)').matches
        ? history.push('/login', `${history.location}${history.location.search}`)
        : actions.toggleLoginModal()
    }
  }

  render() {
    const {listing = {}, reservation, actions, history} = this.props;

    const {id: listingId, dailyRate, vehicle = {}, photos = {}, host = {}, listingLocation = {},
      description} = listing;
    const {id: hostId, picture, firstName} = host || {};
 
    const photo = photos.values().next().value;
    const coverPhotoUrl = photo && photo.photo || coverPhotoPlaceHolderLarge;

    const {startDate, endDate} = reservation;
    
    const location = getListingLocation(listingLocation);
    const ListingInfoRendered = (
      <ListingInfo>
        <Info>
          <InfoLabel>{`${firstName}'s Car`}</InfoLabel>
          <VehicleInfoYear>
              {getVehicleDescription(vehicle)}
          </VehicleInfoYear>
        </Info>
        <Info>
          <InfoLabel>Location</InfoLabel>
          <InfoText>
              {location}
          </InfoText>
        </Info>
        <Info>
          <InfoLabel>Description</InfoLabel>
          <InfoText>
              {description}
          </InfoText>
        </Info>
      </ListingInfo>  
    );

    const ScheduleRendered = (
      <Schedule>
        <DateTimeRow>
          <div>Trip Start Date</div>
          <DateTimePicker>
            <AntDatePicker
              value={startDate && moment(startDate)}
              onChange={date => actions.setReservationStartDate(moment(date))}
            />
            <AntTimePicker
              minuteStep={30}
              format={'HH:mm A'}
              value={startDate && moment(startDate)}
              onChange={time => actions.setReservationStartTime(moment(time))}
            />
          </DateTimePicker>
        </DateTimeRow>
        <DateTimeRow>
          <div>Trip End Date</div>
          <DateTimePicker>
            <AntDatePicker
              value={endDate && moment(endDate)}
              onChange={date => actions.setReservationEndDate(moment(date))}
            />
            <AntTimePicker
              minuteStep={30}
              format={'HH:mm A'}
              value={endDate && moment(endDate)}
              onChange={time => actions.setReservationEndTime(moment(time))}
            />
          </DateTimePicker>
        </DateTimeRow>
        <CheckoutMobileButton
          disabled={!listingId}
          onClick={() => {this.checkoutHandler()}}
        >Request to Book</CheckoutMobileButton>
        <CheckoutButton
          disabled={!listingId}
          onClick={() => {this.checkoutHandler()}}
        >Request to Book
      </CheckoutButton>
      </Schedule>
    );

    return (
      <ListingPage className='ghListingPage'>
        <ListingItem>
        {listingId
          ? (
            <ListingCoverPhotoWrapper>
              <ListingCoverPhotoResponsiveWrapper>
                <ListingCoverPhoto src={coverPhotoUrl} />
              </ListingCoverPhotoResponsiveWrapper>
            </ListingCoverPhotoWrapper>  
          )
          : (
            <ListingCoverPhotoWrapper style={{background: 'white'}}>    
              <ListingCoverPhotoResponsiveWrapper style={{width: '55%', margin: '0 auto'}}>
                <ListingCoverPhoto src={'/CarSilhouette.png'} />}
              </ListingCoverPhotoResponsiveWrapper>
            </ListingCoverPhotoWrapper>        
          )}
          <MainContent>
            {listingId ? ListingInfoRendered : <ListingInfo><Skeleton active/></ListingInfo>}
            {listingId
              ? (
                <SideBar>
                  <PriceLabel>
                    <DailyRate>
                      <Currency>GH₵</Currency>
                      <DailyRateNumber>{dailyRate}</DailyRateNumber>
                      <PerDay>per Day</PerDay>
                    </DailyRate>
                  </PriceLabel>
                  {ScheduleRendered}
                  <Host>
                    <HostNamePic>
                      <HostImage onClick={() => history.push(`/profiles/${hostId}`)} src={picture} />
                      {firstName}
                    </HostNamePic>
                    <HostRating disabled defaultValue={3} />
                  </Host>
                </SideBar>
              )
              : (
                <SideBarSkeleton>
                  <Skeleton active />
                  <Skeleton active />
                </SideBarSkeleton>
              )}
          </MainContent>
        </ListingItem>
      </ListingPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listing: state.listing,
    user: state.metaData.user,
    reservation: state.reservation
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...ListingActions,
      ...ReservationActions,
      ...LoginViewActions,
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Listing));
