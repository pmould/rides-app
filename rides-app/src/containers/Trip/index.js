import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ListingActions from '../../actions/listings';
import * as ReservationActions from '../../actions/reservation';
import * as TripActions from '../../actions/trip';
import {withRouter} from 'react-router-dom';

import {MainContent, TripPhotosList, TripPhoto,
  TripPhotoResponsiveWrapper, TripPhotoWrapper, TripPhotoItem, AccountTripPhotoSection, AccountTripPhotoHeader,
  ShareLocationButtonWrapper, ShareLocationButton, TripCollapse, ResponsiveMapWrapper, LastUpdatedAt, NoMap,
  PageList, ListItem, LocationIcon} from './styled-components';

import {styledMedia} from '../../components/styled-components';

import {TIME_DISPLAY_FORMAT, TIME_DISPLAY_FULL_FORMAT, DATE_DISPLAY_TEXT_FORMAT} from '../../constants';

import {getListingLocation, getDateFromText} from '../../utils';

import moment from 'moment';

import ShareLocationMap from '../../components/Trip/ShareLocationMap';
import MobileTitleHeader from '../../components/MobileTitleHeader';
import LoadableContent from '../../components/LoadableContent';

import * as realtime from '../../utils/realtime';

import styled from 'styled-components';
import {Icon, Spin, Skeleton, Col, Row, Collapse, Button as dButton} from 'antd';
import {Button} from 'antd-mobile';
import {TripWorkFlow} from '../../constants/Enums';
import TripPhotoModal from '../../components/Trip/TripPhotoModal';
import TripSecondaryHeader from '../../components/Trip/TripSecondaryHeader';


export const ApproveButtonMobile = styled(Button)`
`;

ApproveButtonMobile.defaultProps = {
  type: 'primary' 
}

export const TripDetails = styled.div`
  font-weight: bold;
  font-size: 24px;

  ${styledMedia.lessThan('desktop')`
    display: none;
  `}
`;

export const TripDetailItem = styled(Col)`
  font-weight: bold;
`;

export const TripTimeHeader = styled.div`
  display: flex;
  flex-flow: column;
  padding: 1em;
`;

export const TripDate = styled.div`
  font-size: 24px;
  font-weight: bold;
  ${styledMedia.lessThan('desktop')`
    font-size: 16px;
  `}
`;

export const TripTime = styled.div`
  font-size: 20px;
  ${styledMedia.lessThan('desktop')`
    font-size: 14px;
  `}
`;

export const CaretRightIcon = styled(Icon)`
  display: flex;
  align-items: center;
  padding: 2em;
  ${styledMedia.lessThan('desktop')`
    padding: 1em;
  `}
`;
CaretRightIcon.defaultProps = {
  type: 'caret-right'
}

export const TripTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  
`;

export const TripPhotoLabel = styled.div`
  position: absolute;
  height: 50px;
  bottom: 0;
  width: 100%;
  background: rgb(51, 51, 51, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
`;

export const TripPhotoLabelDescription = styled.div`

`;

export const TripPhotoLabelLastUpdated = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

class Trip extends React.Component {
  constructor() {
    super();

    this.tripPhotoInput = React.createRef();
  }
  state = {
    sharingLocation: false
  }

  componentWillMount() {
    const {actions, match: {path, params: {reservationId}}, reservation, accountId} = this.props;
    console.log('reseravionId Trip: ', reservationId);
    actions.getTrip(reservationId);
    realtime.joinTripMeetupLocation(reservationId);
  }

  componentWillUnmount() {
    this.stopSharingLocation();
  }

  componentWillUnmount() {
    realtime.clearPageCacheData();
  }

  // componentDidUpdate(prevProps) {
  //   const {reservation = {}, accountId} = this.props;
  //   const {reservation: prevReservation = {}} = prevProps;
  //   const {driver: {id: driverId}} = reservation;
  //   const {driver: {id: prevDriverId}} = prevReservation;

  //   const shareLocation = true;
  //   if(driverId && shareLocation && (driverId !== prevDriverId)) {
  //     // Set up realtime location updates


  //   }
  // }

  renderTripTimeHeader = (isDriver, startDate, endDate, statusCode, driverFirstName) => {
    return (
      <TripTimeHeader>
        {/* <TripDetails>Trip Details - {statusCode}</TripDetails> */}
        <Row>
          {/* <TripDetailItem sm={24} lg={4}>{isDriver ? 'Your ': `${driverFirstName ? `${driverFirstName}'s ` : ''}`}Trip</TripDetailItem> */}
          <Col sm={24} lg={24}>
            <Row type='flex' align='middle' justify='center'>
              <Col>
                <TripDate>{moment(startDate).format(DATE_DISPLAY_TEXT_FORMAT)}</TripDate>
                <TripTime>{moment(startDate).format(TIME_DISPLAY_FORMAT)}</TripTime>
              </Col>
              <CaretRightIcon />
              <Col>
                <TripDate>{moment(endDate).format(DATE_DISPLAY_TEXT_FORMAT)}</TripDate>
                <TripTime>{moment(endDate).format(TIME_DISPLAY_FORMAT)}</TripTime>
              </Col>
            </Row>
          </Col>
        </Row>
      </TripTimeHeader>
    );
  }

  addTripPhoto = (e) => {
    e.stopPropagation();
    this.tripPhotoInput.current.click();
  } 

  onSelectTripPhoto = (file, reservationId) => {
    const {actions} = this.props;
    var formData = new FormData();
    formData.append('file', file);
    actions.saveTripPhoto(reservationId, formData);
  }

  // renderAccountTripPhotos = (accountId) => {
  //   const {reservation: {tripPhotos = []}}= this.props;
  //   return tripPhotos
  //     .filter(x => x.accountId === accountId)
  //     .map(x => (
  //     <TripPhotoItem key={x.id}>
  //       <TripPhotoWrapper>
  //         <TripPhotoResponsiveWrapper>
  //           <TripPhoto src={x.url}/>
  //         </TripPhotoResponsiveWrapper>
  //       </TripPhotoWrapper>
  //     </TripPhotoItem>
  //   ));
  // }

  renderTripPhotos = (isUser) => {
    const {actions, accountId, reservation: {driver, listing: {host}, tripPhotos = []}}= this.props;
    const loggInIser = accountId === driver.id ? driver : host;
    const otherUser = accountId !== driver.id ? driver : host;
    const user = isUser ? loggInIser : otherUser;
    return tripPhotos
      .filter(x => x.accountId === user.id)
      .map(photo => (
      <TripPhotoItem key={photo.id}  onClick={() => actions.displayTripPhotoModal(photo)}>
        <TripPhotoWrapper>
          <TripPhotoResponsiveWrapper>
            <TripPhoto src={photo.url}/>
          </TripPhotoResponsiveWrapper>
        <TripPhotoLabel>
          <TripPhotoLabelDescription>{photo.description}</TripPhotoLabelDescription>
          <TripPhotoLabelLastUpdated>
          {`${getDateFromText(photo.updatedAt)} ${moment(photo.updatedAt).format(TIME_DISPLAY_FORMAT)}`}
          </TripPhotoLabelLastUpdated>
        </TripPhotoLabel>
        </TripPhotoWrapper>
      </TripPhotoItem>
    ));
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
  
  submitNextTripAction = (tripWorkFlow, trip) => {
    const {actions, socketSessionId} = this.props;
    const patches = [
      {'op': 'test', 'path': '/statusCodeId', 'value': trip.statusCodeId},
      {'op': 'replace', 'path': '/statusCodeId', 'value': tripWorkFlow.next}
    ]
    actions.updateTripStatus(trip.id, patches, socketSessionId, tripWorkFlow.successText)
  }

  render() {
    const {reservation, accountId, sharedMeetUpLocation, match: {path},
      actions, currentTripPhoto, newMessage, userId, recpientIsTyping, socketSessionId, history} = this.props;
    const {id: reservationId, startDate, endDate, statusCodeId, statusCode,
      driver: {id: driverId, firstName: driverFirstName, picture: driverPicture} = {},
      listing: {
        host: {id: hostId, picture: hostPicture, firstName: hostFirstName} = {},
        listingLocation = {}} = {},
      tripPhotos, total, vehicle} = reservation;

    const {tripPhotoPanelDisabled, sharingLocation} = this.state;

    const isDriver = accountId === driverId;

    const otherFirstName = isDriver ? driverFirstName : hostFirstName;
    const tripPhotoExtra = (
      <Icon
        onClick={(e) => this.addTripPhoto(e)}
        type='plus'>
      </Icon>
    );

    const tripWorkFlow = (isDriver && TripWorkFlow.driver[statusCodeId])
      || (!isDriver && TripWorkFlow.host[statusCodeId]) || {};

    return (
      <MainContent>
        {currentTripPhoto.id && <TripPhotoModal {...this.props}/>}
        <MobileTitleHeader
          title='Trip'
          secondaryTitle={`${statusCode ? `(${statusCode})` : ''}`}/>
        <TripSecondaryHeader {...{...this.props, tripWorkFlow, otherFirstName, isDriver, section: 'dashboard'}}/>
        <LoadableContent loading={!reservationId}>
          <React.Fragment>
            <input onChange={(e) => this.onSelectTripPhoto(e.target.files[0], reservationId)} hidden ref={this.tripPhotoInput} type='file' accept='image/*' capture='camera' />
            {reservationId && this.renderTripTimeHeader(isDriver, startDate, endDate, statusCode, driverFirstName)}
            {!isDriver && (
              <ShareLocationButtonWrapper>
                <ShareLocationButton icon='environment'
                  onClick={this.shareLocation}>
                    {!sharingLocation ? 'Share Location' : 'Turn off Location Sharing'}
                </ShareLocationButton>
                {!sharingLocation && (
                  <LastUpdatedAt>{`Last Shared at
                    ${moment(sharedMeetUpLocation.updatedAt)
                      .format(`${DATE_DISPLAY_TEXT_FORMAT} ${TIME_DISPLAY_FULL_FORMAT}`)}`}
                  </LastUpdatedAt>
                )}
              </ShareLocationButtonWrapper>
            )}
            <PageList>
              <ListItem>
                {tripWorkFlow.next && <ApproveButtonMobile
                  type={tripWorkFlow.buttonType.mobile}
                  onClick={() => this.submitNextTripAction(tripWorkFlow, reservation)}
                >
                  {tripWorkFlow.nextText}
                </ApproveButtonMobile>}
              </ListItem>
              <ListItem>
                <LocationIcon/>&nbsp;{getListingLocation(listingLocation)}
              </ListItem>
              <ListItem extra={`GH₵${total}`}>
                Trip Cost
              </ListItem>
              <ListItem
                arrow='horizontal'
                onClick={() => history.push(`/trip/${reservationId}/photos`)}>
                Trip Photos
              </ListItem>
              {isDriver && <ListItem
                arrow='horizontal'
                onClick={() => history.push(`/trip/${reservationId}/sharedLocation`)}>
                Shared Location
              </ListItem>}
              {/* <ListItem
                arrow='horizontal'
                onClick={() => {}}>
                Vehicle
              </ListItem> */}
            </PageList>
            <TripCollapse
              bordered={false}
              // defaultActiveKey={['1']}
              onChange={() => {}}>
              <Collapse.Panel
                header='Trip Photos'
                key='1'
                extra={tripPhotoExtra}>
                <AccountTripPhotoSection>
                  <AccountTripPhotoHeader>Your Photos {`(${isDriver ? 'Driver' : 'Host'})`}</AccountTripPhotoHeader>
                  <TripPhotosList>
                      {reservationId && this.renderTripPhotos(true)}
                  </TripPhotosList>
                </AccountTripPhotoSection>
                <AccountTripPhotoSection>
                  <AccountTripPhotoHeader>{`${otherFirstName}'s `} Photos {`(${!isDriver ? 'Driver' : 'Host'})`}</AccountTripPhotoHeader>
                  <TripPhotosList>
                      {reservationId && this.renderTripPhotos()}
                  </TripPhotosList>
                </AccountTripPhotoSection>
              </Collapse.Panel>
              {
                isDriver && (
                <Collapse.Panel header='Shared Location' key='3'
                  extra={<React.Fragment>
                    {!sharingLocation && <LastUpdatedAt>{`Last Shared at
                    ${moment(sharedMeetUpLocation.updatedAt)
                      .format(`${DATE_DISPLAY_TEXT_FORMAT} ${TIME_DISPLAY_FULL_FORMAT}`)}`}
                  </LastUpdatedAt>}
                  </React.Fragment>}>
                  <ResponsiveMapWrapper>
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
                  </ResponsiveMapWrapper>       
                </Collapse.Panel>
                )
              }
            </TripCollapse>
          </React.Fragment>
        </LoadableContent>

      </MainContent>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.metaData.user,
    accountId: state.metaData.user.accountId,
    reservation: state.trip.reservation,
    sharedMeetUpLocation: state.trip.sharedMeetUpLocation,
    currentTripPhoto: state.trip.tripView.currentTripPhoto,
    socketSessionId: state.notifications.socketSessionId
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...ListingActions,
      ...ReservationActions,
      ...TripActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Trip));
