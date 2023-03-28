import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ListingActions from '../../actions/listings';
import * as ReservationActions from '../../actions/reservation';
import * as LoginViewActions from '../../actions/loginView';


import {withRouter} from 'react-router-dom';

import {MainContent, ThankYouText, ConfirmText, ConfirmIcon, GoToTripButtonMobile, GoToTripButton} from './styled-components';

export class TripConfirmation extends React.Component {
  componentWillMount() {
    const {actions, query: {listingId}} = this.props;
    // actions.fetchListing(listingId);
  }

  componentWillUnmount() {
    
  }

  goToReservation = () => {
    const {history, reservation: {id: reservationId}} = this.props;
    history.push(`/driver/messages/reservation/${reservationId}`);
  }

  render() {
    const {reservation: {id: reservationId}} = this.props;
    return (
      <MainContent>
        <ThankYouText>Thanks for requesting to book!</ThankYouText>
        <ConfirmIcon type="check" />
        <ConfirmText>Your Reservation approval request has been sent</ConfirmText>
        <GoToTripButtonMobile onClick={this.goToReservation}>Go To Trip Messages</GoToTripButtonMobile>
        <GoToTripButton onClick={this.goToReservation}>Go To Trip Messages</GoToTripButton>
        { /* <MessageLabel>Message your host</MessageLabel>
        <MessageTextArea placeholder='Touch base with your host about your trip'>
        </MessageTextArea>
        <SendMessage>Send</SendMessage> */}
      </MainContent>
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

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(TripConfirmation));