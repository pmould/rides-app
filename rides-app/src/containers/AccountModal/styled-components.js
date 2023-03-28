import styled, {css} from 'styled-components';
import {Button, Icon, List, Modal, Steps, Input, Select} from 'antd';

import InputMask from 'react-input-mask';

export const Title = styled.div`
  display: flex;
  justify-content: center;
`;

export const ToolTip = styled.div`
  position: relative;
  padding-left: 0.5em;
  > div:nth-child(2) {
    display: none;
    position: absolute;
    top: -10px;
    left: 25px;
    width: 200px;
    z-index: 10;
  }

  :hover > div:nth-child(2) {
    display: flex;
  }
`;

export const Info = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 0.5em;
  margin-top: 1em;
  position: absolute;
  background: white;
  z-index: 2;
`;

export const InfoItemList = styled(List)`
  padding: 0  0.5em;
`;

export const InfoItem = styled(List.Item)`
  display: flex;
  flex-direction: column;

  .ant-list-item-content-single {
    margin-bottom: 0px;
  }
`;

export const InfoTitle = styled.div`
  color: #333;
`;

export const InfoText = styled.div`
  font-size: smaller;
`;

export const AccountButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const StyledInfoIcon = styled(Icon)`

`;

export const AccountSteps = styled(Steps)`
  text-align: left;
  margin-bottom: 24px;
`;

export const LargeButton = styled(Button)`
  max-width: 12em;
  height: 3em;
  margin: 0.5em;
  flex: 1;
`;

export const StyledAccountModalWrapper  = styled(Modal)`

  ${props => props.showFooter || css`
    .ant-modal-footer {
      display: none;
    }
  `}
`;

export const AccountContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-top: 1em;
`;

export const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 0 auto;
`;

export const StyledInput = styled(Input)`
  margin-bottom: 1em;
`;

export const StyledInputMask = styled(InputMask)`
  margin-bottom: 1em;
`;

export const DOBTitle = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
`;
export const DateOfBirth = styled.div`
  display: flex;
  margin-bottom: 1em;
  width: 100%;
`;

export const Day = styled(Select)`
  flex: 1
`;

export const Month = styled(Select)`
  flex: 1;
`;

export const Year = styled(Select)`
  flex: 2;
`;

