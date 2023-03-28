import React from 'react';

import {TripSecondaryHeader, TripPerson, ApproveButton, TripIcons, TripIcon} from './styled-components';

import {getVehicleDescription} from '../../../utils';
import {activeTripStatuses} from '../../../constants';

/**
 *  
 * @param { reservation: {*}, otherFirstName: String} props
 *  
 */
export default function tripSecondaryHeader(props) {
  const {fullWidth, actions, socketSessionId, reservation, otherFirstName, tripWorkFlow = {}, history, isDriver, section} = props;
  const {id: reservationId, listing: {hostId} = {}, vehicle, statusCodeId} = reservation;

  const submitNextTripAction = () => {
    const patches = [
      {'op': 'test', 'path': '/statusCodeId', 'value': statusCodeId},
      {'op': 'replace', 'path': '/statusCodeId', 'value': tripWorkFlow.next}
    ]
    actions.updateTripStatus(reservationId, patches, socketSessionId, tripWorkFlow.successText)
  }

  const navigateToTripMessages = () => {
    history.push(`/${isDriver ? 'driver' : 'host'}/messages/reservation/${reservationId}`);
  };

  const navigateToTripDashboard = () => {
    history.push(`/trips/${reservationId}`);
  };

  const navigateToProfile = () => {
    history.push(`/profiles/${hostId}`);
  };

  return (
    <TripSecondaryHeader fullWidth={fullWidth}>
      <TripPerson>{reservationId && `${isDriver ? `${otherFirstName}'s` : 'Your'} ${getVehicleDescription(vehicle)}`}</TripPerson>
      {tripWorkFlow.next && <ApproveButton
        type={tripWorkFlow.buttonType.desktop}
        onClick={() => submitNextTripAction()}
      >
        {tripWorkFlow.nextText}
      </ApproveButton>}
      <TripIcons>
        {activeTripStatuses.findIndex(x => x === reservation.statusCodeId) !== -1 && <TripIcon
          theme={section === 'dashboard' && 'filled'}
          type='dashboard'
          onClick={() => navigateToTripDashboard()}
        />}
        <TripIcon
          type='message'
          theme={section === 'message' && 'filled'}
          onClick={() => navigateToTripMessages()}
        />
        <TripIcon
          type='user'
          theme={section === 'user' && 'filled'}
          onClick={() => navigateToProfile()}
        />
      </TripIcons>
    </TripSecondaryHeader>
  );
}