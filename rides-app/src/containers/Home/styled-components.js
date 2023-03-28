import styled from 'styled-components';
import {Content, Wrapper} from '../../components/styled-components';

import {Spin, Button} from 'antd';

export const HomePage = styled(Wrapper)`
  flex-direction: column;
`;

export const MainContent = styled(Wrapper)`
  display: flex;
  flex-direction: column;
`;

export const LoggedInWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  padding: 2em 0;
`;

export const AboutTextWrapper = styled(Wrapper)`
  padding: 0em;
  flex-direction: column;
`;

export const AboutTextContent = styled(Content)`

`;

export const PromoDisplayWrapper = styled(Wrapper)`
  font-size: 2em;
  background: #444;
  color: white;
`;

export const PromoDisplayContent = styled(Content)`
  text-align: center;
  align-items: center;
  padding: 1em;
`;

export const PromoJoinButton = styled(Button)`
  margin-top: 1em;
  :hover {
    background: white !important;
    color: #333 !important;
    border-color: initial !important;
  }
`;

PromoJoinButton.defaultProps = {
  ghost: true
};

export const Title = styled.div`
 font-size: 1.25em;
 margin-bottom: .5em;
`;

export const CardTitleContent = styled(Content)`
  padding: 0;
`;

export const SearchWrapper = styled.div`
  background: #eee;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

export const Search = styled(Content)`
  margin: 0 auto;
  padding: 1.25em 1em;
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
`;

export const LoggedInContent = styled(Content)`
  padding: 1em;
`;

export const SearchItems = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchItem = styled.div`
  flex: 1;
`;

export const StyledSpinner = styled(Spin)`
  margin: 2em auto;
`;