import styled, {css} from 'styled-components';

import {styledMedia} from '../../components/styled-components';

import {Card, Icon, Input, Button} from 'antd';

export const Overlay = styled.div`
  background: rgba(0,0,0,0.4);
  opacity: 0.75;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const LoginModal = styled.div`
 ${props => props.modal
  ? css`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    z-index: 2;
 `
  : css`

  `}
 
`;

export const LoginModalTitle = styled.div`
  display: flex;
  justify-content: center;
`;

export const CloseLoginModal = styled(Icon)`
  font-size: larger;
  color: #777;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25em;
  line-height: 1em;
`;

export const LoginPage = styled.div`
  padding: 5em 0;
  ${styledMedia.lessThan('tablet')`
    padding: 0;
  `}
`;

export const LoginDialog = styled(Card)`
  min-width: 300px;
  max-width: 380px;
  margin: 0 auto !important;
  min-height: 300px;
  ${styledMedia.greaterThan('tablet')`
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);
  `}

  border-radius: 10px;
  
  .ant-card-head {
    border-radius: 10px;
  }
`;

export const FacebookLoginButton = styled.div`
  height: 50px;
  line-height: 50px;
  background: #3c5898;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  margin-bottom: 1em;
`;

export const FacebookIcon = styled(Icon)`
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  display: flex !important;
  align-items: center;
  position: absolute;
`;

export const FacebookLoginButtonText = styled.div`
  flex: 1;
`;

export const StyledOR = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5em 0 1.5em 0;
  font-weight: bold;
`;

export const SignUpWithEmail = styled.div`
  font-size: 18px;
  padding: 10px;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
  cursor: pointer;
  font-weight: 500;
`;

export const StyledInput = styled(Input)`
  border-color: ${props => props.invalid && 'red'};
  display: flex;
  margin-bottom: 1em;
`;


export const StyledButtonMb = styled(Button)`
  display: flex;
  margin-bottom: 1em;
  justify-content: center;
`;

export const EmailLoginWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

export const SignUpFormWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

export const ErrorMessage = styled.div`
  color: red;
`;

export const SwitchSignUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SwitchSignUpBtn = styled(Button)`
  margin-left: 1em;
`;

export const RegistationSuccess = styled.div`
  color: green;
`;

export const ForgotPasswordText = styled.div`
  color: green;
  cursor: pointer;
  align-self: flex-end;
`;
