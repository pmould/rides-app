import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withRouter} from 'react-router-dom';

import * as AccountActions from '../../actions/account';

import {UserAccountActivationWrapper, AccountAcivationText, PrimaryButton} from './styled-components';

import history from '../../history';

class UserAccountActivation extends React.Component {
  componentWillMount() {
    const {query: {authToken}, actions} = this.props;

    actions.activateNewUserAccount(authToken);
  }

  render() {
    const {userAccountActivationStatus} = this.props;

    let accountActivationView;
    if (userAccountActivationStatus === undefined) {
      accountActivationView = (
        <UserAccountActivationWrapper>
          <AccountAcivationText> Activating Account ...</AccountAcivationText>
        </UserAccountActivationWrapper>
      );
    }
    else if (userAccountActivationStatus) {
      accountActivationView = (
        <UserAccountActivationWrapper>
          <AccountAcivationText>Activated Account</AccountAcivationText>
          <PrimaryButton onClick={() => history.push('/login')}>Continue to Log In</PrimaryButton>
        </UserAccountActivationWrapper>
      );
    }
    else {
      accountActivationView = (
        <UserAccountActivationWrapper>
          <AccountAcivationText>Failed to Activate Account</AccountAcivationText>
          <AccountAcivationText>Contact Support for assistance</AccountAcivationText>
        </UserAccountActivationWrapper>
      );
    }

    return accountActivationView;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    userId: state.metaData.user.id,
    userAccountActivationStatus: state.newAccountView.userAccountActivationStatus
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...AccountActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(UserAccountActivation));