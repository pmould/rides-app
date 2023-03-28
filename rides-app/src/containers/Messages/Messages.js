import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as MessagesActions from '../../actions/messages';
import * as ReservationActions from '../../actions/reservation';
import * as RealTimeActions from '../../actions/realtime';

import {Button, Input, Icon, Spin, Row, Col, Affix} from 'antd';
import {Button as MButton} from 'antd-mobile';
import {Content, styledMedia} from '../../components/styled-components';

import styled from 'styled-components';

import {withRouter} from 'react-router-dom';

import {DATE_DISPLAY_TEXT_FORMAT, TIME_DISPLAY_FORMAT} from '../../constants';
import {TripStatusCode, ProfileTypes} from '../../constants/Enums';

import * as realtime from '../../utils/realtime';

import {debounce} from 'lodash';
import moment from 'moment';
import TripSecondaryHeader from '../../components/Trip/TripSecondaryHeader';


export const ApproveMobileButton = styled(MButton)`
  flex: 1;
  display: flex;
  align-self: center;
  justify-content: center;
  margin: 0em 1em;
  max-width: 250px;
  ${styledMedia.greaterThan('tablet')`
    display: none !important;
  `}
`;

ApproveMobileButton.defaultProps = {
  type: 'primary'
}

export const MainContent = styled(Content)`
  padding: 0;
`;

export const Page = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  flex: 1;
`;

export const PageContent = styled.div`
  display: flex;
  flex: 1;
`;

export const SideBar = styled.div`
  width: 400px;
  border-right: 1px solid #eee;
  border-top: 1px solid #eee;
  display: flex;
  flex-flow: column;
  ${styledMedia.lessThan('tablet')`
    display: none;
  `}
`;

export const TripStatusHeader = styled.div`
  ${styledMedia.greaterThan('tablet')`
    display: none;
  `}
`;

export const SideBarContent = styled.div`
  overflow: scroll;
`;

export const SectionHeader = styled.div`
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  border-bottom: 1px solid #eee;

  ${styledMedia.lessThan('tablet')`
    height: initial;
    padding: 0.75em 0.5em;
  `}
`;

export const MainSectionHeader = styled(SectionHeader)`
  justify-content: center;
`;

export const PageTitle = styled.div`
  font-size: 32px;
  ${styledMedia.lessThan('desktop')`
    font-size: 24px;
  `}
`;

export const RecipientName = styled.div`
  padding-left: 4px;
`

export const ApproveTrip = styled(Affix)`
 > div {
  display: flex;
  justify-content:center;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  border-radisu: 5px;
 }

  ${styledMedia.lessThan('tablet')`
    display: none;
  `}
`;

export const ApproveTripButton = styled(Button)`
  margin: 8px;
`;
ApproveTripButton.defaultProps = {type: 'primary'};
export const SendButton = styled(Button)`
`;

export const TripDetails = styled.div`
  padding: 8px;
  display: flex;
  flex-flow: column;
  align-items: stretch;
`;

export const TripDetailsTitle = styled.div`
  /*font-weight: bold;*/
  font-size: 24px;
`;

export const TripDetailsSection = styled(Row)`
  padding: 8px;
`;

export const CaretDownSection = styled(TripDetailsSection)`
  padding: 0px;
`

export const TripDetailItem = styled(Col)`
  font-weight: bold;
  font-size: 16px;
`;

export const TimeCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const TripDate = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const TripTime = styled.div`
  font-size: 16px;
`;

export const CaretRightIcon = styled(Icon)`
  align-self: center;
  padding:  0.25em;
`;


CaretRightIcon.defaultProps = {
  type: 'caret-down'
}

export const Separator = styled.div`
  font-size: 14px;
  padding: 1em 4em;
`;

export const MessageWrapper = styled(Row)`
  margin: 8px;
  display: flex;
  align-items: center;
`;

export const SenderMessageWrapper = styled(MessageWrapper)`

`;

export const RecipientMessageWrapper = styled(MessageWrapper)`

`;

export const User = styled.div`
  display: flex;
  align-items: center;
`

export const UserImageHeader = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 0.5em;
  cursor: pointer;

  ${styledMedia.lessThan('tablet')`
    width: 40px;
    height: 40px;
  `}
`;

export const UserImage = styled.img`
  width: 45px;
  height: 45x;
  border-radius: 30px;
  cursor: pointer;

  ${styledMedia.lessThan('desktop')`
    width: 25px;
    height: 25x;
  `}
`;

export const UserMessage = styled.div`
  margin-top: 12px; 
  max-width: 60%;
  flex: 1;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid lightgray;
  word-break: break-word;
`;

export const RecipientMessage = styled(UserMessage)`
  margin-left: 25px;
  background: white;
`;

export const SenderMessage = styled(UserMessage)`
  margin-right: 25px;
  background: darkgray; // #0084ff;
  color: white;
`;

export const IsTypingIcon = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 5px;
  > div {
    background-color: #E6E7ED;
    padding: 5px 10px;
    border-radius: 20px;
    display: inline-block;

    div {
      height: 8px;
      width: 8px;
      border-radius: 100%;
      display: inline-block;
      background-color: #B4B5B9;
      animation: 1.2s typing-dot ease-in-out infinite;
    }

    div:nth-of-type(2),
    div:nth-of-type(3) {
      margin-left: 2px;
    }
    div:nth-of-type(2) {
      animation-delay: 0.15s;
    }

    div:nth-of-type(3) {
      animation-delay: 0.25s;
    }
  }

  @keyframes typing-dot {
    15% {
      transform: translateY(-35%);
      opacity: 0.5;
    }
    30% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
`;

export const MessagesRemainder = styled.div`
  flex: 1
`;

export const MessagesContent = styled.div`
  overflow: scroll;
  padding: 0 1.5em;


  ${styledMedia.lessThan('desktop')`
    padding: 0 0.5em;
  `}
`;


export const MessageContentSpinner = styled(Spin)`
  display: flex !important;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const Messenger = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  height: 100%;
`;

export const SendMessage = styled.div`
  /*position: fixed;
  bottom: 0;
  left: 0;*/
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
  background: #eee;
  padding: 4px;
  justify-content: center;
`;

export const MessageInput = styled.div`
  background: white;
  display: flex;
  align-items: center;
  padding: 4px;
  height: 38px;
  border-radius: 8px;
  margin: 4px;
  width: 500px;
  white-space: pre;

  ${styledMedia.lessThan('desktop')`
    width: initial;
    flex: 1;
  `}
`;

class Messages extends React.Component {
  constructor() {
    super();
    this.cancelIsTyping = debounce((newMessage) => {
      const {userId, room} = this.props;
      realtime.sendIsTyping(false, room, userId);
    }, 3000);
    this.messageInput = React.createRef();
    this.messagesContent = React.createRef();
  }

  componentDidMount = () => {
    const {match: {path, params: {reservationId}}, userId, accountId, actions, room, reservation} = this.props;

    actions.toggleMessageViewInit();
    actions.getReservation(reservationId);
  }


  componentWillUnmount = () => {
    const {actions} = this.props;
    realtime.clearPageCacheData();
    actions.clearReservationMessages();
    actions.toggleMessageViewInit();
  }

  componentDidUpdate(prevProps) {
    const {newMessage, messages, userId, accountId, actions, 
      reservation: {id: reservationId, listing: {hostId} = {} = {}, driverId},  notifications} = this.props;

    const {accountId: prevAccountId, newMessage: prevNewMessage, userId: prevUserId, room: prevRoom, reservation: {id: prevReservationId},
      notifications: prevNotifications} = prevProps;

    if(prevNewMessage !== newMessage) {
      const el = this.messageInput.current;

      el.focus();
      if (typeof window.getSelection != 'undefined'
              && typeof document.createRange != 'undefined') {
          var range = document.createRange();
          range.selectNodeContents(el);
          range.collapse(false);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (typeof document.body.createTextRange != 'undefined') {
          var textRange = document.body.createTextRange();
          textRange.moveToElementText(el);
          textRange.collapse(false);
          textRange.select();
      }
    }

    if ((reservationId && accountId !== prevAccountId) || (accountId && reservationId !== prevReservationId)) {
      const isDriver = accountId === driverId;
      const room = `trip-${reservationId}-host-account-${isDriver ? hostId : accountId}-driver-account-${isDriver ? accountId : driverId}`;
      realtime.joinRoom(room, userId, accountId, isDriver, actions, reservationId);
      actions.joinMessageRoom(room);
      // set room in reducer if needed here
    }

    if (prevProps.messages.size !== messages.size && this.messagesContent.current) {
      const el = this.messagesContent.current;
      el.scrollTop = el.scrollHeight;
    }
  }

  sendMessage = (message, userId, accountId, recipientAccountId, isDriver) => {
    const {room} = this.props;

    realtime.sendUpdate(room, message, userId, accountId, recipientAccountId, isDriver);
  };
  
  renderMessages = (senderPicture) => {
    const {messages, userId, user: {picture: userPicture}, reservation: {hostId}, history} = this.props;

    return Array.from(messages).map(([key, msg]) => {
      const {id, message, createdByUserId} = msg;
      return createdByUserId === userId
        ? (
          <SenderMessageWrapper key={id} type='flex' justify='end'>
            <div>
            </div>
            <SenderMessage>{message}</SenderMessage>
            <div>
              <UserImage src={userPicture} />
            </div>
          </SenderMessageWrapper>
        )
        : (
          <SenderMessageWrapper key={id} type='flex' justify='start'>
            <div>
              <div>
                <UserImage src={senderPicture} />
              </div>
            </div>
            <RecipientMessage>{message}</RecipientMessage>
          </SenderMessageWrapper>
        )
    });
  }

  handleKeyDown = (e, recipientAccountId, isDriver) => {
    const {newMessage} = this.props;
    if (e.key === 'Enter' && newMessage) {
      this.sendMessageHandler(recipientAccountId, isDriver);
      e.preventDefault();
    }
  }

  handleChangeNewMessage = (e) => {
    const {userId, actions, room} = this.props;

    this.cancelIsTyping.cancel();
    realtime.sendIsTyping(true, room, userId);

    this.cancelIsTyping();
  
    actions.editNewMessage(e.target.innerHTML);
  }
  sendMessageHandler = (recipientAccountId, isDriver) => {
    const {actions, newMessage, userId, accountId} = this.props;
    if (newMessage) {
      actions.editNewMessage('');
      this.cancelIsTyping.cancel();

      this.sendMessage(newMessage, userId, accountId, recipientAccountId, isDriver);
    }
  }

  renderIsTyping = (senderPicture) => {
    const icon = (
      <IsTypingIcon>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </IsTypingIcon>
    ); 
    return (
      <SenderMessageWrapper type='flex' justify='start'>
      <div>
        <div>
          <UserImage src={senderPicture} />
        </div>
      </div>
      {icon}
    </SenderMessageWrapper>
    )
  }

  approvePendingReservation = (reservation) => {
    const {actions, socketSessionId} = this.props;
    const patches = [
      { 'op': 'test', 'path': '/statusCodeId', 'value': reservation.statusCodeId },
      { 'op': 'replace', 'path': '/statusCodeId', 'value': TripStatusCode.APPROVED}
    ];
    actions.approvePendingReservation(reservation.id, patches, socketSessionId);
  }

  renderLoader = () => {
    return (
        <MessageContentSpinner indicator={<Icon type='loading' style={{fontSize: 36}} spin />} />
    );
  }

  render() {
    const {history, messages, match: {path}, actions, newMessage, reservation, user: {accountId},  userId, recpientIsTyping, socketSessionId, loading = true} = this.props;
    const {startDate, endDate, statusCode, driver = {}, listing: {host = {}} = {}, statusCodeId} = reservation;

    const isDriver = accountId === driver.id;
      const recipientProfile = !isDriver ? driver : host;

    const approvePending = !isDriver && statusCode === 'PENDING';

    const isLoading = !reservation.id || !userId;

    console.log(isDriver, statusCode, approvePending)
    return (
      <Page>
        {<TripSecondaryHeader fullWidth
          {...{section: 'message', ...this.props, otherFirstName: recipientProfile.firstName, isDriver}}/>}
        {isLoading && this.renderLoader()}
        {!isLoading && <PageContent>
          <SideBar>
            <MainSectionHeader>
              <PageTitle>Trip Messanger</PageTitle>
            </MainSectionHeader>
            <SideBarContent>
              {approvePending && <ApproveTrip>
                {/* Peter has request to book a trip with your vehicle */}
                <ApproveTripButton onClick={() => this.approvePendingReservation(reservation)}>
                  Approve Trip
                </ApproveTripButton>
              </ApproveTrip>}
              <TripDetails>
                <TripDetailsTitle>
                   {isDriver ? 'Your ': `${recipientProfile.firstName ? `${recipientProfile.firstName}'s ` : ''}`}Trip
                </TripDetailsTitle>
                <TripDetailsSection>
                  <TripDetailItem span={8}>Status</TripDetailItem>
                  <TimeCol>{statusCode}</TimeCol>
                </TripDetailsSection>
                <TripDetailsSection>
                   <TripDetailItem span={8}>Start</TripDetailItem>
                  <TimeCol>
                    <TripDate>{moment(startDate).format(DATE_DISPLAY_TEXT_FORMAT)}</TripDate>
                    <TripTime>{moment(startDate).format(TIME_DISPLAY_FORMAT)}</TripTime>
                  </TimeCol>
                </TripDetailsSection>
                <CaretDownSection>
                   <TripDetailItem span={8}></TripDetailItem>
                  <TimeCol>
                    <CaretRightIcon/>
                  </TimeCol>
                </CaretDownSection>
                <TripDetailsSection>
                  <TripDetailItem span={8}>End</TripDetailItem>
                  <TimeCol>
                    <TripDate>{moment(endDate).format(DATE_DISPLAY_TEXT_FORMAT)}</TripDate>
                    <TripTime>{moment(endDate).format(TIME_DISPLAY_FORMAT)}</TripTime>
                  </TimeCol>
                </TripDetailsSection>
              </TripDetails>
            </SideBarContent>
          </SideBar> 
          <Messenger>
           <SectionHeader>
              <User>
              <UserImageHeader onClick={() => history.push(`/profiles/${recipientProfile.id}`)} src={recipientProfile.picture} />
              <RecipientName>
                {recipientProfile.firstName}
              </RecipientName>
              </User>
              {approvePending && <ApproveMobileButton onClick={() => this.approvePendingReservation(reservation)}>
                Approve Trip
              </ApproveMobileButton>}
              <TripStatusHeader>{statusCode}</TripStatusHeader>
            </SectionHeader>
            <MessagesContainer>
              {userId && reservation.id && (
                <React.Fragment>
                  <MessagesRemainder/>
                  <MessagesContent ref={this.messagesContent}>
                    {this.renderMessages(recipientProfile.picture)}
                    {recpientIsTyping && this.renderIsTyping(recipientProfile.picture)}
                  </MessagesContent>
                </React.Fragment>
              )}
            </MessagesContainer>
            <SendMessage>
              <MessageInput
                ref={this.messageInput}
                contentEditable='true'
                onKeyDown={(e) => this.handleKeyDown(e, recipientProfile.accountId, isDriver)}
                onInput={this.handleChangeNewMessage}  
                placeholder='New Message'  
              >
                {newMessage}
              </MessageInput>
              <SendButton type='primary'
                onClick={() => this.sendMessageHandler(recipientProfile.accountId, isDriver)}>
                  Send
              </SendButton>
            </SendMessage>
          </Messenger>
        </PageContent>}
      </Page>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    listing: state.listing,
    userId: state.metaData.user.id,
    accountId: state.metaData.user.accountId,
    user: state.metaData.user,
    reservation: state.reservation,
    newMessage: state.messages.newMessage,
    messages: state.messages.messages,
    socketSessionId: state.notifications.socketSessionId,
    room: state.messages.room,
    recpientIsTyping: state.messages.recpientIsTyping,
    notifications: state.notifications.notifications
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...RealTimeActions,
      ...MessagesActions,
      ...ReservationActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Messages));