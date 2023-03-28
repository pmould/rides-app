import styled from 'styled-components';
import {Content} from '../styled-components';

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

export const SearchItems = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchItem = styled.div`
  flex: 1;
`;