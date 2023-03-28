import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MessageListActions from '../../actions/messageList';

import {withRouter} from 'react-router-dom';
import GenericMessageList from './GenericMessageList';
import { ProfileTypes } from '../../constants/Enums';

class Driver extends React.Component {
  componentWillMount() {
    const {actions} = this.props;
    
    actions.getMessages(ProfileTypes.driver);
  }

  render() {
    const {actions} = this.props;
    return <GenericMessageList
      isDriver
      onPaginationChange={(pageSize, page) => actions.getMessages(ProfileTypes.driver, pageSize, page)}
      {...{...this.props}}/>
  }
}
const mapStateToProps = (state) => {
  return {
    listing: state.listing,
    userId: state.metaData.user.id,
    user: state.metaData.user,
    isLoading: state.messagesList.driver.isLoading,
    messages: state.messagesList.driver.messages,
    pagination: state.messagesList.driver.pagination,
    messageNotifications: state.notifications.messageNotifications
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...MessageListActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Driver));