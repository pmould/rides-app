import styled from 'styled-components';
import {Content, Wrapper} from '../../../components/styled-components';

import {Spin, Button, Icon} from 'antd';



export const CloseButton = styled(Icon)`
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5em;
  font-size: 18px;
`;

CloseButton.defaultProps = {
  type: 'close'
};

export const SearchModal = styled(Wrapper)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, .8);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
  padding: 1em;
  padding-top: 2em;
`;

export const SearchModalBody = styled.div`
  display: flex;
  background: white;
  width: 100%;
`;

export const SearchWrapper = styled.div`
  flex: 1;
  width: 100%;
`;


export const MainContent = styled(Wrapper)`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
 font-size: 1.25em;
 margin-bottom: .5em;
`;


export const Search = styled(Content)`
  margin: 0 auto;
`;

export const SearchTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5em 0;
  line-height: normal;
  font-size: 2em;
`;

export const SearchSelection = styled.div`
  display: flex;
  justify-content: center;
`;

export const SearchSelectionItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  padding-top: 0.5em;
  margin-right: 1em;
  color: rgb(252,209,22); // white
`;

export const SearchSelectionAllItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  padding-top: 0.5em;
  margin-right: 9.5em;
  padding: 0;
  color: rgb(252,209,22);
`;

export const SearchItems = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchItem = styled.div`
  flex: 1;
  color: white; // #555; // #1890ff;
  cursor: pointer;
`;

export const StyledSpinner = styled(Spin)`
  margin: 2em auto;
`;