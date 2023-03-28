import React from 'react';

import {SignUpFormWrapper, StyledInput, StyledButtonMb} from './styled-components';
import {validateEmail} from '../../utils';

class SignUpForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    reEnteredPassword: '',
    errors: []
  }

  componentWillReceiveProps(nextProps)
  {
    const {loginView: {accountTaken}} = nextProps;
    const {loginView: {accountTaken: prevAccountTaken}} = this.props;
    const {email: takenEmail} = this.state;

    if (accountTaken && accountTaken !== prevAccountTaken) {
      this.setState({emailInvalid: true, takenEmail});   
    }
  }

  signUp = (profile) => {
    const {actions, modal} = this.props;
    const formValid = this.validateForm({formSubmitted: true});
    formValid && actions.signUpByEmail(profile, modal);
  }

  validateForm = ({
    firstNameUpdated,
    lastNameUpdated,
    emailUpdated,
    passwordUpdated,
    reEnteredPasswordUpdated,
    formSubmitted
  }) => {

    const {actions} = this.props;
    const {firstName, lastName, email, password, reEnteredPassword,
      firstNameIsDirty, lastNameIsDirty, emailIsDirty, passwordIsDirty, reEnteredPasswordIsDirty, takenEmail} = this.state;

    const errors = [];
    const firstNameEntry = firstNameUpdated === undefined ? firstName : firstNameUpdated;
    const lastNameEntry = lastNameUpdated === undefined ? lastName : lastNameUpdated;
    const emailEntry = emailUpdated === undefined ? email : emailUpdated;
    const passwordEntry = passwordUpdated === undefined ? password : passwordUpdated;
    const reEnteredPasswordEntry = reEnteredPasswordUpdated === undefined ? reEnteredPassword : reEnteredPasswordUpdated;

    let firstNameInvalid = false;
    let lastNameInvalid = false;
    let emailInvalid = false;
    let passwordInvalid = false;
    let reEnteredPasswordInValid = false;
    
    let firstNameIsDirtyUpdated = firstNameIsDirty || firstNameUpdated;
    let lastNameIsDirtyUpdated = lastNameIsDirty || lastNameUpdated;
    let emailIsDirtyUpdated = emailIsDirty || emailUpdated;
    let passwordIsDirtyUpdated = passwordIsDirty || passwordUpdated;
    let reEnteredPasswordIsDirtyUpdated = reEnteredPasswordIsDirty || reEnteredPasswordUpdated;

    if ((firstNameEntry || formSubmitted) && !firstNameEntry.length) {
      (firstNameIsDirtyUpdated || formSubmitted) && errors.push('First Name not entered');
      firstNameInvalid = true;
    }

    if ((lastNameEntry || formSubmitted) && !lastNameEntry.length) {
      (lastNameIsDirtyUpdated || formSubmitted) && errors.push('Last Name not entered');
      lastNameInvalid = true;
    }

    if ((emailEntry || formSubmitted) && !validateEmail(emailEntry)) {
      (emailIsDirtyUpdated || formSubmitted) && errors.push('Email address is not valid');
      emailInvalid = true;
    }

    if (((passwordEntry && reEnteredPassword) || formSubmitted)
      && (formSubmitted
        ? ((passwordEntry !== reEnteredPasswordEntry) || !reEnteredPasswordEntry.length)
        : (passwordEntry !== reEnteredPasswordEntry))) {
      const message = reEnteredPasswordEntry.length ? 'Your passwords does not match' : 'Re-enetered password is not entered';
      (passwordIsDirtyUpdated || reEnteredPasswordIsDirtyUpdated || formSubmitted) && errors.push(message);
      reEnteredPasswordInValid = true;
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

    if (emailEntry === takenEmail)
    {
      emailInvalid = true;
      actions.updateLoginErrorMessage(['Account with email address already exists']);
    }  
    
    this.setState({
      firstName: firstNameEntry,
      lastName: lastNameEntry,
      email: emailEntry,
      password: passwordEntry,
      reEnteredPassword: reEnteredPasswordEntry,
      firstNameIsDirty: firstNameIsDirtyUpdated,
      lastNameIsDirty: lastNameIsDirtyUpdated,
      emailIsDirty: emailIsDirtyUpdated,
      passwordIsDirty: passwordIsDirtyUpdated,
      reEnteredPasswordIsDirty,
      firstNameInvalid,
      lastNameInvalid,
      emailInvalid,
      passwordInvalid,
      reEnteredPasswordInValid,
      errors
    });

    if (errors.length > 0) {
      actions.updateLoginErrorMessage(errors);
      return false;
    }
    else {
      if (emailEntry !== takenEmail) {
        actions.updateLoginErrorMessage([]);
      }
      return true;
    }
  }

  componentWillUnmount() {
    const {actions} = this.props;
    actions.updateLoginErrorMessage([]);
  }

  render() {
    const {loginView: {isLoggingIn}} = this.props;
    const {firstName, lastName, email, password, reEnteredPassword,
      firstNameInvalid, lastNameInvalid, emailInvalid, passwordInvalid, reEnteredPasswordInValid} = this.state;

    const siginUpText = isLoggingIn ? 'Signing Up...' : 'Sign Up';
    return (
      <SignUpFormWrapper>
        <StyledInput
          invalid={firstNameInvalid}  
          onChange={(e) => this.validateForm({firstNameUpdated: e.target.value})}
          value={firstName}
          placeholder='First Name'
        />
        <StyledInput
          invalid={lastNameInvalid}  
          onChange={(e) => this.validateForm({lastNameUpdated: e.target.value})}
          value={lastName}
          placeholder='Last Name'
        />
        
        <StyledInput
          invalid={emailInvalid}  
          onChange={(e) => this.validateForm({emailUpdated: e.target.value})}
          type='email'
          value={email}
          placeholder='Email'
        />
        <StyledInput
          invalid={passwordInvalid}  
          onChange={(e) => this.validateForm({passwordUpdated: e.target.value})}
          value={password}
          type='password'
          placeholder='Password'
        />
        <StyledInput
          invalid={reEnteredPasswordInValid}   
          onChange={(e) => this.validateForm({reEnteredPasswordUpdated: e.target.value})}
          value={reEnteredPassword}
          type='password'
          placeholder='Re-enter Password'
        />
        <StyledButtonMb 
          onClick={() => this.signUp({first_name: firstName, last_name: lastName, email, password})}>
          {siginUpText}
        </StyledButtonMb>
      </SignUpFormWrapper>
    )
  }
}

export default SignUpForm;