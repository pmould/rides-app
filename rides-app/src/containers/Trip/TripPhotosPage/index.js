import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as CommonViewActions from '../../../actions/commonView';
import * as MetaDataActions from '../../../actions/metaData';
import * as ReservationActions from '../../../actions/reservation';
import * as TripActions from '../../../actions/trip';
import {withRouter} from 'react-router-dom';

import styled from 'styled-components';

import {Button as Dbutton, Icon} from 'antd';
import {Button, InputItem} from 'antd-mobile';

import TripPhotoModal from '../../../components/Trip/TripPhotoModal';
import MobileTitleHeader from '../../../components/MobileTitleHeader';
import moment from 'moment';
import {TIME_DISPLAY_FORMAT} from '../../../constants';
import {getDateFromText} from '../../../utils';

export const AddPhoto = styled.div`
  display: flex;
`;

export const AddPhotoBtn = styled(Button)`
`;

AddPhotoBtn.defaultProps = {
  icon: <Icon type='plus'/>
}

export const ActionButton = styled(Icon)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 1em;
`;

export const TripPhotoList = styled.div`
  border-bottom: 1px solid #333;
`;

export const  TripPhotoListHeader = styled.div`
  height: 30px;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  padding: .25em;
`;

export const TripPhotoListItems = styled.div`

`;

export const TripPhotoListItem = styled.div`
  display: flex;
  align-items: center;
  height: 175px;
  overflow: hidden;
  background: #333;
  position: relative;
  cursor: pointer;

  :hover img {
    width: 150%;
  }
`;


export const NoPhotos = styled.div`
  display: flex;
  justify-content: center;
  background: #333;
  color: white;
  padding: 0.25em;
`;

export const TripPhotoOverlay = styled.div` {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.25s linear;
  ${TripPhotoListItem}:hover & {
    opacity: 1;
    background: rgba(51, 51, 51, 0.4);
  }
}`;

export const  TripPhoto = styled.img`
  width: 100%;
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

class TripPhotosPage extends React.Component {
  constructor() {
    super();

   this.tripPhotoInput = React.createRef();
  }
  componentWillMount() {
    const {actions, match: {path, params: {reservationId}}, reservation, accountId} = this.props;

    actions.getTrip(reservationId);
  }

  renderTripPhotoListItem(photo) {
    const {actions} = this.props;

    return (
      <TripPhotoListItem key={photo.id} onClick={() => actions.displayTripPhotoModal(photo)}>
        <TripPhotoOverlay></TripPhotoOverlay>
        <TripPhoto src={photo.url}/>
        <TripPhotoLabel>
          <TripPhotoLabelDescription>{photo.description}</TripPhotoLabelDescription>
          <TripPhotoLabelLastUpdated>
          {`${getDateFromText(photo.updatedAt)} ${moment(photo.updatedAt).format(TIME_DISPLAY_FORMAT)}`}
          </TripPhotoLabelLastUpdated>
        </TripPhotoLabel>
      </TripPhotoListItem>
    );
  }

  renderTripPhotoList(isUser) {
    const {accountId, reservation: {driver, listing: {host}, tripPhotos = []}} = this.props;
    const loggInIser = accountId === driver.id ? driver : host;
    const otherUser = accountId !== driver.id ? driver : host;
    const user = isUser ? loggInIser : otherUser;
    const filteredTripPhotos = tripPhotos
      .filter(x => x.accountId === user.id)
      .sort((a, b) => a.id - b.id)
    return (
      <TripPhotoList>
        <TripPhotoListHeader>{isUser ? 'YOU' : `${otherUser.firstName}`}</TripPhotoListHeader>
        <TripPhotoListItems>
          {
            filteredTripPhotos.map(x => this.renderTripPhotoListItem(x))}
            {filteredTripPhotos.length === 0 && (
              <NoPhotos>{isUser ? 'You have' : `${otherUser.firstName} has`} no trip photos</NoPhotos>
            )}
        </TripPhotoListItems>
      </TripPhotoList>
    )
  }

  onSelectTripPhoto = (file, reservationId) => {
    const {actions} = this.props;
    var formData = new FormData();
    formData.append('file', file);
    actions.saveTripPhoto(reservationId, formData);
  }

  addTripPhoto = (e) => {
    e.stopPropagation();
    this.tripPhotoInput.current.click();
  } 
  
  render() {
    const {currentTripPhoto, reservation: {id: reservationId}, actions} = this.props;
  
    return (
      <div>
        {currentTripPhoto.id && <TripPhotoModal {...this.props}/>}
        <input onChange={(e) => this.onSelectTripPhoto(e.target.files[0], reservationId)} hidden ref={this.tripPhotoInput} type='file' accept='image/*' capture='camera' />
        <MobileTitleHeader
          only
          title='Trip Photos'
          rightSection={(
            <ActionButton
              onClick={(e) => this.addTripPhoto(e)}
              type='plus'/>
          )}/>
        {reservationId && this.renderTripPhotoList(true)}
        {reservationId && this.renderTripPhotoList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.metaData.user,
    accountId: state.metaData.user.accountId,
    reservation: state.trip.reservation,
    currentTripPhoto: state.trip.tripView.currentTripPhoto
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...ReservationActions,
      ...TripActions,
      ...MetaDataActions,
      ...CommonViewActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(TripPhotosPage));