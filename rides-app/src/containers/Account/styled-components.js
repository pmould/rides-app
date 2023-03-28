import styled from 'styled-components';
import {Switch as AntSwitch} from 'antd';

import {Error, StyledButtonMb, StyledInput, Content, PageList, ListItem, DesktopView, PrimaryButton} from '../../components/styled-components';

export {
  Error,
  Content,
  StyledButtonMb,
  PageList,
  ListItem,
  DesktopView,
  PrimaryButton
}

export const Switch = styled(AntSwitch)`
`;

export const ResetPasswordContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1em;
`;

export const ResetPasswordInput = styled(StyledInput)`
  max-width: 500px;
`;

export const ResetPasswordExpiredText = styled.div`
  flex: 1;
  font-weight: bold;
  display: flex;
  justify-content: center;
  color: red;
`;

export const UserAccountActivationWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const AccountAcivationText = styled.div`
  font-size: 24px;
  color: #333;
`;



