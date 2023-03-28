import React from 'react';
import GoogleIcon from './GoogleIcon';

import {googleAppId} from '../../constants';

import {LoginProvider} from '../../constants/Enums';

import styled from 'styled-components';

export const StyledGoolgeButton = styled.div`
  cursor: pointer;
  background-color: #fff;
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, .54);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24);
  padding: 0;
  border-radius: 2;
  border: '1px solid transparent';
  font-size: 14;
  font-weight: '500';
  font-family: 'Roboto, sans-serif';
  display: flex;
  margin-bottom: 1em;
`;

export const StyledGoogleLoginText = styled.div`
  padding: 10px;
  font-weight: 500;
  font-size: 18px;
  flex: 1;
  display: flex;
  justify-content: center;
`;


class GoogleButton extends React.Component {
  state = {
    disabled: true,
    hovered: false,
    active: false
  };

  componentDidMount() {
    const {isSignedIn = false} = this.props;

    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/api.js';
      
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      } else {
        d.head.appendChild(js);
      }
      js.onload = cb
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: googleAppId,
        cookie_policy: 'single_host_origin',
        fetch_basic_profile: true,
        discoveryDocs: [],
        redirect_uri: 'redirectUri',
        scope: 'profile email',
        accessType: 'online',
        isSignedIn,
        uxMode: 'popup',
      }

      window.gapi.load('auth2', () => {
        this.enableButton()
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(
            res => {
              if (isSignedIn && res.isSignedIn.get()) {
                this.handleSigninSuccess(res.currentUser.get())
              }
            },
            err => {}
          )
        }
      })
    })
  }
  
  enableButton() {
    this.setState({
      disabled: false
    })
  }

  signIn = (e) => {
    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }
    if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      const {prompt} = this.props;
      const options = {prompt};

      auth2.signIn(options).then(res => this.handleSigninSuccess(res), err => this.handleFailure(err));

    }
  }

  handleFailure = (err) => {
    console.log(err);
  }

  handleSigninSuccess = (res) => {
    const {actions, modal} = this.props;
    /*
      offer renamed response keys to names that match use
    */
    const basicProfile = res.getBasicProfile()
    const authResponse = res.getAuthResponse()
    res.googleId = basicProfile.getId()
    res.tokenObj = authResponse
    res.tokenId = authResponse.id_token
    res.token = authResponse.access_token
    res.profile = {
      id: basicProfile.getId(),
      picture: {
        data: {url: basicProfile.getImageUrl()}
      },
      email: basicProfile.getEmail(),
      first_name: basicProfile.getName(),
      name: basicProfile.getGivenName(),
      last_name: basicProfile.getFamilyName()
    }

    actions.signUpWithSocial(LoginProvider.google, res, modal);
  } 

  render() {
    const {isSignUp, loginView: {isLoggingIn}} = this.props;

    const siginInText = isLoggingIn === LoginProvider.google ? 'Logging In...' : 'Log In  with Google';
    const signingUpText = isLoggingIn === LoginProvider.google ? 'Signing Up...' : 'Sign Up  with Google';
    return (
      <StyledGoolgeButton onClick={this.signIn}>
        <GoogleIcon/>
        <StyledGoogleLoginText>
          {isSignUp ?  signingUpText : siginInText}
        </StyledGoogleLoginText>
      </StyledGoolgeButton>
    );
  }
}

export default GoogleButton;