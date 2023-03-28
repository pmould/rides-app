import React from 'react';

import {EmailLoginWrapper, StyledInput, StyledButtonMb, ForgotPasswordText} from './styled-components';
import {LoginProvider} from '../../constants/Enums';

class EmailLogin extends React.Component {
  state = {
    email: '',
    password: ''
  };

  logIn(email, password) {
    const {actions} = this.props;
    actions.loginByEmail(email, password);
  }
  render() {
    const {goToResetPassword, loginView: {isLoggingIn}} = this.props;
    const {email, password} = this.state;

    const siginInText = isLoggingIn === LoginProvider.email ? 'Logging In...' : 'Log In';
    return (
      <EmailLoginWrapper>
        <StyledInput
          onChange={(e) => this.setState({email: e.target.value})}
          value={email}
          placeholder='Email' />
        <ForgotPasswordText onClick={goToResetPassword}>
          Forgot Password?
        </ForgotPasswordText>
        <StyledInput
          onChange={(e) => this.setState({password: e.target.value})}
          type='password'
          value={password}
          placeholder='Password' />
        <StyledButtonMb onClick={() => this.logIn(email, password)}>{siginInText}</StyledButtonMb>
      </EmailLoginWrapper>
    );
  }
}

export default EmailLogin;