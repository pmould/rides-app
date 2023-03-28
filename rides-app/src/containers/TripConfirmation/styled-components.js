import styled from 'styled-components';
import {Content, Wrapper, styledMedia} from '../../components/styled-components';

import {Button, Icon} from 'antd';
import {Button as MButton} from 'antd-mobile';

export const TripConfirmationPage = styled(Wrapper)`
`;

export const MainContent = styled(Content)`
  margin: 50px auto;
  align-items: center;
  text-align: center;
`;

export const ThankYouText = styled.div`
  font-size: 24px;

  ${styledMedia.lessThan('tablet')`
    font-size: 20px;
  `}
`;

export const ConfirmText = styled.div`
  font-size: 32px;

  ${styledMedia.lessThan('tablet')`
    font-size: 24px;
  `}
`;

export const ConfirmIcon = styled(Icon)`
  font-size: 32px;
  margin: 32px 0;  
`;

export const MessageLabel = styled.div`
  font-size: 18px;
`;

export const MessageTextArea = styled.textarea`
  margin-top: 1em;
  width: 100%;
`;

export const SendMessage = styled(Button) `
  margin-top: 1em;
`;

export const GoToTripButtonMobile = styled(MButton)`
  width: 100px;
  display: flex;
  align-self: center;
  justify-content: center;
  margin: 2em 1em 0 1em;
  display: block;
  width: 100%;
  max-width: 200px;

  ${styledMedia.greaterThan('tablet')`
    display: none !important;
  `}
`;

GoToTripButtonMobile.defaultProps = {
  type: 'primary'
}


export const GoToTripButton = styled(Button)`
  display: flex;
  margin-top: 2em;
  ${styledMedia.lessThan('tablet')`
    display: none;
  `}
`;

GoToTripButton.defaultProps = {
  type: 'primary'
}
