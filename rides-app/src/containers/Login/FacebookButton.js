import React from 'react';

import {LoginProvider} from '../../constants/Enums';

import history from '../../history';

import {FacebookLoginButton, FacebookIcon, FacebookLoginButtonText} from './styled-components';


class FacebookButton extends React.Component {
  state = {
    isSdkLoaded: false,
    isProcessing: false,
  };

  componentDidMount() {

    this.setFbAsyncInit();

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isSdkLoaded && nextProps.autoLoad && ! this.props.autoLoad) {
      window.FB.getLoginStatus(this.checkLoginAfterRefresh);
    }
  }

  setFbAsyncInit(){
    window.fbAsyncInit = () => {
      window.FB.init({
        appId      : '149562755804337',
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });
    
      this.setState({isSdkLoaded: true});
      // Now that we've initialized the JavaScript SDK, we call 
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
    
      //window.FB.getLoginStatus(this.statusChangeCallback);
    }
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback = (response) => {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.responseApi(response.authResponse);
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  loginFacebook = () => {
    const {actions} = this.props;
    const {isSdkLoaded} = this.state;
    isSdkLoaded ?
      window.FB.login(this.statusChangeCallback.bind(this), {
        scope: 'public_profile, email'
      })
      : actions.updateLoginErrorMessage(['We were unable to log you in with Facebook. Please try again later.']);
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkFacebookLoginState = () => {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response).bind(this);
    });
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  responseApi = async (authResponse) => {
    const {actions, modal} = this.props;

    const fields = 'id,name,email,first_name,last_name,middle_name,picture,gender,link,locale,timezone,updated_time,verified';
      window.FB.api('/me', {fields}, async (response) => {
        const res = Object.assign({profile: response}, {token: authResponse.accessToken, expires: authResponse.expiresIn});
        actions.signUpWithSocial(LoginProvider.facebook, res, modal);
    });
  }

  render() {
    const {isSignUp, loginView: {isLoggingIn}} = this.props;

    const siginInText = isLoggingIn === LoginProvider.facebook ? 'Logging In...' : 'Log In with Facebook';
    const signingUpText = isLoggingIn === LoginProvider.facebook ? 'Signing Up...' : 'Sign Up with Facebook';
    return (
      <FacebookLoginButton
        onClick={this.loginFacebook}
      >
        <FacebookIcon type='facebook' />
        <FacebookLoginButtonText>{isSignUp ? signingUpText : siginInText}</FacebookLoginButtonText>
      </FacebookLoginButton>
    );
  }
}

export default FacebookButton;