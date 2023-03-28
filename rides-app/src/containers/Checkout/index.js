import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ListingActions from '../../actions/listings';
import * as ReservationActions from '../../actions/reservation';
import * as LoginViewActions from '../../actions/loginView';
import * as NotificationsActions from '../../actions/notifications';

import {SUMMARY_DATE_FORMAT, SUMMARY_TIME_FORMAT} from '../../constants';

import moment from 'moment';

import {getTripTotal} from '../../utils';

import {withRouter} from 'react-router-dom';
import {CheckoutPage, MainContent, CheckoutCard, LeftSection, TripSummary,
  TripSummaryContent, TripDuration, SummaryDate, SummaryTime, SummaryDateTime, SummaryDateIcon, TripPrice, TripTotal,
  CheckoutAccordion, CheckoutPanel, StyledTextArea, BookItButton, BookItButtonMobile, Options, CheckBox} from './styled-components';
import MobileTitleHeader from '../../components/MobileTitleHeader';

export class Checkout extends React.Component {
  componentWillMount() {
    const {actions, query: {listingId}} = this.props;
    actions.fetchListing(listingId);
  }

  saveReservation = (initialMessage, listingId, startDate, endDate, dailyRate, total) => {
    const {user: {accountId: driverId}, listing: {hostId, vehicleId}, actions, socketSessionId} = this.props;

  const reservation = {initialMessage, listingId, driverId, hostId, startDate, endDate, dailyRate, total, vehicleId};
    actions.saveReservation(reservation, socketSessionId);
  }

  updateWebPushNotification = (event) => {
    const {actions} = this.props;

    if(event.target.checked) {
      actions.turnOnWebNotifications();
    }
    else {
      actions.turnOffWebNotifications();
    }
  }
  
  render() {
    const {query: {startDate, endDate}, listing: {id: listingId, dailyRate},
      pushNotifications, reservation: {initialMessage = '', sending, webPushNoitificationViewable}, actions} = this.props;

    const disableBookIt = !initialMessage;
    const total = getTripTotal(dailyRate, startDate, endDate);

    const showWebPushNotification = webPushNoitificationViewable || !pushNotifications.isActive;

    return (
      <CheckoutPage>
        <MainContent>
        <MobileTitleHeader title='Checkout'/>
        <CheckoutCard>
          <LeftSection>
            <CheckoutAccordion bordered={false} defaultActiveKey={['1']}>
              {/* <CheckoutPanel header="Insurance Type" key="1">
                {"Insurance Type"}
              </CheckoutPanel>
              <CheckoutPanel header="Payment Info" key="2">
                {"Payment Info"}
              </CheckoutPanel> */}
              <CheckoutPanel header='Message' key='1'>
              {<StyledTextArea
                defaultValue={initialMessage}
                onChange={(e) => actions.setInitialReservationMessage(e.target.value)}
                placeholder='Introduce yourself and share details about your trip.'
              />}
              </CheckoutPanel>
            </CheckoutAccordion>
          </LeftSection>
          <TripSummary title='Trip Summary'>
            <TripSummaryContent>
              <TripDuration>
                <SummaryDateTime>
                  <SummaryDate>{moment(startDate).format(SUMMARY_DATE_FORMAT)}</SummaryDate>
                  <SummaryTime>{moment(endDate).format(SUMMARY_TIME_FORMAT)}</SummaryTime>
                </SummaryDateTime>
                <SummaryDateIcon/>
                <SummaryDateTime>
                  <SummaryDate>{moment(startDate).format(SUMMARY_DATE_FORMAT)}</SummaryDate>
                  <SummaryTime>{moment(endDate).format(SUMMARY_TIME_FORMAT)}</SummaryTime>
                </SummaryDateTime>
              </TripDuration>
              <TripPrice>
                <div>Trip Price</div>
                <div>GH₵{dailyRate}/day</div>
              </TripPrice>
              {listingId && <TripTotal>
                <div>Trip Total</div>
                <div>GH₵{total}</div>
                </TripTotal>}
                {showWebPushNotification
                  && (
                  <Options>
                    <div>Turn on web push notifications</div>
                    <CheckBox defaultChecked
                      onChange={this.updateWebPushNotification}
                      checked={pushNotifications.isActive}/>
                  </Options>
                  )}
                <BookItButtonMobile disabled={disableBookIt}
                  onClick={() => this.saveReservation(initialMessage, listingId, startDate, endDate, dailyRate, total)}>
                  {sending ? 'Finalizing...': 'Send Request to Book'}
                </BookItButtonMobile>
                <BookItButton disabled={disableBookIt}
                  onClick={() => this.saveReservation(initialMessage, listingId, startDate, endDate, dailyRate, total)}>
                  {sending ? 'Finalizing...': 'Send Request to Book'}
                </BookItButton>
            </TripSummaryContent>
          </TripSummary>
        </CheckoutCard>
        </MainContent>
      </CheckoutPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listing: state.listing,
    user: state.metaData.user,
    reservation: state.reservation,
    socketSessionId: state.notifications.socketSessionId,
    pushNotifications: state.notifications.pushNotifications
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...ListingActions,
      ...ReservationActions,
      ...LoginViewActions,
      ...NotificationsActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Checkout));