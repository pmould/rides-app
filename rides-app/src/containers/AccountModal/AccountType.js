import React from 'react';

import {AccountContent, AccountButtons, LargeButton, ToolTip,
  Info, InfoItemList, InfoItem, InfoTitle, InfoText, StyledInfoIcon} from './styled-components';

import {AccountTypes} from '../../constants/Enums';

const AccountType = ({actions}) => {

  const InfoToolTip = (
    <Info>
    <InfoItemList itemLayout="vertical">
    <InfoItem>
      <InfoTitle>Personal Accounts</InfoTitle>
      <InfoText>
        Personal Accounts are for people looking to rent cars, as well as  as rent out their own cars.
      </InfoText>
    </InfoItem>
    <InfoItem>
      <InfoTitle>Business Accounts</InfoTitle>
      <InfoText>
        Business Accounts are for registered car rental businesses. Business accounts cannot be used to rent cars.
      </InfoText>
    </InfoItem>
    </InfoItemList>
  </Info>
  );

  return (
    <div>
      <div style={{display: 'flex'}}>
      <h4>What type of Account do you want to set up?</h4>
      <ToolTip>
        <StyledInfoIcon type="info-circle"/>
        {InfoToolTip}
      </ToolTip>
      </div>
    
      <AccountContent>
        <AccountButtons>
          <LargeButton ghost type='primary'
            onClick={() => actions.saveNewAccount({accountTypeId: AccountTypes.casualEarner})}>
            Personal Account
          </LargeButton>
          <LargeButton ghost type='primary'
            onClick={() => actions.saveNewAccount({accountTypeId: AccountTypes.company})}>
            Business Account
          </LargeButton>
        </AccountButtons>
      </AccountContent>
    </div>
  );

} 

export default AccountType;