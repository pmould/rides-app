import styled, {css} from 'styled-components';

import {Pagination, Button, Input as AntInput, Icon, Select as AntSelect, Skeleton} from 'antd';
import {List as MobileList} from 'antd-mobile';

import {generateMedia} from "styled-media-query";
import { WhiteSpace } from 'antd-mobile';

export {Skeleton};

export const styledMedia = generateMedia({
  desktop: '960px',
  tablet: '750px',
  mobile: '500px'
});

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin: 0 auto;
  padding: 0; //  padding: 1.25em 0;
  width: 100%;
  align-items: ${props => props.alignCenter ? 'center' : 'initial'};
  justify-content: ${props => props.center ? 'center' : 'initial'};
  ${styledMedia.greaterThan('desktop')`
    // padding: 1.25em 1em;
  `}

  ${props => props.defaultPadding && css`
    ${styledMedia.lessThan('desktop')`
      padding: 0.5em;
    `}
  `}
`;

export const MainSection = styled.div`
  display: flex;
  flex-flow: ${props => props.flexDirection === 'row' ? 'row' : 'column'};
  padding-top: 1em;
`;

export const App = styled.div`
  height: 100%;
  // TODO: Fix conflicting styles with ANTD and ANTD-MOBILE
  font-size: 14px;
  ${styledMedia.greaterThan('desktop')`
    background: white;
    font-size: 16px;
  `}
`;

export const AppOverlay = styled.div`
  ${props => props.active && css`
    background: rgba(0,0,0,0.8);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
  `}
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  ${props => props.fullHeight && css`
    position: absolute;
    width: 100%;
    height: 100%;
  `}
  ${props => !props.fullHeight && css`
    padding-bottom: 51px;
    min-height: 100%;
    ${styledMedia.lessThan('tablet')`
      // background: #f5f5f9;
    `}
  `}
`;

export const PageTitle = styled.div`
  display: flex;
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  font-size: 48px;

  ${styledMedia.lessThan('desktop')`
    display: none;
  `}
`;

export const ContentFooter = styled.div`
  padding: 1em;
`;

export const SPagination = styled(Pagination)`
  display: flex;
  justify-content: flex-end;
`;

export const Select = styled(AntSelect)`
  .ant-select-selection {
    ${props => props.invalid && css`
      border: 1px solid red;
    `}
  }
`;

export const Input = styled(AntInput)`
  ${props => props.invalid && css`
    border: 1px solid red;
  `}
`;

export const StyledButtonMb = styled(Button)`
  display: flex;
  margin-bottom: 1em;
  justify-content: center;
`;


export const StyledInput = styled(Input)`
  display: flex;
  margin-bottom: 1em;
`;

export const PrimaryButton = styled(Button)`
`;

PrimaryButton.defaultProps = {
  type: 'primary'
};


export const Error = styled.div`
  color: red;
`;

export const BackIcon = styled(Icon) `
`;
BackIcon.defaultProps = {
  type: 'arrow-left'
};

export const GoBack = styled.div`
  cursor: pointer;
  margin-bottom: 1em;
`

export const ResetPasswordContent = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const SuccessMessage = styled.div`
  font-weight: bold;
`;

export const AppLoaderWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: white;
`;

export const PageList = styled(MobileList)`
  ${styledMedia.greaterThan('desktop')`
    display: none;
  `}
`;

export const ListItem = styled(MobileList.Item)`
  ${props => props.arrow && css`
    cursor: pointer;
  `}
`;

export const DesktopView = styled.div`
  ${styledMedia.lessThan('desktop')`
    display: none;
  `}
`;