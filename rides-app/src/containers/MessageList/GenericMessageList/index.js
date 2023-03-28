import React from 'react';

import {ContentFooter, SPagination, Messages, MessageRow, 
  Overlay, NoContent, NoMessages, StyledSkeleton, StyledSpin, Icon, OverlayWrapper,
  UserImage, UserImageItem, UserMessageDetails, DateItem, DescriptionItem, StatusItem, Total} from './styled-components';

import moment from 'moment';
import { getDateFromText } from '../../../utils';

/**
 * @prop messages - message list for profile type at current pagination
 */
class GenericMessageList extends React.Component {
  state = {
    today: moment(),
    currentPage: 1,
    pageSize: 5
  }

  componentWillReceiveProps(nextProps) {
    const {messageNotifications} = nextProps;
    const {messageNotifications: prevMessageNotifications} = this.props;
    if (messageNotifications !== prevMessageNotifications) {
    }
  }

  renderMessages = () => {
    const {messages, isDriver} = this.props;

    const navigateToMessage = (reservation, host, driver, isDriver) => {
      const {actions} = this.props;
      const room = `trip-${reservation.id}-host-account-${host.id}-driver-account-${driver.id}`;
      actions.goToReservationMessage(reservation, room, isDriver);
    };

    return !!messages.size && [...messages.values()].map(hostMsg => {
      const {latestMessage: {message: latestMessage, id}, reservation} = hostMsg;

      const {vehicle, total, statusCode, driver, listing: {host}} = reservation;
      
      const recipientProfile = isDriver ? host : driver;
 
      const {modelYear, make = {}, model = {}} = vehicle || {};
      
      return (
        <MessageRow notified={hostMsg.read} onClick={() =>
            window.matchMedia('(max-width: 970px)').matches && navigateToMessage(reservation, host, driver, isDriver)}>
          <UserImageItem>
            <UserImage
              onClick={() => navigateToMessage(reservation, host, driver, isDriver)}
              src={recipientProfile.picture || 'defaultProfilePicture.jpg'} />
          </UserImageItem>
          <UserMessageDetails>
            <DateItem>
              <div>{recipientProfile.firstName}</div>
              <div>{getDateFromText(id)}</div>
            </DateItem>
            <DescriptionItem>
              <div onClick={() => navigateToMessage(reservation, host, driver, isDriver)}>
                <div>
                  {latestMessage}
                </div>
                <div>
                  {`${modelYear} ${make.make} ${model.model}`}
                </div>
              </div>
            </DescriptionItem>
            <StatusItem>
              <div>
                {statusCode}
              </div>
              <Total>
                GH₵{total}
              </Total>
            </StatusItem>
          </UserMessageDetails>
        </MessageRow>
      );
    });
  }

  handlePaginationChange = (page) => {
    const {onPaginationChange} = this.props;
    const {pageSize} = this.state;
    this.setState({currentPage: page});
    onPaginationChange(pageSize, page);
  }
  
  render() {
    const {pagination: {totalCount}, messages, isLoading} = this.props;
    const {currentPage, pageSize} = this.state;

    return (
      <div>
        <Messages>
          {!isLoading && messages.size === 0 && (
            <NoContent>
              <Icon type='message' /><NoMessages>No Messages</NoMessages>
            </NoContent>
          )}
          {isLoading && messages.size > 0 && (
            <OverlayWrapper>
              <Overlay/>
              <StyledSpin/>
            </OverlayWrapper>
          )}
          {isLoading && messages.size === 0
            ? Array(pageSize).fill().map((_, i) => <StyledSkeleton active avatar size='small' active paragraph={{rows: 0}}></StyledSkeleton>)
            : this.renderMessages()}
        </Messages>
        {(isLoading || (!isLoading && messages.size > 0)) && (
          <ContentFooter>
              {isLoading 
              ? <SPagination/>
              : <SPagination
                pageSize={pageSize}
                current={currentPage}
                onChange={(page) => this.handlePaginationChange(page)}
                total={totalCount} />}
          </ContentFooter>
        )}
      </div>
    );
  }
}

export default GenericMessageList;