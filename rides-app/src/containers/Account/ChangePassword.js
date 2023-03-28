import React from 'react';

import {ResetPasswordContent, StyledButtonMb, ResetPasswordInput, ResetPasswordExpiredText, Content, PageTitle, Error} from './styled-components';
import {isAuthenticated, accountId} from '../../utils/api';
import {withRouter} from 'react-router-dom';

import MobileTitleHeader from '../../components/MobileTitleHeader';

class ChangePassword extends React.Component {
  state = {
    password: '',
    reEnteredPassword: '',
    formSubmitted: false
  }

  componentWillMount() {
    const {actions, history, query: {authToken = ''}} = this.props;
    actions.verfiyResetAccountPassword(authToken);
    if (!isAuthenticated() && !authToken) {
      history.push('/login');
    }
  }

  componentWillUnmount() {
    const {actions} = this.props;
    actions.clearLoginView();
  }

  resetPassword = (password) => {
    const {actions, query: {authToken = ''}} = this.props;

    const formValid = this.validateForm({formSubmitted: true});
    formValid && actions.resetAccountPassword(password, authToken);
  }

  validateForm = ({
    passwordUpdated,
    reEnteredPasswordUpdated,
    formSubmitted
  }) => {
    const {actions} = this.props;
    const {password, reEnteredPassword,
      passwordIsDirty, reEnteredPasswordIsDirty} = this.state;

    const errors = [];
    const passwordEntry = passwordUpdated === undefined ? password : passwordUpdated;
    const reEnteredPasswordEntry = reEnteredPasswordUpdated === undefined ? reEnteredPassword : reEnteredPasswordUpdated;

    let passwordInvalid = false;
    let reEnteredPasswordInvalid = false;

    let passwordIsDirtyUpdated = passwordIsDirty || passwordUpdated;
    let reEnteredPasswordIsDirtyUpdated = reEnteredPasswordIsDirty || reEnteredPasswordUpdated;
    
    if (((passwordEntry && reEnteredPasswordEntry) || formSubmitted)
      && (formSubmitted
        ? ((passwordEntry !== reEnteredPasswordEntry) || !reEnteredPasswordEntry.length)
        : (passwordEntry !== reEnteredPasswordEntry))) {
      const message = reEnteredPasswordEntry.length ? 'Your passwords does not match' : 'Re-enetered password is not entered';
      (passwordIsDirtyUpdated || reEnteredPasswordIsDirtyUpdated || formSubmitted) && errors.push(message);
      reEnteredPasswordInvalid = true;
    }

    if ((passwordEntry || formSubmitted) && passwordEntry.length < 8) {
      (passwordIsDirtyUpdated || formSubmitted) && errors.push("Your password must be at least 8 characters");
      passwordInvalid = true;
    }
    if ((passwordEntry || formSubmitted) && passwordEntry.search(/[a-z]/i) < 0) {
      (passwordIsDirtyUpdated || formSubmitted) && errors.push("Your password must contain at least one letter.");
      passwordInvalid = true;
    }
    if ((passwordEntry || formSubmitted) && passwordEntry.search(/[0-9]/) < 0) {
      (passwordIsDirtyUpdated || formSubmitted) && errors.push("Your password must contain at least one digit."); 
      passwordInvalid = true;
    }

    if ((passwordEntry || formSubmitted) && passwordEntry.search(/(?=.*\W)/) < 0) {
      (passwordIsDirtyUpdated || formSubmitted) && errors.push("Your password must contain at least one special character."); 
      passwordInvalid = true;
    }

    this.setState({
      password: passwordEntry,
      passwordIsDirty: passwordIsDirtyUpdated,
      passwordInvalid,
      reEnteredPassword: reEnteredPasswordEntry,
      reEnteredPasswordInvalid,
      reEnteredPasswordIsDirty: reEnteredPasswordIsDirtyUpdated
    });

    actions.updateLoginErrorMessage(errors);
    if (errors.length > 0) {
      return false;
    }
    else {
      return true;
    }
  }

  renderContent() {
    const {loginView: {resetPasswordLinkNotExpired}} = this.props;
    const {password, reEnteredPassword, passwordInvalid,
      reEnteredPasswordInvalid} = this.state;
     
    return !accountId || resetPasswordLinkNotExpired
      ? (
        <React.Fragment>
          <ResetPasswordInput
            invalid={passwordInvalid}  
            onChange={(e) => this.validateForm({passwordUpdated: e.target.value})}
            value={password}
            type='password'
            placeholder='New Password'
          />
          <ResetPasswordInput
            invalid={reEnteredPasswordInvalid}  
            onChange={(e) => this.validateForm({reEnteredPasswordUpdated: e.target.value})}
            value={reEnteredPassword}
            type='password'
            placeholder='Re-enter New Password'
          />
          <div>
            <StyledButtonMb onClick={() => this.resetPassword(password)}>
              Reset Password
            </StyledButtonMb>
          </div>
        </React.Fragment>
      )
      : (
        <ResetPasswordExpiredText>
          Reset Password Link is Expired.
        </ResetPasswordExpiredText>
      )
  }

  render() {
    const {loginView: {errorMessages, accountPasswordResetSuccess}, history} = this.props;
    const {location: {state}} = history;

    return (
      <React.Fragment>
        <MobileTitleHeader title='Reset Password'></MobileTitleHeader>
        <Content addpadding alignCenter>
          <ResetPasswordContent>
            {accountPasswordResetSuccess
              ? (
                <React.Fragment>
                  <div>Your password has been successfully reset</div>
                  {state === 'fromAccount' && <StyledButtonMb onClick={() => history.push('/account')}>Back to Account</StyledButtonMb>}
                </React.Fragment>
              )
              : this.renderContent()
            }
            {errorMessages.map(msg => <Error>{msg}</Error>)}
          </ResetPasswordContent>
        </Content>
      </React.Fragment>
    )
  }
}

export default withRouter(ChangePassword);