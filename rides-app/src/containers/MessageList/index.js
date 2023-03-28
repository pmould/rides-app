import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as MessageListActions from '../../actions/messageList';

import styled from 'styled-components';

import {withRouter} from 'react-router-dom';

import { Tabs, Badge } from 'antd';

import {Content, PageTitle} from '../../components/styled-components';

import HostMessages from './Host';
import DriverMessages from './Driver';
import { ProfileTypes } from '../../constants/Enums';

const TabPane = Tabs.TabPane;
export const MainContent = styled(Content)`

`;

export const TabBadge = styled(Badge) `
  margin-left: 3px !important;
`;

export const MessageTabs = styled(Tabs)`
  .ant-tabs-bar {
    margin-bottom: 0.25em;
  }
`;

export const MessageWrapper = styled(TabPane)`
  display: flex;
  flex-direction: column;
`;

export const MessageRow = styled.div`
  display: flex;
  max-height: 300px;
  border-bottom: 1px solid lightgrey;
  background: ${props => props.notified ? 'white' : 'lightGray'}
`;

export const MessageRowItem = styled.div`
  margin-left: 1em;
  padding: 1em;
`;

export const UserImageItem = styled(MessageRowItem)`
  flex: 0.5;

  img {
    cursor: pointer;
  }
`;

export const DateItem = styled(MessageRowItem)`
  flex: 1;
`;

export const DescriptionItem = styled(MessageRowItem)`
  flex: 4;

  > div {
    cursor: pointer;
  }
`;

export const StatusItem = styled(MessageRowItem)`
  flex: 1;
`;

export const MoreItem = styled(MessageRowItem)`
  flex: 1;
`;

export const UserImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 75px;
`;

class MessageList extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {messageNotifications} = nextProps;
    const {messageNotifications: prevMessageNotifications} = this.props;
    if (messageNotifications !== prevMessageNotifications) {
     // actions.getAllMessages();
    }
  }

  changeTab = (key) => {
    const {actions} = this.props;
    console.log(key);
    actions.setMessageListTab(key);
    actions.getMessages(key);
  }
  render() {
    const {messageNotifications: {unReadMessageHostGroupsCount, unReadMessageDriverGroupsCount}} = this.props;


    const hostCount = (
      <div>
        Host  
        <TabBadge count={unReadMessageHostGroupsCount} style={{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}} />
      </div>
    ); 
    const travellerCount = (
      <div>
        Traveller  
        <TabBadge count={unReadMessageDriverGroupsCount} style={{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}} />
      </div>
    );
    
    return (
      <MainContent defaultActiveKey="1">
        <PageTitle>Messages</PageTitle>
        <MessageTabs onChange={this.changeTab}>
          <MessageWrapper tab={hostCount} key={ProfileTypes.host}>
            <HostMessages/>
          </MessageWrapper>
          <MessageWrapper tab={travellerCount} key={ProfileTypes.driver}>
            <DriverMessages/>
          </MessageWrapper>
        </MessageTabs>
      </MainContent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listing: state.listing,
    userId: state.metaData.user.id,
    user: state.metaData.user,
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

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(MessageList));