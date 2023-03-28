import React from 'react';
import ReactDOM from 'react-dom';
import {
  CloseLoginModal, LoginModal, LoginModalTitle, SignUpWithEmail, SwitchSignUp,
  LoginPage, LoginDialog, Overlay, StyledOR, ErrorMessage, SwitchSignUpBtn
} from './styled-components';

import {BackIcon, GoBack} from '../../components/styled-components';
import './login.css';

import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';

import EmailLogin from './EmailLogin';
import SignUpForm from './SignUpForm';
import ResetPassword from '../ResetPassword';

import history from '../../history';
import {isAuthenticated} from '../../utils/api';

const modalRoot = document.getElementById('modal-root');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    const {modal} = this.props;
    if (modal) {
      document.body.style.overflow = 'hidden';
      modalRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    const {actions, modal} = this.props;
    actions.updateLoginErrorMessage([]);

    if (modal) {
      modalRoot.hasChildNodes && modalRoot.removeChild(this.el);
      document.body.style.overflow = '';
    }
  }

  switchLogInSignUp = (modal, isSignUp, viewSignUp, actions) => {
    viewSignUp && actions.toggleViewSignUp();
    if (modal) {
      actions.toggleSignUpLogin();
    }
    else {
      history.push(isSignUp ? '/login' : '/signUp');
    }
  }

  goToResetPassword = (modal) => {
    const {actions} = this.props;
    modal
      ? actions.toggleForgotPasswordForm()
      : history.push('/resetPassword');
  }

  goBackFromForgotPassword = modal => {
    const {actions} = this.props;
    actions.toggleForgotPasswordForm();
    !modal && history.push('/login');
  }

  goBackFromSignUpSuccess = (modal) => {
    const {actions} = this.props;
    actions.goBackFromSignUpSuccess();
    !modal && history.push('/login');
  }

  renderLoginOrSignUp = (modal) => {
    const {actions, isSignUp, loginView: {viewSignUp}} = this.props;

    return (
      <div>
        {viewSignUp
          ? <SignUpForm {...{...this.props}} />
          : (
            <div>
              {<EmailLogin {...{...this.props, modal: true, goToResetPassword: () => this.goToResetPassword(modal)}} />}
              {<StyledOR>or</StyledOR>}
              <FacebookButton {...{...this.props, isSignUp}} />
              <GoogleButton {...{...this.props, isSignUp}} />
              {isSignUp && <StyledOR>or</StyledOR>}
              {isSignUp && <SignUpWithEmail onClick={() => actions.toggleViewSignUp()}>Sign Up with Email</SignUpWithEmail>}
            </div>
          )}
        <SwitchSignUp>
          {!isSignUp ? 'Don\'t have an account?' : 'Already have an account?'}
          <SwitchSignUpBtn
            onClick={() => this.switchLogInSignUp(modal, isSignUp, viewSignUp, actions)}>
            {!isSignUp ? 'Sign Up' : 'Log In'}
          </SwitchSignUpBtn>
        </SwitchSignUp>
      </div>
    );
  }
  
  renderLogin() {
    const {actions, modal, loginView: {errorMessages, viewForgotPasswordForm, registerByEmailSuccess}} = this.props;

    const title = (
      <LoginModalTitle>
        Socket IO
        {modal && <CloseLoginModal
          type='close-circle-o'
          onClick={actions.toggleLoginModal}/>}
      </LoginModalTitle>
    );

    return (
      <LoginModal {...{modal}}>
        {modal && <Overlay data-modal='true' onClick={e => modal && e.target.dataset.modal && actions.toggleLoginModal}/>}
        <LoginPage>
          <LoginDialog {...{title}} bordered={false}>
            {viewForgotPasswordForm && <ResetPassword {...{...this.props, goBackFromLogin: () => this.goBackFromForgotPassword(modal)}} />}
            {registerByEmailSuccess && (
            <div style={{padding: !modal ? '2em' : '0'}}>
              <GoBack onClick={() => this.goBackFromSignUpSuccess(modal)}><BackIcon/> Go Back to Log In</GoBack>
              {<div>A registration email been sent to your email. Follow the instructions in the email to complete your account registration. The email will arrive shorty.</div>}
            </div>
            )}
            {!viewForgotPasswordForm && !registerByEmailSuccess && this.renderLoginOrSignUp(modal)}
            <div>              
              {errorMessages.map((msg, i) => <ErrorMessage id={i}>{msg}</ErrorMessage>)}
            </div>
          </LoginDialog>
        </LoginPage>
      </LoginModal>
    );
  }

  render() {
    const {actions, modal, loginView: {errorMessages, viewForgotPasswordForm, registerByEmailSuccess}} = this.props;

    return modal
      ? ReactDOM.createPortal(this.renderLogin(), this.el)
      : this.renderLogin()
  }
}

export default Login;