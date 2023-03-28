import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MessageListActions from '../../actions/messageList';

import {withRouter} from 'react-router-dom';
import GenericMessageList from './GenericMessageList';
import { ProfileTypes } from '../../constants/Enums';

class Host extends React.Component {
  componentWillMount() {
    const {actions} = this.props;
    
    actions.getMessages(ProfileTypes.host);
  }

  render() {
    const {actions} = this.props;
    return <GenericMessageList
      isDriver={false}
      onPaginationChange={(pageSize, page) => actions.getMessages(ProfileTypes.host, pageSize, page)}
      {...{...this.props}}/>
  }
}
const mapStateToProps = (state) => {
  return {
    listing: state.listing,
    userId: state.metaData.user.id,
    user: state.metaData.user,
    isLoading: state.messagesList.host.isLoading,
    messages: state.messagesList.host.messages,
    pagination: state.messagesList.host.pagination,
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

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Host));