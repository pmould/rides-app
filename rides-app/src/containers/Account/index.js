import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ProfileActions from '../../actions/profile';
import * as NotificationActions from '../../actions/notifications';

import styled from 'styled-components';

import {Content, PrimaryButton, PageList, ListItem, DesktopView, Switch} from './styled-components';

import MobileTitleHeader from '../../components/MobileTitleHeader';

import {withRouter} from 'react-router-dom';

export const Section = styled.div`
  padding-top: 1em;
`;

class Account extends React.Component {
  updateWebPushNotification = (enabled) => {
    const {actions} = this.props;

    if(enabled) {
      actions.turnOnWebNotifications();
    }
    else {
      actions.turnOffWebNotifications();
    }
  }
  render() {
    const {pushNotifications} = this.props;

    const switchEl = <Switch loading={pushNotifications.loading} checked={pushNotifications.isActive} onChange={this.updateWebPushNotification}/>;
    const webNotificationsText = (
      <div>
        {pushNotifications.isActive ? 'Disabled' : 'Enable'} Desktop &amp; Mobile Push Notifications
      </div>
    );
    const {history} = this.props;

    return (
      <React.Fragment>
        <MobileTitleHeader title='Account'/>
        <Content defaultPadding>
          <DesktopView>
            <Section>
              <PrimaryButton onClick={() => history.push('/changePassword', 'fromAccount')}>Update Password</PrimaryButton>
            </Section>
            <Section>
              {webNotificationsText} {switchEl}
            </Section>
          </DesktopView>
          <PageList>
            <ListItem arrow='horizontal' onClick={() => history.push('/changePassword', 'fromAccount')}>Update Password</ListItem>
            <ListItem extra={switchEl}>
              {webNotificationsText}
            </ListItem>
          </PageList>
        </Content>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    user: state.metaData.user,
    userId: state.metaData.user.id,
    pushNotifications: state.notifications.pushNotifications
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...NotificationActions,
      ...ProfileActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Account));