import React from 'react';
import {BackIcon, GoBack, StyledButtonMb, StyledInput, Error, ResetPasswordContent, SuccessMessage} from '../components/styled-components';

import {resetPasswordSuccessMessage} from '../constants';

import {validateEmail} from '../utils';

import history from '../history';

class ResetPassword extends React.Component {
  state = {};

  sendResetPasswordEmail = (email) => {
    const {actions} = this.props;

    if (this.validateForm({formSubmitted: true})) {
      actions.sendResetPasswordEmail(email);
      this.setState({errors: ''});
    }
  }

  validateForm = ({
    emailUpdated,
    formSubmitted,
  }) => {
    const {actions} = this.props;
    const {email, emailIsDirty, displayMessage} = this.state;
  
    const errors = [];
    const emailEntry = emailUpdated === undefined ? email : emailUpdated;
    let emailIsDirtyUpdated = emailIsDirty || emailUpdated;
    let emailInvalid = false;
  
    if ((emailEntry || formSubmitted) && !validateEmail(emailEntry)) {
      (emailIsDirtyUpdated || formSubmitted) && errors.push('Email address is not valid');
      emailInvalid = true;
    }
  
    this.setState({
      email: emailEntry,
      emailIsDirty: emailIsDirtyUpdated,
      emailInvalid
    });

    if (errors.length > 0) {
      !displayMessage && actions.updateLoginErrorMessage(errors);
      return false;
    }
    else {
      actions.updateLoginErrorMessage([]);
      return true;
    }
  }

  renderContent = () => {
    const {loginView: {resetAccountPasswordEmailSent, errorMessages}, modal} = this.props;
    const {email, emailInvalid} = this.state;

    return !resetAccountPasswordEmailSent
      ? (
        <ResetPasswordContent>
          <StyledInput
            style={{maxWidth: modal ? '100%' : '400px'}}  
            invalid={emailInvalid}
            onChange={(e) => this.validateForm({emailUpdated: e.target.value})}
            type='email'
            value={email}
            placeholder='Email'
          />
          <div>
            <StyledButtonMb onClick={() => this.sendResetPasswordEmail(email)}>
            Reset Password
          </StyledButtonMb>
          </div>  
          {!modal && errorMessages.length > 0 && <Error>{errorMessages[0]}</Error>}
        </ResetPasswordContent>
      )
      : (
        <div>
          <SuccessMessage>{resetPasswordSuccessMessage}</SuccessMessage>
        </div>
      );
  }
  
  goBack = () => {
    const {goBackFromLogin, modal, actions} = this.props;
    modal
      ? goBackFromLogin()
      : history.push('login');
    actions.updateLoginErrorMessage([]);
  }

  render() {
    const {modal} = this.props;

    return (
      <div style={{padding: !modal ? '2em' : '0'}}>
        <GoBack onClick={this.goBack}><BackIcon/> Go Back to Log In</GoBack>
        {this.renderContent()}
      </div>
    )
  }
}

export default ResetPassword;