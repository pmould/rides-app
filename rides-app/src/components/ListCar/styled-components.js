import styled, {css} from 'styled-components';

import {Content as StyledContent, Wrapper as StyledWrapper, PrimaryButton as PButton, styledMedia} from '../styled-components';

import {Button, Card, Steps, Icon, Popconfirm} from 'antd';


export const Content = styled(StyledContent)`
  padding 1em;
`;

export const ListCarTitle = styled.div`
  display: flex;
  justify-content: center;
`;

export const DeleteBtnWrapper = styled(Popconfirm)`
  position: absolute;
  right: 8px;
  ${styledMedia.greaterThan('desktop')`
    bottom: 0;
  `}
`;
export const DeleteButton = styled(Button)`
  display: none;
  ${styledMedia.greaterThan('desktop')`
    display: flex;
  `}
`;

export const DeleteIcon = styled(Icon)`
  color: red;
  display: none;
  ${styledMedia.lessThan('desktop')`
    display: flex;
  `}
`;

DeleteIcon.defaultProps = {
  type: 'delete',
  theme: 'filled'
}

DeleteButton.defaultProps = {
  type: 'danger'
}


export const StepsContent = styled(Content)`
  ${styledMedia.lessThan('tablet')`
    border-bottom: 1px dashed #ccc;
    padding: 0.5em;
  `}
`;


export const StyledSteps = styled(Steps)`
  ${styledMedia.lessThan('tablet')`
    display: flex !important;

    .ant-steps-item {
      display: flex !important;
      flex-flow: column;
      align-items: center;
      margin: 0 !important;
      justify-content: space-around;
    }
    .ant-steps-item-icon {
      margin: 0.25em 0 !important;
    }
    .ant-steps-item-title::after, .ant-steps-item-tail {
      display: none !important;
    }

    .ant-steps-item:last-child {
      flex: 1 !important;
    }

    .ant-steps-item-content,
    .ant-steps-item-title {
      font-size: 12px !important;
      line-height: 12px !important;
      padding: 0 !important;
    }

    .ant-steps-item-content {
      margin: 0.25em 0 !important;
      min-height: 0 !important;
    }
  `}
`;

export const StyledStep = styled(Steps.Step)`
  ${props => props.authorized && css`
    .ant-steps-item-icon {
      color: #555 !important; //#1890ff;
      border: 1px solid !important;
      cursor: pointer;
    }
  `}
  ${props => !props.active && props.authorized && css`
      .ant-steps-icon {
        color: #555 !important; //#1890ff;
      }
  `};

  ${props => props.active && props.isloading && css`
      .ant-steps-item-icon {
        border: initial !important;
        cursor: inital;
      }
  `};
`;

export const ListCarPage = styled.div`
`;

export const Wrapper = styled(StyledWrapper)`
`;

export const HeaderWrapper = styled(StyledWrapper)`
  background: url(https://dl.dropboxusercontent.com/s/amba1dxk4607up4/efeito-rodape.png?dl=0) no-repeat;
  height: 125px;
  background-size: cover;
  background-position-x: 50%;
`;
export const Title = styled.div`
  font-size: 48px;
`;

export const MainContent = styled.div`
  display: flex;
  margin: 1.25em;
  flex: 1;
  flex-direction: column;
`;

export const VehicleSelectCard = styled(Card)`;
  display: flex;
`;

export const VehicleSelect = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

export const SelectItem = styled.div`
  display: flex;
  > div { 
    margin-left: 1em;
  }

  ${styledMedia.lessThan('desktop')`
    flex-direction: column;
    padding-top: 0.5em;
    > div { 
      margin-left: initial;
    }
  `}

`;

export const PrimaryButton = styled(Button)`
  margin-right: 0.5em;
  :hover {
    color: #333 !important;
    border-color: initial !important;
  }
`;