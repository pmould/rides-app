import React from 'react';

import {AccountButtons, AccountContent, LargeButton} from './styled-components';

const AccountActivate = ({actions, account}) => {
  const activateAccountHandler = () => {
    const activateAccount = Object.assign({}, account, {active: true});
    actions.activateNewAccount(activateAccount);
  }

  return (
    <div>
      <h4>Activate account and begin relay riding!</h4>
      <AccountContent>
      <AccountButtons>
        <LargeButton ghost type='primary'
          onClick={activateAccountHandler}>
          Publish
        </LargeButton>
      </AccountButtons>
      </AccountContent>
    </div>
  );    
} 

export default AccountActivate;
